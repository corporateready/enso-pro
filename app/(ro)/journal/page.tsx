import type { Metadata } from "next";

import JournalPage from "../../components/journal-page";
import { journalLanguages } from "../../components/language-menu";
import Footer from "../../components/ro-page/footer";
import Hero from "../../components/ro-page/hero";

export const metadata: Metadata = {
  title: "ENSO JOURNAL · ENSO DEVELOPMENT",
  description: "Note despre construcții și felul în care gândim — articolele ENSO Development.",
};

// The journal's own page, where the home page's "all articles" leads: the
// site's header and footer around every article (components/journal-page).
export default function RomanianJournal() {
  return (
    <div id="top" className="flex flex-col items-center w-full min-h-full">
      <Hero page={{ home: "/", languages: journalLanguages }} />
      <main className="flex flex-col w-full">
        <JournalPage locale="ro" />
      </main>
      <Footer home="/" />
    </div>
  );
}
