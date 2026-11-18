"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";

import styles from "../../ro-page/hero/offer-modal.module.css";
import { lockPageScroll } from "../../scroll-lock";

type OfferModalProps = {
  onClose: () => void;
};

export default function OfferModal({ onClose }: OfferModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unlockPageScroll = lockPageScroll();
    const focusFrame = window.requestAnimationFrame(() => {
      nameRef.current?.focus();
    });

    return () => {
      window.cancelAnimationFrame(focusFrame);
      unlockPageScroll();
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
        aria-labelledby="offer-modal-title-ru"
      >
        <button
          className={styles.closeButton}
          type="button"
          onClick={onClose}
          aria-label="Закрыть форму"
        >
          <span />
          <span />
        </button>

        {/* desktop only: Figma's form card has the building photo at its left */}
        <Image
          className={styles.photo}
          src="/offer-modal-photo.webp"
          width={1200}
          height={1200}
          alt=""
          aria-hidden="true"
        />

        <h2 id="offer-modal-title-ru" className={styles.title}>
          PDF-ПРЕЗЕНТАЦИЯ —
          <br />
          СРАЗУ, ПРЕДЛОЖЕНИЕ
          <br />
          ЗА НЕСКОЛЬКО МИНУТ
        </h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.visuallyHidden} htmlFor="offer-name-ru">
            Имя и фамилия
          </label>
          <input
            ref={nameRef}
            id="offer-name-ru"
            className={styles.input}
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Имя, фамилия"
            value={name}
            required
            onChange={(event) => setName(event.target.value)}
          />

          <label className={styles.visuallyHidden} htmlFor="offer-email-ru">
            E-mail
          </label>
          <input
            id="offer-email-ru"
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

          <label className={styles.visuallyHidden} htmlFor="offer-phone-ru">
            Номер телефона
          </label>
          <div className={styles.phoneField}>
            <span className={styles.countryFlag} aria-hidden="true">
              {/* Figma's flag artwork; the emoji has no flag glyphs on Windows */}
              <Image src="/flag-ro.png" width={72} height={72} alt="" unoptimized />
            </span>
            <input
              id="offer-phone-ru"
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
            Получить предложение и PDF
          </button>
        </form>
      </section>
    </div>,
    document.body,
  );
}
