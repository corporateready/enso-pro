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
        Launch of <br />
        <strong>TRIUMF Botanica</strong>
        <br />
        in the Botanica
        <br />
        district of Chisinau
      </>
    ),
    width: 99,
    contentWidth: 175,
  },
  {
    year: "2025",
    description: (
      <>
        Concept development began for <strong>one of the city&apos;s largest projects</strong>
        {" — "}18.5 ha in Ciocana.
      </>
    ),
    width: 121,
    contentWidth: 186,
  },
  {
    year: "2024",
    description: (
      <>
        Signed contracts for over <strong>20 hectares</strong> in Chisinau and
        started our <strong>first project in Brasov.</strong>
      </>
    ),
    width: 124,
    contentWidth: 201,
  },
  {
    year: "2023",
    description: (
      <>
        We began developing projects that reflect <strong>our values and the standard</strong>
        {" "}we consider essential.
      </>
    ),
    width: 145,
    contentWidth: 202,
  },
  {
    year: "2019",
    description: (
      <>
        After <strong>20 years</strong> as co-investors,
        <br />
        we created ENSŌ — our own
        <br />
        vision of a <strong>modern developer.</strong>
      </>
    ),
    width: 133,
    contentWidth: 240,
  },
  {
    year: "1999",
    description: (
      <>
        Operating in real estate investment <strong>since 1999</strong>,
        <br />
        as partners and co-investors across <strong>Moldova and Romania</strong>.
      </>
    ),
    width: 245,
    contentWidth: 232,
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
            SINCE 1999
          </h2>
          <p className={styles.intro}>
            After two decades as co-investors across Moldova and Romania, we
            built ENSO — our own vision of a modern developer.
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
