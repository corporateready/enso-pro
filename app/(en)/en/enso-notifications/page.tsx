import type { Metadata } from "next";

import LegalPage from "../../../components/legal-page";
import {
  ensoNotifications,
  ensoNotificationsLanguages,
} from "../../../components/legal-page/enso-notifications";
import Footer from "../../../components/en-page/footer";
import Hero from "../../../components/en-page/hero";

const doc = ensoNotifications.about;

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.description,
};

// What ENSO Notifications, ENSO's app for Google Chat, is, and where to get help: the page its Marketplace listing gives for support (components/legal-page).
export default function EnsoNotifications() {
  return (
    <div id="top" className="flex flex-col items-center w-full min-h-full">
      <Hero page={{ home: "/en", languages: ensoNotificationsLanguages(doc.path) }} />
      <main className="flex flex-col w-full">
        <LegalPage doc={doc} />
      </main>
      <Footer home="/en" />
    </div>
  );
}
