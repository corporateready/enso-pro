import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const carouselStyles = [
  [
    "ro",
    "../app/components/ro-page/hero/carousel/carousel.module.css",
    "../app/components/ro-page/hero/carousel/carousel.tsx",
  ],
  [
    "en",
    "../app/components/en-page/hero/carousel/carousel.module.css",
    "../app/components/en-page/hero/carousel/carousel.tsx",
  ],
];

function readRule(css, selector) {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = css.match(new RegExp(`${escapedSelector}\\s*\\{([^}]*)\\}`));

  assert.ok(match, `Missing ${selector} rule`);
  return match[1];
}

for (const [locale, relativePath, componentPath] of carouselStyles) {
  test(`${locale} hero keeps touch swiping enabled on every slide`, async () => {
    const [css, component] = await Promise.all([
      readFile(new URL(relativePath, import.meta.url), "utf8"),
      readFile(new URL(componentPath, import.meta.url), "utf8"),
    ]);

    assert.match(readRule(css, ".viewport"), /overscroll-behavior-y:\s*none\s*;/);
    assert.match(
      readRule(css, ".container"),
      /touch-action:\s*pan-x pinch-zoom\s*;/,
    );
    assert.doesNotMatch(css, /\.viewportAtEnd|\.containerAtEnd/);
    assert.doesNotMatch(component, /isLastSlide|viewportAtEnd|containerAtEnd/);
    assert.match(component, /watchDrag:\s*\(_, event\) => event\.type !== "touchstart"/);
    assert.match(component, /const TOUCH_SWIPE_THRESHOLD = 40;/);
    assert.match(component, /onTouchStart=\{handleTouchStart\}/);
    assert.match(component, /onTouchEnd=\{handleTouchEnd\}/);
    assert.match(component, /emblaApi\.scrollNext\(\)/);
    assert.match(component, /emblaApi\.scrollPrev\(\)/);
  });

  test(`${locale} hero dot keeps progress visible`, async () => {
    const css = await readFile(new URL(relativePath, import.meta.url), "utf8");

    assert.match(readRule(css, ".dot"), /background:\s*black\s*;/);
    assert.match(readRule(css, ".dotSelected"), /background:\s*black\s*;/);
    assert.match(readRule(css, ".dotProgress"), /background:\s*white\s*;/);
    assert.match(
      readRule(css, "@keyframes carousel-dot-progress"),
      /transform:\s*scaleY\(1\)\s*;/,
    );
  });

  test(`${locale} hero dot pauses and resumes progress on touch`, async () => {
    const [css, component] = await Promise.all([
      readFile(new URL(relativePath, import.meta.url), "utf8"),
      readFile(new URL(componentPath, import.meta.url), "utf8"),
    ]);

    assert.match(
      readRule(css, ".dotProgressPaused"),
      /animation-play-state:\s*paused\s*;/,
    );
    assert.match(
      readRule(css, ".dotSelectedPaused"),
      /background:\s*black\s*;/,
    );
    assert.match(component, /styles\.dotProgressPaused/);
    assert.match(component, /const SLIDE_PROGRESS_DURATION = 5000;/);
    assert.match(component, /progressRemainingRef\.current/);
    assert.match(
      readRule(css, ".dotProgress"),
      /animation:\s*carousel-dot-progress 5s linear forwards\s*;/,
    );
    assert.doesNotMatch(component, /isSelected && !isDragging/);
    assert.doesNotMatch(component, /progressCycle/);
  });
}

test("RO third hero slide shows the red payment-plan marker", async () => {
  const [hero, css] = await Promise.all([
    readFile(
      new URL("../app/components/ro-page/hero/index.tsx", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL(
        "../app/components/ro-page/hero/carousel/carousel.module.css",
        import.meta.url,
      ),
      "utf8",
    ),
  ]);

  assert.match(
    hero,
    /label: "Calculează-mi ratele",[\s\S]*?classNames: \{\s*primaryAction: "paymentPlanAction",\s*\}/,
  );
  assert.match(
    css,
    /:global\(\.paymentPlanAction\)::after\s*\{[\s\S]*?top: -7rem;[\s\S]*?right: -4rem;[\s\S]*?width: 20rem;[\s\S]*?height: 20rem;[\s\S]*?border-radius: 50%;[\s\S]*?background: #df332d;/,
  );
});

test("EN third hero slide shows the red payment-plan marker", async () => {
  const [hero, css] = await Promise.all([
    readFile(
      new URL("../app/components/en-page/hero/index.tsx", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL(
        "../app/components/en-page/hero/carousel/carousel.module.css",
        import.meta.url,
      ),
      "utf8",
    ),
  ]);

  assert.match(
    hero,
    /label: "Build my payment plan",[\s\S]*?classNames: \{\s*primaryAction: "paymentPlanAction",\s*\}/,
  );
  assert.match(
    css,
    /:global\(\.paymentPlanAction\)::after\s*\{[\s\S]*?top: -7rem;[\s\S]*?right: -4rem;[\s\S]*?width: 20rem;[\s\S]*?height: 20rem;[\s\S]*?border-radius: 50%;[\s\S]*?background: #df332d;/,
  );
});
