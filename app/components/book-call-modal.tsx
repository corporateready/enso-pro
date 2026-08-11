"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";

import styles from "./book-call-modal.module.css";

type BookCallModalProps = {
  locale: "ro" | "en";
  onClose: () => void;
};

const copy = {
  ro: {
    close: "Închide formularul",
    subtitle: "Spune-ne pe scurt, iar un consultant te sună.",
    name: "Nume complet",
    email: "E-mail",
    phone: "Număr de telefon",
    either: "Oricare",
    project: "Proiect preferat",
    date: "Data preferată",
    notes: "Altceva?",
    submit: "Solicită întâlnirea",
  },
  en: {
    close: "Close form",
    subtitle: "Tell us a little, and an advisor will reach out.",
    name: "Full Name",
    email: "E-mail",
    phone: "Phone number",
    either: "Either",
    project: "Preferred project",
    date: "Preferred date",
    notes: "Anything else?",
    submit: "Request meeting",
  },
} as const;

export default function BookCallModal({
  locale,
  onClose,
}: BookCallModalProps) {
  const text = copy[locale];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [project, setProject] = useState("enso-estate");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
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
        aria-labelledby={`book-call-title-${locale}`}
      >
        <button
          className={styles.closeButton}
          type="button"
          onClick={onClose}
          aria-label={text.close}
        >
          <span />
          <span />
        </button>

        <h2 id={`book-call-title-${locale}`} className={styles.title}>
          BOOK A CALL
        </h2>
        <p className={styles.subtitle}>{text.subtitle}</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.contactFields}>
            <label className={styles.visuallyHidden} htmlFor={`call-name-${locale}`}>
              {text.name}
            </label>
            <input
              ref={nameRef}
              id={`call-name-${locale}`}
              className={styles.input}
              name="name"
              type="text"
              autoComplete="name"
              placeholder={text.name}
              value={name}
              required
              onChange={(event) => setName(event.target.value)}
            />

            <label
              className={styles.visuallyHidden}
              htmlFor={`call-email-${locale}`}
            >
              {text.email}
            </label>
            <input
              id={`call-email-${locale}`}
              className={styles.input}
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder={text.email}
              value={email}
              required
              onChange={(event) => setEmail(event.target.value)}
            />

            <label
              className={styles.visuallyHidden}
              htmlFor={`call-phone-${locale}`}
            >
              {text.phone}
            </label>
            <div className={styles.phoneField}>
              <span className={styles.countryFlag} aria-hidden="true">
                🇷🇴
              </span>
              <input
                id={`call-phone-${locale}`}
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
          </div>

          <fieldset className={styles.projectOptions}>
            <legend className={styles.visuallyHidden}>{text.project}</legend>
            {[
              ["enso-living", "ENSO LIVING"],
              ["enso-estate", "ENSO ESTATE"],
              ["either", text.either],
            ].map(([value, label]) => (
              <label
                className={`${styles.projectOption} ${
                  project === value ? styles.projectOptionActive : ""
                }`}
                key={value}
              >
                <input
                  className={styles.visuallyHidden}
                  type="radio"
                  name="project"
                  value={value}
                  checked={project === value}
                  onChange={() => setProject(value)}
                />
                {label}
              </label>
            ))}
          </fieldset>

          <div className={styles.dateField}>
            {!date && <span className={styles.datePlaceholder}>{text.date}</span>}
            <svg
              className={styles.calendarIcon}
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <rect x="2.5" y="4.5" width="15" height="13" rx="1" />
              <path d="M6 2.5v4M14 2.5v4M3 8h14" />
            </svg>
            <input
              className={`${styles.dateInput} ${
                date ? styles.dateInputFilled : ""
              }`}
              name="date"
              type="date"
              value={date}
              required
              aria-label={text.date}
              onChange={(event) => setDate(event.target.value)}
            />
          </div>

          <label className={styles.visuallyHidden} htmlFor={`call-notes-${locale}`}>
            {text.notes}
          </label>
          <input
            id={`call-notes-${locale}`}
            className={`${styles.input} ${styles.notesInput}`}
            name="notes"
            type="text"
            placeholder={text.notes}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
          />

          <button className={styles.submitButton} type="submit">
            {text.submit}
          </button>
        </form>
      </section>
    </div>,
    document.body,
  );
}
