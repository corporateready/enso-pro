import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";

const variants = [
  {
    locale: "EN",
    directory: "en-page",
    backgroundTop: 117,
    firstTop: 263,
    firstWidth: 154,
    secondLeft: 165,
    secondWidth: 213,
    thirdWidth: 248,
  },
  {
    locale: "RO",
    directory: "ro-page",
    backgroundTop: 118,
    firstTop: 262,
    firstWidth: 162,
    secondLeft: 86,
    secondWidth: 292,
    thirdWidth: 296,
  },
];

for (const variant of variants) {
  test(`${variant.locale} My ENSO follows the mobile Figma frame`, async () => {
    const [component, css] = await Promise.all([
      readFile(
        new URL(
          `../app/components/${variant.directory}/enso/index.tsx`,
          import.meta.url,
        ),
        "utf8",
      ),
      readFile(
        new URL(
          `../app/components/${variant.directory}/enso/enso.module.css`,
          import.meta.url,
        ),
        "utf8",
      ),
    ]);

    assert.match(css, /^@media screen and \(max-width: 640px\) \{/);
    assert.match(css, /left: -4rem;\s+width: 394rem;\s+height: 766rem;/);
    assert.match(css, /flex: 0 0 766rem;/);
    assert.match(css, /margin-top: 10rem;/);
    assert.match(
      css,
      new RegExp(
        `top: ${variant.backgroundTop}rem;\\s+left: 0;[\\s\\S]*?width: 394rem;\\s+height: 648rem;`,
      ),
    );
    assert.match(css, /top: 60rem;\s+left: 16rem;/);
    assert.match(css, /font-size: 34rem;/);
    assert.match(css, /font-weight: 600;/);
    assert.match(css, /top: 111rem;\s+left: 16rem;/);
    assert.match(css, /line-height: 1\.2;/);
    assert.match(
      css,
      new RegExp(
        `top: ${variant.firstTop}rem;\\s+left: 21rem;\\s+width: ${variant.firstWidth}rem;`,
      ),
    );
    assert.match(
      css,
      new RegExp(
        `top: 346rem;\\s+left: ${variant.secondLeft}rem;\\s+width: ${variant.secondWidth}rem;`,
      ),
    );
    assert.match(
      css,
      new RegExp(
        `top: 429rem;\\s+left: 21rem;\\s+width: ${variant.thirdWidth}rem;`,
      ),
    );
    assert.match(
      css,
      /top: 512rem;\s+left: 153rem;\s+width: 225rem;/,
    );
    assert.match(css, /gap: 9rem;\s+padding-left: 9rem;/);
    assert.match(
      css,
      /top: 656rem;\s+left: 18rem;[\s\S]*?width: 358rem;\s+height: 50rem;/,
    );

    assert.match(component, /src="\/enso-mobile-bg\.webp"/);
    assert.match(component, />\s*MY ENSO\s*</);
    assert.match(component, /<br \/>/);
    assert.match(component, /className=\{styles\.accountLink\}/);
    assert.match(component, /"use client";/);
    assert.match(component, /import \{ usePathname \} from "next\/navigation";/);
    assert.match(component, /new IntersectionObserver/);
    assert.match(component, /setAnimatedPathname\(pathname\)/);
    assert.match(component, /\}, \[pathname\]\);/);
    assert.match(component, /observer\.unobserve\(section\)/);
    assert.match(component, /window\.addEventListener\("scroll", waitForRouteScrollEnd/);
    assert.match(component, /window\.setTimeout\(startObserving, 150\)/);
    assert.match(css, /\.featuresVisible \.feature\s*\{[\s\S]*?animation: feature-enter 700ms/);
    assert.match(css, /\.featuresVisible \.featureOne\s*\{\s*animation-delay: 1000ms;/);
    assert.match(css, /\.featuresVisible \.featureTwo\s*\{\s*animation-delay: 1300ms;/);
    assert.match(css, /\.featuresVisible \.featureThree\s*\{\s*animation-delay: 1600ms;/);
    assert.match(css, /\.featuresVisible \.featureFour\s*\{\s*animation-delay: 1900ms;/);
  });
}

test("My ENSO uses the supplied icon assets with explicit rem dimensions", async () => {
  const iconComponent = await readFile(
    new URL("../app/components/enso-feature-icon.tsx", import.meta.url),
    "utf8",
  );

  for (const icon of [
    "cost-icon.svg",
    "diagram-icon.svg",
    "chat-icon.svg",
    "machine-icon.svg",
  ]) {
    assert.match(iconComponent, new RegExp(`/${icon.replace(".", "\\.")}`));
  }

  assert.match(iconComponent, /width: `\$\{icon\.width\}rem`/);
  assert.match(iconComponent, /height: `\$\{icon\.height\}rem`/);
});

test("My ENSO keeps the exact optimized background export", async () => {
  const source = await readFile(
    new URL("../public/enso-mobile-bg.webp", import.meta.url),
  );
  const checksum = createHash("sha256").update(source).digest("hex");

  assert.equal(
    checksum,
    "f85c1f2f5dd2038484ede55af7a23ef987daa5c5b1c7b67483ca6a12672076f3",
  );
});
