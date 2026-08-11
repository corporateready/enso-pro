import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

for (const locale of ["ro-page", "en-page"]) {
  test(`${locale} Projects keeps the shared mobile layout`, async () => {
    const css = await readFile(
      new URL(
        `../app/components/${locale}/projects/projects.module.css`,
        import.meta.url,
      ),
      "utf8",
    );
    const component = await readFile(
      new URL(
        `../app/components/${locale}/projects/index.tsx`,
        import.meta.url,
      ),
      "utf8",
    );

    assert.match(css, /^@media screen and \(max-width: 640px\) \{/);
    assert.match(css, /padding: 48rem 0 0;/);
    assert.match(css, /font-size: 33rem;/);
    assert.match(css, /font-weight: 600;/);
    assert.match(css, /white-space: nowrap;/);
    assert.match(css, /scroll-padding-inline: 15rem;/);
    assert.doesNotMatch(css, /\n\s*(?:width|height|margin): -?\d+px/);
    assert.match(component, /sizes="\(max-width: 640px\) 68vw, 13\.81vw"/);
    assert.match(component, /quality=\{100\}/);
  });
}

test("Projects keeps a permanently rendered progress scrollbar", async () => {
  const source = await readFile(
    new URL("../app/components/projects-scroller.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /<div className=\{scrollbarClassName\} aria-hidden="true">/);
  assert.match(source, /width: `\$\{thumbWidth\}%`/);
  assert.match(source, /left: `\$\{thumbOffset\}%`/);
});
