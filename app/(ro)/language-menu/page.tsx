import type { Metadata } from "next";
import { notFound } from "next/navigation";

import LanguageMenuExamples from "../../components/language-menu/examples";

export const metadata: Metadata = {
  title: "ENSO · meniul de limbi",
  robots: { index: false, follow: false },
};

// Three looks of a language menu for three languages (RO, RU, EN), for the
// client to choose from. A working page: it is there on the dev server only,
// a 404 in a build.
export default function LanguageMenuPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return <LanguageMenuExamples />;
}
