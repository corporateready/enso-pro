import Image from "next/image";

import SocialIcon, { type SocialIconName } from "../../social-icon";
import styles from "./footer.module.css";

const menuLinks = [
  { label: "Personal account", href: "#my-enso" },
  { label: "Our history", href: "#since" },
  { label: "Payment method", href: "#payment-method" },
  { label: "Why ENSO", href: "#why-enso" },
  { label: "BIM", href: "#bim" },
  { label: "Our values", href: "#values" },
  { label: "Our team", href: "#team" },
  { label: "Our partners", href: "#partners" },
  { label: "ENSO journal", href: "#journal" },
] as const;

const projectLinks = [
  { label: "ENSO LIVING", href: "#enso-living" },
  { label: "ENSO ESTATE", href: "#enso-estate" },
  { label: "ARTIMA Business & Lifestyle", href: "#artima" },
] as const;

const socialLinks: {
  name: string;
  icon: SocialIconName;
  className: string;
}[] = [
  { name: "TikTok", icon: "tiktok", className: styles.tiktok },
  { name: "X", icon: "x", className: styles.x },
  { name: "Instagram", icon: "instagram", className: styles.instagram },
  { name: "Facebook", icon: "facebook", className: styles.facebook },
  { name: "YouTube", icon: "youtube", className: styles.youtube },
  { name: "LinkedIn", icon: "linkedin", className: styles.linkedin },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <nav className={`${styles.column} ${styles.menu}`} aria-label="Footer menu">
          <p className={styles.columnTitle}>Menu</p>
          <ul>
            {menuLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <nav
          className={`${styles.column} ${styles.projects}`}
          aria-label="Projects"
        >
          <p className={styles.columnTitle}>Projects</p>
          <ul>
            {projectLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.socials} aria-label="Social media">
          {socialLinks.map((social) => (
            <a
              className={`${styles.socialLink} ${social.className}`}
              href="#contact"
              aria-label={social.name}
              key={social.name}
            >
              <SocialIcon name={social.icon} className={styles.socialIcon} />
            </a>
          ))}
        </div>

        <Image
          className={styles.brand}
          src="/enso-footer.svg"
          width={24}
          height={30}
          alt="ENSO Development"
        />

        <p className={styles.copyright}>© 2026 All rights reserved.</p>

        <div className={styles.legalLinks}>
          <a href="#terms">Terms &amp; conditions</a>
          <a href="#privacy">Privacy Policy</a>
        </div>

        <a className={styles.backToTop} href="#top" aria-label="Back to top">
          <Image
            className={styles.backToTopIcon}
            src="/to-top-arrow.svg"
            width={9}
            height={17}
            alt=""
            aria-hidden="true"
          />
        </a>
      </div>
    </footer>
  );
}
