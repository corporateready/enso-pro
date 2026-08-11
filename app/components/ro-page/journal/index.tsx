"use client";

import Image from "next/image";
import { useState } from "react";

import styles from "./journal.module.css";

type JournalCategory = "all" | "buying-guide" | "market" | "inside-enso";

type JournalArticle = {
  id: string;
  category: Exclude<JournalCategory, "all">;
  title: string;
  imageClassName: string;
  cardClassName: string;
};

const categories: readonly { id: JournalCategory; label: string }[] = [
  { id: "all", label: "Toate" },
  { id: "buying-guide", label: "Ghid de cumpărare" },
  { id: "market", label: "Piață" },
  { id: "inside-enso", label: "Din interior" },
];

const articles: readonly JournalArticle[] = [
  {
    id: "bim-standard",
    category: "inside-enso",
    title:
      "BIM is the international standard applied in every ENSO Development project",
    imageClassName: styles.featureImage,
    cardClassName: styles.featureCard,
  },
  {
    id: "eminescu-offices",
    category: "buying-guide",
    title:
      "ENSO Development completes the investment exit from Eminescu Offices",
    imageClassName: styles.buyingGuideImage,
    cardClassName: styles.articleCard,
  },
  {
    id: "moldova-growth-leader",
    category: "market",
    title: "Moldova — #1 in Europe Real Estate Growth Leader 2025",
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
      <Image
        className={`${styles.sourceImage} ${article.imageClassName}`}
        src="/journal-ro.png"
        width={438}
        height={779}
        sizes="438px"
        alt=""
        aria-hidden="true"
      />
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
          <p className={styles.subtitle}>Despre cum construim și cum gândim</p>
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
            Vezi toate articolele
          </a>
        </div>
      </div>
    </section>
  );
}
