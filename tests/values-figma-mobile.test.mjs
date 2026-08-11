import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";

const variants = [
  { locale: "EN", directory: "en-page", descriptionSize: 24 },
  { locale: "RO", directory: "ro-page", descriptionSize: 22 },
];

for (const variant of variants) {
  test(`${variant.locale} Values follows the mobile Figma frame`, async () => {
    const [component, css] = await Promise.all([
      readFile(
        new URL(
          `../app/components/${variant.directory}/values/index.tsx`,
          import.meta.url,
        ),
        "utf8",
      ),
      readFile(
        new URL(
          `../app/components/${variant.directory}/values/values.module.css`,
          import.meta.url,
        ),
        "utf8",
      ),
    ]);

    assert.match(css, /^@media screen and \(max-width: 640px\) \{/);
    assert.match(css, /width: 394rem;/);
    assert.match(css, /height: 613rem;/);
    assert.match(css, /top: -109rem;\s+left: -51rem;/);
    assert.match(css, /width: 781rem;/);
    assert.match(css, /height: 722rem;/);
    assert.match(css, /left: 42\.33rem;/);
    assert.match(css, /width: 510\.774rem;/);
    assert.match(css, /height: 722\.505rem;/);
    assert.match(css, /background: rgb\(0 0 0 \/ 50%\);/);
    assert.match(css, /mix-blend-mode: darken;/);
    assert.match(css, /top: 60rem;\s+left: 16rem;/);
    assert.match(css, /font-size: 34rem;/);
    assert.match(css, /font-weight: 600;/);
    assert.match(css, /top: 379rem;\s+left: 19rem;/);
    assert.match(
      css,
      new RegExp(`font-size: ${variant.descriptionSize}rem;`),
    );
    assert.match(css, /line-height: 1\.3;/);

    assert.match(component, /src="\/values-bg-figma\.jpg"/);
    assert.match(component, /width=\{1809\}/);
    assert.match(component, /height=\{2560\}/);
    assert.match(component, /unoptimized/);
    assert.match(component, />\s*OUR VALUES\s*</);
  });
}

test("Values keeps locale-specific Figma line breaks", async () => {
  const [en, ro] = await Promise.all(
    variants.map((variant) =>
      readFile(
        new URL(
          `../app/components/${variant.directory}/values/index.tsx`,
          import.meta.url,
        ),
        "utf8",
      ),
    ),
  );

  assert.match(
    en,
    /A finished building\s*<br \/>[\s\S]*?redrawn\.\s*<br \/>[\s\S]*?live here\s*<br \/>\s*—/,
  );
  assert.match(
    ro,
    /finalizat, nu mai\s*<br \/>[\s\S]*?Gândim totul\s*<br \/>[\s\S]*?început\s*<br \/>\s*—/,
  );
});

test("Values uses the exact high-resolution Figma background", async () => {
  const source = await readFile(
    new URL("../public/values-bg-figma.jpg", import.meta.url),
  );
  const checksum = createHash("sha256").update(source).digest("hex");

  assert.equal(
    checksum,
    "2d4f99da4cc7b58881359b998ab8977fd81efd1b2a78050aa8380547a31f0d3a",
  );
});
