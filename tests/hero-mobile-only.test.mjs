import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const cssFiles = [
  "../app/components/ro-page/hero/carousel/carousel.module.css",
  "../app/components/en-page/hero/carousel/carousel.module.css",
  "../app/components/ro-page/hero/mobile-menu.module.css",
  "../app/components/en-page/hero/mobile-menu.module.css",
  "../app/components/ro-page/hero/account-modal.module.css",
  "../app/components/ro-page/hero/offer-modal.module.css",
  "../app/components/en-page/hero/offer-modal.module.css",
];

for (const relativePath of cssFiles) {
  test(`${relativePath} is scoped to the mobile breakpoint`, async () => {
    const source = await readFile(new URL(relativePath, import.meta.url), "utf8");

    assert.match(source, /^@media screen and \(max-width: 640px\) \{/);
  });
}

for (const locale of ["ro-page", "en-page"]) {
  test(`${locale} Hero uses the optimized mobile slide images`, async () => {
    const source = await readFile(
      new URL(
        `../app/components/${locale}/hero/index.tsx`,
        import.meta.url,
      ),
      "utf8",
    );

    assert.match(source, /src: "\/hero-build-first\.webp"/);
    assert.match(source, /src: "\/hero-slide-2\.webp"/);
    assert.match(source, /src: "\/hero-slide-3\.webp"/);
  });
}

test("the desktop rem scale starts above the mobile breakpoint", async () => {
  const source = await readFile(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );

  assert.match(source, /@media screen and \(min-width: 641px\)/);
});

test("the offer form inputs keep a borderless focus state", async () => {
  const source = await readFile(
    new URL(
      "../app/components/ro-page/hero/offer-modal.module.css",
      import.meta.url,
    ),
    "utf8",
  );

  assert.match(
    source,
    /\.input:focus,\s*\.phoneInput:focus\s*\{\s*border: 0;\s*outline: none;\s*box-shadow: none;/,
  );
});
