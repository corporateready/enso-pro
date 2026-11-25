"use client";

import { type CSSProperties, useEffect, useState } from "react";

import styles from "./journal-article.module.css";

/*
 * Sharing an article, as news sites offer it: Facebook, LinkedIn and X in a
 * window of their own, and the link to copy (for a messenger). Plain links
 * to each network's own share page: no script of theirs on the site. The
 * address is the page's own, read when pressed, so it is right on any host.
 */

type Network = {
  id: string;
  name: string;
  /* the footer's white glyphs, used as a mask: they take the text colour */
  icon: string;
  url: (link: string, title: string) => string;
};

const networks: readonly Network[] = [
  {
    id: "facebook",
    name: "Facebook",
    icon: "/facebook.svg",
    url: (link) => `https://www.facebook.com/sharer/sharer.php?u=${link}`,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: "/linkedin.svg",
    url: (link) => `https://www.linkedin.com/sharing/share-offsite/?url=${link}`,
  },
  {
    id: "x",
    name: "X",
    icon: "/x.svg",
    url: (link, title) => `https://x.com/intent/post?url=${link}&text=${title}`,
  },
];

export type ShareWords = {
  label: string;
  on: string;
  copy: string;
  copied: string;
};

const pageLink = () => window.location.href.split("#")[0];

export default function Share({
  title,
  words,
}: {
  title: string;
  words: ShareWords;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2400);
    return () => window.clearTimeout(timer);
  }, [copied]);

  return (
    <div className={styles.share} role="group" aria-label={words.label}>
      {networks.map((network) => (
        <button
          className={styles.shareButton}
          key={network.id}
          type="button"
          aria-label={`${words.on} ${network.name}`}
          onClick={() =>
            window.open(
              network.url(
                encodeURIComponent(pageLink()),
                encodeURIComponent(title),
              ),
              "_blank",
              "noopener,noreferrer,width=640,height=640",
            )
          }
        >
          <span
            className={styles.shareIcon}
            style={{ "--icon": `url(${network.icon})` } as CSSProperties}
            aria-hidden="true"
          />
        </button>
      ))}
      <button
        className={styles.shareButton}
        type="button"
        aria-label={words.copy}
        onClick={() => {
          navigator.clipboard
            ?.writeText(pageLink())
            .then(() => setCopied(true))
            .catch(() => {});
        }}
      >
        {/* a chain link */}
        <svg
          className={styles.shareLink}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      </button>
      <span className={styles.shareNote} role="status">
        {copied ? words.copied : ""}
      </span>
    </div>
  );
}
