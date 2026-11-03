"use client";

import { useEffect } from "react";

const MARKED = "[data-reveal], [data-reveal-group]";
// Things come in once they are this far onto the screen, not at its very
// edge: 5% down from the top (on the way back up), 12% up from the bottom.
const BAND_TOP = 0.05;
const BAND_BOTTOM = 0.88;

/*
 * Scroll reveals for the whole site. An element marked data-reveal comes in
 * every time it scrolls into view: it rises into place when it arrives from
 * below ("in") and settles down into it when it arrives from above, on the
 * way back up ("from-above"); once it is completely off the screen it is
 * hidden again, ready for the next time. The CSS is in globals.css.
 *
 * A data-reveal-group brings in all the data-reveal elements inside it
 * together, each after its own --reveal-delay (revealDelay), and carries
 * data-revealed itself so a section can hang its own animation on it (the
 * history timeline and the count-up figures do).
 *
 * An element (or group) marked data-reveal-once comes in the first time only
 * and then stays; one marked data-reveal-edge comes in as soon as any of it is
 * on screen, without waiting for the band (the footer logo has both, as
 * enso.ro does it).
 *
 * Nothing is hidden until this has run (the CSS keys off html[data-motion]),
 * so without JavaScript, or with reduced motion, the page shows as it is;
 * and whatever is on screen when it starts just shows ("instant").
 */
export default function ScrollReveal() {
  useEffect(() => {
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const tracked = new Set<Element>();
    // which way the page last moved; until it moves, where the element is
    let lastY = window.scrollY;
    let goingUp: boolean | null = null;

    const withMembers = (element: Element) =>
      element.hasAttribute("data-reveal-group")
        ? [element, ...element.querySelectorAll("[data-reveal]")]
        : [element];

    const mark = (element: Element, how: "in" | "from-above" | "instant") =>
      withMembers(element).forEach((item) =>
        item.setAttribute("data-revealed", how),
      );

    const hide = (element: Element) =>
      withMembers(element).forEach((item) =>
        item.removeAttribute("data-revealed"),
      );

    const comeIn = (element: Element) => {
      if (element.hasAttribute("data-revealed")) return;

      const { top, bottom } = element.getBoundingClientRect();
      const fromAbove = goingUp ?? top + bottom < window.innerHeight;
      mark(element, fromAbove ? "from-above" : "in");
    };

    const inBand = (element: Element) => {
      const { top, bottom } = element.getBoundingClientRect();
      return (
        bottom > window.innerHeight * BAND_TOP &&
        top < window.innerHeight * BAND_BOTTOM
      );
    };

    const band = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) comeIn(entry.target);
        }
      },
      {
        rootMargin: `-${BAND_TOP * 100}% 0px -${Math.round((1 - BAND_BOTTOM) * 100)}% 0px`,
      },
    );

    // completely off the screen: hidden again, so it comes in next time
    // (unless it is a once-only); on it at all: in, for the edge-triggered
    const screen = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const element = entry.target;
        if (entry.isIntersecting) {
          if (element.hasAttribute("data-reveal-edge")) comeIn(element);
        } else if (!element.hasAttribute("data-reveal-once")) {
          hide(element);
        }
      }
    });

    const track = (element: Element) => {
      if (tracked.has(element)) return;

      // a group's members come and go with their group; one added to a
      // group that is already in just shows
      const group = element.parentElement?.closest("[data-reveal-group]");
      if (group && !element.hasAttribute("data-reveal-group")) {
        if (group.hasAttribute("data-revealed")) {
          element.setAttribute("data-revealed", "instant");
        }
        return;
      }

      tracked.add(element);
      const { top, bottom } = element.getBoundingClientRect();
      if (bottom > 0 && top < window.innerHeight) mark(element, "instant");

      band.observe(element);
      screen.observe(element);
    };

    const untrack = (element: Element) => {
      tracked.delete(element);
      band.unobserve(element);
      screen.unobserve(element);
    };

    // A fast fling can carry something into the band and stop there between
    // two observer checks: once the scrolling settles, bring it in. And at the
    // very end of the page whatever is on screen comes in, band or not: the
    // footer's last lines can never scroll up past the band's bottom edge.
    let settleTimer = 0;
    const settle = () => {
      const y = window.scrollY;
      if (y !== lastY) goingUp = y < lastY;
      lastY = y;

      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        const atEnd =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 2;

        tracked.forEach((element) => {
          if (element.hasAttribute("data-revealed")) return;

          const { top, bottom } = element.getBoundingClientRect();
          const onScreen = bottom > 0 && top < window.innerHeight;
          const edge = element.hasAttribute("data-reveal-edge");
          if (inBand(element) || ((atEnd || edge) && onScreen)) comeIn(element);
        });
      }, 120);
    };
    window.addEventListener("scroll", settle, { passive: true });

    const scan = (root: ParentNode) =>
      root.querySelectorAll(MARKED).forEach(track);

    scan(document);
    document.documentElement.setAttribute("data-motion", "");

    // a page rendered later (switching language) brings its own marked
    // elements; the ones it replaces stop being watched
    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches(MARKED)) track(node);
          scan(node);
        });
        record.removedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          [node, ...node.querySelectorAll(MARKED)].forEach(untrack);
        });
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("scroll", settle);
      window.clearTimeout(settleTimer);
      band.disconnect();
      screen.disconnect();
      mutations.disconnect();
      document.documentElement.removeAttribute("data-motion");
    };
  }, []);

  return null;
}
