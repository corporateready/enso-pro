import type { CSSProperties } from "react";

import { revealDelay } from "../motion/reveal";
import styles from "./testimonials.module.css";

/*
 * What clients say, one block for both languages: Figma's three cards, all
 * in a row on a desktop and a swipe row on a phone, restyled at the client's
 * call. The cards are pale and flat in place of white with a shadow, the
 * role badge (which only repeated the role) is gone, and the name sits by
 * its initials at the foot. Figma's five stars lead each card (for a while
 * a quote mark stood there; the client wanted the stars back), drawn here:
 * the ★ character is not in the site's Inter and fell back to whatever font
 * a device has.
 */

const STARS = [0, 1, 2, 3, 4] as const;

type Review = {
  quote: string;
  name: string;
  role: string;
  since: number;
};

const content: Record<
  "ro" | "en",
  {
    title: readonly [string, string];
    subtitle: string;
    stars: string;
    since: string;
    reviews: readonly Review[];
  }
> = {
  ro: {
    title: ["CE SPUN", "CLIENȚII NOȘTRI"],
    subtitle: "Partea care se vede după predare.",
    stars: "5 din 5 stele",
    since: "Alături din",
    reviews: [
      {
        quote:
          "O abordare excepțională în afaceri. În cei șapte ani de colaborare, nu a existat nicio problemă nerezolvată.",
        name: "Nicolai Ciobanu",
        role: "Investitor imobiliar",
        since: 2016,
      },
      {
        quote:
          "Planul pe care l-am semnat este apartamentul pe care l-am primit. Fiecare centimetru a corespuns proiectului — nu a fost nimic de renegociat pe șantier.",
        name: "Mariana Anghel",
        role: "Proprietar de apartament",
        since: 2019,
      },
      {
        quote:
          "Am ales graficul de plată înainte să alegem etajul. Doi ani mai târziu, nicio rată nu s-a schimbat.",
        name: "Denis Covalenco",
        role: "Proprietar de apartament",
        since: 2022,
      },
    ],
  },
  en: {
    title: ["WHAT OUR", "CLIENTS SAY"],
    subtitle: "The part that shows up after handover.",
    stars: "5 out of 5 stars",
    since: "With us since",
    reviews: [
      {
        quote:
          "An exceptional approach to business. In seven years of collaboration, not a single issue was left unresolved.",
        name: "Nicolai Ciobanu",
        role: "Real estate investor",
        since: 2016,
      },
      {
        quote:
          "The plan I signed is the apartment I received. Every centimetre matched the drawings — nothing had to be renegotiated on site.",
        name: "Mariana Anghel",
        role: "Apartment owner",
        since: 2019,
      },
      {
        quote:
          "We chose the payment schedule before we chose the floor. Two years later, not one instalment changed.",
        name: "Denis Covalenco",
        role: "Apartment owner",
        since: 2022,
      },
    ],
  },
};

const initials = (name: string) =>
  name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);

export default function Testimonials({ locale }: { locale: "ro" | "en" }) {
  const text = content[locale];

  return (
    <section
      id="testimonials"
      className={styles.section}
      aria-labelledby="testimonials-title"
    >
      <div className={styles.inner}>
        <h2 id="testimonials-title" className={styles.title} data-reveal>
          {text.title[0]}{" "}
          <br className={styles.mobileBreak} />
          {text.title[1]}
        </h2>
        <p className={styles.subtitle} data-reveal style={revealDelay(100)}>
          {text.subtitle}
        </p>

        <div className={styles.cards} data-reveal-group>
          {text.reviews.map((review, index) => (
            <figure
              className={styles.card}
              key={review.name}
              data-reveal
              style={revealDelay(index * 100)}
            >
              <div className={styles.cardTop}>
                <span className={styles.stars} role="img" aria-label={text.stars}>
                  {STARS.map((star) => (
                    <svg
                      key={star}
                      className={styles.star}
                      viewBox="0 0 19.02 18.09"
                      aria-hidden="true"
                      style={{ "--star": star } as CSSProperties}
                    >
                      <path d="M9.51 0 11.98 6.6 19.02 6.91 13.51 11.3 15.39 18.09 9.51 14.2 3.63 18.09 5.52 11.3 0 6.91 7.04 6.6Z" />
                    </svg>
                  ))}
                </span>
                <span className={styles.since}>
                  {text.since} {review.since}
                </span>
              </div>
              <blockquote className={styles.quote}>
                <p>{review.quote}</p>
              </blockquote>
              <figcaption className={styles.person}>
                <span className={styles.avatar} aria-hidden="true">
                  {initials(review.name)}
                </span>
                <span>
                  <span className={styles.name}>{review.name}</span>
                  <span className={styles.role}>{review.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
