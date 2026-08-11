import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const heroFiles = [
  "../app/components/ro-page/hero/index.tsx",
  "../app/components/en-page/hero/index.tsx",
];

for (const heroFile of heroFiles) {
  test(`${heroFile} keeps sticky transitions on animatable values`, async () => {
    const source = await readFile(new URL(heroFile, import.meta.url), "utf8");

    assert.match(source, /className={`fixed top-0 left-0/);
    assert.match(source, /h-\[69rem\]/);
    assert.match(source, /h-\[64rem\]/);
    assert.doesNotMatch(source, /\? "fixed h-\[64rem\]/);
    assert.doesNotMatch(source, /: "absolute pt-/);
    assert.match(source, /window\.scrollY > 8/);
  });
}
