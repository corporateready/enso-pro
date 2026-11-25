import Image from "next/image";

import { revealDelay } from "../motion/reveal";
import {
  type ArticleId,
  journalArticles,
  type JournalArticle as Card,
} from "./catalog";
import {
  articleHeads,
  articleTexts,
  type Block,
  type Inline,
  journalPath,
  type Locale,
} from "./content";
import styles from "./journal-article.module.css";
import Share, { type ShareWords } from "./share";

/*
 * An article's own page (app/(ro)/journal/[slug], /ru/journal/[slug],
 * /en/journal/[slug]), where the journal's cards lead (since 2026-11-24, the
 * client's call: «чтоб мы уже видели как будет выглядеть статья отдельно»).
 *
 * Laid out the way news pages and company newsrooms set a piece (the
 * client's question, 2026-11-24: «как в мире делается»): the way back to the
 * journal; the category over the headline; the headline and the lead in the
 * reading column itself; under them who publishes it, when, how long it
 * reads, and the sharing buttons; a picture across the page; the text in a
 * column some 65-70 characters wide, its type
 * never under 18 px however narrow the window (the site's rem scales with
 * the window); photos breaking out of the column; sharing again at the end;
 * then three more articles, its own category's first.
 *
 * A server component: the article's words go to the page, not into a
 * script. The words are in ./content.ts and ./articles, the cards in
 * ./catalog.ts.
 */

const words: Record<
  Locale,
  {
    back: string;
    more: string;
    all: string;
    author: string;
    shareEnd: string;
    share: ShareWords;
  }
> = {
  ro: {
    back: "Înapoi la ENSO Journal",
    more: "Alte articole",
    all: "Toate articolele",
    author: "ENSŌ Development",
    shareEnd: "Distribuie articolul",
    share: {
      label: "Distribuie articolul",
      on: "Distribuie pe",
      copy: "Copiază linkul",
      copied: "Link copiat",
    },
  },
  ru: {
    back: "Назад в ENSO Journal",
    more: "Другие статьи",
    all: "Все статьи",
    author: "ENSŌ Development",
    shareEnd: "Поделиться статьёй",
    share: {
      label: "Поделиться статьёй",
      on: "Поделиться в",
      copy: "Скопировать ссылку",
      copied: "Ссылка скопирована",
    },
  },
  en: {
    back: "Back to ENSO Journal",
    more: "More articles",
    all: "All articles",
    author: "ENSŌ Development",
    shareEnd: "Share this article",
    share: {
      label: "Share this article",
      on: "Share on",
      copy: "Copy link",
      copied: "Link copied",
    },
  },
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
      // photos run wider than the text; screenshots keep their own size
      return block.wide ? (
        <figure className={`${styles.figure} ${styles.figureWide}`}>
          {block.pictures.map((picture) => (
            <Image
              className={styles.figurePhoto}
              key={picture.src}
              src={picture.src}
              width={picture.width}
              height={picture.height}
              sizes="(min-width: 641px) 63vw, 100vw"
              alt={picture.alt}
            />
          ))}
        </figure>
      ) : (
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

/* three more: the article's own category first, then the newest */
function relatedTo(list: readonly Card[], id: string) {
  const card = list.find((article) => article.id === id);
  const others = list.filter((article) => article.id !== id);

  return [
    ...others.filter((article) => article.category === card?.category),
    ...others.filter((article) => article.category !== card?.category),
  ].slice(0, 3);
}

export default function JournalArticle({
  locale,
  id,
}: {
  locale: Locale;
  id: ArticleId;
}) {
  const text = articleTexts[locale][id];
  const list = journalArticles[locale];
  const card = list.find((article) => article.id === id);
  const head = articleHeads[id];
  const others = relatedTo(list, id);
  const journal = journalPath[locale];
  const say = words[locale];

  return (
    <article className={styles.article} aria-labelledby="article-title">
      <header className={styles.header}>
        <a className={styles.back} href={journal}>
          <span className={`inter-arrow ${styles.backArrow}`}>→</span>
          {say.back}
        </a>
        {card && (
          <p className={styles.kicker} data-reveal>
            <span className={styles.badge}>{card.badge}</span>
          </p>
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
        <div className={styles.byline} data-reveal style={revealDelay(180)}>
          <div className={styles.author}>
            <Image
              className={styles.avatar}
              src="/journal/enso-avatar.png"
              width={180}
              height={180}
              alt=""
            />
            <div className={styles.authorText}>
              <span className={styles.authorName}>{say.author}</span>
              {card && (
                <span className={styles.date}>
                  <time dateTime={card.dateTime}>{card.date}</time> ·{" "}
                  {card.readTime}
                </span>
              )}
            </div>
          </div>
          <Share title={text.title} words={say.share} />
        </div>
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

      <div className={styles.end}>
        <p className={styles.endLabel}>{say.shareEnd}</p>
        <Share title={text.title} words={say.share} />
      </div>

      {others.length > 0 && (
        <aside className={styles.more} aria-labelledby="article-more">
          <div className={styles.moreHeader}>
            <h2 id="article-more" className={styles.moreTitle}>
              {say.more}
            </h2>
            <a className={`${styles.allButton} motion-button`} href={journal}>
              {say.all} <span className="inter-arrow">→</span>
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
                      sizes="(min-width: 641px) 27vw, 92vw"
                      alt=""
                    />
                  </div>
                  <div className={styles.moreMeta}>
                    <span className={styles.badge}>{other.badge}</span>
                    <span className={styles.date}>
                      <time dateTime={other.dateTime}>{other.date}</time> ·{" "}
                      {other.readTime}
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
