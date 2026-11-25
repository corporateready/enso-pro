"use client";

import Image from "next/image";
import { useState } from "react";

import * as en from "../en-page/journal";
import { journalPath } from "../journal-article/content";
import { revealDelay } from "../motion/reveal";
import * as ro from "../ro-page/journal";
import * as ru from "../ru-page/journal";
import styles from "./journal-page.module.css";

/*
 * The journal's own page (app/(ro)/journal, /ru/journal, /en/journal), where
 * the home page's "all articles" leads: every article, newest first, three
 * to a row on a desktop and one under another on a phone, with the home
 * block's categories to filter them. The articles are the home block's own
 * list (ro-page/journal and the others), so an article added there is here
 * too. Nine are shown at first and "more" brings the next nine, so the page
 * stays a reasonable length however many there come to be; a category with
 * nothing in it yet says so.
 */

type Locale = "ro" | "ru" | "en";

const PAGE_SIZE = 9;

const content: Record<
  Locale,
  {
    articles: readonly ro.JournalArticle[];
    categories: typeof ro.journalCategories;
    // the home block's subtitle, which Figma words differently on phones
    subtitle: { desktop: string; phone: string };
    filters: string;
    more: string;
    empty: string;
  }
> = {
  ro: {
    articles: ro.siteArticles,
    categories: ro.journalCategories,
    subtitle: {
      desktop: "Note despre construcții și felul în care gândim",
      phone: "Despre cum construim și cum gândim",
    },
    filters: "Filtrează articolele",
    more: "Mai multe articole",
    empty: "În această categorie nu sunt încă articole.",
  },
  ru: {
    articles: ru.siteArticles,
    categories: ru.journalCategories,
    subtitle: {
      desktop: "Заметки о строительстве и о том, как мы думаем",
      phone: "О том, как мы строим и как думаем",
    },
    filters: "Фильтр статей журнала",
    more: "Ещё статьи",
    empty: "В этой категории статей пока нет.",
  },
  en: {
    articles: en.siteArticles,
    categories: en.journalCategories,
    subtitle: {
      desktop: "Notes on building and how we think",
      phone: "Notes on building and how we think",
    },
    filters: "Filter journal articles",
    more: "More articles",
    empty: "There are no articles in this category yet.",
  },
};

function ArticleCard({
  article,
  index,
  href,
}: {
  article: ro.JournalArticle;
  index: number;
  /* its own page (journal-article) */
  href: string;
}) {
  // the picture in the leading article's shape, the same for every card
  const cover = article.cover ?? {
    src: article.src,
    width: article.width,
    height: article.height,
  };

  return (
    <article
      id={`journal-${article.id}`}
      className={styles.card}
      data-reveal
      // one after another along a desktop's row of three
      style={revealDelay((index % 3) * 100)}
    >
      {/* the whole card leads to the article; the title is the keyboard's link */}
      <a className={styles.cardCover} href={href} tabIndex={-1} aria-hidden="true" />
      <div className={styles.picture}>
        <Image
          className={styles.image}
          src={cover.src}
          width={cover.width}
          height={cover.height}
          sizes="(min-width: 641px) 27vw, 92vw"
          // the first row is on the screen as the page opens
          loading={index < 3 ? "eager" : undefined}
          fetchPriority={index === 0 ? "high" : undefined}
          alt=""
        />
      </div>
      <div className={styles.copy}>
        <div className={styles.meta}>
          <span className={styles.badge}>{article.badge}</span>
          <span className={styles.date}>
            <time dateTime={article.dateTime}>{article.date}</time> ·{" "}
            {article.readTime}
          </span>
        </div>
        {/* the line breaks written into the titles are the home block's */}
        <h2 className={styles.cardTitle}>
          <a className={styles.cardLink} href={href}>
            {article.title}
          </a>
        </h2>
      </div>
    </article>
  );
}

export default function JournalPage({ locale }: { locale: Locale }) {
  const text = content[locale];
  const [category, setCategory] = useState<ro.JournalCategory>("all");
  const [shown, setShown] = useState(PAGE_SIZE);
  // a choice of category brings its cards in; the first ones come with the
  // page's own reveal
  const [hasFiltered, setHasFiltered] = useState(false);

  const matching = text.articles.filter(
    (article) => category === "all" || article.category === category,
  );
  const visible = matching.slice(0, shown);

  return (
    <section
      id="journal"
      className={styles.section}
      aria-labelledby="journal-page-title"
    >
      <header className={styles.header}>
        <h1 id="journal-page-title" className={styles.title} data-reveal>
          ENSO JOURNAL
        </h1>
        <p className={styles.subtitle} data-reveal style={revealDelay(100)}>
          <span className={styles.subtitleDesktop}>{text.subtitle.desktop}</span>
          <span className={styles.subtitlePhone}>{text.subtitle.phone}</span>
        </p>
      </header>

      <div
        className={styles.filters}
        data-reveal-group
        aria-label={text.filters}
      >
        {text.categories.map((item, index) => (
          <button
            className={`${styles.filter} motion-button ${
              category === item.id ? styles.filterActive : ""
            }`}
            key={item.id}
            type="button"
            aria-pressed={category === item.id}
            aria-controls="journal-page-articles"
            data-reveal
            style={revealDelay(150 + index * 70)}
            onClick={(event) => {
              setCategory(item.id);
              setShown(PAGE_SIZE);
              setHasFiltered(true);
              // on a phone the row is swiped: the chosen one comes into view
              event.currentTarget.scrollIntoView({
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                  .matches
                  ? "auto"
                  : "smooth",
                block: "nearest",
                inline: "center",
              });
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div id="journal-page-articles" aria-live="polite">
        {visible.length > 0 ? (
          <div
            className={`${styles.grid} ${hasFiltered ? styles.gridChanged : ""}`}
            key={category}
          >
            {visible.map((article, index) => (
              <ArticleCard
                article={article}
                index={index}
                href={`${journalPath[locale]}/${article.id}`}
                key={article.id}
              />
            ))}
          </div>
        ) : (
          <p className={styles.empty}>{text.empty}</p>
        )}
      </div>

      {matching.length > shown && (
        <button
          className={`${styles.more} motion-button`}
          type="button"
          onClick={() => setShown((count) => count + PAGE_SIZE)}
        >
          {text.more}
        </button>
      )}
    </section>
  );
}
