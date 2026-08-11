"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";

import styles from "./offer-modal.module.css";

type OfferModalProps = {
  onClose: () => void;
};

export default function OfferModal({ onClose }: OfferModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const focusFrame = window.requestAnimationFrame(() => {
      nameRef.current?.focus();
    });

    document.body.style.overflow = "hidden";

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return createPortal(
    <div className={styles.overlay}>
      <section
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="offer-modal-title"
      >
        <button
          className={styles.closeButton}
          type="button"
          onClick={onClose}
          aria-label="Închide formularul"
        >
          <span />
          <span />
        </button>

        <h2 id="offer-modal-title" className={styles.title}>
          PRIMEȘTE INSTANT
          <br />
          PREZENTAREA PDF ȘI O
          <br />
          OFERTĂ ÎN CÂTEVA MINUTE
        </h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.visuallyHidden} htmlFor="offer-name">
            Nume și prenume
          </label>
          <input
            ref={nameRef}
            id="offer-name"
            className={styles.input}
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Nume, Prenume"
            value={name}
            required
            onChange={(event) => setName(event.target.value)}
          />

          <label className={styles.visuallyHidden} htmlFor="offer-email">
            E-mail
          </label>
          <input
            id="offer-email"
            className={styles.input}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="E-mail"
            value={email}
            required
            onChange={(event) => setEmail(event.target.value)}
          />

          <label className={styles.visuallyHidden} htmlFor="offer-phone">
            Număr de telefon
          </label>
          <div className={styles.phoneField}>
            <span className={styles.countryFlag} aria-hidden="true">
              🇷🇴
            </span>
            <input
              id="offer-phone"
              className={styles.phoneInput}
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              placeholder="+40"
              value={phone}
              minLength={7}
              required
              onChange={(event) => setPhone(event.target.value)}
            />
          </div>

          <button className={styles.submitButton} type="submit">
            Trimite-mi oferta și prezentarea
          </button>
        </form>
      </section>
    </div>,
    document.body,
  );
}
