import fs from "node:fs";
import path from "node:path";

// Chrome files the manifest MUST control. Body/page content is intentionally excluded.
const CHROME_FILES = [
  "src/app/layout.tsx",
  "src/components/sections/navbar.tsx",
  "src/components/sections/footer.tsx",
  "src/components/theme/site-theme-provider.tsx",
  "src/components/theme/theme-toggle.tsx",
  "src/components/consent/consent-banner.tsx",
  "src/components/booking/booking-embed.tsx",
];

const LINK_ARRAY_RE = /\[\s*\{[^}]*\bhref\b\s*:/;
// Optional side/offset segment (border-t-, ring-offset-, border-x-) so
// directional variants can't slip a neutral through (Codex, #668).
const RAW_TAILWIND_NEUTRAL_RE =
  /\b(?:text|bg|border|ring|outline|shadow|fill|stroke|divide|from|via|to|decoration|caret|accent|placeholder)(?:-(?:t|r|b|l|x|y|s|e|tl|tr|br|bl|offset|inset))?-(?:gray|slate|zinc|neutral|stone)(?:-\d{2,3})?(?:\/\d{1,3})?\b/g;
// A hex COLOR needs a CSS value context: a quote/backtick (style objects,
// svg/JSX attributes, CSS-in-JS), a bracket (bg-[#fff] arbitrary values), an
// equals, or a `key:` boundary — and a valid color length (3/4/6/8 digits).
// Rendered prose like "Suite #300" or "ext #4021" is a number sign, not a
// color (Devin, #668). Numeric HTML character references (&#169;) and
// fragment hrefs whose anchor happens to be hex-like (href="#cafe") are
// STRIPPED before matching — the quote context would otherwise claim them.
// Known miss, accepted: hex inside multi-value shorthands ("1px solid #fff")
// has only a space boundary and evades the context requirement — a missed
// warning is recoverable, a publish blocked on a street address is not.
const RAW_HEX_COLOR_RE =
  /(?<=[[("'`=:][ \t]*)#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})(?![0-9a-fA-F])/g;
const FRAGMENT_HREF_RE = /\b(?:href|to)\s*=\s*(?:["']#[^"']*["']|\{\s*["'`]#[^"'`]*["'`]\s*\})/g;
const NUMERIC_ENTITY_RE = /&#(?:\d+|[xX][0-9a-fA-F]+);/g;

/**
 * Comments are not rendered color: `// migrate bg-gray-500 to tokens` must not
 * fail a publish (Codex, #668). Line comments keep a `:`/quote guard so
 * protocol `//` inside string URLs survives.
 */
function stripNonRenderedText(content) {
  return content
    .replace(/\/\*[\s\S]*?\*\//g, " ")
    .replace(/(^|[^:"'\\])\/\/[^\n]*/gm, "$1");
}

export function findHardcodeViolations({ brandLiterals, files }) {
  const violations = [];
  const literals = (brandLiterals ?? []).filter(
    (v) => typeof v === "string" && v.trim().length > 3 && v.trim().toLowerCase() !== "advisor name",
  );
  for (const file of files) {
    for (const literal of literals) {
      if (file.content.includes(literal)) {
        violations.push({ path: file.path, reason: `hardcoded brand literal "${literal}"` });
      }
    }
    if (LINK_ARRAY_RE.test(file.content)) {
      violations.push({ path: file.path, reason: "hardcoded nav/link array (read from config instead)" });
    }
  }
  return violations;
}

// Chrome discovery (Codex, #668): the exact template paths PLUS name-based
// matching, so conformed bespoke layouts (components/Header.tsx,
// app/components/site-nav.tsx) are covered once a repo opts into enforcement.
// Sections likewise match any .../sections/ directory, not just the
// template's. CSS files are deliberately NOT scanned: that is where token
// DEFINITIONS legitimately hold hex values.
const CHROME_BASENAME_RE =
  /(?:^|\/)(?:site-)?(?:nav(?:bar|igation)?|header|footer)(?:[-._][\w.-]*)?\.(?:jsx|tsx|js|ts)$/i;
const SECTIONS_DIR_RE = /(?:^|\/)sections\//;

export function isThemeChromePath(normalizedPath) {
  return CHROME_FILES.includes(normalizedPath) || CHROME_BASENAME_RE.test(normalizedPath);
}

/**
 * Contract v3.2 D9: chrome is dual-scheme plumbing and must always use theme
 * tokens. Bespoke sections only carry that restriction on sites whose
 * manifest enables the visitor-facing light/dark toggle.
 */
export function findThemeLiteralViolations({ files, themeMode }) {
  const violations = [];

  for (const file of files) {
    const normalizedPath = file.path.replaceAll("\\", "/");
    const isChrome = isThemeChromePath(normalizedPath);
    const isSection = SECTIONS_DIR_RE.test(normalizedPath);
    if (!isChrome && !(themeMode === "toggle" && isSection)) continue;

    const scanContent = stripNonRenderedText(file.content);

    const neutralUtilities = scanContent.match(RAW_TAILWIND_NEUTRAL_RE);
    if (neutralUtilities?.length) {
      violations.push({
        path: file.path,
        reason: `raw Tailwind neutral color utility "${neutralUtilities[0]}" (use a --wr-* theme token)`,
      });
    }

    const hexColors = scanContent
      .replace(FRAGMENT_HREF_RE, " ")
      .replace(NUMERIC_ENTITY_RE, " ")
      .match(RAW_HEX_COLOR_RE);
    if (hexColors?.length) {
      violations.push({
        path: file.path,
        reason: `raw hex color "${hexColors[0]}" (use a --wr-* theme token)`,
      });
    }
  }

  return violations;
}

// Content-registry ban: blog/page content must live in data/ files, never in
// source modules. blogBodies.tsx-class registries (a giant slug→content record
// in lib/) caused the empty-blog production incident; this makes them
// mechanically unpublishable.
const REGISTRY_SIZE_LIMIT = 64_000; // bytes; largest legit source file ships well under this
const CONTENT_FIELD_RE = /\b(content|body|html)\s*:\s*(`|"|')/g;
const REGISTRY_CONTENT_FIELDS = 8; // this many inline content fields in one module = a registry

export function findRegistryViolations({ files }) {
  const violations = [];
  for (const file of files) {
    if (Buffer.byteLength(file.content, "utf8") > REGISTRY_SIZE_LIMIT) {
      violations.push({
        path: file.path,
        reason: `source module exceeds ${REGISTRY_SIZE_LIMIT / 1000}KB — content registries are banned; content belongs in data/ files`,
      });
      continue;
    }
    const fields = file.content.match(CONTENT_FIELD_RE);
    if (fields && fields.length >= REGISTRY_CONTENT_FIELDS) {
      violations.push({
        path: file.path,
        reason: `looks like a slug→content registry (${fields.length} inline content/body/html fields) — content belongs in data/ files`,
      });
    }
  }
  // NOTE: no blog-slug-page "must reference data/blog" check — bespoke sites
  // legitimately read posts through helper modules (e.g. @/lib/posts) or other
  // content dirs, and the size + inline-content-field heuristics above already
  // catch the blogBodies.tsx-class registries wherever they live.
  return violations;
}

// Source roots vary by framework: Next app-router seeds use src/, but bespoke
// imported sites often keep app/, components/, lib/, pages/ at the repo root.
// Walk whichever exist — never assume a single root (a missing src/ used to
// crash the lint with ENOENT and fail every conformed bespoke site's CI).
const SOURCE_ROOTS = ["src", "app", "components", "lib", "pages"];
const SKIP_DIRS = new Set(["node_modules", ".next", ".git", ".vercel", "dist", "build", "out", "coverage"]);

function listSourceFiles(root) {
  const out = [];
  const walk = (dir) => {
    const abs = path.join(root, dir);
    if (!fs.existsSync(abs)) return;
    for (const entry of fs.readdirSync(abs, { withFileTypes: true })) {
      if (SKIP_DIRS.has(entry.name)) continue;
      const rel = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(rel);
      else if (/\.(ts|tsx|js|jsx|mjs|cjs)$/.test(entry.name) && !/\.test\./.test(entry.name)) out.push(rel);
    }
  };
  for (const r of SOURCE_ROOTS) walk(r);
  return out;
}

function readManifestBrandLiterals(root) {
  const raw = JSON.parse(fs.readFileSync(path.join(root, "data/site-config.json"), "utf8"));
  const out = [];
  if (raw.brand?.legalName) out.push(raw.brand.legalName);
  if (raw.brand?.displayName) out.push(raw.brand.displayName);
  if (raw.firmName) out.push(raw.firmName); // v1 back-compat
  return out;
}

function readManifestThemeMode(root) {
  const raw = JSON.parse(fs.readFileSync(path.join(root, "data/site-config.json"), "utf8"));
  const mode = raw.theme?.mode ?? raw.theme?.color?.mode;
  return mode === "light" || mode === "dark" || mode === "toggle" ? mode : "light";
}

/**
 * Staged enforcement (Devin, #668): this script is synced into every conformed
 * repo and `npm run lint:hardcode` gates BOTH the repo's contract CI and the
 * platform's pre-publish sandbox gate — a hard theme-literal failure on a
 * bespoke site whose chrome was never tokenized would block that client's
 * publishes outright. Same posture as the registry check below: WARN until the
 * site opts in. The template ships the flag on; the conform pass sets it
 * per-site only after the chrome/section tokenization step has been applied.
 */
function readThemeLintEnforce(root) {
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
    return pkg.wealthreach?.themeLintEnforce === true;
  } catch {
    return false;
  }
}

function main() {
  const root = process.cwd();
  const brandLiterals = readManifestBrandLiterals(root);
  const themeMode = readManifestThemeMode(root);
  const files = CHROME_FILES.filter((p) => fs.existsSync(path.join(root, p))).map((p) => ({
    path: p,
    content: fs.readFileSync(path.join(root, p), "utf8"),
  }));
  const sourceFiles = listSourceFiles(root).map((p) => ({
    path: p,
    content: fs.readFileSync(path.join(root, p), "utf8"),
  }));
  const themeFiles = Array.from(
    new Map(
      [
        ...files,
        ...sourceFiles.filter((file) => {
          const p = file.path.replaceAll("\\", "/");
          return isThemeChromePath(p) || SECTIONS_DIR_RE.test(p);
        }),
      ].map((file) => [file.path, file]),
    ).values(),
  );
  // Hardcoded brand/nav in chrome is a hard failure.
  const themeLiteralFindings = findThemeLiteralViolations({ files: themeFiles, themeMode });
  const enforceThemeLint = readThemeLintEnforce(root);
  const violations = [
    ...findHardcodeViolations({ brandLiterals, files }),
    ...(enforceThemeLint ? themeLiteralFindings : []),
  ];
  if (!enforceThemeLint) {
    for (const w of themeLiteralFindings) {
      console.warn(`  [warn] ${w.path}: ${w.reason} (hard once wealthreach.themeLintEnforce is set)`);
    }
  }
  if (violations.length > 0) {
    console.error("Anti-hardcode lint FAILED:");
    for (const v of violations) console.error(`  - ${v.path}: ${v.reason}`);
    process.exit(1);
  }
  // Content-registry findings are WARN-ONLY for now: sites conform before their
  // blog registries are migrated to per-file MDX (a deliberately separate step),
  // so a pre-existing blogBodies.tsx-class file must not fail the fleet's CI yet.
  // Becomes a hard gate once blog migration lands and the check can distinguish
  // a deferred registry from a newly introduced one.
  const registryWarnings = findRegistryViolations({ files: sourceFiles });
  for (const w of registryWarnings) {
    console.warn(`  [warn] ${w.path}: ${w.reason}`);
  }
  console.log("Anti-hardcode lint passed.");
}

// Run as a CLI only (not when imported by tests).
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
