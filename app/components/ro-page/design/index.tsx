"use client";

import Image from "next/image";
import { useState, type KeyboardEvent } from "react";

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
      title: "Milioane economisite înainte de construcție",
      description:
        "Rezerva de ~5% pentru surprizele de pe șantier scade spre zero — la scara noastră, milioane economisite.",
    },
    {
      number: "02",
      badge: "Fără necunoscute",
      title: "Fezabilitate verificată înainte să investești",
      description:
        "Costuri și randamente modelate înainte de construcție — verifici cifrele înainte de decizie.",
    },
    {
      number: "03",
      badge: "Activ pe termen lung",
      title: "Costuri de operare mai mici, pe viață",
      description:
        "Modelul rămâne activ după predare — reduce costurile de mentenanță și operare ani la rând.",
    },
  ],
  buyers: [
    {
      number: "04",
      badge: "Corect din prima",
      title: "Erori prinse înainte de construcție",
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
      title: "Îți planifici spațiul la centimetru",
      description:
        "Dimensiuni exacte din prima zi — alegi mobilierul și finisajele fără aproximări.",
    },
  ],
};

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
            Majoritatea proiectelor sunt încă proiectate
            <br />
            în 2D, unde problemele apar abia pe șantier.
            <br />
            <br />
            Noi modelăm fiecare proiect ENSO
            <br />
            întâi în 3D — BIM, standardul internațional —
            <br />
            ca să fie rezolvate pe ecran, nu în beton.
          </p>
        </header>

        <div className={styles.buildingVisual} aria-hidden="true">
          <Image
            className={styles.sourceImage}
            src="/bim-design.png"
            width={1000}
            height={560}
            alt=""
            unoptimized
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
                  <span className={styles.badge}>{benefit.badge}</span>
                </div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
