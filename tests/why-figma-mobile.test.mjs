import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const variants = [
  {
    locale: "EN",
    componentPath: new URL(
      "../app/components/en-page/why/index.tsx",
      import.meta.url,
    ),
    cssPath: new URL(
      "../app/components/en-page/why/why.module.css",
      import.meta.url,
    ),
    titleWidth: "343rem",
    awardCenter: "50.376%",
    awardKickerSize: "24rem",
    awardTitleSize: "27.651rem",
    awardTitleTop: "28.936rem",
  },
  {
    locale: "RO",
    componentPath: new URL(
      "../app/components/ro-page/why/index.tsx",
      import.meta.url,
    ),
    cssPath: new URL(
      "../app/components/ro-page/why/why.module.css",
      import.meta.url,
    ),
    titleWidth: "226rem",
    awardCenter: "50.561%",
    awardKickerSize: "20rem",
    awardTitleSize: "33rem",
    awardTitleTop: "23rem",
  },
];

for (const variant of variants) {
  test(`${variant.locale} Why follows the mobile Figma frame`, async () => {
    const [component, css] = await Promise.all([
      readFile(variant.componentPath, "utf8"),
      readFile(variant.cssPath, "utf8"),
    ]);

    assert.match(css, /^@media screen and \(max-width: 640px\) \{/);
    assert.match(css, /width: 394rem;/);
    assert.match(css, /height: 734rem;/);
    assert.match(css, /transform: translateX\(-4rem\);/);
    assert.match(css, new RegExp(`width: ${variant.titleWidth};`));
    assert.match(css, /font-size: 34rem;/);
    assert.match(css, /font-weight: 600;/);
    assert.match(css, /top: 437rem;/);
    assert.match(css, /left: 59\.899rem;/);
    assert.match(css, /width: 271\.015rem;/);
    assert.match(css, /height: 122\.873rem;/);
    assert.match(css, new RegExp(`left: ${variant.awardCenter.replace(".", "\\.")};`));
    assert.match(css, new RegExp(`font-size: ${variant.awardKickerSize.replace(".", "\\.")};`));
    assert.match(css, new RegExp(`font-size: ${variant.awardTitleSize.replace(".", "\\.")};`));
    assert.match(css, new RegExp(`top: ${variant.awardTitleTop.replace(".", "\\.")};`));
    assert.match(css, /top: 597rem;/);
    assert.match(css, /left: 17rem;/);
    assert.match(css, /left: 175rem;/);
    assert.match(css, /left: 302rem;/);
    assert.match(component, /<strong>500k\+<\/strong>/);
    assert.match(component, /src="\/why-mobile-bg\.webp"/);
    assert.match(component, /src="\/why-2024-decor\.png"/);
    assert.equal((component.match(/unoptimized/g) ?? []).length, 2);
  });
}

test("Why keeps locale-specific wrapping and copy", async () => {
  const [en, ro] = await Promise.all(
    variants.map((variant) => readFile(variant.componentPath, "utf8")),
  );

  assert.match(en, /NUMBERS YOU CAN\s*<br \/>\s*BUILD ON/);
  assert.match(en, /SALES LEADER/);
  assert.match(en, /countries\s*<br \/>\s*active/);

  assert.match(ro, /EXPERIENȚA,\s*<br \/>\s*ÎN CIFRE/);
  assert.match(ro, /LIDER ÎN VÂNZĂRI/);
  assert.match(ro, /țări în care\s*<br \/>\s*activăm/);
});
