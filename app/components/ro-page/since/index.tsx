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
import { revealDelay } from "../../motion/reveal";

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

// how long the line takes to draw itself, in ms: --timeline-duration in the
// CSS, longer on a phone, where the view rides along with it (the build
// rewrites 2400ms as 2.4s, so both units are read)
function drawDuration(timeline: Element) {
  const value = window
    .getComputedStyle(timeline)
    .getPropertyValue("--timeline-duration")
    .trim();
  const time = parseFloat(value);
  if (!Number.isFinite(time)) return 1600;
  return value.endsWith("ms") ? time : time * 1000;
}

// where the line (the track's ::before) runs, from 2026's stem to 1999's end
function lineSpan(track: HTMLElement) {
  const line = window.getComputedStyle(track, "::before");
  return {
    start: parseFloat(line.left) || 0,
    length: parseFloat(line.width) || track.scrollWidth,
  };
}

export default function Since() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const [milestoneDelays, setMilestoneDelays] = useState<readonly number[]>(
    [],
  );
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isRiding, setIsRiding] = useState(false);

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

  useEffect(() => {
    const timeline = timelineRef.current;
    const track = trackRef.current;
    if (!timeline || !track) return;

    // The line draws itself from the right (1999) when the timeline scrolls
    // into view (since.module.css); each milestone comes in as the line
    // reaches it, so its delay is its distance from the line's right end.
    const measure = () => {
      const { start, length } = lineSpan(track);
      const duration = drawDuration(timeline);

      setMilestoneDelays(
        Array.from(track.children, (item) => {
          const along =
            (start + length - (item as HTMLElement).offsetLeft) / length;
          return Math.round(Math.min(1, Math.max(0, along)) * duration);
        }),
      );
    };

    measure();
    window.addEventListener("resize", measure);

    return () => window.removeEventListener("resize", measure);
  }, []);

  // On a phone the line starts drawing at 1999, off the screen to the right,
  // so the first years came in unseen. While it draws, the view now rides
  // along with its tip from 1999 to 2026, the tip about a third of the way
  // in, easing off and in. A swipe along the timeline takes over at once; a
  // swipe up or down the page does not stop it, or the view would be left
  // halfway (leaving the screen does: the next reveal rides again).
  useEffect(() => {
    const timeline = timelineRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!timeline || !viewport || !track) return;

    let frame = 0;
    let expected = 0;

    const stop = () => {
      if (!frame) return;
      window.cancelAnimationFrame(frame);
      frame = 0;
      viewport.style.removeProperty("scroll-snap-type");
      viewport.style.removeProperty("scroll-behavior");
      setIsRiding(false);
    };

    const ride = () => {
      stop();
      // hidden again, or on screen from the start ("instant"): no ride
      const how = timeline.getAttribute("data-revealed");
      const maxScroll = viewport.scrollWidth - viewport.clientWidth;
      if ((how !== "in" && how !== "from-above") || maxScroll <= EDGE_TOLERANCE) {
        return;
      }

      const { start, length } = lineSpan(track);
      const duration = drawDuration(timeline);
      const lead = viewport.clientWidth / 3;
      // when the tip is a third of the way into the view at its far right,
      // and when at its far left
      const timeAt = (x: number) =>
        Math.min(duration, Math.max(0, ((start + length - x) / length) * duration));
      const leaveAt = timeAt(maxScroll + lead);
      const arriveAt = Math.max(leaveAt + 1, timeAt(lead));
      const startedAt = performance.now();

      viewport.style.scrollSnapType = "none";
      viewport.style.scrollBehavior = "auto";
      expected = maxScroll;
      viewport.scrollLeft = expected;
      setIsRiding(true);

      const step = (now: number) => {
        const k = Math.min(
          1,
          Math.max(0, (now - startedAt - leaveAt) / (arriveAt - leaveAt)),
        );
        expected = maxScroll * (1 - k * k * (3 - 2 * k));
        viewport.scrollLeft = expected;
        if (k < 1) frame = window.requestAnimationFrame(step);
        else stop();
      };
      frame = window.requestAnimationFrame(step);
    };

    // the view moved somewhere the ride did not put it: the reader's swipe
    const takeOver = () => {
      if (frame && Math.abs(viewport.scrollLeft - expected) > EDGE_TOLERANCE + 1) {
        stop();
      }
    };

    const reveals = new MutationObserver(ride);
    reveals.observe(timeline, {
      attributes: true,
      attributeFilter: ["data-revealed"],
    });
    viewport.addEventListener("scroll", takeOver, { passive: true });

    return () => {
      reveals.disconnect();
      viewport.removeEventListener("scroll", takeOver);
      window.cancelAnimationFrame(frame);
    };
  }, []);

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
          <h2 id="since-title" className={styles.title} data-reveal>
            DIN 1999
          </h2>
          <p className={styles.intro} data-reveal style={revealDelay(100)}>
            După două decenii ca și co-investitori în Moldova și România, am
            creat ENSŌ — propria noastră viziune despre un dezvoltator modern.
          </p>
        </header>

        <div ref={timelineRef} className={styles.timeline} data-reveal-group>
          <div
            id="since-timeline"
            ref={viewportRef}
            className={styles.viewport}
            onScroll={updateNavigation}
            aria-label="Enso history timeline"
            tabIndex={0}
          >
            <ol ref={trackRef} className={styles.track}>
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
                      "--milestone-delay": `${milestoneDelays[index] ?? (milestones.length - 1 - index) * 240}ms`,
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

          {canScrollLeft && !isRiding && (
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

          {canScrollRight && !isRiding && (
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
