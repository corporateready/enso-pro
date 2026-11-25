import type { Metadata } from "next";

import { type ArticleId, publishedOf } from "./catalog";
import {
  articleHeads,
  articleTexts,
  journalPath,
  type Locale,
  plainText,
} from "./content";

/*
 * What an article's page tells search engines and the networks it is shared
 * to, as news sites do: its address and its other languages (canonical and
 * hreflang), a description of search-result length, the Open Graph and X
 * cards with a 1200 x 630 picture (public/journal/og/<id>.jpg: JPEG, which
 * every network reads), and the schema.org NewsArticle.
 */

/* Netlify gives a build the site's address (URL); elsewhere, its own */
export const siteUrl =
  process.env.URL ?? "https://enso-development-main.netlify.app";

const ogLocale: Record<Locale, string> = {
  ro: "ro_RO",
  ru: "ru_RU",
  en: "en_US",
};

/* at most `max` characters, cut at a word; a whole sentence needs no "…" */
const clip = (value: string, max: number) => {
  if (value.length <= max) return value;
  const cut = value.slice(0, max - 1);
  const words = cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,;:—–-]+$/, "");
  return /[.!?]$/.test(words) ? words : `${words}…`;
};

const describe = (locale: Locale, id: ArticleId) =>
  clip(plainText(articleTexts[locale][id].lead[0]), 160);

const pathOf = (locale: Locale, id: ArticleId) => `${journalPath[locale]}/${id}`;

/* the month an article is dated stands for its first day */
const publishedDate = (id: ArticleId) => {
  const published = publishedOf(id);
  return published ? `${published}-01` : undefined;
};

export function articleMetadata(locale: Locale, id: ArticleId): Metadata {
  const title = articleTexts[locale][id].title;
  const description = describe(locale, id);
  const picture = `/journal/og/${id}.jpg`;

  return {
    metadataBase: new URL(siteUrl),
    title: `${title} · ENSO JOURNAL`,
    description,
    alternates: {
      canonical: pathOf(locale, id),
      languages: {
        ro: pathOf("ro", id),
        ru: pathOf("ru", id),
        en: pathOf("en", id),
        "x-default": pathOf("ro", id),
      },
    },
    openGraph: {
      type: "article",
      url: pathOf(locale, id),
      siteName: "ENSŌ Development",
      locale: ogLocale[locale],
      title,
      description,
      publishedTime: publishedDate(id),
      images: [{ url: picture, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [picture],
    },
  };
}

export function articleJsonLd(locale: Locale, id: ArticleId) {
  const organization = {
    "@type": "Organization",
    name: "ENSŌ Development",
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/journal/enso-avatar.png`,
    },
  };

  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: articleTexts[locale][id].title,
    description: describe(locale, id),
    image: [`${siteUrl}${articleHeads[id].src}`, `${siteUrl}/journal/og/${id}.jpg`],
    datePublished: publishedDate(id),
    inLanguage: locale,
    mainEntityOfPage: `${siteUrl}${pathOf(locale, id)}`,
    author: organization,
    publisher: organization,
  };
}

/* the JSON-LD as the page writes it (Next.js's own pattern: "<" escaped) */
export const jsonLdHtml = (data: object) => ({
  __html: JSON.stringify(data).replace(/</g, "\\u003c"),
});
