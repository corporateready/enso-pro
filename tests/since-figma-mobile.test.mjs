import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const locales = [
  { name: "EN", directory: "en-page", height: 490 },
  { name: "RO", directory: "ro-page", height: 550 },
];

for (const locale of locales) {
  test(`${locale.name} Since follows the mobile Figma geometry`, async () => {
    const css = await readFile(
      new URL(
        `../app/components/${locale.directory}/since/since.module.css`,
        import.meta.url,
      ),
      "utf8",
    );
    const component = await readFile(
      new URL(
        `../app/components/${locale.directory}/since/index.tsx`,
        import.meta.url,
      ),
      "utf8",
    );

    assert.match(css, /^@media screen and \(max-width: 640px\) \{/);
    assert.match(css, new RegExp(`height: ${locale.height}rem;`));
    assert.match(css, /font-size: 34rem;/);
    assert.match(css, /font-weight: 600;/);
    assert.match(css, /--timeline-line-position: 145rem;/);
    assert.match(css, /scroll-padding-left: 19rem;/);
    assert.match(component, /year: "2019"/);
    assert.match(component, /src="\/since-arrow\.svg"/);
  });
}

test("Since keeps the Figma milestone order in both locales", async () => {
  for (const directory of ["en-page", "ro-page"]) {
    const source = await readFile(
      new URL(
        `../app/components/${directory}/since/index.tsx`,
        import.meta.url,
      ),
      "utf8",
    );
    const years = [...source.matchAll(/year: "(\d{4})"/g)].map(
      ([, year]) => year,
    );

    assert.deepEqual(years, ["2026", "2025", "2024", "2023", "2019", "1999"]);
  }
});

test("RO Since no longer contains the old English milestone copy", async () => {
  const source = await readFile(
    new URL("../app/components/ro-page/since/index.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /Am semnat contracte pentru peste/);
  assert.match(source, /Activăm în investiții imobiliare/);
  assert.doesNotMatch(source, /Signed contracts for|Our journey as real-estate/);
});

test("Since uses the exact exported Figma arrow asset", async () => {
  const source = await readFile(
    new URL("../public/since-arrow.svg", import.meta.url),
    "utf8",
  );

  assert.match(source, /viewBox="0 0 65 57"/);
  assert.match(source, /Vector 61/);
  assert.match(source, /Vector 62/);
});
