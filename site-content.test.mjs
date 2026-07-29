import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join } from "node:path";
import test from "node:test";

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
  assert.match(home, /central point of coordination/);
  assert.match(home, /does not draft legal\s+documents or prepare tax returns/);
  assert.match(home, /qualified independent\s+professionals when needed/);
});

test("uses local official profile and MSA brand assets", () => {
  const home = readFileSync(join(ROOT, "app/page.tsx"), "utf8");
  const lockup = readFileSync(join(ROOT, "components/MsaLockup.tsx"), "utf8");

  assert.equal(existsSync(join(ROOT, "public/michael-cammarata.jpg")), true);
  assert.equal(existsSync(join(ROOT, "public/msa-financial-logo.png")), true);
  assert.match(home, /michael-cammarata\.jpg/);
  assert.match(lockup, /msa-financial-logo\.png/);
  assert.match(lockup, /https:\/\/www\.msaplan\.com/);
});
