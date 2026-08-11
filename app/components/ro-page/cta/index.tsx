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
            Începe cu o discuție
          </h2>
          <p className={styles.description}>
            Programează un apel de 5 minute cu un consultant ENSO — online sau
            la unul dintre birourile noastre.
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
          Programează un apel
        </button>
        <a
          className={`${styles.action} ${styles.directAction}`}
          href="tel:+37368969689"
        >
          Sună-ne direct
        </a>
      </div>

      {isBookCallOpen && (
        <BookCallModal locale="ro" onClose={closeBookCall} />
      )}
    </section>
  );
}
