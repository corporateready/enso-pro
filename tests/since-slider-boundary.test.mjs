import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const sliderStyles = [
  [
    "EN",
    await readFile(
      new URL("../app/components/en-page/since/since.module.css", import.meta.url),
      "utf8",
    ),
  ],
  [
    "RO",
    await readFile(
      new URL("../app/components/ro-page/since/since.module.css", import.meta.url),
      "utf8",
    ),
  ],
];

function ruleBody(css, selector) {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = css.match(new RegExp(`${escapedSelector}\\s*\\{([^}]*)\\}`, "s"));
  assert.ok(match, `Expected ${selector} rule to exist`);
  return match[1];
}

for (const [locale, css] of sliderStyles) {
  test(`${locale} Since keeps the first touch snap at the true scroll origin`, () => {
    const viewportRule = ruleBody(css, ".viewport");
    const trackRule = ruleBody(css, ".track");
    const snapInset = Number(
      viewportRule.match(/scroll-padding-left:\s*(\d+)rem/)?.[1],
    );
    const trackLeftPadding = Number(
      trackRule.match(/padding:\s*[^;]*\s(\d+)rem\s*;/)?.[1],
    );

    assert.equal(snapInset, trackLeftPadding);
    assert.equal(trackLeftPadding - snapInset, 0);
  });

  test(`${locale} Since suppresses the horizontal boundary overscroll effect`, () => {
    assert.match(
      ruleBody(css, ".viewport"),
      /overscroll-behavior-x:\s*none\s*;/,
    );
  });
}
