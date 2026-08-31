"use client";

import { useEffect, useRef } from "react";

import styles from "./animated-slide-background.module.css";

type AnimatedSlideBackgroundProps = {
  /** Whether the containing slide is the carousel's selected slide. */
  active: boolean;
  /** Start the CSS timeline from its first frame when the slide is selected. */
  restartOnActivate?: boolean;
};

/*
 * Each petal is a picture of one blurred Figma vector, baked by
 * scripts/bake-aurora.mjs straight from the paths, gradients and the 131.6
 * blur radius stored in the file. They were drawn live as SVG until it turned
 * out that four Gaussian blurs of that radius cost ~290ms per frame — and the
 * slide scales itself as it arrives, so every one of those frames was redrawn.
 * The shapes never change, only their placement, so the blur belongs in the
 * image. Re-run the script after touching the vectors in Figma.
 *
 * Each box is positioned as a share of the 1920x1263 artboard: the crop keeps
 * 3.5 blur radii of margin around the vector, which is where the blur has
 * faded below a fifth of a percent.
 */
const PETALS = [
  {
    id: "back",
    className: "petalBack",
    src: "/hero-aurora-back.webp",
    left: -27.5679,
    top: -47.9656,
    width: 135.0544,
    height: 232.7669,
  },
  {
    id: "right",
    className: "petalRight",
    src: "/hero-aurora-right.webp",
    left: -27.1826,
    top: -45.1637,
    width: 125.7529,
    height: 193.9507,
  },
  {
    id: "core",
    className: "petalCore",
    src: "/hero-aurora-core.webp",
    left: -26.5426,
    top: -36.7138,
    width: 110.3036,
    height: 180.8729,
  },
  {
    id: "band",
    className: "petalBand",
    src: "/hero-aurora-band.webp",
    left: -28.6833,
    top: -47.4367,
    width: 183.1474,
    height: 173.3234,
  },
] as const;

/*
 * Replica of the Figma "BLUE ANIMATION" component (node 110:295).
 *
 * Four blurred gradient petals smart-animate between the "ENSO tulip1" and
 * "ENSO tulip2" states — 6s ease-out forward, 3s ease-out back, looped. Paths,
 * gradients, blur radius and both state matrices are taken from the Figma file.
 *
 * The vertical iridescent streaks on top reproduce the spectral dispersion the
 * Figma renderer shows in the prototype. They are not stored in the document
 * (every petal fill is plain blue), so they are drawn explicitly as an overlay
 * that drifts sideways on the same timeline.
 */
export function AnimatedSlideBackground({
  active,
  restartOnActivate = true,
}: AnimatedSlideBackgroundProps) {
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const wasActive = useRef(active);

  useEffect(() => {
    const justActivated = active && !wasActive.current;
    wasActive.current = active;

    if (!justActivated || !restartOnActivate) return;

    const scene = sceneRef.current;
    if (!scene?.getAnimations) return;

    // Rewind in place. Remounting the subtree would also restart the timeline,
    // but it would rebuild the whole scene at the exact moment the slide
    // scrolls in, which is where the transition used to stutter.
    for (const animation of scene.getAnimations({ subtree: true })) {
      animation.currentTime = 0;
    }
  }, [active, restartOnActivate]);

  return (
    <div
      className={`${styles.root} ${active ? styles.playing : styles.paused}`}
      aria-hidden="true"
    >
      <div ref={sceneRef} className={styles.scene}>
        {PETALS.map((petal) => (
          <div
            key={petal.id}
            className={`${styles.petal} ${styles[petal.className]}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- a fixed
                decorative bitmap; the image pipeline would only re-encode it */}
            <img
              className={styles.petalImage}
              src={petal.src}
              alt=""
              decoding="async"
              style={{
                left: `${petal.left}%`,
                top: `${petal.top}%`,
                width: `${petal.width}%`,
                height: `${petal.height}%`,
              }}
            />
          </div>
        ))}

        <span className={styles.iris} />
      </div>
    </div>
  );
}
