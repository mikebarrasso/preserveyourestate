import fs from "node:fs";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const MANIFEST = path.join(process.cwd(), "data/site-config.json");
const BACKUP = `${MANIFEST}.bak`;
const PORT = Number(process.env.CONFORMANCE_PORT ?? 4399);
// The owner banner phrase (contract 3.5) — asserted present in owner-mode
// renders and ABSENT in reviewer-mode renders of the same page.
const OWNER_BANNER_TEXT = "Draft — not on your live site.";
const SENTINEL = "WR-SENTINEL-7Q9";
const SENTINEL_HOST = `${SENTINEL.toLowerCase()}.example.com`;

function parseScalar(raw) {
  const value = raw.trim();
  if (value.length < 2) return value;
  const quote = value[0];
  if ((quote !== '"' && quote !== "'") || value.at(-1) !== quote) return value;
  if (quote === '"') {
    try {
      return JSON.parse(value);
    } catch {
      return value.slice(1, -1).replaceAll('\\"', '"').replaceAll("\\\\", "\\");
    }
  }
  return value.slice(1, -1).replaceAll("''", "'");
}

function normalizedText(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function decodedHtmlSource(html) {
  return normalizedText(
    String(html ?? "")
      .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
      .replace(/&#(\d+);/g, (_, decimal) => String.fromCodePoint(Number(decimal)))
      .replaceAll("&quot;", '"')
      .replaceAll("&#39;", "'")
      .replaceAll("&amp;", "&")
      .replaceAll("&lt;", "<")
      .replaceAll("&gt;", ">"),
  );
}

function containsBoundedSignal(haystack, signal) {
  const needle = normalizedText(signal);
  if (!needle) return false;
  const escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|[^\\p{L}\\p{N}])${escaped}(?=$|[^\\p{L}\\p{N}])`, "iu")
    .test(haystack);
}

function countBoundedSignal(haystack, signal, caseSensitive = false) {
  const needle = normalizedText(signal);
  if (!needle) return 0;
  const escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const flags = caseSensitive ? "gu" : "giu";
  return [...String(haystack).matchAll(
    new RegExp(`(^|[^\\p{L}\\p{N}])${escaped}(?=$|[^\\p{L}\\p{N}])`, flags),
  )].length;
}

function appearsBeyondBaseline(observed, baseline, signal, caseSensitive = false) {
  return countBoundedSignal(observed, signal, caseSensitive) >
    countBoundedSignal(baseline, signal, caseSensitive);
}

function normalizedSlugSignal(value) {
  return normalizedText(value).replace(/[-_]+/g, " ").toLocaleLowerCase();
}

/**
 * Flight router state contains the requested slug even for a not-found page.
 * Raw-source evidence therefore counts only for a non-slug-like signal;
 * slug-like title/body copy must be present in rendered text beyond the same
 * known-404 baseline.
 */
function publicSignalAppearsBeyondBaseline(observedHtml, baselineHtml, signal, slug) {
  if (appearsBeyondBaseline(renderedText(observedHtml), renderedText(baselineHtml), signal)) {
    return true;
  }
  if (normalizedSlugSignal(signal) === normalizedSlugSignal(slug)) return false;
  return appearsBeyondBaseline(
    decodedHtmlSource(observedHtml),
    decodedHtmlSource(baselineHtml),
    signal,
  );
}

/** Title must render; body prose may also arrive in a streamed Flight payload. */
function draftFixtureEvidenceAppears(html, fixture) {
  const rendered = renderedText(html);
  const raw = decodedHtmlSource(html);
  const titleAppears = !fixture.title || containsBoundedSignal(rendered, fixture.title);
  const bodyAppears = !fixture.bodySentence ||
    containsBoundedSignal(rendered, fixture.bodySentence) ||
    containsBoundedSignal(raw, fixture.bodySentence);
  return titleAppears && bodyAppears;
}

function countExactHtmlText(html, signal) {
  const needle = normalizedText(signal);
  if (!needle) return 0;
  const escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return [...String(html).matchAll(
    new RegExp(`(?:^|>)\\s*${escaped}\\s*(?=<|$)`, "gu"),
  )].length;
}

function exactHtmlTextAppearsBeyondBaseline(observed, baseline, signal) {
  return countExactHtmlText(observed, signal) > countExactHtmlText(baseline, signal);
}

function pathListed(haystack, listedPath) {
  const escaped = listedPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`${escaped}(?=["'<\\s?#/]|$)`).test(haystack);
}

function renderedText(html) {
  return normalizedText(
    html
      .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
      .replace(/&#(\d+);/g, (_, decimal) => String.fromCodePoint(Number(decimal)))
      .replaceAll("&quot;", '"')
      .replaceAll("&#39;", "'")
      .replaceAll("&amp;", "&")
      .replaceAll("&lt;", "<")
      .replaceAll("&gt;", ">"),
  );
}


function firstBodySignal(body) {
  const paragraphs = body.split(/\r?\n\s*\r?\n/);
  for (const paragraph of paragraphs) {
    const lines = paragraph.split(/\r?\n/).map((line) => line.trim());
    if (
      lines.length === 0 ||
      lines.every((line) => !line) ||
      lines.some((line) => /^(?:#|<|>|\||```|~~~|[-*+]\s|\d+\.\s)/.test(line))
    ) {
      continue;
    }
    const rawParagraph = lines.join(" ");
    if (
      /\[\^[^\]]+\]/.test(rawParagraph) ||
      /\\\S/.test(rawParagraph) ||
      /&(?:#\d+|#x[0-9a-f]+|[a-z]+);/i.test(rawParagraph) ||
      /\{[^}]*\}/.test(rawParagraph)
    ) {
      return null;
    }
    const signal = normalizedText(
      lines
        .join(" ")
        .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
        .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
        .replace(/`([^`]*)`/g, "$1")
        .replace(/[*_~]/g, ""),
    );
    if (signal.length >= 24) return signal;
  }
  return null;
}

function blogFiles(directory) {
  if (!fs.existsSync(directory)) return [];
  // The template's blog route is flat (`/blog/[basename]`), so discovery must
  // mirror it. Nested source files are not routable fixtures.
  return fs.readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && /\.(?:mdx|md)$/.test(entry.name))
    .map((entry) => path.join(directory, entry.name));
}

function looksLikeMalformedFrontmatter(source) {
  const probe = source.slice(0, 1024).replace(/^\uFEFF/, "");
  return /^(?:---(?!-)|(?:status|published):)/.test(probe);
}

function discoverNotLivePosts(blogDir = path.join(process.cwd(), "data/blog")) {
  return blogFiles(blogDir).flatMap((filePath) => {
    const source = fs.readFileSync(filePath, "utf8");
    const frontmatter = source.match(/^(?:\uFEFF)?---[ \t]*\r?\n([\s\S]*?)^---[ \t]*\r?(?:\n|$)/m);
    if (!frontmatter || frontmatter.index !== 0) {
      if (!looksLikeMalformedFrontmatter(source)) return [];
      console.warn(
        `Waiting-post sentinel: ${path.basename(filePath)} has malformed frontmatter and will be probed as not-live.`,
      );
      return [{
        slug: path.basename(filePath).replace(/\.(?:mdx|md)$/, ""),
        title: null,
        description: null,
        bodySentence: firstBodySignal(source),
        parseDegraded: true,
      }];
    }
    const fields = new Map();
    for (const line of frontmatter[1].split(/\r?\n/)) {
      if (/^\s/.test(line)) continue;
      const colon = line.indexOf(":");
      if (colon < 1) continue;
      fields.set(line.slice(0, colon).trim(), parseScalar(line.slice(colon + 1)));
    }
    const published = fields.has("published") ? fields.get("published") : null;
    const status = fields.has("status") ? fields.get("status") : null;
    const notLive =
      (published !== null && published !== "true") ||
      (status !== null && status !== "live");
    if (!notLive) return [];
    return [{
      slug: path.basename(filePath).replace(/\.(?:mdx|md)$/, ""),
      title: fields.get("title") ?? null,
      description: fields.get("description") ?? null,
      bodySentence: firstBodySignal(source.slice(frontmatter[0].length)),
      parseDegraded: false,
    }];
  });
}

function withSentinelManifest() {
  // Guard: a leftover .bak means a prior run was killed mid-flight — restore first, don't double-back-up.
  if (fs.existsSync(BACKUP)) {
    throw new Error(`Leftover ${path.basename(BACKUP)} found — a prior run was interrupted. Run: cp "${BACKUP}" "${MANIFEST}" && rm "${BACKUP}", then retry.`);
  }
  const original = fs.readFileSync(MANIFEST, "utf8");
  fs.writeFileSync(BACKUP, original);
  const m = JSON.parse(original);
  m.version = 3;
  m.brand = { ...(m.brand ?? {}), legalName: `${SENTINEL}-LEGAL`, displayName: `${SENTINEL}-NAME`, tagline: `${SENTINEL}-TAG`, logoUrl: m.brand?.logoUrl ?? "" };
  m.header = { ...(m.header ?? {}), nav: [{ label: `${SENTINEL}-HEADERNAV`, href: "/wr-sentinel" }] };
  m.footer = { ...(m.footer ?? {}), groups: [{ heading: `${SENTINEL}-FOOTERGROUP`, links: [{ label: `${SENTINEL}-FOOTERNAV`, href: "/wr-sentinel" }] }] };
  m.seo = { ...(m.seo ?? {}), siteUrl: `https://${SENTINEL_HOST}`, defaultTitle: `${SENTINEL}-NAME`, defaultDescription: `${SENTINEL}-TAG` };
  // v3 chrome: the consent banner and booking embed are chrome and must be manifest-driven.
  m.consent = { enabled: true, message: `${SENTINEL}-CONSENT` };
  m.booking = { provider: "calendly", url: `https://calendly.com/${SENTINEL.toLowerCase()}/intro`, mode: "embed" };
  fs.writeFileSync(MANIFEST, JSON.stringify(m, null, 2));
}

function restoreManifest() {
  if (fs.existsSync(BACKUP)) {
    fs.copyFileSync(BACKUP, MANIFEST);
    fs.rmSync(BACKUP);
  }
}

async function waitForServer(url, timeoutMs) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return true;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  return false;
}

async function main() {
  let server;
  try {
    withSentinelManifest();

    const build = spawnSync("npm", ["run", "build"], { stdio: "inherit" });
    if (build.status !== 0) throw new Error("next build failed under sentinel manifest");

    // detached:true so we can kill the whole process group (next spawns child workers
    // that otherwise outlive a plain server.kill() and keep holding the port).
    // WR_DRAFT_SECRET arms the draft-mode door for the contract-3.5 checks below.
    const DRAFT_SECRET = `${SENTINEL}-DRAFT`;
    server = spawn("npx", ["next", "start", "-p", String(PORT)], {
      stdio: "inherit",
      detached: true,
      env: { ...process.env, WR_DRAFT_SECRET: DRAFT_SECRET },
    });
    const up = await waitForServer(`http://localhost:${PORT}/`, 60_000);
    if (!up) throw new Error("server did not start");

    const html = await (await fetch(`http://localhost:${PORT}/`)).text();
    // Region-scope the checks to the rendered <header>/<footer>. The page BODY also renders
    // brand.displayName + tagline (hero headline/subheadline), so a whole-HTML token check would
    // false-pass even if the navbar/footer hardcoded them. Scoping to the chrome regions proves
    // each surface is genuinely manifest-driven.
    // navbar is the first <header>; the site footer is the last <footer> (each captured tightly,
    // non-greedy, so no body content bleeds into the region).
    const headerHtml = html.match(/<header\b[\s\S]*?<\/header>/i)?.[0];
    const footerMatches = [...html.matchAll(/<footer\b[\s\S]*?<\/footer>/gi)].map((m) => m[0]);
    const footerHtml = footerMatches[footerMatches.length - 1];
    if (!headerHtml) throw new Error("Sentinel render FAILED — no <header> (navbar) in rendered HTML");
    if (!footerHtml) throw new Error("Sentinel render FAILED — no <footer> in rendered HTML");
    const checks = [
      ["navbar brand (displayName)", headerHtml.includes(`${SENTINEL}-NAME`)],
      ["navbar nav (header.nav)", headerHtml.includes(`${SENTINEL}-HEADERNAV`)],
      ["footer brand (displayName)", footerHtml.includes(`${SENTINEL}-NAME`)],
      ["footer tagline", footerHtml.includes(`${SENTINEL}-TAG`)],
      ["footer legal (brand.legalName)", footerHtml.includes(`${SENTINEL}-LEGAL`)],
      ["footer group heading", footerHtml.includes(`${SENTINEL}-FOOTERGROUP`)],
      ["footer group links", footerHtml.includes(`${SENTINEL}-FOOTERNAV`)],
    ];
    const failed = checks.filter(([, ok]) => !ok).map(([name]) => name);
    if (failed.length > 0) {
      throw new Error(`Sentinel render FAILED — these chrome surfaces are not manifest-driven: ${failed.join(", ")}`);
    }

    // v3 chrome slots must be manifest-driven and observable in rendered HTML
    // (gate principle: verify wiring by observation, not code inspection).
    if (!html.includes(`${SENTINEL}-CONSENT`)) {
      throw new Error("Sentinel render FAILED — consent banner not driven by manifest consent.message (consent.enabled=true should render it).");
    }
    if (!html.includes('html:has(#wr-theme-root[data-wr-theme="dark"])')) {
      throw new Error("Sentinel render FAILED — page backdrop (html:has scheme rule) missing; dark mode would leave light strips on short pages.");
    }
    const contactHtml = await (await fetch(`http://localhost:${PORT}/contact`)).text();
    if (!contactHtml.includes(`calendly.com/${SENTINEL.toLowerCase()}/intro`)) {
      throw new Error("Sentinel render FAILED — booking embed on /contact not driven by manifest booking.url.");
    }

    // SEO surfaces must be driven by seo.siteUrl (not a hardcoded/env host).
    const robots = await (await fetch(`http://localhost:${PORT}/robots.txt`)).text();
    const sitemap = await (await fetch(`http://localhost:${PORT}/sitemap.xml`)).text();
    const rss = await (await fetch(`http://localhost:${PORT}/blog/feed.xml`)).text();
    if (!robots.includes(SENTINEL_HOST) || !sitemap.includes(SENTINEL_HOST)) {
      throw new Error(`Sentinel SEO FAILED — robots/sitemap not driven by seo.siteUrl (expected ${SENTINEL_HOST}).`);
    }
    if (!rss.includes(SENTINEL_HOST) || !rss.includes(`${SENTINEL}-NAME`)) {
      throw new Error(`Sentinel SEO FAILED — RSS feed not driven by manifest seo.siteUrl/brand.displayName (expected ${SENTINEL_HOST}).`);
    }

    // Contract 3.5: discover the seeded repo's own non-live posts instead of
    // depending on example filenames advisors are free to delete or publish.
    // The template fixtures cover both legacy `published: false` and status.
    const NOT_LIVE_FIXTURES = discoverNotLivePosts();
    const knownNotFoundRes = await fetch(
      `http://localhost:${PORT}/blog/wr-sentinel-known-missing`,
    );
    const knownNotFoundBody = await knownNotFoundRes.text();
    const notFoundRawBaseline = decodedHtmlSource(knownNotFoundBody);
    if (NOT_LIVE_FIXTURES.length === 0) {
      console.log("Waiting-post sentinel skipped — no not-live posts discovered in data/blog.");
    }
    for (const fixture of NOT_LIVE_FIXTURES) {
      const fixtureUrl = `http://localhost:${PORT}/blog/${fixture.slug}`;
      const fixtureRes = await fetch(fixtureUrl);
      const fixtureBody = await fixtureRes.text();
      const cleanNotFound =
        fixtureRes.status === 404 ||
        (fixtureRes.status === 200 &&
          fixtureBody.includes("Page not found") &&
          fixtureBody.includes("noindex"));
      // Subtract the site's own not-found chrome. A post named "Contact Us"
      // must not look leaked merely because the footer says the same thing.
      const leakedSignals = [
        ...[fixture.title, fixture.description]
          .filter(Boolean)
          .filter((signal) => publicSignalAppearsBeyondBaseline(
            fixtureBody,
            knownNotFoundBody,
            signal,
            fixture.slug,
          )),
        // The body signal is checked against BOTH the tag-stripped rendered
        // text and the full decoded HTML (streamed pages carry content out of
        // line in the flight payload). Raw evidence is ignored when the signal
        // is merely the slug token that every Flight router state contains.
        ...[fixture.bodySentence]
          .filter(Boolean)
          .filter((signal) => publicSignalAppearsBeyondBaseline(
            fixtureBody,
            knownNotFoundBody,
            signal,
            fixture.slug,
          )),
      ];
      if (leakedSignals.length > 0) {
        throw new Error(
          `Waiting-post gate FAILED — ${fixture.slug} leaked public title/description/body content (${leakedSignals.join(" | ")}).`,
        );
      }
      if (!cleanNotFound) {
        throw new Error(
          `Waiting-post gate FAILED — ${fixture.slug} publicly returned ${fixtureRes.status} without a clean not-found body.`,
        );
      }
    }

    if (NOT_LIVE_FIXTURES.length > 0) {
      const blogHtml = await (await fetch(`http://localhost:${PORT}/blog`)).text();
      for (const fixture of NOT_LIVE_FIXTURES) {
        const fixturePath = `/blog/${fixture.slug}`;
        if (
          pathListed(blogHtml, fixturePath) ||
          (fixture.title && exactHtmlTextAppearsBeyondBaseline(
            decodedHtmlSource(blogHtml),
            notFoundRawBaseline,
            fixture.title,
          ))
        ) {
          throw new Error(`Waiting-post gate FAILED — ${fixture.slug} appears in the public blog index.`);
        }
        if (pathListed(sitemap, fixturePath) || pathListed(rss, fixturePath)) {
          throw new Error(`Waiting-post gate FAILED — ${fixture.slug} appears in the sitemap or RSS feed.`);
        }
      }
    }

    // Door invariants do not depend on fixture availability.
    const badSecret = await fetch(
      `http://localhost:${PORT}/api/draft?secret=nope&path=/`,
      { redirect: "manual" },
    );
    if (badSecret.status !== 404) {
      throw new Error(`Draft door FAILED — wrong secret returned ${badSecret.status} (must 404).`);
    }
    const draftTarget = NOT_LIVE_FIXTURES[0]
      ? `/blog/${NOT_LIVE_FIXTURES[0].slug}`
      : "/";
    const enable = await fetch(
      `http://localhost:${PORT}/api/draft?secret=${DRAFT_SECRET}&path=${encodeURIComponent(draftTarget)}`,
      { redirect: "manual" },
    );
    if (![302, 303, 307, 308].includes(enable.status)) {
      throw new Error(`Draft door FAILED — enable returned ${enable.status} (expected a redirect).`);
    }
    const draftCookie = (enable.headers.getSetCookie?.() ?? [])
      .map((c) => c.split(";")[0])
      .join("; ");
    if (!draftCookie) throw new Error("Draft door FAILED — no draft cookie issued.");
    for (const fixture of NOT_LIVE_FIXTURES) {
      const proofSignals = [fixture.title, fixture.bodySentence].filter(Boolean);
      if (proofSignals.length === 0) {
        console.log(
          `Waiting-post draft assertion skipped for ${fixture.slug} — no reliable title or opening prose signal was discovered.`,
        );
        continue;
      }
      const draftRes = await fetch(`http://localhost:${PORT}/blog/${fixture.slug}`, {
        headers: { cookie: draftCookie },
      });
      const cacheControl = draftRes.headers.get("cache-control");
      if (!cacheControl || !/\b(?:no-store|private)\b/i.test(cacheControl)) {
        throw new Error(
          `Waiting-post draft gate FAILED — ${fixture.slug} returned a cacheable draft response (${cacheControl ?? "Cache-Control missing"}); a CDN cache could publish every waiting post.`,
        );
      }
      const draftBody = await draftRes.text();
      if (
        draftRes.status !== 200 ||
        !draftFixtureEvidenceAppears(draftBody, fixture)
      ) {
        throw new Error(
          `Waiting-post gate FAILED — draft mode returned ${draftRes.status} for ${fixture.slug} without its body content.`,
        );
      }
      // Reviewer purity: this door visit carried no audience hint, so the
      // page must be pixel-identical to the public rendering — the owner
      // banner leaking here would also leak into the compliance PDF capture.
      if (draftBody.includes(OWNER_BANNER_TEXT)) {
        throw new Error(
          `Draft audience FAILED — ${fixture.slug} shows the owner banner on a reviewer-mode render; the reviewed page must match the public page exactly.`,
        );
      }
    }

    // Owner leg: entering the door `as=owner` marks the session, and the
    // not-live post page then states its own status.
    if (NOT_LIVE_FIXTURES[0]) {
      const ownerFixture = NOT_LIVE_FIXTURES[0];
      const ownerEnable = await fetch(
        `http://localhost:${PORT}/api/draft?secret=${DRAFT_SECRET}&path=${encodeURIComponent(`/blog/${ownerFixture.slug}`)}&as=owner`,
        { redirect: "manual" },
      );
      const ownerCookie = (ownerEnable.headers.getSetCookie?.() ?? [])
        .map((c) => c.split(";")[0])
        .filter((c) => !/^wr_draft_audience=$/.test(c))
        .join("; ");
      if (!/wr_draft_audience=owner/.test(ownerCookie)) {
        // Capability, not conformance: a site whose door predates the
        // audience hint simply has no owner banner yet (cosmetic only — the
        // hiding contract above already passed). A door that DOES issue the
        // cookie but whose page lacks the banner still fails below.
        console.log(
          "Draft audience skipped — the door predates as=owner; the owner banner arrives with the next door/page sync.",
        );
      } else {
        const ownerRes = await fetch(`http://localhost:${PORT}/blog/${ownerFixture.slug}`, {
          headers: { cookie: ownerCookie },
        });
        const ownerBody = await ownerRes.text();
        if (ownerRes.status !== 200 || !ownerBody.includes(OWNER_BANNER_TEXT)) {
          throw new Error(
            `Draft audience FAILED — owner-mode render of ${ownerFixture.slug} is missing the "${OWNER_BANNER_TEXT}" banner.`,
          );
        }
      }
    }

    console.log(
      NOT_LIVE_FIXTURES.length > 0
        ? "Sentinel render passed — manifest controls chrome + SEO; waiting posts hidden publicly, visible in draft mode."
        : "Sentinel render passed — manifest controls chrome + SEO; no not-live posts were present to test.",
    );
  } finally {
    if (server?.pid) {
      try {
        process.kill(-server.pid, "SIGTERM"); // negative pid = kill the process group
      } catch {
        server.kill("SIGTERM");
      }
    }
    restoreManifest();
  }
}

export {
  appearsBeyondBaseline,
  containsBoundedSignal,
  discoverNotLivePosts,
  draftFixtureEvidenceAppears,
  exactHtmlTextAppearsBeyondBaseline,
  firstBodySignal,
  publicSignalAppearsBeyondBaseline,
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((err) => {
    console.error(err.message);
    process.exitCode = 1;
  });
}
