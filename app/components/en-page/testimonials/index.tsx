import { Fragment } from "react";

import styles from "./testimonials.module.css";

const testimonials = [
  {
    badge: "INVESTOR",
    quote:
      "An exceptional approach to business.\nIn seven years of collaboration,\nnot a single issue was left unresolved.",
    name: "Nicolai Ciobanu",
    role: "REAL ESTATE INVESTOR",
    since: "With us since 2016",
  },
  {
    badge: "OWNER",
    quote:
      "The plan I signed is the apartment I received. Every centimetre matched the drawings — nothing had to be renegotiated on site.",
    name: "Mariana Anghel",
    role: "APARTMENT OWNER",
    since: "With us since 2019",
  },
  {
    badge: "OWNER",
    quote:
      "We chose the payment schedule before we chose the floor. Two years later, not one instalment changed.",
    name: "Denis Covalenco",
    role: "APARTMENT OWNER",
    since: "With us since 2022",
  },
] as const;

/* "\n" marks a break Figma's mobile card has; desktop wraps freely. */
function mobileLines(text: string) {
  return text.split("\n").map((line, index) => (
    <Fragment key={index}>
      {index > 0 && (
        <>
          {" "}
          <br className={styles.mobileBreak} />
        </>
      )}
      {line}
    </Fragment>
  ));
}

export default function Testimonials() {
  return (
    <section id="testimonials" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>
          WHAT OUR{" "}
          <br className={styles.mobileBreak} />
          CLIENTS SAY
        </h2>
        <p className={styles.subtitle}>The part that shows up after handover.</p>
        <div className={styles.cards}>
          {testimonials.map((item) => (
            <article className={styles.card} key={item.name}>
              <div className={styles.cardTop}>
                <span className={styles.stars} aria-label="5 out of 5 stars">
                  ★★★★★
                </span>
                <span className={styles.badge}>{item.badge}</span>
              </div>
              <p className={styles.quote}>{mobileLines(item.quote)}</p>
              <div className={styles.person}>
                <p className={styles.name}>{item.name}</p>
                <p className={styles.role}>{item.role}</p>
                <p className={styles.since}>{item.since}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
