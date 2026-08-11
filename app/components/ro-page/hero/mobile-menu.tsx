"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import AccountModal from "./account-modal";
import styles from "./mobile-menu.module.css";

const navigation = [
  "PROJECTS",
  "OUR HISTORY",
  "PAYMENT METHOD",
  "WHY ENSO?",
  "BIM",
  "OUR VALUES",
  "OUR TEAM",
  "OUR PARTNERS",
  "ENSO JOURNAL",
] as const;

type MobileMenuProps = {
  dark?: boolean;
};

export default function MobileMenu({ dark = false }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);
  const openAccountModal = () => {
    setIsOpen(false);
    setIsAccountModalOpen(true);
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
            <button key={item} type="button" onClick={closeMenu}>
              {item}
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
            <span>LOG IN PERSONAL ACCOUNT</span>
          </button>

          <button
            className={styles.createAccountLink}
            type="button"
            onClick={closeMenu}
          >
            New? <span>Create an Account</span>
          </button>
        </div>
      </div>

      {isAccountModalOpen && (
        <AccountModal onClose={() => setIsAccountModalOpen(false)} />
      )}
    </>
  );
}
