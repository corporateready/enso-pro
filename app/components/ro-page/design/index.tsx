"use client";

import Image from "next/image";
import { Fragment, useState, type KeyboardEvent } from "react";

import styles from "./design.module.css";

type DesignTab = "investors" | "buyers";

type DesignBenefit = {
  number: string;
  badge: string;
  title: string;
  description: string;
};

const benefits: Record<DesignTab, readonly DesignBenefit[]> = {
  investors: [
    {
      number: "01",
      badge: "~5% → aproape zero",
      title: "Milioane economisite înainte\nde construcție",
      description:
        "Rezerva de ~5% pentru surprizele\nde pe șantier scade spre zero —\nla scara noastră, milioane\neconomisite.",
    },
    {
      number: "02",
      badge: "Fără necunoscute",
      title: "Fezabilitate verificată înainte\nsă investești",
      description:
        "Costuri și randamente modelate înainte de construcție —\nverifici cifrele înainte\nde decizie.",
    },
    {
      number: "03",
      badge: "Activ pe termen lung",
      title: "Costuri de operare mai mici,\npe viață",
      description:
        "Modelul rămâne activ după predare — reduce costurile\nde mentenanță și operare ani la rând.",
    },
  ],
  buyers: [
    {
      number: "04",
      badge: "Corect din prima",
      title: "Erori prinse înainte\nde construcție",
      description:
        "Toate sistemele coordonate într-un singur model — fără conflicte în locuința ta.",
    },
    {
      number: "05",
      badge: "Fără întârzieri",
      title: "Livrare mai rapidă",
      description:
        "Fără refaceri, fără opriri — locuința ta e gata mai devreme.",
    },
    {
      number: "06",
      badge: "La centimetru",
      title: "Îți planifici spațiul\nla centimetru",
      description:
        "Dimensiuni exacte din prima zi — alegi mobilierul și finisajele fără aproximări.",
    },
  ],
};

/*
 * "\n" in a title or description marks a line break that Figma's desktop
 * card has; the mobile cards wrap freely, so the break is desktop-only.
 */
function desktopLines(text: string) {
  return text.split("\n").map((line, index) => (
    <Fragment key={index}>
      {index > 0 && (
        <>
          {" "}
          <br className={styles.desktopBreak} />
        </>
      )}
      {line}
    </Fragment>
  ));
}

const tabs: readonly { id: DesignTab; label: string }[] = [
  { id: "investors", label: "Pentru investitori" },
  { id: "buyers", label: "Pentru cumpărători" },
];

export default function Design() {
  const [activeTab, setActiveTab] = useState<DesignTab>("investors");

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    currentTab: DesignTab,
  ) => {
    let nextTab: DesignTab | null = null;

    if (event.key === "ArrowLeft" || event.key === "Home") {
      nextTab = "investors";
    } else if (event.key === "ArrowRight" || event.key === "End") {
      nextTab = "buyers";
    }

    if (!nextTab || nextTab === currentTab) return;

    event.preventDefault();
    setActiveTab(nextTab);
    event.currentTarget.parentElement
      ?.querySelector<HTMLButtonElement>(`[data-tab="${nextTab}"]`)
      ?.focus();
  };

  return (
    <section
      id="bim"
      className={styles.section}
      aria-labelledby="design-title"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 id="design-title" className={styles.title}>
            DE CE PROIECTĂM
            <br />
            ÎN 3D?
          </h2>
          <p className={styles.intro}>
            Majoritatea proiectelor sunt încă proiectate{" "}
            <br />
            în 2D, unde problemele apar abia pe șantier.{" "}
            <br />
            <br />
            Noi modelăm fiecare proiect ENSO{" "}
            <br />
            întâi în 3D — BIM, standardul internațional —{" "}
            <br />
            ca să fie rezolvate pe ecran, nu în beton.
          </p>
        </header>

        <div className={styles.buildingVisual} aria-hidden="true">
          <Image
            className={`${styles.sourceImage} ${styles.mobileImage}`}
            src="/bim-design.png"
            width={1000}
            height={560}
            alt=""
            unoptimized
          />
          <Image
            className={`${styles.sourceImage} ${styles.desktopImage}`}
            src="/design-3d-building-desktop.avif"
            width={3128}
            height={1752}
            alt=""
          />
        </div>

        <div className={styles.tabs} role="tablist" aria-label="Beneficii BIM">
          <span
            className={`${styles.tabIndicator} ${
              activeTab === "buyers" ? styles.tabIndicatorBuyers : ""
            }`}
            aria-hidden="true"
          />
          {tabs.map((tab) => (
            <button
              id={`design-tab-${tab.id}`}
              className={`${styles.tabButton} ${
                activeTab === tab.id ? styles.tabButtonActive : ""
              }`}
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls="design-benefits"
              tabIndex={activeTab === tab.id ? 0 : -1}
              data-tab={tab.id}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(event) => handleTabKeyDown(event, tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className={styles.cardsArea} data-active-tab={activeTab}>
          <div
            id="design-benefits"
            className={styles.cards}
            key={activeTab}
            role="tabpanel"
            aria-labelledby={`design-tab-${activeTab}`}
          >
            {benefits[activeTab].map((benefit) => (
              <article className={styles.card} key={benefit.number}>
                <div className={styles.cardMeta}>
                  <span className={styles.cardNumber}>{benefit.number}</span>
                  <span className={styles.badge}>
                    {/* one inline run: as separate flex items the spaces
                        around the arrow would be trimmed */}
                    <span>
                      {benefit.badge.split("→").map((part, index) => (
                        <Fragment key={index}>
                          {index > 0 && <span className="inter-arrow">→</span>}
                          {part}
                        </Fragment>
                      ))}
                    </span>
                  </span>
                </div>
                <h3>{desktopLines(benefit.title)}</h3>
                <p>{desktopLines(benefit.description)}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
