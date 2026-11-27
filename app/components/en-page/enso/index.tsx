"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { type CSSProperties, useEffect, useRef, useState } from "react";

import EnsoFeatureIcon, {
  type EnsoFeatureIconName,
} from "../../enso-feature-icon";
import { revealDelay } from "../../motion/reveal";
import styles from "./enso.module.css";

const features: readonly {
  icon: EnsoFeatureIconName;
  text: string;
  className: string;
}[] = [
  { icon: "tag", text: "Get Prices", className: styles.featureOne },
  {
    icon: "property",
    text: "Buy, Sell or Rent Out",
    className: styles.featureTwo,
  },
  {
    icon: "message",
    text: "Direct Line to Our Team",
    className: styles.featureThree,
  },
  {
    icon: "construction",
    text: "Construction Tracking",
    className: styles.featureFour,
  },
];

export default function Enso() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const [animatedPathname, setAnimatedPathname] = useState<string | null>(null);
  const featuresVisible = animatedPathname === pathname;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setAnimatedPathname(pathname);
        observer.unobserve(section);
      },
      { threshold: 0.2 },
    );

    let scrollEndTimer: number | undefined;

    const startObserving = () => {
      window.removeEventListener("scroll", waitForRouteScrollEnd);
      observer.observe(section);
    };

    const waitForRouteScrollEnd = () => {
      if (scrollEndTimer) window.clearTimeout(scrollEndTimer);
      scrollEndTimer = window.setTimeout(startObserving, 150);
    };

    window.addEventListener("scroll", waitForRouteScrollEnd, { passive: true });
    waitForRouteScrollEnd();

    return () => {
      if (scrollEndTimer) window.clearTimeout(scrollEndTimer);
      window.removeEventListener("scroll", waitForRouteScrollEnd);
      observer.disconnect();
    };
  }, [pathname]);

  return (
    <section
      id="my-enso"
      ref={sectionRef}
      className={`${styles.section} ${featuresVisible ? styles.featuresVisible : ""}`}
      aria-labelledby="my-enso-title"
    >
      <div className={styles.inner}>
        <Image
          className={`${styles.background} ${styles.mobileImage}`}
          // the phone shows a client's cabinet too (a mock, 2026-11-27; it
          // showed the sign-in screen before)
          src="/enso-mobile-my-enso-en.webp"
          width={1576}
          height={2591}
          sizes="(max-width: 639px) 100vw, 394px"
          alt=""
        />
        <Image
          className={`${styles.background} ${styles.desktopImage}`}
          // the garden sharp since 2026-11-26: only the laptop's screen is
          // blurred now (it was both, "a double blur", at the 2026-11-25
          // meeting); composited from Figma's layers at 2x
          src="/enso-desktop-bg-sharp.avif"
          width={3840}
          height={1666}
          sizes="(min-width: 641px) 100vw, 1px"
          alt=""
        />
        {/* EN Figma puts the blurred login popup on the laptop screen 42 to
            the right of RO's, so each page has its own export */}
        <Image
          className={styles.laptopImage}
          // on its screen, blurred, a client's own cabinet: the flat in ENSO
          // LIVING, the works, the next payment, documents (a mock drawn
          // 2026-11-27; it showed the site's first screen before)
          src="/enso-laptop-my-enso-en.avif"
          // slides in from the right edge it sits against
          data-reveal
          style={
            {
              "--reveal-x": "160rem",
              "--reveal-shift": "0rem",
              "--reveal-duration": "1100ms",
            } as CSSProperties
          }
          width={3352}
          height={2724}
          // a 3352px source for an 838px picture: let the optimiser size it
          sizes="(min-width: 641px) 44vw, 1px"
          quality={90}
          alt=""
        />

        <div className={styles.content}>
          <h2 id="my-enso-title" className={styles.title} data-reveal>
            MY ENSO
          </h2>
          <p className={styles.intro} data-reveal style={revealDelay(100)}>
            Everything about your property,
            {/* on a phone the dash ends a line and does not start the next
                (the client's word of 2026-11-26) */}
            <br className={styles.desktopBreak} /> in one place{"\u00a0"}—
            <br className={styles.mobileBreak} /> prices, documents,
            <br className={styles.desktopBreak} /> and your ENSO team
          </p>

          <ul className={styles.features}>
            {features.map((feature) => (
              <li
                className={`${styles.feature} ${feature.className}`}
                key={feature.text}
              >
                <EnsoFeatureIcon
                  className={styles.featureIcon}
                  name={feature.icon}
                />
                <span>{feature.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <a
          id="create-account"
          className={`${styles.accountLink} motion-button`}
          data-reveal
          href="#create-account"
        >
          Create your account
        </a>
      </div>
    </section>
  );
}
