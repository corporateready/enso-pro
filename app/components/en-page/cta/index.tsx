"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import BookCallModal from "../../book-call-modal";
import styles from "./cta.module.css";

export default function CTA() {
  const [isBookCallOpen, setIsBookCallOpen] = useState(false);
  const bookButtonRef = useRef<HTMLButtonElement>(null);

  const closeBookCall = () => {
    setIsBookCallOpen(false);
    window.requestAnimationFrame(() => bookButtonRef.current?.focus());
  };

  return (
    <section
      id="contact"
      className={styles.section}
      aria-labelledby="cta-title"
    >
      <div className={styles.inner}>
        <Image
          className={styles.image}
          src="/cta-mobile-bg.webp"
          fill
          sizes="(max-width: 639px) 100vw, 390px"
          alt=""
        />

        <div className={styles.copy}>
          <h2 id="cta-title" className={styles.title}>
            Let’s find your home
          </h2>
          <p className={styles.description}>
            Book a 5-minute call with an ENSO advisor
            <br />— online or at one of our offices.
          </p>
        </div>

        <button
          ref={bookButtonRef}
          className={`${styles.action} ${styles.bookAction}`}
          type="button"
          aria-haspopup="dialog"
          aria-expanded={isBookCallOpen}
          onClick={() => setIsBookCallOpen(true)}
        >
          Book a call
        </button>
        <a
          className={`${styles.action} ${styles.directAction}`}
          href="tel:+37368969688"
        >
          Call us directly
        </a>
      </div>

      {isBookCallOpen && (
        <BookCallModal locale="en" onClose={closeBookCall} />
      )}
    </section>
  );
}
