# Debug report: RO hero full-slide animation

- Symptom: the third blue slide animation was not visible across the full responsive section.
- Root cause: the page renders separate mobile and desktop carousel instances, while the animation selector and keyframes were defined only inside the mobile `max-width: 640px` media query.
- Fix: moved the shared timeline outside responsive media queries and attached it to the desktop slide's real `motionLayer` wrapper as well as the existing mobile wrapper.
- Evidence: the regression test confirms both responsive branches reference the same five-second full-slide timeline; all 10 carousel tests, ESLint, TypeScript, and `git diff --check` pass.
- Regression test: `tests/hero-carousel-dots.test.mjs`.
- Status: DONE.
