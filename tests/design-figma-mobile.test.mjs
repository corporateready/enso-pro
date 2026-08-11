import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";

const variants = [
  {
    locale: "EN",
    directory: "en-page",
    imageTop: 187,
    imageLeft: 16,
    imageWidth: 359,
    imageHeight: 216,
    tabsWidth: 225,
  },
  {
    locale: "RO",
    directory: "ro-page",
    imageTop: 208,
    imageLeft: 27,
    imageWidth: 337,
    imageHeight: 203,
    tabsWidth: 289,
  },
];

for (const variant of variants) {
  test(`${variant.locale} Design follows the mobile Figma frame`, async () => {
    const [component, css] = await Promise.all([
      readFile(
        new URL(
          `../app/components/${variant.directory}/design/index.tsx`,
          import.meta.url,
        ),
        "utf8",
      ),
      readFile(
        new URL(
          `../app/components/${variant.directory}/design/design.module.css`,
          import.meta.url,
        ),
        "utf8",
      ),
    ]);

    assert.match(css, /^@media screen and \(max-width: 640px\) \{/);
    assert.match(css, /width: 390rem;/);
    assert.match(css, /height: 1037rem;/);
    assert.match(css, /margin-top: 60rem;/);
    assert.match(css, /top: 0;\s+left: 17rem;\s+width: 346rem;/);
    assert.match(css, /font-size: 34rem;/);
    assert.match(css, /font-weight: 600;/);
    assert.match(css, /top: 94rem;\s+left: 16rem;\s+width: 359rem;/);
    assert.match(
      css,
      new RegExp(
        `top: ${variant.imageTop}rem;\\s+left: ${variant.imageLeft}rem;\\s+width: ${variant.imageWidth}rem;\\s+height: ${variant.imageHeight}rem;`,
      ),
    );
    assert.match(css, new RegExp(`width: ${variant.tabsWidth}rem;`));
    assert.match(css, /top: 476rem;/);
    assert.match(css, /width: 358rem;/);
    assert.match(css, /height: 157rem;/);
    assert.match(css, /gap: 15rem;/);
    assert.match(css, /\.card h3 \{[\s\S]*?font-weight: 600;/);
    assert.match(css, /data-active-tab="buyers"/);

    assert.match(component, /src="\/bim-design\.png"/);
    assert.match(component, /width=\{1000\}/);
    assert.match(component, /height=\{560\}/);
    assert.match(component, /unoptimized/);
    assert.match(component, /data-active-tab=\{activeTab\}/);
    assert.match(component, /aria-selected=\{activeTab === tab\.id\}/);
  });
}

test("Design keeps the Figma line breaks in both locales", async () => {
  const [en, ro] = await Promise.all(
    variants.map((variant) =>
      readFile(
        new URL(
          `../app/components/${variant.directory}/design/index.tsx`,
          import.meta.url,
        ),
        "utf8",
      ),
    ),
  );

  assert.match(
    en,
    /where\s*<br \/>\s*problems surface[\s\S]*?in 3D\s*<br \/>[\s\S]*?standard —\s*<br \/>/,
  );
  assert.match(
    ro,
    /proiectate\s*<br \/>\s*în 2D[\s\S]*?proiect ENSO\s*<br \/>[\s\S]*?internațional —\s*<br \/>/,
  );
});

test("Design uses the exact exported Figma BIM image", async () => {
  const source = await readFile(
    new URL("../public/bim-design.png", import.meta.url),
  );
  const checksum = createHash("sha256").update(source).digest("hex");

  assert.equal(
    checksum,
    "aa2a8af96fe5832ff4ba4c6552acd9e3dc900c9cce909927a4089738d7625539",
  );
});
