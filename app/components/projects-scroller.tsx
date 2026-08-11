"use client";

import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type ProjectsScrollerProps = {
  children: ReactNode;
  itemCount: number;
  scrollerClassName: string;
  trackClassName: string;
  scrollbarClassName: string;
  thumbClassName: string;
};

export default function ProjectsScroller({
  children,
  itemCount,
  scrollerClassName,
  trackClassName,
  scrollbarClassName,
  thumbClassName,
}: ProjectsScrollerProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);

  const updateProgress = useCallback(() => {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    const maxScroll = scroller.scrollWidth - scroller.clientWidth;
    const nextProgress =
      maxScroll > 0
        ? Math.min(1, Math.max(0, scroller.scrollLeft / maxScroll))
        : 0;

    setProgress((currentProgress) =>
      Math.abs(currentProgress - nextProgress) > 0.001
        ? nextProgress
        : currentProgress,
    );
  }, []);

  const scheduleProgressUpdate = useCallback(() => {
    if (animationFrameRef.current !== null) {
      return;
    }

    animationFrameRef.current = window.requestAnimationFrame(() => {
      animationFrameRef.current = null;
      updateProgress();
    });
  }, [updateProgress]);

  useEffect(() => {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    updateProgress();

    const resizeObserver = new ResizeObserver(scheduleProgressUpdate);
    resizeObserver.observe(scroller);

    if (scroller.firstElementChild) {
      resizeObserver.observe(scroller.firstElementChild);
    }

    return () => {
      resizeObserver.disconnect();

      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [scheduleProgressUpdate, updateProgress]);

  const thumbWidth = 100 / Math.max(itemCount, 1);
  const thumbOffset = progress * (100 - thumbWidth);

  return (
    <>
      <div
        ref={scrollerRef}
        className={scrollerClassName}
        onScroll={scheduleProgressUpdate}
      >
        <div className={trackClassName}>{children}</div>
      </div>
      <div className={scrollbarClassName} aria-hidden="true">
        <span
          className={thumbClassName}
          style={{ left: `${thumbOffset}%`, width: `${thumbWidth}%` }}
        />
      </div>
    </>
  );
}
