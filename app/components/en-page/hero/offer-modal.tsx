"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";

import styles from "../../ro-page/hero/offer-modal.module.css";
import { lockPageScroll } from "../../scroll-lock";
import { offerPhotoSrc, type OfferPhoto } from "../../ro-page/hero/offer-photos";

// how long the card takes on its way out (offer-card-out)
const CLOSE_MS = 260;
// how long the card waits for its photo before it comes in anyway
const PHOTO_WAIT_MS = 500;

type OfferModalProps = {
  // the picture of the slide whose button opened the dialog
  photo: OfferPhoto;
  onClose: () => void;
};

export default function OfferModal({ photo, onClose }: OfferModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  // closing plays the card's way out first; the dialog goes when it ends
  const [closing, setClosing] = useState(false);
  // the photo is the first thing to see: the card comes in once it is
  // there, or after PHOTO_WAIT_MS at the latest
  const [photoReady, setPhotoReady] = useState(false);

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

  useEffect(() => {
    const timer = window.setTimeout(() => setPhotoReady(true), PHOTO_WAIT_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!closing) return;
    const timer = window.setTimeout(onClose, CLOSE_MS);
    return () => window.clearTimeout(timer);
  }, [closing, onClose]);

  const close = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onClose();
      return;
    }
    setClosing(true);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return createPortal(
    <div
      className={closing ? `${styles.overlay} ${styles.closing}` : styles.overlay}
      data-ready={photoReady ? "" : undefined}
    >
      <section
        className={styles.dialog}
        data-photo={photo}
        role="dialog"
        aria-modal="true"
        aria-labelledby="offer-modal-title-en"
      >
        <button
          className={styles.closeButton}
          type="button"
          onClick={close}
          aria-label="Close form"
        >
          <span />
          <span />
        </button>

        {/* the photo of the slide the dialog was opened from: the card's
            left side on a desktop, over the form on a phone; fetched at
            once and whole, it opens the dialog */}
        <div className={styles.media} aria-hidden="true">
          <Image
            className={styles.photo}
            src={offerPhotoSrc[photo]}
            width={1200}
            height={1200}
            alt=""
            loading="eager"
            fetchPriority="high"
            unoptimized
            onLoad={() => setPhotoReady(true)}
          />
        </div>

        <div className={styles.body}>
          <h2 id="offer-modal-title-en" className={styles.title}>
            {/* the phrase breaks only between its parts, in lines of even
                length */}
            <span>GET YOUR INSTANT</span> <span>PDF PRESENTATION</span>{" "}
            <span>AND AN OFFER</span> <span>IN MINUTES</span>
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
                {/* Figma's flag artwork; the emoji has no flag glyphs on Windows */}
                <Image src="/flag-ro.png" width={72} height={72} alt="" unoptimized />
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
        </div>
      </section>
    </div>,
    document.body,
  );
}
