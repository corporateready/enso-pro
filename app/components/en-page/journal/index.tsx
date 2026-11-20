"use client";

import Image from "next/image";
import { type CSSProperties, useState } from "react";

import { revealDelay } from "../../motion/reveal";
import styles from "./journal.module.css";

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
  { id: "all", label: "All" },
  { id: "buying-guide", label: "Buying guide" },
  { id: "market", label: "Market" },
  { id: "inside-enso", label: "Inside ENSO" },
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
    badge: "Inside ENSO",
    // Line breaks as set in Figma; the phone cards keep them (pre-line).
    title:
      "BIM is the international\nstandard applied in every\nENSŌ Development project",
    date: "June 2",
    readTime: "5 min read",
    src: "/journal-post-image.avif",
    width: 3200,
    height: 2520,
    cover: { src: "/journal-post-image.avif", width: 3200, height: 2520 },
  },
  {
    id: "eminescu-offices",
    category: "buying-guide",
    badge: "Buying guide",
    title:
      "ENSŌ Development completes the investment exit from Eminescu Offices",
    date: "June 2",
    readTime: "5 min read",
    src: "/journal-eminescu-square.avif",
    width: 690,
    height: 690,
    cover: { src: "/journal-eminescu.avif", width: 690, height: 543 },
  },
  {
    id: "moldova-growth-leader",
    category: "market",
    badge: "Market",
    title: "Moldova — #1 in Europe\nReal Estate Growth\nLeader 2025",
    date: "June 2",
    readTime: "5 min read",
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
        <h3>{article.title}</h3>
        {leading && (
          <a className={styles.readArticle} href={`#journal-${article.id}`}>
            Read article <span className="inter-arrow">→</span>
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
          <p className={styles.subtitle} data-reveal style={revealDelay(100)}>Notes on building and how we think</p>
        </header>

        <div className={styles.filters} data-reveal-group aria-label="Filter journal articles">
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

          <a
            className={`${styles.viewAllButton} motion-button`}
            href="/en/journal"
          >
            View all articles <span className="inter-arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
