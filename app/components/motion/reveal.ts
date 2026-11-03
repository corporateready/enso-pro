import type { CSSProperties } from "react";

/**
 * Style for a [data-reveal] element that should come in `ms` after whatever
 * reveals it (itself, or the data-reveal-group around it): the stagger in a
 * row of cards. See scroll-reveal.tsx.
 */
export function revealDelay(ms: number): CSSProperties {
  return { "--reveal-delay": `${ms}ms` } as CSSProperties;
}
