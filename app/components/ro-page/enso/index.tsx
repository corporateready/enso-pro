"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import EnsoFeatureIcon, {
  type EnsoFeatureIconName,
} from "../../enso-feature-icon";
import styles from "./enso.module.css";

const features: readonly {
  icon: EnsoFeatureIconName;
  text: string;
  className: string;
}[] = [
  { icon: "tag", text: "Vezi prețurile", className: styles.featureOne },
  {
    icon: "property",
    text: "Cumperi, vinzi sau dai în chirie",
    className: styles.featureTwo,
  },
  {
    icon: "message",
    text: "Linie directă cu echipa noastră",
    className: styles.featureThree,
  },
  {
    icon: "construction",
    text: "Urmărește construcția",
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
          src="/enso-mobile-bg.webp"
          width={1576}
          height={2591}
          sizes="(max-width: 639px) 100vw, 394px"
          alt=""
        />
        <Image
          className={`${styles.background} ${styles.desktopImage}`}
          src="/enso-desktop-bg.avif"
          width={7680}
          height={3332}
          sizes="(min-width: 641px) 100vw, 1px"
          alt=""
        />
        <Image
          className={styles.laptopImage}
          src="/enso-laptop-desktop.avif"
          width={3352}
          height={2724}
          unoptimized
          alt=""
        />

        <div className={styles.content}>
          <h2 id="my-enso-title" className={styles.title}>
            MY ENSO
          </h2>
          <p className={styles.intro}>
            Tot ce ține de proprietatea ta, într-un singur <br />
            loc — prețuri, documente și echipa ta ENSO.
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
          className={styles.accountLink}
          href="#create-account"
        >
          Creează-ți contul
        </a>
      </div>
    </section>
  );
}
