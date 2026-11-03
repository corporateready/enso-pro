"use client";

import { useEffect, useRef } from "react";

import styles from "./reveal-lines.module.css";

/** Text, or a line break (with the classes that show it only on some screens). */
export type LinePiece = string | { br: string | undefined };

/*
 * Text that comes in a line at a time when the data-reveal-group around it
 * does (scroll-reveal.tsx): top line first on the way down, bottom line first
 * on the way back up. Where the lines break depends on the screen (and the
 * language), so the words are numbered by the line they actually sit on
 * (--line, and --lines for the count), again whenever the window resizes.
 */
export default function RevealLines({
  pieces,
}: {
  pieces: readonly LinePiece[];
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const number = () => {
      let line = -1;
      let top = -Infinity;
      root.querySelectorAll<HTMLElement>(`.${styles.word}`).forEach((word) => {
        if (word.offsetTop > top + 2) {
          line += 1;
          top = word.offsetTop;
        }
        word.style.setProperty("--line", String(line));
      });
      root.style.setProperty("--lines", String(line + 1));
    };

    number();
    window.addEventListener("resize", number);

    return () => window.removeEventListener("resize", number);
  }, []);

  return (
    <span ref={ref}>
      {pieces.map((piece, index) =>
        typeof piece === "string" ? (
          piece.split(/(\s+)/).map((part, partIndex) =>
            !part || /^\s+$/.test(part) ? (
              part
            ) : (
              <span key={`${index}-${partIndex}`} className={styles.word}>
                {part}
              </span>
            ),
          )
        ) : (
          <br key={index} className={piece.br} />
        ),
      )}
    </span>
  );
}
