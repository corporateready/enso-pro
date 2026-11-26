import {
  type Block,
  type Inline,
  type LegalDocument,
  ensoNotificationsPages,
} from "./enso-notifications";
import styles from "./legal-page.module.css";

/*
 * A page of ENSO Notifications, ENSO's app for Google Chat
 * (app/(en)/en/enso-notifications): what it is, its privacy policy, its
 * terms. Set like a journal article (components/journal-article): its
 * reading column and type, without pictures; over the title, the three
 * pages' own menu. A server component; the words are in
 * ./enso-notifications.ts.
 */

function Inlines({ parts }: { parts: readonly Inline[] }) {
  return parts.map((part, index) => {
    if (typeof part === "string") return part;
    const external = /^https?:/.test(part.href);
    return (
      <a
        href={part.href}
        key={index}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      >
        {part.text}
      </a>
    );
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
  }
}

export default function LegalPage({ doc }: { doc: LegalDocument }) {
  return (
    <article className={styles.page} aria-labelledby="legal-title">
      <header className={styles.header}>
        <nav className={styles.menu} aria-label="ENSO Notifications">
          {ensoNotificationsPages.map((page) =>
            page.path === doc.path ? (
              <span key={page.path} aria-current="page">
                {page.label}
              </span>
            ) : (
              <a key={page.path} href={page.path}>
                {page.label}
              </a>
            ),
          )}
        </nav>
        <h1 id="legal-title" className={styles.title}>
          {doc.title}
        </h1>
        <p className={styles.lead}>
          <Inlines parts={doc.lead} />
        </p>
        {doc.updated && (
          <p className={styles.updated}>
            Last updated <time dateTime={doc.updated.dateTime}>{doc.updated.date}</time>
          </p>
        )}
      </header>
      <div className={styles.body}>
        {doc.blocks.map((block, index) => (
          <BlockView block={block} key={index} />
        ))}
      </div>
    </article>
  );
}
