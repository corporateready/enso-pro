"use client";

import Image from "next/image";
import {
  type CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import styles from "./since.module.css";

type Milestone = {
  year: string;
  description: ReactNode;
  width: number;
  contentWidth: number;
};

const milestones: readonly Milestone[] = [
  {
    year: "2026",
    description: (
      <>
        Lansarea <strong>TRIUMF Botanica</strong>, în sectorul Botanica din
        Chișinău.
      </>
    ),
    width: 99,
    contentWidth: 175,
  },
  {
    year: "2025",
    description: (
      <>
        A început dezvoltarea conceptului pentru{" "}
        <strong>unul dintre cele mai mari proiecte ale orașului</strong> — 18,5
        ha în Ciocana.
      </>
    ),
    width: 141,
    contentWidth: 232,
  },
  {
    year: "2024",
    description: (
      <>
        Am semnat contracte pentru peste <strong>20 de hectare</strong> în
        Chișinău și am început <strong>primul nostru proiect la Brașov.</strong>
      </>
    ),
    width: 124,
    contentWidth: 239,
  },
  {
    year: "2023",
    description: (
      <>
        Am început să dezvoltăm proiecte care reflectă <strong>valorile noastre și standardul</strong>
        {" "}pe care îl considerăm esențial.
      </>
    ),
    width: 145,
    contentWidth: 227,
  },
  {
    year: "2019",
    description: (
      <>
        După <strong>20 de ani</strong> ca și co-investitori, am creat ENSŌ —
        viziunea noastră despre un <strong>dezvoltator modern.</strong>
      </>
    ),
    width: 113,
    contentWidth: 240,
  },
  {
    year: "1999",
    description: (
      <>
        Activăm în investiții imobiliare <strong>din 1999</strong>, ca parteneri
        și co-investitori în <strong>Moldova și România</strong>.
      </>
    ),
    width: 245,
    contentWidth: 217,
  },
];

const EDGE_TOLERANCE = 2;

export default function Since() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateNavigation = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const maxScrollLeft = Math.max(
      0,
      viewport.scrollWidth - viewport.clientWidth,
    );
    const nextCanScrollLeft = viewport.scrollLeft > EDGE_TOLERANCE;
    const nextCanScrollRight =
      viewport.scrollLeft < maxScrollLeft - EDGE_TOLERANCE;

    setCanScrollLeft((current) =>
      current === nextCanScrollLeft ? current : nextCanScrollLeft,
    );
    setCanScrollRight((current) =>
      current === nextCanScrollRight ? current : nextCanScrollRight,
    );
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const animationFrame = window.requestAnimationFrame(updateNavigation);
    const resizeObserver = new ResizeObserver(updateNavigation);
    resizeObserver.observe(viewport);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
    };
  }, [updateNavigation]);

  const scrollTimeline = (direction: -1 | 1) => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const milestone = viewport.querySelector<HTMLElement>("[data-milestone]");
    const scrollAmount = milestone?.offsetWidth ?? viewport.clientWidth * 0.5;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    viewport.scrollBy({
      left: direction * scrollAmount,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <section id="since" className={styles.section} aria-labelledby="since-title">
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 id="since-title" className={styles.title}>
            DIN 1999
          </h2>
          <p className={styles.intro}>
            După două decenii ca și co-investitori în Moldova și România, am
            creat ENSŌ — propria noastră viziune despre un dezvoltator modern.
          </p>
        </header>

        <div className={styles.timeline}>
          <div
            id="since-timeline"
            ref={viewportRef}
            className={styles.viewport}
            onScroll={updateNavigation}
            aria-label="Enso history timeline"
            tabIndex={0}
          >
            <ol className={styles.track}>
              {milestones.map((milestone, index) => (
                <li
                  className={`${styles.milestone} ${
                    index % 2 === 0 ? styles.milestoneTop : styles.milestoneBottom
                  }`}
                  key={milestone.year}
                  data-milestone
                  style={
                    {
                      "--milestone-width": `${milestone.width}rem`,
                      "--content-width": `${milestone.contentWidth}rem`,
                    } as CSSProperties
                  }
                >
                  <span className={styles.stem} aria-hidden="true" />
                  <span className={styles.dot} aria-hidden="true" />
                  <div className={styles.milestoneContent}>
                    <h3>{milestone.year}</h3>
                    <p>{milestone.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {canScrollLeft && (
            <button
              className={`${styles.arrowButton} ${styles.arrowLeft}`}
              type="button"
              onClick={() => scrollTimeline(-1)}
              aria-label="Scroll timeline left"
              aria-controls="since-timeline"
            >
              <Image
                className={styles.arrowIcon}
                src="/since-arrow.svg"
                width={65}
                height={57}
                unoptimized
                alt=""
              />
            </button>
          )}

          {canScrollRight && (
            <button
              className={`${styles.arrowButton} ${styles.arrowRight}`}
              type="button"
              onClick={() => scrollTimeline(1)}
              aria-label="Scroll timeline right"
              aria-controls="since-timeline"
            >
              <Image
                className={styles.arrowIcon}
                src="/since-arrow.svg"
                width={65}
                height={57}
                unoptimized
                alt=""
              />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
