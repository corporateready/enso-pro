"use client";

import Image from "next/image";
import { Fragment, useEffect, useRef, useState, type KeyboardEvent } from "react";

import BuildingLife from "../../building-life";
import { revealDelay } from "../../motion/reveal";
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
  const tabListRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  // where a tapped tab is scrolling the cards to: until they get there, the
  // scroll must not hand the choice back to the tab they are leaving
  const headingTo = useRef<number | null>(null);

  // On a phone each tab's cards fill the width and sit side by side, so a
  // tab is a sideways scroll away, and a swipe gets there as well as a tap.
  const selectTab = (tab: DesignTab) => {
    setActiveTab(tab);

    const panels = panelsRef.current;
    if (!panels || panels.scrollWidth <= panels.clientWidth) return;

    const left = tabs.findIndex(({ id }) => id === tab) * panels.clientWidth;
    if (Math.abs(panels.scrollLeft - left) < 2) return;

    headingTo.current = left;
    panels.scrollTo({
      left,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  // The pill rides along with the cards (--tab-progress: 0 with the first
  // tab's cards in view, 1 with the second's), and the tab changes once
  // they are more than half way over.
  useEffect(() => {
    const panels = panelsRef.current;
    const tabList = tabListRef.current;
    if (!panels || !tabList) return;

    const follow = () => {
      const room = panels.scrollWidth - panels.clientWidth;
      if (room <= 0) return;

      const progress = Math.min(Math.max(panels.scrollLeft / room, 0), 1);
      tabList.style.setProperty("--tab-progress", progress.toFixed(4));

      if (headingTo.current !== null) {
        if (Math.abs(panels.scrollLeft - headingTo.current) < 2) {
          headingTo.current = null;
        }
        return;
      }

      setActiveTab(tabs[Math.round(progress)].id);
    };

    // a finger (or a trackpad) on the cards takes over from a tapped tab
    const takeOver = () => {
      headingTo.current = null;
    };

    // the chosen tab's cards stay in view when the page changes width: a
    // phone turned, or back from the desktop layout, which shows one tab only
    let width = window.innerWidth;
    const keepChosenTab = () => {
      if (window.innerWidth === width) return;
      width = window.innerWidth;

      const chosen = tabList.querySelector<HTMLElement>('[aria-selected="true"]');
      const index = tabs.findIndex(({ id }) => id === chosen?.dataset.tab);
      headingTo.current = null;
      panels.scrollLeft = Math.max(index, 0) * panels.clientWidth;
    };

    panels.addEventListener("scroll", follow, { passive: true });
    panels.addEventListener("pointerdown", takeOver);
    panels.addEventListener("wheel", takeOver, { passive: true });
    window.addEventListener("resize", keepChosenTab);

    return () => {
      panels.removeEventListener("scroll", follow);
      panels.removeEventListener("pointerdown", takeOver);
      panels.removeEventListener("wheel", takeOver);
      window.removeEventListener("resize", keepChosenTab);
    };
  }, []);

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
    selectTab(nextTab);
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
          <h2 id="design-title" className={styles.title} data-reveal>
            WHY DESIGN{" "}
            <br />
            PROJECTS IN 3D?
          </h2>
          <p className={styles.intro} data-reveal style={revealDelay(100)}>
            Most projects are still drawn in 2D, where{" "}
            <br />
            problems surface on site. We model ours in 3D{" "}
            <br />
            first — BIM, the international standard —{" "}
            <br />
            so they&apos;re solved on screen, not in concrete
          </p>
        </header>

        <div
          className={styles.buildingVisual}
          aria-hidden="true"
          data-reveal
          style={revealDelay(150)}
        >
          {/* the picture and the life laid over it float (or breathe)
              together */}
          <div className={styles.buildingStage}>
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
              // without sizes it went out at 3840 for a 782px picture
              sizes="(min-width: 641px) 41vw, 1px"
              quality={90}
              alt=""
            />
            <BuildingLife className={styles.buildingLife} />
          </div>
        </div>

        <div ref={tabListRef} className={styles.tabs} data-reveal role="tablist" aria-label="BIM benefits">
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
              aria-controls={`design-benefits-${tab.id}`}
              tabIndex={activeTab === tab.id ? 0 : -1}
              data-tab={tab.id}
              onClick={() => selectTab(tab.id)}
              onKeyDown={(event) => handleTabKeyDown(event, tab.id)}
            >
              <span className={styles.tabLabel}>{tab.label}</span>
            </button>
          ))}
        </div>

        <div
          className={styles.cardsArea}
          data-reveal
          style={revealDelay(100)}
        >
          <div className={styles.panels} ref={panelsRef}>
            {tabs.map((tab) => (
              <div
                id={`design-benefits-${tab.id}`}
                className={`${styles.cards} ${
                  activeTab === tab.id ? styles.cardsActive : ""
                }`}
                key={tab.id}
                data-tab={tab.id}
                role="tabpanel"
                aria-labelledby={`design-tab-${tab.id}`}
                aria-hidden={activeTab !== tab.id}
              >
                {benefits[tab.id].map((benefit) => (
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
