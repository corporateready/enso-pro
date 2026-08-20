"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import styles from "./team.module.css";

type TeamMember = {
  name: string;
  role: string;
  description: string;
  imageSrc?: string;
};

const teamSlides: readonly (readonly TeamMember[])[] = [
  [
    {
      name: "Viorel Benderschi",
      role: "Investments & Finance",
      description:
        "27 years in investment management and real estate development.",
    },
    {
      name: "Maxim Dumbrava",
      role: "Development",
      description:
        "16 years delivering projects including ARTIMA, NEWTON HOUSE and Eminescu Residence.",
      imageSrc: "/team-avatar-2.png",
    },
    {
      name: "Denis Vasiliev",
      role: "Marketing & Sales",
      description:
        "12 years driving marketing and sales — 3,000+ apartments brought to market.",
      imageSrc: "/team-avatar-3.png",
    },
  ],
  [
    {
      name: "Zinaida Dumbrava",
      role: "Customer Relations Department",
      description:
        "20 years of expertise in driving full-cycle customer relations.",
      imageSrc: "/team-avatar-4.png",
    },
    {
      name: "Vladimir Ostrovoi",
      role: "Architecture & Project Management",
      description:
        "18 years across residential, commercial and cultural projects.",
      imageSrc: "/team-avatar-5.png",
    },
  ],
];

function TeamPhoto({ member }: { member: TeamMember }) {
  if (!member.imageSrc) {
    return <span className={styles.photoPlaceholder} aria-hidden="true" />;
  }

  return (
    <span className={styles.photo}>
      <Image
        className={styles.avatarImage}
        src={member.imageSrc}
        fill
        alt={`Portrait of ${member.name}`}
        unoptimized
      />
    </span>
  );
}

export default function Team() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const scrollToSlide = (index: number) => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    viewport.scrollTo({
      left: viewport.clientWidth * index,
      behavior: reduceMotion ? "auto" : "smooth",
    });
    setActiveSlide(index);
  };

  const updateActiveSlide = () => {
    const viewport = viewportRef.current;
    if (!viewport || viewport.clientWidth === 0) return;

    const nextSlide = Math.min(
      teamSlides.length - 1,
      Math.max(0, Math.round(viewport.scrollLeft / viewport.clientWidth)),
    );
    setActiveSlide((current) => (current === nextSlide ? current : nextSlide));
  };

  return (
    <section id="team" className={styles.section} aria-labelledby="team-title">
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 id="team-title" className={styles.title}>
            OUR TEAM
          </h2>
          <p className={styles.intro}>
            We manage the whole journey in-house —{" "}
            <br />
            land, design, construction, sales, asset{" "}
            <br />
            management.
          </p>
          <p className={styles.introSecondary}>
            One team, one standard, full responsibility{" "}
            <br />
            from first sketch to final handover.
          </p>
        </header>

        <div className={styles.pagination} aria-label="Team pages">
          {teamSlides.map((_, index) => (
            <button
              className={`${styles.dot} ${
                activeSlide === index ? styles.dotActive : ""
              }`}
              key={index}
              type="button"
              onClick={() => scrollToSlide(index)}
              aria-label={`Show team page ${index + 1}`}
              aria-current={activeSlide === index ? "true" : undefined}
            />
          ))}
        </div>

        <div
          ref={viewportRef}
          className={styles.viewport}
          onScroll={updateActiveSlide}
          aria-label="Team members"
          aria-roledescription="carousel"
        >
          <div className={styles.track}>
            {teamSlides.map((members, slideIndex) => (
              <div
                className={styles.slide}
                key={slideIndex}
                role="group"
                aria-roledescription="slide"
                aria-label={`${slideIndex + 1} of ${teamSlides.length}`}
                aria-hidden={activeSlide !== slideIndex}
              >
                {members.map((member) => (
                  <article className={styles.member} key={member.name}>
                    <TeamPhoto member={member} />
                    <div className={styles.memberContent}>
                      <h3>{member.name}</h3>
                      <p className={styles.role}>{member.role}</p>
                      <p className={styles.description}>{member.description}</p>
                    </div>
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
