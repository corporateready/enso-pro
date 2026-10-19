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
      badge: "~5% → near zero",
      title: "Millions saved before\nwe build",
      description:
        "The ~5% normally reserved for\non-site surprises drops to near\nzero — millions saved\nat our scale",
    },
    {
      number: "02",
      badge: "Modelled upfront",
      title: "Feasibility checked before\nyou commit",
      description:
        "Costs and returns are modelled before construction —\ncheck the numbers before\nyou commit.",
    },
    {
      number: "03",
      badge: "Lifetime asset",
      title: "Lower operating\ncosts for life",
      description:
        "The model stays live after handover, cutting maintenance and operating costs for years.",
    },
  ],
  buyers: [
    {
      number: "04",
      badge: "Built right, once",
      title: "Errors caught before\nconstruction",
      description:
        "All systems coordinated in one model — no clashes in your home.",
    },
    {
      number: "05",
      badge: "See it first",
      title: "Faster project\ndelivery",
      description:
        "No rework, no stoppages — your home is ready sooner.",
    },
    {
      number: "06",
      badge: "Lower bills",
      title: "Plan your space\nto the centimetre",
      description:
        "Exact dimensions from day one — plan furniture and finishes with no guesswork.",
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
  { id: "investors", label: "For investors" },
  { id: "buyers", label: "For buyers" },
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
            WHY DESIGN{" "}
            <br />
            PROJECTS IN 3D?
          </h2>
          <p className={styles.intro}>
            Most projects are still drawn in 2D, where{" "}
            <br />
            problems surface on site. We model ours in 3D{" "}
            <br />
            first — BIM, the international standard —{" "}
            <br />
            so they&apos;re solved on screen, not in concrete
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

        <div className={styles.tabs} role="tablist" aria-label="BIM benefits">
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
