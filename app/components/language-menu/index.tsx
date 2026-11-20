"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

import styles from "./language-menu.module.css";

/*
 * The language menu: the header shows the code of the language the page is
 * in, with a small arrow, and a press opens the rest. It was drawn in three
 * looks for the client to choose from (app/(ro)/language-menu):
 *   names  a card with each language's code and own name, the current ticked
 *   codes  a short card of the codes
 *   row    no card: the other codes slide out beside the current one
 * The client took "names", and that is the one in the site's header and in
 * its open menu, with siteLanguages. It closes on a choice, on Escape and on
 * a press anywhere else. A language with an href is a link to its page; one
 * without (the examples page, which has all three) is only handed to
 * onChoose.
 */

export type LanguageCode = "ro" | "ru" | "en";
export type LanguageMenuLook = "names" | "codes" | "row";

export type LanguageOption = { code: LanguageCode; name: string; href?: string };

// the examples page's three, going nowhere
const exampleLanguages: readonly LanguageOption[] = [
  { code: "ro", name: "Română" },
  { code: "ru", name: "Русский" },
  { code: "en", name: "English" },
];

// The languages the site has a page in: a line here puts a language into
// the header and the open menu of every page.
export const siteLanguages: readonly LanguageOption[] = [
  { code: "ro", name: "Română", href: "/" },
  { code: "ru", name: "Русский", href: "/ru" },
  { code: "en", name: "English", href: "/en" },
];

// The journal's own page in each language (app/(ro)/journal and the rest):
// on it the language menus lead to the journal in the other language, not
// to the home page.
export const journalLanguages: readonly LanguageOption[] = [
  { code: "ro", name: "Română", href: "/journal" },
  { code: "ru", name: "Русский", href: "/ru/journal" },
  { code: "en", name: "English", href: "/en/journal" },
];

type LanguageMenuProps = {
  look: LanguageMenuLook;
  current: LanguageCode;
  languages?: readonly LanguageOption[];
  onChoose?: (code: LanguageCode) => void;
  /* the word before the language's name in the button's label, in the
     page's language */
  label?: string;
  /* what the code lies on: a picture (white type, a dark glass card) or a
     white bar (black type, a white card) */
  tone: "onPicture" | "onWhite";
  /* the examples page shows the menus open, and a press elsewhere on the
     page does not close them; a choice closes one as on the site */
  defaultOpen?: boolean;
  pinned?: boolean;
  className?: string;
};

export default function LanguageMenu({
  look,
  current,
  languages = exampleLanguages,
  onChoose,
  label = "Limba",
  tone,
  defaultOpen = false,
  pinned = false,
  className = "",
}: LanguageMenuProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listId = useId();
  const currentName = languages.find(({ code }) => code === current)?.name;
  // the row shows the two the page is not in: the current one is the code
  // it slides out from
  const listed = look === "row" ? languages.filter(({ code }) => code !== current) : languages;

  useEffect(() => {
    if (!isOpen || pinned) return;

    const closeOnPressOutside = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    // Caught on the way down and kept: inside the site's open menu Escape
    // closes this card first, and the menu on the next press.
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      event.stopPropagation();
      setIsOpen(false);
      triggerRef.current?.focus();
    };

    document.addEventListener("pointerdown", closeOnPressOutside);
    window.addEventListener("keydown", closeOnEscape, true);

    return () => {
      document.removeEventListener("pointerdown", closeOnPressOutside);
      window.removeEventListener("keydown", closeOnEscape, true);
    };
  }, [isOpen, pinned]);

  return (
    <div
      ref={rootRef}
      className={`${styles.root} ${styles[look]} ${styles[tone]} ${className}`}
      data-open={isOpen || undefined}
      data-language-menu
    >
      <button
        ref={triggerRef}
        className={styles.trigger}
        type="button"
        aria-expanded={isOpen}
        aria-controls={listId}
        aria-label={`${label}: ${currentName}`}
        onClick={() => setIsOpen((open) => !open)}
      >
        {current}
        <svg className={styles.arrow} viewBox="0 0 10 6" fill="none" aria-hidden="true">
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <ul id={listId} className={styles.list} inert={!isOpen}>
        {listed.map(({ code, name, href }) => {
          const inside = (
            <>
              <span className={styles.code}>{code}</span>
              <span className={styles.name}>{name}</span>
              <svg className={styles.check} viewBox="0 0 14 10" fill="none" aria-hidden="true">
                <path d="M1 5L5 9L13 1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </>
          );

          return (
            <li key={code}>
              {href && code !== current ? (
                <Link
                  className={styles.item}
                  href={href}
                  lang={code}
                  hrefLang={code}
                  aria-label={name}
                  onClick={() => {
                    onChoose?.(code);
                    setIsOpen(false);
                  }}
                >
                  {inside}
                </Link>
              ) : (
                <button
                  className={styles.item}
                  type="button"
                  lang={code}
                  aria-label={name}
                  aria-current={code === current ? "true" : undefined}
                  onClick={() => {
                    onChoose?.(code);
                    setIsOpen(false);
                    triggerRef.current?.focus();
                  }}
                >
                  {inside}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
