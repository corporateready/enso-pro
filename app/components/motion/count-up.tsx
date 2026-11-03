"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./count-up.module.css";

const DURATION = 1600;

/*
 * A figure that counts up from 0, optionally after `delay` ms, each time the
 * data-reveal element around it comes in (scroll-reveal.tsx), and waits at 0
 * while that is hidden off screen. The final digits always hold the
 * figure's place, invisible while it counts, so nothing around it moves; the
 * running number sits right-aligned over them, which keeps the suffix ("k+")
 * still. Screen readers only ever get the final figure. Without the reveals
 * (no JavaScript, reduced motion), or on screen from the start, it just shows.
 */
export default function CountUp({
  value,
  suffix = "",
  delay = 0,
}: {
  value: number;
  suffix?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState<number | null>(null);

  useEffect(() => {
    const host = ref.current?.closest("[data-reveal]");
    if (!host) return;

    const root = document.documentElement;
    let frame = 0;
    let timer = 0;

    const stop = () => {
      window.clearTimeout(timer);
      window.cancelAnimationFrame(frame);
    };

    const count = () => {
      stop();
      setCurrent(0);
      timer = window.setTimeout(() => {
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / DURATION);
          const eased = 1 - (1 - progress) ** 3;

          setCurrent(progress < 1 ? Math.round(eased * value) : null);
          if (progress < 1) frame = window.requestAnimationFrame(tick);
        };
        frame = window.requestAnimationFrame(tick);
      }, delay);
    };

    const sync = () => {
      const state = host.getAttribute("data-revealed");

      if (!root.hasAttribute("data-motion") || state === "instant") {
        stop();
        setCurrent(null);
      } else if (!state) {
        stop();
        setCurrent(0);
      } else {
        count();
      }
    };

    sync();
    const watch = new MutationObserver(sync);
    watch.observe(host, { attributes: true, attributeFilter: ["data-revealed"] });
    watch.observe(root, { attributes: true, attributeFilter: ["data-motion"] });

    return () => {
      watch.disconnect();
      stop();
    };
  }, [delay, value]);

  // The running number goes before the digits, out of the text flow: after
  // them it would split "25" from "+", and Inter would stop raising the "+"
  // to the height of the figures, as it does when it follows them.
  return (
    <span ref={ref}>
      <span className={styles.figure}>
        {current !== null && (
          <span className={styles.running} aria-hidden="true">
            {current}
          </span>
        )}
        <span className={current === null ? undefined : styles.placeholder}>
          {value}
        </span>
      </span>
      {suffix}
    </span>
  );
}
