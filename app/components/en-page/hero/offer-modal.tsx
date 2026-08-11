"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";

import styles from "../../ro-page/hero/offer-modal.module.css";
import localeStyles from "./offer-modal.module.css";

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
        className={`${styles.dialog} ${localeStyles.dialog}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="offer-modal-title-en"
      >
        <button
          className={`${styles.closeButton} ${localeStyles.closeButton}`}
          type="button"
          onClick={onClose}
          aria-label="Close form"
        >
          <span />
          <span />
        </button>

        <h2 id="offer-modal-title-en" className={styles.title}>
          GET YOUR INSTANT
          <br />
          PDF PRESENTATION AND
          <br />
          AN OFFER IN A FEW
          <br />
          MINUTES
        </h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.visuallyHidden} htmlFor="offer-name-en">
            Full Name
          </label>
          <input
            ref={nameRef}
            id="offer-name-en"
            className={styles.input}
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Full Name"
            value={name}
            required
            onChange={(event) => setName(event.target.value)}
          />

          <label className={styles.visuallyHidden} htmlFor="offer-email-en">
            E-mail
          </label>
          <input
            id="offer-email-en"
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

          <label className={styles.visuallyHidden} htmlFor="offer-phone-en">
            Phone number
          </label>
          <div className={styles.phoneField}>
            <span className={styles.countryFlag} aria-hidden="true">
              🇷🇴
            </span>
            <input
              id="offer-phone-en"
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
            Send me the offer and presentation
          </button>
        </form>
      </section>
    </div>,
    document.body,
  );
}
