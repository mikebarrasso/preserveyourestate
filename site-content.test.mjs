import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join } from "node:path";
import test from "node:test";

function jpegDimensions(path) {
  const data = readFileSync(path);
  let offset = 2;

  while (offset < data.length) {
    if (data[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    const marker = data[offset + 1];
    if (marker === 0xc0 || marker === 0xc2) {
      return {
        height: data.readUInt16BE(offset + 5),
        width: data.readUInt16BE(offset + 7),
      };
    }

    const length = data.readUInt16BE(offset + 2);
    offset += 2 + length;
  }

  throw new Error(`Could not read JPEG dimensions from ${path}`);
}

const ROOT = new URL(".", import.meta.url).pathname;
const SOURCE_ROOTS = ["app", "components", "public"];
const TEXT_EXTENSIONS = new Set([".css", ".md", ".tsx", ".txt"]);

function walk(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

function sourceText() {
  const files = SOURCE_ROOTS.flatMap((directory) => walk(join(ROOT, directory))).filter((file) =>
    TEXT_EXTENSIONS.has(extname(file)),
  );
  files.push(join(ROOT, "package.json"), join(ROOT, "package-lock.json"));
  return files.map((file) => readFileSync(file, "utf8")).join("\n");
}

test("uses PreserveMyEstate.com everywhere", () => {
  const content = sourceText();

  assert.match(content, /https:\/\/preservemyestate\.com/);
  assert.match(content, /PreserveMyEstate\.com/);
  assert.doesNotMatch(content, /preserveyourestate/i);
});

test("publishes the Braintree receptionist number for every office", () => {
  const home = readFileSync(join(ROOT, "app/page.tsx"), "utf8");

  assert.match(home, /const MAIN_OFFICE_PHONE = "\(\s*781\s*\) 843-3500"/);
  assert.match(home, /tel:\+17818433500/);
  assert.match(home, /Braintree/);
  assert.match(home, /Sandwich/);
  assert.match(home, /Framingham/);
});

test("includes Michael's complete positioning and professional boundaries", () => {
  const home = readFileSync(join(ROOT, "app/page.tsx"), "utf8");

  assert.match(home, /Managing Partner and Owner/);
  assert.match(home, /For more than two decades/);
  assert.match(home, /Preserve My Estate reflects an important part of Michael(?:’|&apos;)s practice/);
  assert.match(home, /central point of\s+coordination/);
  assert.match(home, /does not draft legal\s+documents or prepare tax returns/);
  assert.match(home, /qualified independent\s+professionals when needed/);
});

test("uses local official profile and MSA brand assets", () => {
  const home = readFileSync(join(ROOT, "app/page.tsx"), "utf8");
  const lockup = readFileSync(join(ROOT, "components/MsaLockup.tsx"), "utf8");

  assert.equal(existsSync(join(ROOT, "public/michael-cammarata.jpg")), true);
  assert.equal(existsSync(join(ROOT, "public/msa-financial-logo.png")), true);
  assert.match(home, /michael-cammarata\.jpg/);
  assert.match(home, /width=\{380\}/);
  assert.match(home, /quality=\{95\}/);
  assert.match(lockup, /msa-financial-logo\.png/);
  assert.match(lockup, /https:\/\/www\.msaplan\.com/);

  const headshot = jpegDimensions(join(ROOT, "public/michael-cammarata.jpg"));
  assert.ok(headshot.width >= 380, `headshot width ${headshot.width}px is below retina minimum`);
  assert.ok(headshot.height >= 380, `headshot height ${headshot.height}px is below retina minimum`);
});

test("advertises only real routes through complete crawler metadata", () => {
  const sitemapPath = join(ROOT, "app/sitemap.ts");
  const llms = readFileSync(join(ROOT, "public/llms.txt"), "utf8");
  const calculator = readFileSync(join(ROOT, "app/calculator/page.tsx"), "utf8");
  const guide = readFileSync(join(ROOT, "app/guides/ab-trust/page.tsx"), "utf8");

  assert.equal(existsSync(sitemapPath), true);
  const sitemap = readFileSync(sitemapPath, "utf8");
  assert.match(sitemap, /const BASE_URL = "https:\/\/preservemyestate\.com"/);
  assert.match(sitemap, /\$\{BASE_URL\}\/calculator/);
  assert.match(sitemap, /\$\{BASE_URL\}\/guides\/ab-trust/);
  assert.doesNotMatch(llms, /guides\/(?:trust-funding|roth-conversion)/);
  assert.match(calculator, /siteName: "Preserve My Estate"/);
  assert.match(guide, /siteName: "Preserve My Estate"/);
});

test("states the attorney and CPA boundary in normal and compact content", () => {
  const home = readFileSync(join(ROOT, "app/page.tsx"), "utf8");
  const footer = readFileSync(join(ROOT, "components/Footer.tsx"), "utf8");
  const compactFooter = footer.slice(
    footer.indexOf("if (compact)"),
    footer.indexOf("\n\n  return ("),
  );

  assert.match(home, /not an estate attorney or CPA/);
  assert.match(compactFooter, /does not provide legal or tax advice/);
  assert.match(compactFooter, /does not draft legal documents or prepare\s+tax returns/);
  assert.match(compactFooter, /existing estate attorneys and CPAs/);
  assert.match(compactFooter, /identify qualified independent professionals/);
});
