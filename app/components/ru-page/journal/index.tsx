"use client";

import Image from "next/image";
import Link from "next/link";
import { type CSSProperties, useState } from "react";

import { revealDelay } from "../../motion/reveal";
import styles from "../../ro-page/journal/journal.module.css";

export type JournalCategory = "all" | "buying-guide" | "market" | "inside-enso";

export type JournalArticle = {
  id: string;
  category: Exclude<JournalCategory, "all">;
  badge: string;
  title: string;
  date: string;
  readTime: string;
  src: string;
  width: number;
  height: number;
  /* the picture in the leading article's shape (1.27 : 1), for the cards of
     the journal's own page (components/journal-page); src where missing */
  cover?: { src: string; width: number; height: number };
};

export const journalCategories: readonly {
  id: JournalCategory;
  label: string;
}[] = [
  { id: "all", label: "Все" },
  { id: "buying-guide", label: "Гид покупателя" },
  { id: "market", label: "Рынок" },
  { id: "inside-enso", label: "Изнутри" },
];

// Newest first. Whichever comes first among those shown is the leading
// article, large on the left; up to four more go beside it (two as cards,
// three or four as lower rows), and any beyond that are left to "all
// articles". So the block is one screen tall however many there are, and a
// filter's result is laid out the same way. The two older articles'
// pictures are squares cut from photographs Figma sets as collages with a
// caption.
const maxShown = 5;

export const siteArticles: readonly JournalArticle[] = [
  {
    id: "bim-standard",
    category: "inside-enso",
    badge: "Изнутри",
    // Line breaks as set in Figma; the phone cards keep them (pre-line).
    title:
      "Международный стандарт\nBIM\u00a0— в\u00a0каждом проекте\nENSŌ Development",
    date: "3 июня",
    readTime: "3 мин чтения",
    src: "/journal-post-image.avif",
    width: 3200,
    height: 2520,
    cover: { src: "/journal-post-image.avif", width: 3200, height: 2520 },
  },
  {
    id: "eminescu-offices",
    category: "buying-guide",
    badge: "Гид покупателя",
    title:
      "ENSŌ Development завершает выход из инвестиции в\u00a0Eminescu Offices",
    date: "2 июня",
    readTime: "2 мин чтения",
    src: "/journal-eminescu-square.avif",
    width: 690,
    height: 690,
    cover: { src: "/journal-eminescu.avif", width: 690, height: 543 },
  },
  {
    id: "moldova-growth-leader",
    category: "market",
    badge: "Рынок",
    title: "Молдова\u00a0— №1 в\u00a0Европе\nпо\u00a0росту рынка жилья,\n2025",
    date: "2 июня",
    readTime: "3 мин чтения",
    src: "/journal-moldova-square.avif",
    width: 588,
    height: 588,
    cover: { src: "/journal-moldova.avif", width: 746, height: 588 },
  },
];

function ArticleVisual({
  article,
  leading,
}: {
  article: JournalArticle;
  leading: boolean;
}) {
  return (
    <article
      id={`journal-${article.id}`}
      className={`${styles.card} ${leading ? styles.featureCard : styles.articleCard}`}
    >
      {/* the whole card leads to the article; the title is the keyboard's link */}
      <a
        className={styles.cardCover}
        href={`/ru/journal/${article.id}`}
        tabIndex={-1}
        aria-hidden="true"
      />
      <div className={styles.imageArea}>
        <Image
          className={styles.sourceImage}
          src={article.src}
          width={article.width}
          height={article.height}
          sizes={
            leading
              ? "(min-width: 641px) 30vw, 92vw"
              : "(min-width: 641px) 14vw, 32vw"
          }
          alt=""
        />
      </div>
      <div className={styles.articleCopy}>
        <span className={styles.articleCategory}>{article.badge}</span>
        <span className={styles.articleMeta}>
          {article.date}
          <span className={styles.readTime}> · {article.readTime}</span>
        </span>
        <h3>
          <a className={styles.cardLink} href={`/ru/journal/${article.id}`}>
            {article.title}
          </a>
        </h3>
        {leading && (
          <a
            className={styles.readArticle}
            href={`/ru/journal/${article.id}`}
            // the card's title already leads there: one stop for the keyboard
            tabIndex={-1}
            aria-hidden="true"
          >
            Читать статью <span className="inter-arrow">→</span>
          </a>
        )}
      </div>
    </article>
  );
}

export default function Journal({
  articles = siteArticles,
  layout = "side",
}: {
  /* the block's own articles unless a working page shows it with more */
  articles?: readonly JournalArticle[];
  /* "side": the leading article on the left, the others in a column on its
     right (the site's). "rows": the leading one across the top, the others
     in a row under it; desktop only, shown on the working page. */
  layout?: "side" | "rows";
}) {
  const [activeCategory, setActiveCategory] =
    useState<JournalCategory>("all");

  const visibleArticles = articles
    .filter(
      (article) =>
        activeCategory === "all" || article.category === activeCategory,
    )
    .slice(0, maxShown);
  // how many go beside the leading one, and in how many rows
  const beside = visibleArticles.length - 1;
  const layoutClass = [
    beside > 2 ? styles.cardsCompact : beside < 1 ? styles.cardsSingle : "",
    layout === "rows" && beside > 0 ? styles.cardsRows : "",
  ].join(" ");

  return (
    <section
      id="journal"
      className={styles.section}
      aria-labelledby="journal-title"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 id="journal-title" className={styles.title} data-reveal>
            ENSO JOURNAL
          </h2>
          <p className={styles.subtitle} data-reveal style={revealDelay(100)}>
            {/* worded differently on a phone, as the Romanian page's is */}
            <span className={styles.subtitleDesktop}>
              Заметки о строительстве и о том, как мы думаем
            </span>
            <span className={styles.subtitleMobile}>
              О том, как мы строим и как думаем
            </span>
          </p>
        </header>

        <div className={styles.filters} data-reveal-group aria-label="Фильтр статей журнала">
          {journalCategories.map((category, index) => (
            <button
              className={`${styles.filterButton} motion-button ${
                activeCategory === category.id ? styles.filterButtonActive : ""
              }`}
              key={category.id}
              type="button"
              aria-pressed={activeCategory === category.id}
              aria-controls="journal-articles"
              // the row's buttons come in one after another, from the right
              data-reveal
              style={revealDelay(150 + index * 70)}
              onClick={(event) => {
                setActiveCategory(category.id);
                // on a phone the row is swiped: the chosen one comes fully
                // into view
                event.currentTarget.scrollIntoView({
                  behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)",
                  ).matches
                    ? "auto"
                    : "smooth",
                  block: "nearest",
                  inline: "center",
                });
              }}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className={styles.contentArea} data-reveal style={revealDelay(100)}>
          <div
            id="journal-articles"
            className={`${styles.cards} ${layoutClass}`}
            style={
              {
                "--journal-rows": Math.max(2, beside),
                "--journal-columns": Math.max(2, beside),
              } as CSSProperties
            }
            key={activeCategory}
            aria-live="polite"
          >
            {visibleArticles.map((article, index) => (
              <ArticleVisual
                article={article}
                leading={index === 0}
                key={article.id}
              />
            ))}
          </div>

          <Link
            className={`${styles.viewAllButton} motion-button`}
            href="/ru/journal"
          >
            Все статьи <span className="inter-arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
