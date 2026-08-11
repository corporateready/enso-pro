import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("RO Partners subtitle has two browser-independent lines", async () => {
  const [component, css] = await Promise.all([
    readFile(
      new URL("../app/components/ro-page/partners/index.tsx", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL(
        "../app/components/ro-page/partners/partners.module.css",
        import.meta.url,
      ),
      "utf8",
    ),
  ]);

  assert.match(
    component,
    /<span className=\{styles\.subtitleLine\}>\s*Construim alături de echipe cu reputații\s*<\/span>/,
  );
  assert.match(
    component,
    /<span className=\{styles\.subtitleLine\}>\s*confirmate — fiecare, expert în domeniul său\.\s*<\/span>/,
  );
  assert.match(
    css,
    /\.subtitleLine\s*\{[^}]*display:\s*block;[^}]*white-space:\s*nowrap;[^}]*\}/s,
  );
});
