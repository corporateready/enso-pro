"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import BookCallModal from "../../book-call-modal";
import { revealDelay } from "../../motion/reveal";
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
        {/* its own clipping layer: the pictures drift inside it, while the
            building above is free to stand out over the section's top */}
        <div className={styles.backdrop} aria-hidden="true">
          <Image
            className={`${styles.image} ${styles.mobileImage}`}
            src="/cta-mobile-bg.webp"
            fill
            sizes="(max-width: 639px) 100vw, 390px"
            alt=""
          />
          <Image
            className={`${styles.image} ${styles.desktopImage}`}
            src="/cta-desktop-bg.avif"
            fill
            sizes="(min-width: 641px) 100vw, 1px"
            alt=""
          />
        </div>
        <Image
          className={styles.buildingImage}
          src="/cta-building-desctop.avif"
          width={676}
          height={970}
          // a 2704px source for a 676px picture: let the optimiser size it
          sizes="(min-width: 641px) 36vw, 1px"
          quality={90}
          alt=""
        />

        <div className={styles.copy}>
          <h2 id="cta-title" className={styles.title} data-reveal>
            Începe cu o discuție
          </h2>
          <p className={styles.description} data-reveal style={revealDelay(100)}>
            Programează un apel de 5 minute cu un consultant ENSO —
            <br className={styles.desktopBreak} /> online sau la unul dintre
            birourile noastre.
          </p>
        </div>

        <button
          ref={bookButtonRef}
          className={`${styles.action} ${styles.bookAction} motion-button`}
          data-reveal
          style={revealDelay(200)}
          type="button"
          aria-haspopup="dialog"
          aria-expanded={isBookCallOpen}
          onClick={() => setIsBookCallOpen(true)}
        >
          Programează un apel
        </button>
        <a
          className={`${styles.action} ${styles.directAction} motion-button`}
          data-reveal
          style={revealDelay(280)}
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
