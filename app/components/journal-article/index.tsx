"use client";

import Image from "next/image";

import * as en from "../en-page/journal";
import { revealDelay } from "../motion/reveal";
import * as ro from "../ro-page/journal";
import * as ru from "../ru-page/journal";
import {
  type ArticleId,
  articleHeads,
  articleTexts,
  type Block,
  type Inline,
  journalPath,
  type Locale,
} from "./content";
import styles from "./journal-article.module.css";

/*
 * An article's own page (app/(ro)/journal/[slug], /ru/journal/[slug],
 * /en/journal/[slug]), where the journal's cards lead (since 2026-11-24, the
 * client's call: «чтоб мы уже видели как будет выглядеть статья отдельно»):
 * the way back to the journal, the article's label, date and reading time
 * (the journal list's own, *-page/journal), its title and lead, a picture
 * across the page, the text in a column a reader's eye can follow, and the
 * other articles under it. The words are in ./content.ts.
 */

const lists: Record<Locale, readonly ro.JournalArticle[]> = {
  ro: ro.siteArticles,
  ru: ru.siteArticles,
  en: en.siteArticles,
};

const words: Record<Locale, { back: string; more: string; all: string }> = {
  ro: { back: "Înapoi la ENSO Journal", more: "Alte articole", all: "Toate articolele" },
  ru: { back: "Назад в ENSO Journal", more: "Другие статьи", all: "Все статьи" },
  en: { back: "Back to ENSO Journal", more: "More articles", all: "All articles" },
};

function Inlines({ parts }: { parts: readonly Inline[] }) {
  return parts.map((part, index) => {
    if (typeof part === "string") return part;
    if ("href" in part) {
      return (
        <a href={part.href} target="_blank" rel="noopener noreferrer" key={index}>
          {part.text}
        </a>
      );
    }
    return <strong key={index}>{part.strong}</strong>;
  });
}

function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case "p":
      return (
        <p>
          <Inlines parts={block.text} />
        </p>
      );
    case "h2":
      return <h2>{block.text}</h2>;
    case "quote":
      return (
        <figure className={styles.quote}>
          <blockquote>
            <Inlines parts={block.text} />
          </blockquote>
          {block.source && (
            <figcaption className={styles.source}>
              <Inlines parts={block.source} />
            </figcaption>
          )}
        </figure>
      );
    case "list":
      return (
        <ul>
          {block.items.map((item, index) => (
            <li key={index}>
              <Inlines parts={item} />
            </li>
          ))}
        </ul>
      );
    case "figure":
      return (
        <figure
          className={`${styles.figure} ${
            block.pictures.length > 1 ? styles.figurePair : ""
          }`}
        >
          {block.pictures.map((picture) => (
            <Image
              className={styles.figureImage}
              key={picture.src}
              src={picture.src}
              width={picture.width}
              height={picture.height}
              // screenshots kept at their own size: no larger than drawn
              style={{ width: `${picture.width}rem` }}
              sizes={`${picture.width}px`}
              alt={picture.alt}
            />
          ))}
        </figure>
      );
  }
}

export default function JournalArticle({
  locale,
  id,
}: {
  locale: Locale;
  id: ArticleId;
}) {
  const text = articleTexts[locale][id];
  const list = lists[locale];
  const card = list.find((article) => article.id === id);
  const head = articleHeads[id];
  const others = list.filter((article) => article.id !== id).slice(0, 3);
  const journal = journalPath[locale];

  return (
    <article className={styles.article} aria-labelledby="article-title">
      <header className={styles.header}>
        <a className={styles.back} href={journal}>
          <span className={`inter-arrow ${styles.backArrow}`}>→</span>
          {words[locale].back}
        </a>
        {card && (
          <div className={styles.meta} data-reveal>
            <span className={styles.badge}>{card.badge}</span>
            <span className={styles.date}>
              {card.date} · {card.readTime}
            </span>
          </div>
        )}
        <h1
          id="article-title"
          className={styles.title}
          data-reveal
          style={revealDelay(60)}
        >
          {text.title}
        </h1>
        {text.lead.map((paragraph, index) => (
          <p
            className={styles.lead}
            key={index}
            data-reveal
            style={revealDelay(120 + index * 60)}
          >
            <Inlines parts={paragraph} />
          </p>
        ))}
      </header>

      <div className={styles.head} data-reveal style={revealDelay(200)}>
        <Image
          className={styles.headImage}
          src={head.src}
          width={head.width}
          height={head.height}
          sizes="(min-width: 641px) 84vw, 100vw"
          loading="eager"
          fetchPriority="high"
          style={head.position ? { objectPosition: head.position } : undefined}
          alt={head.alt}
        />
      </div>

      <div className={styles.body}>
        {text.body.map((block, index) => (
          <BlockView block={block} key={index} />
        ))}
      </div>

      {others.length > 0 && (
        <aside className={styles.more} aria-labelledby="article-more">
          <div className={styles.moreHeader}>
            <h2 id="article-more" className={styles.moreTitle}>
              {words[locale].more}
            </h2>
            <a className={`${styles.allButton} motion-button`} href={journal}>
              {words[locale].all} <span className="inter-arrow">→</span>
            </a>
          </div>
          <div className={styles.moreGrid}>
            {others.map((other, index) => {
              const cover = other.cover ?? {
                src: other.src,
                width: other.width,
                height: other.height,
              };

              return (
                <article
                  className={styles.moreCard}
                  key={other.id}
                  data-reveal
                  style={revealDelay(index * 100)}
                >
                  <div className={styles.morePicture}>
                    <Image
                      className={styles.morePictureImage}
                      src={cover.src}
                      width={cover.width}
                      height={cover.height}
                      sizes="(min-width: 641px) 41vw, 92vw"
                      alt=""
                    />
                  </div>
                  <div className={styles.moreMeta}>
                    <span className={styles.badge}>{other.badge}</span>
                    <span className={styles.date}>
                      {other.date} · {other.readTime}
                    </span>
                  </div>
                  <h3 className={styles.moreCardTitle}>
                    {/* the whole card is the link (::after) */}
                    <a className={styles.moreLink} href={`${journal}/${other.id}`}>
                      {other.title}
                    </a>
                  </h3>
                </article>
              );
            })}
          </div>
        </aside>
      )}
    </article>
  );
}
