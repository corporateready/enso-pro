/*
 * The pages of ENSO Notifications, ENSO's app for Google Chat, that its
 * Google Workspace Marketplace listing and Google's consent screen link to:
 * what it is and where to get help, its privacy policy and its terms. In
 * English only, as the listing is (2026-11-26).
 *
 * Until this site replaces it on enso.ro, the current site
 * (corporateready/enso_living) serves the same pages at the same addresses,
 * from its own copy of these words: lib/enso-notifications.js. Change the
 * two together.
 *
 * What the privacy policy says the app receives and keeps is what its
 * backend does (ENSO Operations: app/api/google-chat/events in
 * corporateready/sops). Change that together with them too.
 */

import type { LanguageOption } from "../language-menu";

export type Inline = string | { href: string; text: string };

export type Block =
  | { kind: "p"; text: readonly Inline[] }
  | { kind: "h2"; text: string }
  | { kind: "list"; items: readonly (readonly Inline[])[] };

export type LegalDocument = {
  path: string;
  /* its name in the pages' own menu */
  label: string;
  title: string;
  metaTitle: string;
  description: string;
  lead: readonly Inline[];
  updated?: { date: string; dateTime: string };
  blocks: readonly Block[];
};

const base = "/en/enso-notifications";

export const ensoNotificationsPaths = {
  about: base,
  privacy: `${base}/privacy-policy`,
  terms: `${base}/terms-and-conditions`,
} as const;

const mail = { href: "mailto:corporate@enso.ro", text: "corporate@enso.ro" };
const privacyLink = { href: ensoNotificationsPaths.privacy, text: "privacy policy" };
const termsLink = { href: ensoNotificationsPaths.terms, text: "terms and conditions" };
const provider =
  "Kairos Way SRL (mun. Chișinău, str. Calea Ieșilor 6, MD-2069, Republic of Moldova)";
const updated = { date: "26 November 2026", dateTime: "2026-11-26" };

const about: LegalDocument = {
  path: ensoNotificationsPaths.about,
  label: "ENSO Notifications",
  title: "ENSO Notifications",
  metaTitle: "ENSO Notifications · ENSO DEVELOPMENT",
  description:
    "ENSO's app for Google Chat: notifications from ENSO's own tools for ENSO's team and partners.",
  lead: [
    "ENSO Notifications is ENSO's app for Google Chat. It delivers notifications from ENSO's own tools to ENSO's team and partners, in a direct message.",
  ],
  blocks: [
    { kind: "h2", text: "What it sends" },
    {
      kind: "list",
      items: [
        ["From ENSO CPQ, ENSO's sales system: contract and report alerts."],
        [
          "From ENSO Operations, ENSO's operations system: SOP assignments, test reminders and approval requests.",
        ],
      ],
    },
    {
      kind: "p",
      text: [
        "The app only sends. It can't see your other chats, and it doesn't act on your behalf.",
      ],
    },
    { kind: "h2", text: "Who receives notifications" },
    {
      kind: "p",
      text: [
        "Anyone can add the app, but it sends notifications only to the people ENSO has enabled. If ENSO hasn't enabled your address, the app tells you so when you add it, and sends you nothing.",
      ],
    },
    { kind: "h2", text: "Getting started" },
    {
      kind: "list",
      items: [
        [
          "Install the app from the link your ENSO contact sends you. It then appears under Apps in Google Chat.",
        ],
        [
          "The app greets you in a direct message. Type “help” to see what it does, or “demo” to see a sample notification.",
        ],
      ],
    },
    { kind: "h2", text: "Stopping notifications" },
    {
      kind: "p",
      text: [
        "Remove the app from Google Chat, or ask your ENSO contact to take your address off the list.",
      ],
    },
    { kind: "h2", text: "Help" },
    {
      kind: "p",
      text: ["Write to ", mail, " with any question about the app."],
    },
    {
      kind: "p",
      text: [
        "How the app handles your data is in its ",
        privacyLink,
        ", and the rules for using it are in its ",
        termsLink,
        `. The app is provided by ${provider}.`,
      ],
    },
  ],
};

const privacy: LegalDocument = {
  path: ensoNotificationsPaths.privacy,
  label: "Privacy policy",
  title: "Privacy policy for ENSO Notifications",
  metaTitle: "Privacy policy · ENSO Notifications",
  description:
    "What ENSO Notifications, ENSO's app for Google Chat, receives from Google, what it keeps, and why.",
  lead: [
    "This policy explains what ENSO Notifications, ENSO's app for Google Chat, receives from Google, what it keeps, and why.",
  ],
  updated,
  blocks: [
    { kind: "h2", text: "Who is responsible" },
    {
      kind: "p",
      text: [
        `${provider} provides ENSO Notifications and is responsible for the data it handles. Contact: `,
        mail,
        ".",
      ],
    },
    {
      kind: "p",
      text: [
        "This policy covers the app only. ENSO's websites and other services have their own policies.",
      ],
    },
    { kind: "h2", text: "What the app receives from Google" },
    {
      kind: "p",
      text: ["When you add the app or write to it, Google Chat sends it:"],
    },
    {
      kind: "list",
      items: [
        ["your Google account's email address, name and ID;"],
        ["the ID of your direct message with the app;"],
        ["the text of what you write to the app."],
      ],
    },
    {
      kind: "p",
      text: [
        "To know who you are, the app asks Google for your email address and basic profile (the userinfo.email and userinfo.profile permissions), and for nothing else. It can't see your other chats, your email, your files or your contacts.",
      ],
    },
    { kind: "h2", text: "What the app keeps" },
    {
      kind: "p",
      text: [
        "If ENSO has enabled your address, the app keeps your email address and the ID of your direct message with it, with the time it last heard from you, so that ENSO's tools can send you notifications there.",
      ],
    },
    {
      kind: "p",
      text: [
        "It doesn't keep your name or what you write to it: your messages are read only to answer them. If ENSO hasn't enabled your address, the app keeps nothing about you.",
      ],
    },
    { kind: "h2", text: "How the data is used" },
    {
      kind: "p",
      text: [
        "Only to deliver notifications from ENSO's tools (ENSO CPQ and ENSO Operations) to you, and to answer what you write to the app. The notifications are about work you take part in with ENSO, for example a contract or an SOP assigned to you.",
      ],
    },
    {
      kind: "p",
      text: [
        "We don't sell the data, use it for advertising or share it, except with the providers that host ENSO's systems and process it on our behalf (Railway and Supabase), and with Google, which delivers the messages in Google Chat.",
      ],
    },
    {
      kind: "p",
      text: [
        "ENSO Notifications' use and transfer to any other app of information received from Google APIs will adhere to the ",
        {
          href: "https://developers.google.com/terms/api-services-user-data-policy",
          text: "Google API Services User Data Policy",
        },
        ", including the Limited Use requirements.",
      ],
    },
    { kind: "h2", text: "How long it is kept" },
    {
      kind: "p",
      text: [
        "As long as the app is in your Google Chat and ENSO sends you notifications. When you remove the app, the record of your direct message with it is deleted. You can also ask us to delete it at any time.",
      ],
    },
    {
      kind: "p",
      text: [
        "The notifications themselves stay in your Google Chat, under Google's terms, until you or your organization delete them.",
      ],
    },
    { kind: "h2", text: "Security" },
    {
      kind: "p",
      text: [
        "The data travels encrypted (HTTPS) and is stored in ENSO's systems, which only the people who run them can access.",
      ],
    },
    { kind: "h2", text: "Your rights" },
    {
      kind: "p",
      text: [
        "You can ask to see the data the app keeps about you, to correct it or to delete it, and you can object to its use. Write to ",
        mail,
        ". If you think we handle your data unlawfully, you can complain to the data protection authority where you live or work.",
      ],
    },
    { kind: "h2", text: "Children" },
    {
      kind: "p",
      text: ["The app is meant for adults who work with ENSO, not for children."],
    },
    { kind: "h2", text: "Changes" },
    {
      kind: "p",
      text: [
        "If this policy changes, we'll update this page and the date at its top. The rules for using the app are in its ",
        termsLink,
        ".",
      ],
    },
  ],
};

const terms: LegalDocument = {
  path: ensoNotificationsPaths.terms,
  label: "Terms and conditions",
  title: "Terms and conditions for ENSO Notifications",
  metaTitle: "Terms and conditions · ENSO Notifications",
  description:
    "The terms for adding and using ENSO Notifications, ENSO's app for Google Chat.",
  lead: [
    "These terms apply when you add ENSO Notifications, ENSO's app for Google Chat, or use it.",
  ],
  updated,
  blocks: [
    { kind: "h2", text: "The app" },
    {
      kind: "p",
      text: [
        `${provider} provides ENSO Notifications free of charge. It delivers notifications from ENSO's own tools to ENSO's team and partners in Google Chat.`,
      ],
    },
    {
      kind: "p",
      text: [
        "Anyone can add the app, but only people ENSO has enabled receive notifications. ENSO decides who is enabled and can change that at any time.",
      ],
    },
    { kind: "h2", text: "Using it" },
    {
      kind: "list",
      items: [
        ["Use the app only to receive ENSO's notifications."],
        [
          "Notifications can contain ENSO business information meant for you. Treat them as confidential and don't pass them on to people who shouldn't see them.",
        ],
        [
          "Don't try to disrupt the app, get around its limits or reach data that isn't yours.",
        ],
      ],
    },
    { kind: "h2", text: "Availability" },
    {
      kind: "p",
      text: [
        "We provide the app as it is, and we may change, pause or stop it at any time. We try to deliver every notification, but we can't promise that each one arrives, or arrives on time: the record that counts is always in the ENSO tool that sent it.",
      ],
    },
    { kind: "h2", text: "Liability" },
    {
      kind: "p",
      text: [
        "To the extent the law allows, Kairos Way SRL isn't liable for indirect or consequential loss arising from the app, or from a notification that is late, missing or wrong. Nothing in these terms limits liability that the law doesn't allow to be limited.",
      ],
    },
    { kind: "h2", text: "Google Chat" },
    {
      kind: "p",
      text: [
        "The app runs in Google Chat, so Google's terms for Google Chat and your Google account apply too. How the app handles your data is in its ",
        privacyLink,
        ".",
      ],
    },
    { kind: "h2", text: "Changes and questions" },
    {
      kind: "p",
      text: [
        "If these terms change, we'll update this page and the date at its top. Questions: ",
        mail,
        ".",
      ],
    },
  ],
};

export const ensoNotifications = { about, privacy, terms } as const;

/* the pages' own menu, in this order */
export const ensoNotificationsPages = [about, privacy, terms] as const;

/* The header's language menus: the pages are in English only, so the other
   languages lead to their home page. */
export function ensoNotificationsLanguages(path: string): readonly LanguageOption[] {
  return [
    { code: "ro", name: "Română", href: "/" },
    { code: "ru", name: "Русский", href: "/ru" },
    { code: "en", name: "English", href: path },
  ];
}
