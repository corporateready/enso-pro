import type { Metadata } from "next";
import { notFound } from "next/navigation";

import JournalArticle from "../../../../components/journal-article";
import {
  articleIds,
  articleLanguages,
  isArticleId,
  journalPath,
} from "../../../../components/journal-article/content";
import {
  articleJsonLd,
  articleMetadata,
  jsonLdHtml,
} from "../../../../components/journal-article/seo";
import Footer from "../../../../components/ru-page/footer";
import Hero from "../../../../components/ru-page/hero";

// An article's own page, where the journal's cards lead: the site's header
// and footer round it (components/journal-article). The journal's articles
// are built ahead; any other address is the 404 (notFound below; the
// dynamicParams switch left the English ones 404 in the dev server).
export function generateStaticParams() {
  return articleIds.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isArticleId(slug)) return {};

  return articleMetadata("ru", slug);
}

export default async function RussianArticle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isArticleId(slug)) notFound();

  return (
    <div id="top" className="flex flex-col items-center w-full min-h-full">
      <Hero
        page={{
          home: "/ru",
          languages: articleLanguages(slug),
          journal: journalPath.ru,
        }}
      />
      <main className="flex flex-col w-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdHtml(articleJsonLd("ru", slug))}
        />
        <JournalArticle locale="ru" id={slug} />
      </main>
      <Footer home="/ru" />
    </div>
  );
}
