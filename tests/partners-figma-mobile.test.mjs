import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";

const variants = [
  { locale: "EN", directory: "en-page", subtitleWidth: 340 },
  { locale: "RO", directory: "ro-page", subtitleWidth: 350 },
];

for (const variant of variants) {
  test(`${variant.locale} Partners follows the mobile Figma frame`, async () => {
    const [component, css] = await Promise.all([
      readFile(
        new URL(
          `../app/components/${variant.directory}/partners/index.tsx`,
          import.meta.url,
        ),
        "utf8",
      ),
      readFile(
        new URL(
          `../app/components/${variant.directory}/partners/partners.module.css`,
          import.meta.url,
        ),
        "utf8",
      ),
    ]);

    assert.match(css, /^@media screen and \(max-width: 640px\) \{/);
    assert.match(css, /width: 390rem;\s+height: 396rem;/);
    assert.match(css, /flex: 0 0 396rem;/);
    assert.match(css, /padding-top: 60rem;/);
    assert.match(css, /height: 90rem;\s+padding: 0 15rem;/);
    assert.match(css, /font-size: 36rem;/);
    assert.match(css, /font-weight: 600;/);
    assert.match(
      css,
      new RegExp(`\\.subtitle \\{[\\s\\S]*?width: ${variant.subtitleWidth}rem;`),
    );
    assert.match(css, /width: 390rem;\s+height: 246rem;/);
    assert.match(css, /padding: 29rem 0 51rem 40rem;/);
    assert.match(css, /width: 279rem;\s+height: 166rem;/);
    assert.match(css, /gap: 25rem;\s+padding-right: 25rem;/);
    assert.match(css, /box-shadow: 0 0 30rem 0 #36629b;/);
    assert.match(css, /animation: partners-marquee 30s linear infinite;/);

    assert.match(component, /<PartnerCards \/>/);
    assert.match(component, /<PartnerCards duplicate \/>/);
    assert.match(component, /unoptimized/);
    assert.doesNotMatch(component, /onPointer|onTouch|onMouse|onClick/);
    assert.doesNotMatch(css, /animation-play-state:\s*paused/);
  });
}

test("Partners preserves all supplied logo exports", async () => {
  const expected = new Map([
    ["abureau.png", "ee25b4d6a0a6d113b4ce2a420891938c54c8eade1772a7afb5efee319bd979f0"],
    ["acla.png", "2adf677e6111a427ce04ac41be4b9b1aaf0237bd187b6ea07ca9fd9121cee93d"],
    ["arch 2.png", "cf6eafe3c1cf91dfa33d5c3499215d999d1094cef977fc79beed4199ce843d96"],
    ["eic.png", "ca00ff0369b1b48bd3711d6d272feb6fe2895534e8b048dc9e6f3bc89bc7d96c"],
    ["inamstro.png", "bc1f076199e61179b789fcca58949fc25dd81121f2d1885a7fe9749897df0b04"],
  ]);

  for (const [file, expectedChecksum] of expected) {
    const source = await readFile(new URL(`../public/${file}`, import.meta.url));
    const checksum = createHash("sha256").update(source).digest("hex");
    assert.equal(checksum, expectedChecksum, `${file} changed unexpectedly`);
  }
});
