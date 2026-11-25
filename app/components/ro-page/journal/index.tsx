"use client";

import Image from "next/image";
import Link from "next/link";
import { type CSSProperties, useState } from "react";

import {
  categoriesFor,
  type JournalArticle,
  journalArticles,
  type JournalCategory,
} from "../../journal-article/catalog";
import { revealDelay } from "../../motion/reveal";
import styles from "./journal.module.css";

// The journal's articles and their categories: one list for the three
// languages (journal-article/catalog.ts), newest first.
export type { JournalArticle, JournalCategory };

export const siteArticles = journalArticles.ro;

/* "all" and every category that has an article */
export const journalCategories = categoriesFor("ro", siteArticles);

// Newest first. Whichever comes first among those shown is the leading
// article, large on the left, and the next two go beside it as cards: three
// in all, as the block was drawn (the client's call, 2026-11-25: «как было
// одна главная и потом 2 статьи»); the rest are on the journal's own page
// ("all articles"). A filter's result is laid out the same way. The block
// can still take three or four lower rows beside the leading one (the
// working page, journal-variants, shows them with `max`). The two older
// articles' pictures are squares cut from photographs Figma sets as
// collages with a caption.
const maxShown = 3;

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
        href={`/journal/${article.id}`}
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
          <time dateTime={article.dateTime}>{article.date}</time>
          <span className={styles.readTime}> · {article.readTime}</span>
        </span>
        <h3>
          <a className={styles.cardLink} href={`/journal/${article.id}`}>
            {article.title}
          </a>
        </h3>
        {leading && (
          <a
            className={styles.readArticle}
            href={`/journal/${article.id}`}
            // the card's title already leads there: one stop for the keyboard
            tabIndex={-1}
            aria-hidden="true"
          >
            Citește articolul <span className="inter-arrow">→</span>
          </a>
        )}
      </div>
    </article>
  );
}

export default function Journal({
  articles = siteArticles,
  layout = "side",
  max = maxShown,
}: {
  /* the block's own articles unless a working page shows it with more */
  articles?: readonly JournalArticle[];
  /* how many it shows at the most (the working page's examples, more) */
  max?: number;
  /* "side": the leading article on the left, the others in a column on its
     right (the site's). "rows": the leading one across the top, the others
     in a row under it; desktop only, shown on the working page. */
  layout?: "side" | "rows";
}) {
  const [activeCategory, setActiveCategory] =
    useState<JournalCategory>("all");

  // the home page shows the pieces meant for it (catalog.ts: onHome)
  const homeArticles = articles.filter((article) => article.onHome !== false);
  const categories = categoriesFor("ro", homeArticles);

  const visibleArticles = homeArticles
    .filter(
      (article) =>
        activeCategory === "all" || article.category === activeCategory,
    )
    .slice(0, max);
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
            {/* Figma words the RO subtitle differently on mobile */}
            <span className={styles.subtitleDesktop}>
              Note despre construcții și felul în care gândim
            </span>
            <span className={styles.subtitleMobile}>
              Despre cum construim și cum gândim
            </span>
          </p>
        </header>

        <div className={styles.filters} data-reveal-group aria-label="Filter journal articles">
          {categories.map((category, index) => (
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
            href="/journal"
          >
            Vezi toate articolele <span className="inter-arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
