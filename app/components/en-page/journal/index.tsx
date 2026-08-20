"use client";

import Image from "next/image";
import { useState } from "react";

import styles from "./journal.module.css";

type JournalCategory = "all" | "buying-guide" | "market" | "inside-enso";

type JournalArticle = {
  id: string;
  category: Exclude<JournalCategory, "all">;
  badge: string;
  title: string;
  desktopSrc: string;
  desktopWidth: number;
  desktopHeight: number;
  imageClassName: string;
  cardClassName: string;
  isFeature?: boolean;
};

const categories: readonly { id: JournalCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "buying-guide", label: "Buying guide" },
  { id: "market", label: "Market" },
  { id: "inside-enso", label: "Inside ENSO" },
];

const articles: readonly JournalArticle[] = [
  {
    id: "bim-standard",
    category: "inside-enso",
    badge: "Inside ENSO",
    title:
      "BIM is the international standard applied in every ENSŌ Development project",
    desktopSrc: "/journal-post-image.avif",
    desktopWidth: 3200,
    desktopHeight: 2520,
    imageClassName: styles.featureImage,
    cardClassName: styles.featureCard,
    isFeature: true,
  },
  {
    id: "eminescu-offices",
    category: "buying-guide",
    badge: "Buying guide",
    title:
      "ENSO Development completes the investment exit from Eminescu Offices",
    desktopSrc: "/journal-post-buying-guide.avif",
    desktopWidth: 1541,
    desktopHeight: 878,
    imageClassName: styles.buyingGuideImage,
    cardClassName: styles.articleCard,
  },
  {
    id: "moldova-growth-leader",
    category: "market",
    badge: "Market",
    title: "Moldova — #1 in Europe Real Estate Growth Leader 2025",
    desktopSrc: "/journal-post-market.avif",
    desktopWidth: 1541,
    desktopHeight: 878,
    imageClassName: styles.marketImage,
    cardClassName: styles.articleCard,
  },
];

function ArticleVisual({ article }: { article: JournalArticle }) {
  return (
    <article
      id={`journal-${article.id}`}
      className={`${styles.card} ${article.cardClassName}`}
    >
      <div className={styles.imageArea}>
        <Image
          className={`${styles.sourceImage} ${styles.mobileImage} ${article.imageClassName}`}
          src="/journal-en.png"
          width={438}
          height={779}
          sizes="438px"
          alt=""
          aria-hidden="true"
        />
        <Image
          className={`${styles.sourceImage} ${styles.desktopImage} ${article.imageClassName}`}
          src={article.desktopSrc}
          width={article.desktopWidth}
          height={article.desktopHeight}
          sizes="(min-width: 641px) 42vw, 1px"
          alt=""
          aria-hidden="true"
        />
      </div>
      <div className={styles.articleCopy}>
        <span className={styles.articleCategory}>{article.badge}</span>
        <span className={styles.articleMeta}>June 2 · 5 min read</span>
        <h3>{article.title}</h3>
        {article.isFeature && (
          <a className={styles.readArticle} href={`#journal-${article.id}`}>
            Read article →
          </a>
        )}
      </div>
      <h3 className={styles.visuallyHidden}>{article.title}</h3>
    </article>
  );
}

export default function Journal() {
  const [activeCategory, setActiveCategory] =
    useState<JournalCategory>("all");

  const visibleArticles = articles.filter(
    (article) =>
      activeCategory === "all" || article.category === activeCategory,
  );

  return (
    <section
      id="journal"
      className={styles.section}
      aria-labelledby="journal-title"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 id="journal-title" className={styles.title}>
            ENSO JOURNAL
          </h2>
          <p className={styles.subtitle}>Notes on building and how we think.</p>
        </header>

        <div className={styles.filters} aria-label="Filter journal articles">
          {categories.map((category) => (
            <button
              className={`${styles.filterButton} ${
                activeCategory === category.id ? styles.filterButtonActive : ""
              }`}
              key={category.id}
              type="button"
              aria-pressed={activeCategory === category.id}
              aria-controls="journal-articles"
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className={styles.contentArea}>
          <div
            id="journal-articles"
            className={styles.cards}
            key={activeCategory}
            aria-live="polite"
          >
            {visibleArticles.map((article) => (
              <ArticleVisual article={article} key={article.id} />
            ))}
          </div>

          <a className={styles.viewAllButton} href="#journal">
            View all articles
          </a>
        </div>
      </div>
    </section>
  );
}
