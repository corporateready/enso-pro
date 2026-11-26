"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

import {
  type AccountMode,
  endAccountHandover,
  keepAccountOpenOnNextPage,
} from "../../account-handover";
import LanguageMenu, {
  type LanguageOption,
  siteLanguages,
} from "../../language-menu";
import { lockPageScroll } from "../../scroll-lock";
import styles from "../../ro-page/hero/account-modal.module.css";

type AccountModalProps = {
  /* The dialog is on the page from the start, out of sight while closed,
     so that a page loaded from it in another language can draw it open
     from its first paint (account-handover.ts). The header mounts it afresh
     for each opening (a new key), which plays the opening from the start. */
  open: boolean;
  onClose: () => void;
  initialMode?: AccountMode;
  /* open with the page: loaded from this dialog in another language, it
     stands as it stood there, and its opening is not played again */
  arrived?: boolean;
  /* where its language menu leads: this page in the other languages */
  languages?: readonly LanguageOption[];
};

export default function AccountModal({
  open,
  onClose,
  initialMode = "signin",
  arrived = false,
  languages = siteLanguages,
}: AccountModalProps) {
  const [mode, setMode] = useState<AccountMode>(initialMode);
  const [identifier, setIdentifier] = useState("");
  const [fullName, setFullName] = useState("");
  const isSignUp = mode === "signup";
  // Sign-in needs one field, sign-up needs both.
  const canSubmit = isSignUp
    ? Boolean(fullName.trim() && identifier.trim())
    : Boolean(identifier.trim());
  const identifierRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const [hasOpened, setHasOpened] = useState(arrived);
  const [isClosing, setIsClosing] = useState(false);

  // Closing plays the opening back (account-modal.module.css): the overlay's
  // fade ends last and takes the dialog away. Without motion it just goes,
  // and so it does should no animation end.
  const close = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onClose();
    } else {
      setIsClosing(true);
    }
  };

  useEffect(() => {
    if (!isClosing) return;

    const fallback = window.setTimeout(onClose, 600);
    return () => window.clearTimeout(fallback);
  }, [isClosing, onClose]);

  useEffect(() => {
    if (!open) return;

    endAccountHandover();

    const unlockPageScroll = lockPageScroll();
    // Opened by a press, the dialog takes the reader to its field; come
    // with the page, it holds still and takes the focus itself.
    const focusFrame = window.requestAnimationFrame(() => {
      if (arrived) dialogRef.current?.focus({ preventScroll: true });
      else identifierRef.current?.focus();
    });

    return () => {
      window.cancelAnimationFrame(focusFrame);
      unlockPageScroll();
    };
  }, [open, arrived]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div
      className={`${styles.overlay} ${open ? "" : styles.closed} ${
        arrived ? styles.arrived : ""
      } ${isClosing ? styles.closing : ""}`}
      onAnimationEnd={(event) => {
        if (isClosing && event.target === event.currentTarget) onClose();
      }}
    >
      <section
        ref={dialogRef}
        tabIndex={-1}
        className={`${styles.dialog} ${hasOpened ? styles.opened : ""}`}
        onAnimationEnd={(event) => {
          if (event.target === event.currentTarget) setHasOpened(true);
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="personal-account-title-ru"
      >
        <header className={styles.header}>
          <a
            className={styles.logoLink}
            href="#top"
            aria-label="К началу страницы"
          >
            {/* The page header's own logo (hero/index.tsx), drawn again and
                turned black in the CSS, as in the open menu: a picture file
                could come a moment after a dialog drawn from the page's
                first paint. */}
            <svg viewBox="0 0 75 25" aria-hidden="true">
              <use href="#enso-header-logo" />
            </svg>
          </a>

          <div className={styles.headerControls}>
            <button
              className={styles.accountIcon}
              type="button"
              onClick={() => identifierRef.current?.focus()}
              aria-label="Перейти к полю входа"
            >
              <svg viewBox="0 0 19 21" fill="none" aria-hidden="true">
                <path
                  d="M18.5 20.5C18.5 17.4318 14.4706 14.9444 9.5 14.9444C4.52944 14.9444 0.5 17.4318 0.5 20.5M9.5 11.6111C6.3934 11.6111 3.875 9.12381 3.875 6.05556C3.875 2.98731 6.3934 0.5 9.5 0.5C12.6066 0.5 15.125 2.98731 15.125 6.05556C15.125 9.12381 12.6066 11.6111 9.5 11.6111Z"
                  stroke="currentColor"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <LanguageMenu
              className={styles.language}
              look="names"
              tone="onWhite"
              current="ru"
              languages={languages}
              label="Язык"
              // the dialog stays open, and opens on the other language's page
              onChoose={(code) => {
                if (code !== "ru") keepAccountOpenOnNextPage(mode);
              }}
            />

            <button
              className={styles.closeButton}
              type="button"
              onClick={close}
              aria-label="Закрыть окно входа"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </header>

        <div className={styles.content}>
          <h2 id="personal-account-title-ru" className={styles.title}>
            {/* the preposition goes down with its noun: a lone "В" is not
                left at the end of the first line */}
            {isSignUp ? "СОЗДАЙТЕ" : "ВОЙДИТЕ"}
            <br />
            {isSignUp ? "ЛИЧНЫЙ КАБИНЕТ" : "В\u00a0ЛИЧНЫЙ КАБИНЕТ"}
          </h2>
          <p className={styles.description}>
            Платежи, документы и переписка с{"\u00a0"}командой — всё в{"\u00a0"}одном месте
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
              Продолжить с Google
            </button>

            <div className={styles.divider} aria-hidden="true">
              <span>или</span>
            </div>

            {isSignUp && (
              <>
                <label className={styles.visuallyHidden} htmlFor="account-name-ru">
                  Имя и фамилия
                </label>
                <input
                  id="account-name-ru"
                  className={styles.input}
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Имя и фамилия"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                />
              </>
            )}

            <label className={styles.visuallyHidden} htmlFor="account-identifier-ru">
              {isSignUp ? "E-mail" : "E-mail или телефон"}
            </label>
            <input
              ref={identifierRef}
              id="account-identifier-ru"
              className={styles.input}
              name="identifier"
              type="text"
              autoComplete="username"
              inputMode="email"
              placeholder={isSignUp ? "E-mail" : "E-mail или телефон"}
              value={identifier}
              onChange={(event) => setIdentifier(event.target.value)}
            />

            <button
              className={styles.continueButton}
              type="submit"
              disabled={!canSubmit}
            >
              {isSignUp ? "Создать аккаунт" : "Продолжить"}
            </button>
          </form>

          <p className={styles.createAccount}>
            {isSignUp ? "Уже есть аккаунт?" : "Впервые здесь?"}{" "}
            <button
              type="button"
              onClick={() => setMode(isSignUp ? "signin" : "signup")}
              aria-label={isSignUp ? "Перейти ко входу" : "Перейти к созданию аккаунта"}
            >
              {isSignUp ? "Войти" : "Создать аккаунт"}
            </button>
          </p>
        </div>
      </section>
    </div>
  );
}
