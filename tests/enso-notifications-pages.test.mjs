import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

// The pages of ENSO Notifications, ENSO's app for Google Chat: its Google
// Workspace Marketplace listing and Google's consent screen link to them, so
// their addresses must not move and the privacy policy must say what Google
// requires.
const pages = [
  { file: "app/(en)/en/enso-notifications/page.tsx", doc: "about" },
  { file: "app/(en)/en/enso-notifications/privacy-policy/page.tsx", doc: "privacy" },
  { file: "app/(en)/en/enso-notifications/terms-and-conditions/page.tsx", doc: "terms" },
];

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("each page sets its document between the site's header and footer", async () => {
  for (const page of pages) {
    const source = await read(page.file);
    assert.match(source, new RegExp(`ensoNotifications\\.${page.doc};`), `${page.file} shows ${page.doc}`);
    assert.match(source, /<Hero page=\{\{ home: "\/en", languages: ensoNotificationsLanguages\(doc\.path\) \}\} \/>/);
    assert.match(source, /<LegalPage doc=\{doc\} \/>/);
    assert.match(source, /<Footer home="\/en" \/>/);
  }
});

test("the addresses the listing links to stay where they are", async () => {
  const content = await read("app/components/legal-page/enso-notifications.ts");
  assert.match(content, /const base = "\/en\/enso-notifications";/);
  assert.match(content, /privacy: `\$\{base\}\/privacy-policy`/);
  assert.match(content, /terms: `\$\{base\}\/terms-and-conditions`/);
});

test("the privacy policy names who is responsible and carries Google's Limited Use statement", async () => {
  const content = await read("app/components/legal-page/enso-notifications.ts");
  assert.match(content, /Kairos Way SRL \(mun\. Chișinău, str\. Calea Ieșilor 6, MD-2069, Republic of Moldova\)/);
  assert.match(content, /mailto:corporate@enso\.ro/);
  assert.match(content, /userinfo\.email and userinfo\.profile/);
  assert.match(content, /https:\/\/developers\.google\.com\/terms\/api-services-user-data-policy/);
  assert.match(content, /including the Limited Use requirements/);
});
