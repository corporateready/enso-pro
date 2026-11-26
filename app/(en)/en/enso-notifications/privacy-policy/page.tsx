import type { Metadata } from "next";

import LegalPage from "../../../../components/legal-page";
import {
  ensoNotifications,
  ensoNotificationsLanguages,
} from "../../../../components/legal-page/enso-notifications";
import Footer from "../../../../components/en-page/footer";
import Hero from "../../../../components/en-page/hero";

const doc = ensoNotifications.privacy;

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.description,
};

// The app's privacy policy, which its Marketplace listing and Google's consent screen link to (components/legal-page).
export default function EnsoNotificationsPrivacy() {
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
