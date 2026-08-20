import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const heroPath = "../app/components/ro-page/hero/index.tsx";
const carouselPath =
  "../app/components/ro-page/hero/carousel/carousel.tsx";
const carouselCssPath =
  "../app/components/ro-page/hero/carousel/carousel.module.css";
const heroCssPath = "../app/components/ro-page/hero/hero.module.css";

test("RO hero uses dedicated AVIF artwork on desktop", async () => {
  const source = await readFile(new URL(heroPath, import.meta.url), "utf8");

  assert.match(source, /desktopSrc: "\/hero-slide-first-desktop-bg\.avif"/);
  assert.match(source, /desktopSrc: "\/hero-slide-second-desktop-bg\.avif"/);
  assert.match(source, /desktopSrc: "\/hero-slide-thiree-desktop-bg\.avif"/);
});

test("RO hero switches from vertical mobile scrolling to a horizontal desktop carousel", async () => {
  const [hero, source] = await Promise.all([
    readFile(new URL(heroPath, import.meta.url), "utf8"),
    readFile(new URL(carouselPath, import.meta.url), "utf8"),
  ]);

  assert.match(source, /window\.matchMedia\("\(min-width: 641px\)"\)/);
  assert.match(source, /axis: isDesktop \? \("x" as const\) : \("y" as const\)/);
  assert.match(source, /if \(isDesktop \|\| !isLastSlide/);
  assert.match(hero, /<HeroCarousel slides=\{slides\} mode="mobile" \/>/);
  assert.match(hero, /<HeroCarousel slides=\{slides\} mode="desktop" \/>/);
});

test("RO desktop header has transparent and scrolled states", async () => {
  const [hero, css] = await Promise.all([
    readFile(new URL(heroPath, import.meta.url), "utf8"),
    readFile(new URL(heroCssPath, import.meta.url), "utf8"),
  ]);

  assert.match(hero, /window\.scrollY > 8/);
  assert.match(hero, /styles\.headerActive/);
  assert.match(css, /@media screen and \(min-width: 641px\)/);
  assert.match(css, /\.header\s*\{[\s\S]*?height: 100rem !important;/);
  assert.match(css, /background: rgb\(214 222 228 \/ 24%\) !important;/);
  assert.match(css, /\.headerActive\s*\{[\s\S]*?background: #fff !important;/);
});

test("RO desktop hero keeps reference proportions", async () => {
  const css = await readFile(
    new URL(carouselCssPath, import.meta.url),
    "utf8",
  );

  assert.match(css, /height: 1050rem;/);
  assert.match(css, /flex-direction: row;/);
  assert.match(css, /top: 595rem !important;/);
  assert.match(css, /left: 160rem !important;/);
  assert.match(css, /\.slide:nth-child\(3\) \.content/);
});
