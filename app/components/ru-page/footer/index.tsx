import Image from "next/image";

import EnsoFooterLogo from "../../enso-footer-logo";
import SocialIcon, { type SocialIconName } from "../../social-icon";
import styles from "../../ro-page/footer/footer.module.css";

const menuLinks = [
  { label: "Личный кабинет", href: "#my-enso" },
  { label: "Наша история", href: "#since" },
  { label: "Способы оплаты", href: "#payment-method" },
  { label: "Почему ENSŌ", href: "#why-enso" },
  { label: "BIM", href: "#bim" },
  { label: "Наши ценности", href: "#values" },
  { label: "Наша команда", href: "#team" },
  { label: "Наши партнёры", href: "#partners" },
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
        <nav className={`${styles.column} ${styles.menu}`} aria-label="Меню в подвале">
          <p className={styles.columnTitle}>Меню</p>
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
          aria-label="Проекты"
        >
          <p className={styles.columnTitle}>Проекты</p>
          <ul>
            {projectLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.socials} aria-label="Соцсети">
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
            <span className={styles.copyDesktop}>© 2026 Все права защищены</span>
            <span className={styles.copyMobile}>© 2026 Все права защищены.</span>
          </p>

          <div className={styles.legalLinks}>
            <a href="#terms">Условия использования</a>
            <a href="#privacy">Конфиденциальность</a>
          </div>
        </div>

        <a
          className={`${styles.backToTop} motion-button`}
          href="#top"
          aria-label="Наверх"
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
