/*
 * Bakes the Figma "BLUE ANIMATION" petals (node 110:295) into the images the
 * hero's third slide uses. The vectors are drawn once, with their blur, and
 * saved; at runtime the slide only moves the pictures around.
 *
 * They used to be drawn live as SVG, which cost ~290ms per frame — four
 * Gaussian blurs of radius 131.6 over a surface several times the screen — and
 * the slide scales itself as it arrives, so every one of those frames was
 * redrawn. Re-run this after the vectors change in Figma:
 *
 *   node scripts/bake-aurora.mjs
 *
 * It prints the placement percentages; paste them into PETALS in
 * app/components/animated-slide-background/animated-slide-background.tsx.
 * Needs Chrome (to rasterise) and cwebp (to compress).
 */
import { writeFileSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { execFileSync } from "node:child_process";
import { join } from "node:path";

const REPO = join(import.meta.dirname, "..");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const SIGMA = 131.6; // Figma's blur radius, in artboard units
const MARGIN = 460; // ~3.5 sigma, where the blur has faded below 0.2%
const MAX_PX = 512; // a 131-unit blur carries no detail finer than this
const VB_W = 1920;
const VB_H = 1263;

const BLUE_RAMP = [
  ["0", "#151521"],
  ["0.57", "#36629b"],
  ["1", "#c2e5ff"],
];

/* Vector 110:288, 110:287, 110:289 and 110:290, with their gradient vectors. */
const PETALS = [
  {
    id: "back",
    gradient: ["0.207", "-0.013", "0.487", "0.967"],
    d: "M879.668 77.4566C1057.76 235.49 1452.74 850.586 1447.63 1040.35C1443.87 1180.1 1603.74 1461.12 1570.46 1591.55C1498.36 1874.04 916.293 1574.38 589.123 1574.97C391.482 1575.32 187.601 1413.38 126.105 1247.12C16.2689 950.149 -69.3037 701.427 80.0926 395.234C194.192 161.384 628.069 -145.806 879.668 77.4566Z",
  },
  {
    id: "right",
    gradient: ["0.207", "-0.013", "0.487", "0.967"],
    d: "M785.769 58.6567C944.85 178.333 1297.67 644.135 1293.11 787.842C1289.74 893.673 1432.55 1106.49 1402.82 1205.25C1338.42 1419.18 818.485 1192.25 526.238 1192.7C349.694 1192.97 167.576 1070.33 112.644 944.422C14.5323 719.533 -61.906 531.18 71.5432 299.305C173.463 122.214 561.027 -110.417 785.769 58.6567Z",
  },
  {
    id: "core",
    gradient: ["0.196", "0.049", "0.474", "1.076"],
    d: "M629.801 0.212912C817.698 -3.69484 954.524 42.2571 1101.66 468.559C1135.23 565.81 1148.21 1048.04 1124.37 1146.81C1072.76 1360.73 656.023 1133.81 421.785 1134.25C280.283 1134.52 134.314 1011.89 90.2856 885.978C11.6478 661.089 -49.6182 472.736 57.3426 240.861C139.032 63.7698 404.417 4.9003 629.801 0.212912Z",
  },
  {
    id: "band",
    gradient: ["0.746", "0.045", "0.836", "0.995"],
    d: "M2139.24 102.738C2229.37 193.095 2429.28 544.783 2426.7 653.283C2424.79 733.187 2505.71 893.863 2488.86 968.433C2452.37 1129.95 174.897 773.347 9.30986 773.683C-90.7202 773.887 649.002 125.734 617.878 30.6693C562.287 -139.125 1658.95 459.499 1734.56 284.43C1792.31 150.724 2011.9 -24.9148 2139.24 102.738Z",
  },
];

/* Control points bound a cubic, so the extremes of the numbers bound the path. */
function bounds(d) {
  const nums = d.match(/-?\d+(?:\.\d+)?/g).map(Number);
  const xs = [];
  const ys = [];
  for (let i = 0; i < nums.length; i += 2) {
    xs.push(nums[i]);
    ys.push(nums[i + 1]);
  }
  return { x0: Math.min(...xs), y0: Math.min(...ys), x1: Math.max(...xs), y1: Math.max(...ys) };
}

const work = mkdtempSync(join(tmpdir(), "aurora-"));
const placements = [];

for (const petal of PETALS) {
  const b = bounds(petal.d);
  const x = b.x0 - MARGIN;
  const y = b.y0 - MARGIN;
  const w = b.x1 - b.x0 + MARGIN * 2;
  const h = b.y1 - b.y0 + MARGIN * 2;
  const scale = MAX_PX / Math.max(w, h);
  const pw = Math.round(w * scale);
  const ph = Math.round(h * scale);
  const [x1, y1, x2, y2] = petal.gradient;
  const stops = BLUE_RAMP.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join("");

  const page = `<!doctype html><meta charset="utf-8">
<style>html,body{margin:0;padding:0;background:transparent}svg{display:block}</style>
<svg xmlns="http://www.w3.org/2000/svg" width="${pw}" height="${ph}" viewBox="${x} ${y} ${w} ${h}">
<defs>
<linearGradient id="g" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${stops}</linearGradient>
<filter id="f" x="-60%" y="-60%" width="220%" height="220%" color-interpolation-filters="sRGB">
<feGaussianBlur stdDeviation="${SIGMA}"/></filter>
</defs>
<path fill="url(#g)" filter="url(#f)" fill-rule="evenodd" d="${petal.d}"/>
</svg>`;

  const pagePath = join(work, `${petal.id}.html`);
  const png = join(work, `${petal.id}.png`);
  writeFileSync(pagePath, page);

  execFileSync(CHROME, [
    "--headless",
    "--disable-gpu",
    "--hide-scrollbars",
    "--force-device-scale-factor=1",
    "--default-background-color=00000000",
    `--window-size=${pw},${ph}`,
    `--screenshot=${png}`,
    `file://${pagePath}`,
  ], { stdio: "ignore" });

  execFileSync("cwebp", [
    "-quiet", "-q", "92", "-alpha_q", "100", "-m", "6",
    png, "-o", join(REPO, "public", `hero-aurora-${petal.id}.webp`),
  ]);

  placements.push({
    id: petal.id,
    src: `/hero-aurora-${petal.id}.webp`,
    left: +((x / VB_W) * 100).toFixed(4),
    top: +((y / VB_H) * 100).toFixed(4),
    width: +((w / VB_W) * 100).toFixed(4),
    height: +((h / VB_H) * 100).toFixed(4),
  });
}

/*
 * The iridescent band: the same gradient the stylesheet used to carry, with its
 * 20px blur already applied. It is 200%x150% of the slide, so at a 390-wide
 * frame that is 780x1015 — the blur's own soft edges fall well outside the
 * visible area, which is why baking at exactly that box is faithful.
 */
const IRIS = { w: 780, h: 1015, blur: 20 };
const IRIS_GRADIENT = `linear-gradient(90deg,
  rgb(255 154 208 / 0%) 24%, rgb(255 154 208 / 8%) 26%, rgb(255 217 138 / 9%) 27.5%,
  rgb(76 226 154 / 12%) 29%, rgb(64 210 176 / 6%) 31%, rgb(64 210 176 / 0%) 33.5%,
  rgb(255 154 208 / 0%) 41%, rgb(255 154 208 / 15%) 43.5%, rgb(255 217 138 / 16%) 45%,
  rgb(76 226 154 / 21%) 46.5%, rgb(64 210 176 / 11%) 48.5%, rgb(64 210 176 / 0%) 51.5%)`;

{
  const page = `<!doctype html><meta charset="utf-8">
<style>html,body{margin:0;padding:0;background:transparent}
div{width:${IRIS.w}px;height:${IRIS.h}px;background:${IRIS_GRADIENT};filter:blur(${IRIS.blur}px)}</style><div></div>`;
  const pagePath = join(work, "iris.html");
  const png = join(work, "iris.png");
  writeFileSync(pagePath, page);
  execFileSync(CHROME, [
    "--headless", "--disable-gpu", "--hide-scrollbars",
    "--force-device-scale-factor=1", "--default-background-color=00000000",
    `--window-size=${IRIS.w},${IRIS.h}`, `--screenshot=${png}`, `file://${pagePath}`,
  ], { stdio: "ignore" });
  execFileSync("cwebp", [
    "-quiet", "-q", "92", "-alpha_q", "100", "-m", "6",
    png, "-o", join(REPO, "public", "hero-aurora-iris.webp"),
  ]);
}

rmSync(work, { recursive: true, force: true });
console.log(JSON.stringify(placements, null, 2));
