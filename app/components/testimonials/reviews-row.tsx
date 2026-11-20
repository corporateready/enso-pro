"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

import { glideTo } from "../motion/glide";
import styles from "./testimonials.module.css";

/*
 * The row of review cards. It holds as many as there are: three fill a
 * desktop, and from the fourth on the row scrolls a screenful at a time, by
 * the dots at the top right of the block (the team's dots) or by a swipe.
 * On a phone it is the swipe row it always was, and the dots are not shown.
 */
export default function ReviewsRow({
  children,
  count,
  labels,
}: {
  children: ReactNode;
  count: number;
  labels: { pages: string; page: string };
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  // Until the row has been measured: three cards to a page, as on a desktop,
  // the only place the dots show.
  const [pages, setPages] = useState(Math.ceil(count / 3));
  const [activePage, setActivePage] = useState(0);

  // one page further on: the row's width and the gap after its last card
  // (the grid of cards inside the row has the gap)
  const measure = (row: HTMLDivElement) => {
    const cards = row.firstElementChild ?? row;
    const step =
      row.clientWidth + (parseFloat(getComputedStyle(cards).columnGap) || 0);
    const end = row.scrollWidth - row.clientWidth;

    return { step, end };
  };

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    const update = () => {
      const { step, end } = measure(row);
      const nextPages = end > 1 ? Math.ceil(end / step) + 1 : 1;
      // the last page stops short of a whole step when the cards run out
      const nextActive =
        row.scrollLeft >= end - 1
          ? nextPages - 1
          : Math.round(row.scrollLeft / step);

      setPages((current) => (current === nextPages ? current : nextPages));
      setActivePage((current) =>
        current === nextActive ? current : nextActive,
      );
    };

    // fires once as it starts watching, so the row is measured on load
    const observer = new ResizeObserver(update);
    observer.observe(row);
    row.addEventListener("scroll", update, { passive: true });

    return () => {
      observer.disconnect();
      row.removeEventListener("scroll", update);
    };
  }, []);

  // a dot slides the row over with the site's own ease (motion/glide.ts):
  // the browser's smooth scroll jumped a screenful of cards too abruptly
  const showPage = (index: number) => {
    const row = rowRef.current;
    if (!row) return;

    const { step, end } = measure(row);
    glideTo(row, Math.min(index * step, end));
  };

  return (
    <>
      {pages > 1 && (
        <div className={styles.pages} aria-label={labels.pages}>
          {Array.from({ length: pages }, (_, index) => (
            <button
              className={`${styles.pageDot} ${
                activePage === index ? styles.pageDotActive : ""
              }`}
              key={index}
              type="button"
              onClick={() => showPage(index)}
              aria-label={`${labels.page} ${index + 1}`}
              aria-current={activePage === index ? "true" : undefined}
            />
          ))}
        </div>
      )}

      <div ref={rowRef} className={styles.row} data-reveal-group>
        <div className={styles.cards}>{children}</div>
      </div>
    </>
  );
}
