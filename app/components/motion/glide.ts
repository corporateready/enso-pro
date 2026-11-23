/*
 * Sideways rows the site moves itself (the reviews' dots, the BIM tabs, the
 * end of a mouse drag on either) slide there with an ease of their own, slow at both
 * ends, rather than with the browser's smooth scroll, which is quick and
 * abrupt over a screenful of cards (the client asked for a smoother slide,
 * 2026-11-20). While a row glides its snapping is off, or every step would
 * snap back; it comes back on at the end, where the row stands on a snap
 * point. A hand on the row (a press, a touch, a sideways wheel) stops the
 * glide where it is. With the device's animations off the row jumps.
 */

const stops = new WeakMap<HTMLElement, () => void>();

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;

// longer for a longer way: a phone's 390 in about 0.55s, a desktop's
// screenful of cards in about 0.9s
const durationFor = (distance: number) =>
  Math.min(950, Math.max(500, 450 + Math.abs(distance) * 0.25));

export function glideTo(row: HTMLElement, left: number) {
  stops.get(row)?.();

  // off before the row is measured: reading it lays the page out, and with
  // snapping on that could snap the row first
  row.style.scrollSnapType = "none";
  const from = row.scrollLeft;
  const target = Math.max(0, Math.min(left, row.scrollWidth - row.clientWidth));
  const distance = target - from;

  if (
    Math.abs(distance) < 1 ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    row.scrollLeft = target;
    row.style.scrollSnapType = "";
    return;
  }

  const duration = durationFor(distance);
  const start = performance.now();
  let frame = 0;

  const stop = () => {
    window.cancelAnimationFrame(frame);
    row.style.scrollSnapType = "";
    stops.delete(row);
    row.removeEventListener("pointerdown", stop);
    row.removeEventListener("touchstart", stop);
    row.removeEventListener("wheel", wheel);
  };
  // the page scrolled up or down over the row leaves the glide alone
  const wheel = (event: WheelEvent) => {
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) stop();
  };
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    row.scrollLeft = from + distance * easeInOutCubic(t);
    if (t < 1) frame = window.requestAnimationFrame(step);
    else stop();
  };

  row.addEventListener("pointerdown", stop, { passive: true });
  row.addEventListener("touchstart", stop, { passive: true });
  row.addEventListener("wheel", wheel, { passive: true });
  stops.set(row, stop);
  frame = window.requestAnimationFrame(step);
}

/*
 * A mouse has no sideways swipe, so on a desktop the row is dragged: it
 * follows the pointer, and on release glides on to the next page the way
 * it was dragged when the drag went a tenth of the row (or was a quick
 * flick), else back to its page. A page is the row's own width unless
 * stepOf says how far one is (the reviews: the row and the gap after its
 * last card); the last page stops where the row ends. Touch and trackpads
 * scroll the row themselves and are left to it. onPage hears where the row
 * is going. Returns the undo.
 */
export function dragToSwipe(
  row: HTMLElement,
  onPage?: (page: number) => void,
  stepOf: (row: HTMLElement) => number = (r) => r.clientWidth,
) {
  let drag: {
    id: number;
    x: number;
    left: number;
    at: number;
    page: number;
  } | null = null;
  let moved = 0;

  // pages from the step and how far the row scrolls; a row a hair wider
  // than its pages (rounding) has no extra page
  const pagesOf = (step: number, end: number) =>
    end > 1 ? Math.ceil(end / step - 0.02) + 1 : 1;

  const down = (event: PointerEvent) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    const end = row.scrollWidth - row.clientWidth;
    if (end < 1) return;
    const step = stepOf(row);

    // a glide under way stops here (and its own listener for this press
    // with it, so it cannot turn the snapping back on mid-drag)
    stops.get(row)?.();
    row.style.scrollSnapType = "none";
    drag = {
      id: event.pointerId,
      x: event.clientX,
      left: row.scrollLeft,
      at: performance.now(),
      page:
        row.scrollLeft >= end - 1
          ? pagesOf(step, end) - 1
          : Math.round(row.scrollLeft / step),
    };
    moved = 0;
    row.setPointerCapture(event.pointerId);
    row.dataset.dragging = "true";
  };

  const move = (event: PointerEvent) => {
    if (!drag || event.pointerId !== drag.id) return;
    const dx = event.clientX - drag.x;
    moved = Math.max(moved, Math.abs(dx));
    row.scrollLeft = drag.left - dx;
  };

  const up = (event: PointerEvent) => {
    if (!drag || event.pointerId !== drag.id) return;
    const end = row.scrollWidth - row.clientWidth;
    const step = stepOf(row);
    // a cancelled drag goes back to its page
    const dx = event.type === "pointercancel" ? 0 : event.clientX - drag.x;
    const flick =
      Math.abs(dx) > 20 && Math.abs(dx) / (performance.now() - drag.at) > 0.6;
    const pages = pagesOf(step, end);
    let page = drag.page;
    if (Math.abs(dx) > row.clientWidth * 0.1 || flick) page += dx < 0 ? 1 : -1;
    page = Math.max(0, Math.min(pages - 1, page));

    if (row.hasPointerCapture(event.pointerId)) {
      row.releasePointerCapture(event.pointerId);
    }
    delete row.dataset.dragging;
    drag = null;
    glideTo(row, Math.min(page * step, end));
    onPage?.(page);
  };

  // a drag is not a click on whatever it started on
  const click = (event: MouseEvent) => {
    if (moved <= 6) return;
    event.preventDefault();
    event.stopPropagation();
    moved = 0;
  };

  row.addEventListener("pointerdown", down);
  row.addEventListener("pointermove", move);
  row.addEventListener("pointerup", up);
  row.addEventListener("pointercancel", up);
  row.addEventListener("click", click, true);

  return () => {
    row.removeEventListener("pointerdown", down);
    row.removeEventListener("pointermove", move);
    row.removeEventListener("pointerup", up);
    row.removeEventListener("pointercancel", up);
    row.removeEventListener("click", click, true);
  };
}
