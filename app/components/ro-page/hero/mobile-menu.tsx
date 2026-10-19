"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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
};

export default function MobileMenu({
  dark = false,
  onOpenAccount,
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

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
        onClick={() => setIsOpen((current) => !current)}
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
        className={`${styles.menu} ${isOpen ? styles.menuOpen : ""}`}
        aria-hidden={!isOpen}
      >
        <header className={styles.activeHeader}>
          <button
            className={styles.logoButton}
            type="button"
            onClick={closeMenu}
            aria-label="Go to home page"
          >
            <Image
              src="/black-logo.svg"
              width={75}
              height={25}
              alt="Enso Development"
              priority
            />
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

            <Link
              className={styles.languageButton}
              href="/en"
              onClick={closeMenu}
              aria-label="Switch to English"
            >
              EN
            </Link>
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
