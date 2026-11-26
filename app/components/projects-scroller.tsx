"use client";

import {
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { revealDelay } from "./motion/reveal";

// how far (px) a mouse press may wander and still be a click on a card
const DRAG_THRESHOLD = 6;

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

    // a row with nothing to scroll (the three cards side by side on a
    // desktop) is not dragged at all
    if (scroller.scrollWidth - scroller.clientWidth < 1) return;

    draggingPointerRef.current = event.pointerId;
    dragStartXRef.current = event.clientX;
    dragStartScrollRef.current = scroller.scrollLeft;
    dragDistanceRef.current = 0;
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const scroller = scrollerRef.current;

    if (!scroller || draggingPointerRef.current !== event.pointerId) return;

    // the button came up outside the row, where its pointerup never got here
    if ((event.buttons & 1) === 0) {
      draggingPointerRef.current = null;
      return;
    }

    const distance = event.clientX - dragStartXRef.current;
    dragDistanceRef.current = Math.max(
      dragDistanceRef.current,
      Math.abs(distance),
    );

    // The row takes the pointer only once a press has become a drag. Taken
    // at the press, the click that ended it went to the row instead of the
    // card under the mouse (Chrome sends a click to the element holding the
    // pointer), so a card's link never opened (ARTIMA, 2026-11-26).
    if (!scroller.hasPointerCapture(event.pointerId)) {
      if (dragDistanceRef.current <= DRAG_THRESHOLD) return;
      scroller.setPointerCapture(event.pointerId);
      setIsDragging(true);
    }

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
        // the cards come in together as the row scrolls into view, even the
        // ones still off to the side
        data-reveal-group
        data-dragging={isDragging ? "true" : undefined}
        onScroll={scheduleProgressUpdate}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        onClickCapture={(event) => {
          if (dragDistanceRef.current <= DRAG_THRESHOLD) return;

          event.preventDefault();
          event.stopPropagation();
          dragDistanceRef.current = 0;
        }}
        // a card's photo or link would otherwise start the browser's own
        // drag of it and cut the row's drag short
        onDragStart={(event) => event.preventDefault()}
        role="region"
        aria-label="Projects slider"
        tabIndex={0}
      >
        <div className={trackClassName}>{children}</div>
      </div>
      <div
        className={scrollbarClassName}
        aria-hidden="true"
        data-reveal
        style={revealDelay(300)}
      >
        <span
          className={thumbClassName}
          style={{ left: `${thumbOffset}%`, width: `${thumbWidth}%` }}
        />
      </div>
    </>
  );
}
