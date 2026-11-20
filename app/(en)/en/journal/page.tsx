import type { Metadata } from "next";

import JournalPage from "../../../components/journal-page";
import { journalLanguages } from "../../../components/language-menu";
import Footer from "../../../components/en-page/footer";
import Hero from "../../../components/en-page/hero";

export const metadata: Metadata = {
  title: "ENSO JOURNAL · ENSO DEVELOPMENT",
  description: "Notes on building and how we think — articles by ENSO Development.",
};

// The journal's own page, where the home page's "all articles" leads: the
// site's header and footer around every article (components/journal-page).
export default function EnglishJournal() {
  return (
    <div id="top" className="flex flex-col items-center w-full min-h-full">
      <Hero page={{ home: "/en", languages: journalLanguages }} />
      <main className="flex flex-col w-full">
        <JournalPage locale="en" />
      </main>
      <Footer home="/en" />
    </div>
  );
}
