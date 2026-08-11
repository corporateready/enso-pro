"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";

import styles from "../../ro-page/hero/account-modal.module.css";

type AccountModalProps = {
  onClose: () => void;
};

export default function AccountModal({ onClose }: AccountModalProps) {
  const [identifier, setIdentifier] = useState("");
  const identifierRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const focusFrame = window.requestAnimationFrame(() => {
      identifierRef.current?.focus();
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
        aria-labelledby="personal-account-title-en"
      >
        <header className={styles.header}>
          <a
            className={styles.logoLink}
            href="#top"
            aria-label="Go to the top of the page"
          >
            <Image
              src="/black-logo.svg"
              width={75}
              height={25}
              alt="Enso Development"
              priority
            />
          </a>

          <div className={styles.headerControls}>
            <button
              className={styles.accountIcon}
              type="button"
              onClick={() => identifierRef.current?.focus()}
              aria-label="Focus the personal account field"
            >
              <svg viewBox="0 0 19 21" fill="none" aria-hidden="true">
                <path
                  d="M18.5 20.5C18.5 17.4318 14.4706 14.9444 9.5 14.9444C4.52944 14.9444 0.5 17.4318 0.5 20.5M9.5 11.6111C6.3934 11.6111 3.875 9.12381 3.875 6.05556C3.875 2.98731 6.3934 0.5 9.5 0.5C12.6066 0.5 15.125 2.98731 15.125 6.05556C15.125 9.12381 12.6066 11.6111 9.5 11.6111Z"
                  stroke="currentColor"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <Link
              className={styles.language}
              href="/"
              aria-label="Treci la limba română"
            >
              RO
            </Link>

            <button
              className={styles.closeButton}
              type="button"
              onClick={onClose}
              aria-label="Close login"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </header>

        <div className={styles.content}>
          <h2 id="personal-account-title-en" className={styles.title}>
            LOG IN TO YOUR
            <br />
            PERSONAL ACCOUNT
          </h2>
          <p className={styles.description}>
            Payments, documents and messages with the team — all in one place.
          </p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <button className={styles.googleButton} type="button">
              <svg viewBox="0 0 18 18" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M17.64 9.205c0-.638-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.797 2.716v2.259h2.909c1.702-1.567 2.684-3.878 2.684-6.615Z"
                />
                <path
                  fill="#34A853"
                  d="M9 18c2.43 0 4.468-.806 5.956-2.18l-2.909-2.259c-.806.54-1.836.859-3.047.859-2.344 0-4.328-1.584-5.037-3.711H.956v2.332A9 9 0 0 0 9 18Z"
                />
                <path
                  fill="#FBBC05"
                  d="M3.963 10.709A5.42 5.42 0 0 1 3.682 9c0-.593.102-1.17.281-1.709V4.959H.956A9 9 0 0 0 0 9c0 1.452.347 2.827.956 4.041l3.007-2.332Z"
                />
                <path
                  fill="#EA4335"
                  d="M9 3.58c1.321 0 2.507.454 3.441 1.346l2.581-2.581C13.464.892 11.426 0 9 0A9 9 0 0 0 .956 4.959l3.007 2.332C4.672 5.164 6.656 3.58 9 3.58Z"
                />
              </svg>
              Continue with Google
            </button>

            <div className={styles.divider} aria-hidden="true">
              <span>or</span>
            </div>

            <label
              className={styles.visuallyHidden}
              htmlFor="account-identifier-en"
            >
              E-mail or username
            </label>
            <input
              ref={identifierRef}
              id="account-identifier-en"
              className={styles.input}
              name="identifier"
              type="text"
              autoComplete="username"
              inputMode="email"
              placeholder="E-mail or username"
              value={identifier}
              onChange={(event) => setIdentifier(event.target.value)}
            />

            <button
              className={styles.continueButton}
              type="submit"
              disabled={!identifier.trim()}
            >
              Continue
            </button>
          </form>

          <p className={styles.createAccount}>
            New here?{" "}
            <a href="#create-account" onClick={onClose}>
              Create an account
            </a>
          </p>
        </div>
      </section>
    </div>,
    document.body,
  );
}
