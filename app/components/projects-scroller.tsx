"use client";

import {
  type PointerEvent as ReactPointerEvent,
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
  const dragStartXRef = useRef(0);
  const dragStartScrollRef = useRef(0);
  const dragDistanceRef = useRef(0);
  const draggingPointerRef = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

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

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const scroller = scrollerRef.current;

    if (!scroller || event.pointerType !== "mouse" || event.button !== 0) {
      return;
    }

    draggingPointerRef.current = event.pointerId;
    dragStartXRef.current = event.clientX;
    dragStartScrollRef.current = scroller.scrollLeft;
    dragDistanceRef.current = 0;
    setIsDragging(true);
    scroller.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const scroller = scrollerRef.current;

    if (!scroller || draggingPointerRef.current !== event.pointerId) return;

    const distance = event.clientX - dragStartXRef.current;
    dragDistanceRef.current = Math.max(
      dragDistanceRef.current,
      Math.abs(distance),
    );
    scroller.scrollLeft = dragStartScrollRef.current - distance;
  };

  const stopDragging = (event: ReactPointerEvent<HTMLDivElement>) => {
    const scroller = scrollerRef.current;

    if (!scroller || draggingPointerRef.current !== event.pointerId) return;

    if (scroller.hasPointerCapture(event.pointerId)) {
      scroller.releasePointerCapture(event.pointerId);
    }

    draggingPointerRef.current = null;
    setIsDragging(false);
  };

  return (
    <>
      <div
        ref={scrollerRef}
        className={scrollerClassName}
        data-dragging={isDragging ? "true" : undefined}
        onScroll={scheduleProgressUpdate}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        onClickCapture={(event) => {
          if (dragDistanceRef.current <= 6) return;

          event.preventDefault();
          event.stopPropagation();
          dragDistanceRef.current = 0;
        }}
        role="region"
        aria-label="Projects slider"
        tabIndex={0}
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
