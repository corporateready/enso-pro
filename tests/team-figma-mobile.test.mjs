import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const variants = [
  {
    locale: "EN",
    directory: "en-page",
    titleWidth: 181,
    introTop: 51,
    secondaryTop: 127,
    paginationTop: 187,
    viewportTop: 205,
  },
  {
    locale: "RO",
    directory: "ro-page",
    titleWidth: 299,
    introTop: 50,
    secondaryTop: 125,
    paginationTop: 202,
    viewportTop: 220,
  },
];

for (const variant of variants) {
  test(`${variant.locale} Team follows the mobile Figma frame`, async () => {
    const [component, css] = await Promise.all([
      readFile(
        new URL(
          `../app/components/${variant.directory}/team/index.tsx`,
          import.meta.url,
        ),
        "utf8",
      ),
      readFile(
        new URL(
          `../app/components/${variant.directory}/team/team.module.css`,
          import.meta.url,
        ),
        "utf8",
      ),
    ]);

    assert.match(css, /^@media screen and \(max-width: 640px\) \{/);
    assert.match(css, /width: 390rem;/);
    assert.match(css, /height: 545rem;/);
    assert.match(css, /margin-top: 60rem;/);
    assert.match(
      css,
      new RegExp(`top: 0;\\s+left: 17rem;\\s+width: ${variant.titleWidth}rem;`),
    );
    assert.match(css, /font-size: 34rem;/);
    assert.match(css, /font-weight: 600;/);
    assert.match(css, new RegExp(`top: ${variant.introTop}rem;`));
    assert.match(css, new RegExp(`top: ${variant.secondaryTop}rem;`));
    assert.match(
      css,
      new RegExp(`top: ${variant.paginationTop}rem;\\s+left: 181rem;`),
    );
    assert.match(
      css,
      new RegExp(`top: ${variant.viewportTop}rem;\\s+left: 0;`),
    );
    assert.match(css, /height: 333rem;/);
    assert.match(css, /width: 780rem;/);
    assert.match(css, /top: 18rem;\s+left: 17rem;/);
    assert.match(css, /top: 123rem;\s+left: 19rem;/);
    assert.match(css, /top: 231rem;\s+left: 17rem;/);
    assert.match(css, /top: 136rem;\s+left: 16rem;/);
    assert.match(css, /width: 81rem;\s+height: 81rem;/);
    assert.match(css, /font-size: 12rem;/);
    assert.match(css, /line-height: 14rem;/);

    for (const avatar of [2, 3, 4, 5]) {
      assert.match(component, new RegExp(`/team-avatar-${avatar}\\.png`));
    }
    assert.match(component, /unoptimized/);
    assert.match(component, /left: viewport\.clientWidth \* index/);
    assert.match(component, /onScroll=\{updateActiveSlide\}/);
    assert.match(component, /aria-current=\{activeSlide === index/);
  });
}

test("Team keeps the Figma line breaks in both locales", async () => {
  const [en, ro] = await Promise.all(
    variants.map((variant) =>
      readFile(
        new URL(
          `../app/components/${variant.directory}/team/index.tsx`,
          import.meta.url,
        ),
        "utf8",
      ),
    ),
  );

  assert.match(
    en,
    /journey in-house —\s*<br \/>[\s\S]*?sales, asset\s*<br \/>[\s\S]*?responsibility\s*<br \/>/,
  );
  assert.match(
    ro,
    /parcurs in-house —\s*<br \/>[\s\S]*?vânzări,\s*<br \/>[\s\S]*?standard,\s*<br \/>[\s\S]*?schiță\s*<br \/>/,
  );
});
