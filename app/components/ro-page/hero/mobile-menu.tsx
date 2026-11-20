"use client";

import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";

import LanguageMenu, {
  type LanguageOption,
  siteLanguages,
} from "../../language-menu";
import {
  endMenuHandover,
  keepMenuOpenOnNextPage,
  takeMenuHandover,
} from "../../menu-handover";
import { lockPageScroll } from "../../scroll-lock";
import styles from "./mobile-menu.module.css";

// Each item scrolls to its section (the same anchors the desktop header
// links to); they used to only close the menu.
const navigation = [
  { label: "PROIECTE", target: "projects" },
  { label: "ISTORIA NOASTRĂ", target: "since" },
  { label: "MODALITĂȚI DE PLATĂ", target: "payment-method" },
  { label: "DE CE ENSŌ?", target: "why-enso" },
  { label: "BIM", target: "bim" },
  { label: "VALORILE NOASTRE", target: "values" },
  { label: "ECHIPA NOASTRĂ", target: "team" },
  { label: "PARTENERII NOȘTRI", target: "partners" },
  { label: "ENSO JOURNAL", target: "journal" },
] as const;

type MobileMenuProps = {
  dark?: boolean;
  /* The header owns the dialog so its own controls can open it too. */
  onOpenAccount: (mode: "signin" | "signup") => void;
  /* on a page without the home page's sections (the journal's): where
     they are */
  home?: string;
  /* where the language menu leads: this page in the other languages */
  languages?: readonly LanguageOption[];
};

export default function MobileMenu({
  dark = false,
  onOpenAccount,
  home,
  languages = siteLanguages,
}: MobileMenuProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  // Open because the page arrived that way (a change of language), not by
  // a tap: the items are already in place and do not come in again.
  const [arrivedOpen, setArrivedOpen] = useState(false);

  // Loaded by a choice of language in the other language's open menu: the
  // page comes up with the menu drawn open (menu-handover.ts), and before
  // the next paint the menu is open in earnest. The note is in the
  // browser's storage, which the server's render cannot see, so the state
  // can only be set once the page is in the browser.
  useLayoutEffect(() => {
    if (takeMenuHandover()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsOpen(true);
      setArrivedOpen(true);
    } else {
      endMenuHandover();
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    endMenuHandover();

    const unlockPageScroll = lockPageScroll();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      unlockPageScroll();
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);
  const goToSection = (target: string) => {
    setIsOpen(false);
    // a section this page does not have: the home page's
    if (home && !document.getElementById(target)) {
      router.push(`${home}#${target}`);
      return;
    }
    // Scroll once the menu has closed and let go of the page: two frames
    // covers the re-render and the effect clean-up that unlocks scrolling.
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        document
          .getElementById(target)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  };
  const openAccountModal = () => {
    setIsOpen(false);
    onOpenAccount("signin");
  };

  const openCreateAccount = () => {
    setIsOpen(false);
    onOpenAccount("signup");
  };

  return (
    <>
      <button
        className={`${styles.trigger} ${dark ? styles.triggerDark : ""} ${isOpen ? styles.triggerOpen : ""}`}
        type="button"
        onClick={() => {
          setArrivedOpen(false);
          setIsOpen((current) => !current);
        }}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <span className={styles.triggerLine} />
        <span className={styles.triggerLine} />
        <span className={styles.triggerLine} />
      </button>

      <div
        id="mobile-navigation"
        className={`${styles.menu} ${isOpen ? styles.menuOpen : ""} ${arrivedOpen ? styles.menuArrived : ""}`}
        aria-hidden={!isOpen}
      >
        <header className={styles.activeHeader}>
          <button
            className={styles.logoButton}
            type="button"
            onClick={closeMenu}
            aria-label="Go to home page"
          >
            {/* The page header's own logo (hero/index.tsx), drawn again and
                turned black in the CSS: a picture file came a moment after
                the menu when the page was loaded with the menu open. */}
            <svg viewBox="0 0 75 25" aria-hidden="true">
              <use href="#enso-header-logo" />
            </svg>
          </button>

          <div className={styles.activeHeaderControls}>
            <button
              className={styles.accountButton}
              type="button"
              onClick={openAccountModal}
              aria-label="Open personal account"
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
              look="names"
              tone="onWhite"
              current="ro"
              languages={languages}
              label="Limba"
              // the menu stays open, and opens on the other language's page
              onChoose={(code) => {
                if (code !== "ro") keepMenuOpenOnNextPage();
              }}
            />
          </div>
        </header>

        <nav className={styles.navigation} aria-label="Main navigation">
          {navigation.map((item) => (
            <button
              key={item.target}
              type="button"
              onClick={() => goToSection(item.target)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className={styles.accountActions}>
          <button
            className={styles.loginLink}
            type="button"
            onClick={openAccountModal}
          >
            <svg
              viewBox="0 0 19 21"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M18.5 20.5C18.5 17.4318 14.4706 14.9444 9.5 14.9444C4.52944 14.9444 0.5 17.4318 0.5 20.5M9.5 11.6111C6.3934 11.6111 3.875 9.12381 3.875 6.05556C3.875 2.98731 6.3934 0.5 9.5 0.5C12.6066 0.5 15.125 2.98731 15.125 6.05556C15.125 9.12381 12.6066 11.6111 9.5 11.6111Z"
                stroke="currentColor"
                strokeLinejoin="round"
              />
            </svg>
            <span>INTRĂ ÎN CONTUL PERSONAL</span>
          </button>

          <button
            className={styles.createAccountLink}
            type="button"
            onClick={openCreateAccount}
          >
            Ești nou aici? <span>Creează-ți cont</span>
          </button>
        </div>
      </div>
    </>
  );
}
