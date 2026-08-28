"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./animated-slide-background.module.css";

type AnimatedSlideBackgroundProps = {
  /** Whether the containing slide is the carousel's selected slide. */
  active: boolean;
  /** Start the CSS timeline from its first frame when the slide is selected. */
  restartOnActivate?: boolean;
};

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
  const [cycle, setCycle] = useState(0);
  const [documentVisible, setDocumentVisible] = useState(false);
  const wasActive = useRef(active);

  useEffect(() => {
    const syncDocumentVisibility = () => {
      setDocumentVisible(document.visibilityState === "visible");
    };

    syncDocumentVisibility();
    document.addEventListener("visibilitychange", syncDocumentVisibility);

    return () => {
      document.removeEventListener("visibilitychange", syncDocumentVisibility);
    };
  }, []);

  useEffect(() => {
    if (active && !wasActive.current && restartOnActivate) {
      setCycle((currentCycle) => currentCycle + 1);
    }

    wasActive.current = active;
  }, [active, restartOnActivate]);

  const shouldPlay = active && documentVisible;

  return (
    <div
      className={`${styles.root} ${shouldPlay ? styles.playing : styles.paused}`}
      aria-hidden="true"
    >
      <div key={restartOnActivate ? cycle : "persistent"} className={styles.scene}>
        <svg
          className={styles.aurora}
          viewBox="0 0 1920 1263"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="enso-aurora-main"
              x1="0.207"
              y1="-0.013"
              x2="0.487"
              y2="0.967"
            >
              <stop offset="0" stopColor="#151521" />
              <stop offset="0.57" stopColor="#36629b" />
              <stop offset="1" stopColor="#c2e5ff" />
            </linearGradient>
            <linearGradient
              id="enso-aurora-core"
              x1="0.196"
              y1="0.049"
              x2="0.474"
              y2="1.076"
            >
              <stop offset="0" stopColor="#151521" />
              <stop offset="0.57" stopColor="#36629b" />
              <stop offset="1" stopColor="#c2e5ff" />
            </linearGradient>
            <linearGradient
              id="enso-aurora-band"
              x1="0.746"
              y1="0.045"
              x2="0.836"
              y2="0.995"
            >
              <stop offset="0" stopColor="#151521" />
              <stop offset="0.57" stopColor="#36629b" />
              <stop offset="1" stopColor="#c2e5ff" />
            </linearGradient>
            <filter
              id="enso-aurora-blur"
              x="-60%"
              y="-60%"
              width="220%"
              height="220%"
              colorInterpolationFilters="sRGB"
            >
              <feGaussianBlur stdDeviation="131.6" />
            </filter>
          </defs>

          <rect width="1920" height="1263" fill="#ffffff" />

          {/* Vector 110:274 -> 110:288 */}
          <g className={`${styles.blob} ${styles.blobBack}`}>
            <path
              fill="url(#enso-aurora-main)"
              filter="url(#enso-aurora-blur)"
              fillRule="evenodd"
              d="M879.668 77.4566C1057.76 235.49 1452.74 850.586 1447.63 1040.35C1443.87 1180.1 1603.74 1461.12 1570.46 1591.55C1498.36 1874.04 916.293 1574.38 589.123 1574.97C391.482 1575.32 187.601 1413.38 126.105 1247.12C16.2689 950.149 -69.3037 701.427 80.0926 395.234C194.192 161.384 628.069 -145.806 879.668 77.4566Z"
            />
          </g>

          {/* Vector 110:273 -> 110:287 */}
          <g className={`${styles.blob} ${styles.blobRight}`}>
            <path
              fill="url(#enso-aurora-main)"
              filter="url(#enso-aurora-blur)"
              fillRule="evenodd"
              d="M785.769 58.6567C944.85 178.333 1297.67 644.135 1293.11 787.842C1289.74 893.673 1432.55 1106.49 1402.82 1205.25C1338.42 1419.18 818.485 1192.25 526.238 1192.7C349.694 1192.97 167.576 1070.33 112.644 944.422C14.5323 719.533 -61.906 531.18 71.5432 299.305C173.463 122.214 561.027 -110.417 785.769 58.6567Z"
            />
          </g>

          {/* Vector 110:276 -> 110:289 */}
          <g className={`${styles.blob} ${styles.blobCore}`}>
            <path
              fill="url(#enso-aurora-core)"
              filter="url(#enso-aurora-blur)"
              fillRule="evenodd"
              d="M629.801 0.212912C817.698 -3.69484 954.524 42.2571 1101.66 468.559C1135.23 565.81 1148.21 1048.04 1124.37 1146.81C1072.76 1360.73 656.023 1133.81 421.785 1134.25C280.283 1134.52 134.314 1011.89 90.2856 885.978C11.6478 661.089 -49.6182 472.736 57.3426 240.861C139.032 63.7698 404.417 4.9003 629.801 0.212912Z"
            />
          </g>

          {/* Vector 110:277 -> 110:290 */}
          <g className={`${styles.blob} ${styles.blobBand}`}>
            <path
              fill="url(#enso-aurora-band)"
              filter="url(#enso-aurora-blur)"
              fillRule="evenodd"
              d="M2139.24 102.738C2229.37 193.095 2429.28 544.783 2426.7 653.283C2424.79 733.187 2505.71 893.863 2488.86 968.433C2452.37 1129.95 174.897 773.347 9.30986 773.683C-90.7202 773.887 649.002 125.734 617.878 30.6693C562.287 -139.125 1658.95 459.499 1734.56 284.43C1792.31 150.724 2011.9 -24.9148 2139.24 102.738Z"
            />
          </g>
        </svg>

        <span className={styles.iris} />
      </div>
    </div>
  );
}
