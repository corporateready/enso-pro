import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const locales = [
  {
    name: "EN",
    directory: "en-page",
    height: 732,
    featuredMargin: "14rem",
    contentLeft: 16,
    buttonLeft: 19,
  },
  {
    name: "RO",
    directory: "ro-page",
    height: 789,
    featuredMargin: "0",
    contentLeft: 15,
    buttonLeft: 18,
  },
];

for (const locale of locales) {
  test(`${locale.name} Payway follows the mobile Figma frame`, async () => {
    const css = await readFile(
      new URL(
        `../app/components/${locale.directory}/payway/payway.module.css`,
        import.meta.url,
      ),
      "utf8",
    );
    const component = await readFile(
      new URL(
        `../app/components/${locale.directory}/payway/index.tsx`,
        import.meta.url,
      ),
      "utf8",
    );

    assert.match(css, /^@media screen and \(max-width: 640px\) \{/);
    assert.match(css, new RegExp(`height: ${locale.height}rem;`));
    assert.match(css, /width: 394rem;/);
    assert.match(css, /width: 364rem;/);
    assert.match(css, /height: 190rem;/);
    assert.match(css, /width: 358rem;/);
    assert.match(css, /font-size: 34rem;/);
    assert.match(css, /font-weight: 600;/);
    assert.match(
      css,
      new RegExp(
        `margin: ${locale.featuredMargin} 0 0 ${locale.contentLeft}rem;`,
      ),
    );
    assert.match(
      css,
      new RegExp(`margin: 15rem 0 0 ${locale.buttonLeft}rem;`),
    );
    assert.match(component, /src="\/pay your way\.png"/);
    assert.match(component, /width=\{394\}/);
    assert.match(component, /height=\{732\}/);
    assert.match(component, /unoptimized/);
  });
}

test("Payway keeps locale-specific title wrapping and calls to action", async () => {
  const en = await readFile(
    new URL("../app/components/en-page/payway/index.tsx", import.meta.url),
    "utf8",
  );
  const ro = await readFile(
    new URL("../app/components/ro-page/payway/index.tsx", import.meta.url),
    "utf8",
  );

  assert.match(en, /PAY YOUR WAY/);
  assert.match(en, /Request a custom schedule/);
  assert.match(ro, /PLĂTEȘTI CUM\s*<br \/>\s*ÎȚI CONVINE/);
  assert.match(ro, /Calculează-ți ratele/);
});
