import Image from "next/image";

import EnsoFooterLogo from "../../enso-footer-logo";
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
  { label: "ENSO Journal", href: "#journal" },
] as const;

const projectLinks = [
  { label: "ENSO CITY", href: "#enso-city" },
  { label: "ENSO LIVING", href: "#enso-living" },
  { label: "ARTIMA Business & Lifestyle", href: "#artima" },
] as const;

// ENSO's own pages (the three linked from enso.ro, 2026-11-25); the others
// still lead to the contacts until their addresses are known
const socialLinks: {
  name: string;
  icon: SocialIconName;
  className: string;
  href?: string;
}[] = [
  { name: "TikTok", icon: "tiktok", className: styles.tiktok },
  { name: "X", icon: "x", className: styles.x },
  {
    name: "Instagram",
    icon: "instagram",
    className: styles.instagram,
    href: "https://www.instagram.com/ensodevelopment.ro",
  },
  {
    name: "Facebook",
    icon: "facebook",
    className: styles.facebook,
    href: "https://www.facebook.com/profile.php?id=61580179168995",
  },
  {
    name: "YouTube",
    icon: "youtube",
    className: styles.youtube,
    href: "https://www.youtube.com/@ensodevelopmentro",
  },
  { name: "LinkedIn", icon: "linkedin", className: styles.linkedin },
];

export default function Footer({
  home,
}: {
  /* on a page without the home page's sections (the journal's): where the
     links to them lead */
  home?: string;
} = {}) {
  const to = (href: string) =>
    home && href.startsWith("#") && href !== "#top" ? `${home}${href}` : href;

  return (
    <footer className={`${styles.footer} ${home ? styles.footerOnWhite : ""}`}>
      <div className={styles.inner}>
        <nav className={`${styles.column} ${styles.menu}`} data-reveal data-reveal-edge aria-label="Footer menu">
          <p className={styles.columnTitle}>Menu</p>
          <ul>
            {menuLinks.map((link) => (
              <li key={link.label}>
                <a href={to(link.href)}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <nav
          className={`${styles.column} ${styles.projects}`} data-reveal data-reveal-edge
          aria-label="Projects"
        >
          <p className={styles.columnTitle}>Projects</p>
          <ul>
            {projectLinks.map((link) => (
              <li key={link.label}>
                <a href={to(link.href)}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.socials} aria-label="Social media">
          {socialLinks.map((social) => (
            <a
              className={`${styles.socialLink} ${social.className}`}
              href={social.href ?? to("#contact")}
              {...(social.href
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
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
            <span className={styles.copyDesktop}>© 2026 ENSO Development All Rights Reserved</span>
            <span className={styles.copyMobile}>© 2026 All rights reserved</span>
          </p>

          <div className={styles.legalLinks}>
            <a href={to("#terms")}>Terms &amp; conditions</a>
            <a href={to("#privacy")}>Privacy policy</a>
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
