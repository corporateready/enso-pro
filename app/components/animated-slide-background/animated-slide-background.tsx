"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./animated-slide-background.module.css";

type AnimatedSlideBackgroundProps = {
  /** Whether the containing slide is the carousel's selected slide. */
  active: boolean;
  /** Start the CSS timeline from its first frame when the slide is selected. */
  restartOnActivate?: boolean;
};

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
        <span className={`${styles.layer} ${styles.blueField}`} />
        <span className={`${styles.layer} ${styles.navyField}`} />
        <span className={`${styles.layer} ${styles.leftGlow}`} />
        <span className={`${styles.layer} ${styles.topGlow}`} />
        <span className={styles.softener} />
      </div>
    </div>
  );
}
