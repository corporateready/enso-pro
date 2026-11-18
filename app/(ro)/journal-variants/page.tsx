import type { Metadata } from "next";
import { notFound } from "next/navigation";

import JournalVariants from "../../components/journal-variants";

export const metadata: Metadata = {
  title: "ENSO · journal, variante",
  robots: { index: false, follow: false },
};

// Ways to lay the articles out in the journal block, for the client to choose
// from. A working page: it is there on the dev server only, a 404 in a build.
export default function JournalVariantsPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return <JournalVariants />;
}
