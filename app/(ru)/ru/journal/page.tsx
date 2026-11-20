import type { Metadata } from "next";

import JournalPage from "../../../components/journal-page";
import { journalLanguages } from "../../../components/language-menu";
import Footer from "../../../components/ru-page/footer";
import Hero from "../../../components/ru-page/hero";

export const metadata: Metadata = {
  title: "ENSO JOURNAL · ENSO DEVELOPMENT",
  description: "Заметки о строительстве и о том, как мы думаем — статьи ENSO Development.",
};

// The journal's own page, where the home page's "all articles" leads: the
// site's header and footer around every article (components/journal-page).
export default function RussianJournal() {
  return (
    <div id="top" className="flex flex-col items-center w-full min-h-full">
      <Hero page={{ home: "/ru", languages: journalLanguages }} />
      <main className="flex flex-col w-full">
        <JournalPage locale="ru" />
      </main>
      <Footer home="/ru" />
    </div>
  );
}
