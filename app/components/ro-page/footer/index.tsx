import Image from "next/image";

import EnsoFooterLogo from "../../enso-footer-logo";
import SocialIcon, { type SocialIconName } from "../../social-icon";
import styles from "./footer.module.css";

const menuLinks = [
  { label: "Cont personal", href: "#my-enso" },
  { label: "Istoria noastră", href: "#since" },
  { label: "Modalități de plată", href: "#payment-method" },
  { label: "De ce ENSŌ", href: "#why-enso" },
  { label: "BIM", href: "#bim" },
  { label: "Valorile noastre", href: "#values" },
  { label: "Echipa noastră", href: "#team" },
  { label: "Partenerii noștri", href: "#partners" },
  { label: "ENSO journal", href: "#journal" },
] as const;

const projectLinks = [
  { label: "ENSO LIVING", href: "https://enso.ro/living" },
  { label: "ENSO ESTATE", href: "#enso-estate" },
  { label: "ARTIMA Business & Lifestyle", href: "https://artima.md/" },
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
          <p className={styles.columnTitle}>Meniu</p>
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
          aria-label="Proiecte"
        >
          <p className={styles.columnTitle}>Proiecte</p>
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

        <EnsoFooterLogo variant="mobile" className={styles.brand} />
        {/* The desktop logo is exported from Figma as drawn there (206x268);
            its proportions differ from the small mobile mark. */}
        <EnsoFooterLogo variant="desktop" className={styles.brandDesktop} />

        <div className={styles.legal}>
          <p className={styles.copyright}>
            <span className={styles.copyDesktop}>© 2026 Toate drepturile rezervate</span>
            <span className={styles.copyMobile}>© 2026 Toate drepturile rezervate.</span>
          </p>

          <div className={styles.legalLinks}>
            <a href="#terms">Termeni și condiții</a>
            <a href="#privacy">Politica de confidențialitate</a>
          </div>
        </div>

        <a
          className={`${styles.backToTop} motion-button`}
          href="#top"
          aria-label="Back to top"
        >
          <Image
            className={styles.backToTopIcon}
            src="/to-top-arrow.svg"
            width={9}
            height={17}
            alt=""
            aria-hidden="true"
          />
          <Image
            className={styles.backToTopIconDesktop}
            src="/to-top-arrow-desktop.svg"
            width={100}
            height={100}
            alt=""
            aria-hidden="true"
          />
        </a>
      </div>
    </footer>
  );
}
