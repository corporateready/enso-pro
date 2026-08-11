import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const iconAssets = [
  { name: "tiktok", src: "/tic-toc.svg", width: 14, height: 16 },
  { name: "x", src: "/x.svg", width: 15, height: 14 },
  { name: "instagram", src: "/insta.svg", width: 15, height: 15 },
  { name: "facebook", src: "/facebook.svg", width: 10, height: 19 },
  { name: "youtube", src: "/youtube.svg", width: 20, height: 14 },
  { name: "linkedin", src: "/linkedin.svg", width: 16, height: 16 },
];

test("social icons render the shipped assets at their Figma sizes", async () => {
  const component = await readFile(
    new URL("../app/components/social-icon.tsx", import.meta.url),
    "utf8",
  );

  for (const icon of iconAssets) {
    assert.match(
      component,
      new RegExp(
        `${icon.name}: \\{\\s+src: "${icon.src}",\\s+width: ${icon.width},\\s+height: ${icon.height},`,
      ),
      `${icon.name} must point at ${icon.src} at ${icon.width}x${icon.height}`,
    );
  }

  assert.match(component, /width: `\$\{icon\.width\}rem`/);
  assert.match(component, /height: `\$\{icon\.height\}rem`/);
});

for (const directory of ["en-page", "ro-page"]) {
  test(`${directory} footer wires every social link to a shipped asset`, async () => {
    const [component, css] = await Promise.all([
      readFile(
        new URL(
          `../app/components/${directory}/footer/index.tsx`,
          import.meta.url,
        ),
        "utf8",
      ),
      readFile(
        new URL(
          `../app/components/${directory}/footer/footer.module.css`,
          import.meta.url,
        ),
        "utf8",
      ),
    ]);

    assert.match(component, /import SocialIcon, \{ type SocialIconName \}/);
    assert.doesNotMatch(component, /<svg[\s\S]*viewBox="0 0 14 16"/);

    for (const icon of iconAssets) {
      assert.match(component, new RegExp(`icon: "${icon.name}"`));
    }

    // Two rows: TikTok + X above Instagram, Facebook, YouTube, LinkedIn.
    assert.match(css, /grid-template-columns: repeat\(4, 32rem\);/);
    assert.match(css, /grid-template-rows: repeat\(2, 32rem\);/);
    assert.match(css, /\.tiktok \{\s+grid-area: 1 \/ 1;/);
    assert.match(css, /\.x \{\s+grid-area: 1 \/ 2;/);
    assert.match(css, /\.linkedin \{\s+grid-area: 2 \/ 4;/);

    // Assets are white-filled, so the filled hover state recolors them.
    assert.match(css, /\.socialLink:hover \.socialIcon \{\s+filter: invert\(49%\);/);
  });
}

for (const icon of iconAssets) {
  test(`${icon.src} exists and is white-filled`, async () => {
    const svg = await readFile(
      new URL(`../public${icon.src}`, import.meta.url),
      "utf8",
    );

    assert.match(svg, /fill="white"/);
    assert.match(
      svg,
      new RegExp(`viewBox="0 0 [\\d.]+ [\\d.]+"`),
      `${icon.src} needs a viewBox so it scales with rem sizing`,
    );
  });
}

const footerAssets = [
  { src: "/enso-footer.svg", width: 24, height: 30 },
  { src: "/to-top-arrow.svg", width: 9, height: 17 },
];

for (const directory of ["en-page", "ro-page"]) {
  test(`${directory} footer uses the shipped logo and back-to-top arrow`, async () => {
    const [component, css] = await Promise.all([
      readFile(
        new URL(
          `../app/components/${directory}/footer/index.tsx`,
          import.meta.url,
        ),
        "utf8",
      ),
      readFile(
        new URL(
          `../app/components/${directory}/footer/footer.module.css`,
          import.meta.url,
        ),
        "utf8",
      ),
    ]);

    for (const asset of footerAssets) {
      assert.match(
        component,
        new RegExp(
          `src="${asset.src}"\\s+width=\\{${asset.width}\\}\\s+height=\\{${asset.height}\\}`,
        ),
        `${asset.src} must render at ${asset.width}x${asset.height}`,
      );
    }

    // The logo asset carries the mark plus the ENSO / DEVELOPMENT wordmark.
    assert.doesNotMatch(component, /<small>DEVELOPMENT<\/small>/);
    assert.match(css, /\.brand \{[\s\S]*?width: 24rem;\s+height: 30rem;/);
    assert.match(css, /\.backToTopIcon \{[\s\S]*?width: 9rem;\s+height: 17rem;/);
    assert.match(css, /\.backToTop:hover \.backToTopIcon \{\s+filter: invert\(49%\);/);
  });
}

for (const asset of footerAssets) {
  test(`${asset.src} exists at its Figma size`, async () => {
    const svg = await readFile(
      new URL(`../public${asset.src}`, import.meta.url),
      "utf8",
    );

    assert.match(
      svg,
      new RegExp(`width="${asset.width}" height="${asset.height}"`),
      `${asset.src} should be exported at ${asset.width}x${asset.height}`,
    );
    assert.match(svg, /(fill|stroke)="white"/);
  });
}
