# Sticky header transition jump

- Symptom: the header visibly jumped when switching between its Hero and sticky styles.
- Root cause: the scroll state simultaneously changed `position` from `absolute` to `fixed` and height from `auto` to `64rem`; neither change could be smoothly interpolated as configured.
- Fix: keep the header fixed in both visual states, use explicit `69rem` and `64rem` heights, animate numeric padding and shadow values, and debounce subpixel scroll changes with an `8px` threshold.
- Regression coverage: `tests/sticky-header.test.mjs` verifies both locale headers preserve the animatable geometry pattern.
