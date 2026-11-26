"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import { revealDelay } from "../../motion/reveal";
import { usePhoneLayout } from "../../use-phone-layout";
import styles from "./team.module.css";

type TeamMember = {
  name: string;
  // the role and the years make one line, "role · years", as the client's
  // text has them
  role: string;
  years: string;
  about: string;
  imageSrc?: string;
};

const teamSlides: readonly (readonly TeamMember[])[] = [
  [
    {
      name: "Viorel Benderschi, MBA",
      role: "Co-founder",
      years: "27 years in investment and finance",
      about: "Developed projects for NCH Capital, ZORILE and ARTIMA",
    },
    {
      name: "Maxim Dumbrava",
      role: "Managing partner",
      years: "16 years in real estate development",
      about:
        "Led Diplomat Club, ARTIMA Business & Lifestyle, NEWTON HOUSE and ENSO LIVING Brasov",
      imageSrc: "/team-maxim-dumbrava-v2.webp",
    },
    {
      name: "Denis Vasiliev",
      role: "Marketing, sales and IT",
      years: "12 years",
      about:
        "Strategies for projects totalling over 3,000 apartments and 20,000 m² of offices",
      imageSrc: "/team-denis-vasiliev-v3.webp",
    },
  ],
  [
    {
      name: "Vladimir Ostrovoi",
      role: "Architecture, project management",
      years: "18 years",
      about:
        "Residential, commercial and cultural developments, including for the Presidential Administration of the Republic of Moldova",
      imageSrc: "/team-vladimir-ostrovoi-v2.webp",
    },
    {
      name: "Zinaida Dumbrava",
      role: "Client relations",
      years: "20 years",
      about: "Two decades of experience in client relationship management",
      imageSrc: "/team-zinaida-dumbrava-v2.webp",
    },
    {
      name: "Vitalie Șeremet",
      role: "Construction management, condominium administration",
      years: "20 years",
      about: "Economist; has led teams of up to 800 people",
      imageSrc: "/team-vitalie-seremet-v2.webp",
    },
  ],
];

// "role · years" in small capitals, set the same way for everyone: the role
// and the count of years on the first line ("Partener director · 16 ani"),
// what the years were spent in on the next ("în dezvoltare imobiliară").
// The dot is tied to the word before it and to the count after it, so a
// line never starts with the dot or ends with the bare number.
function RoleLine({ member }: { member: TeamMember }) {
  const [, count = member.years, field] =
    member.years.match(/^(\d+ (?:de )?(?:ani|years))(?: (.+))?$/) ?? [];

  return (
    <>
      {`${member.role}\u00a0·\u00a0${count.replace(/ /g, "\u00a0")}`}
      {field && (
        <>
          <br />
          {field}
        </>
      )}
    </>
  );
}

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

// A phone pages through the team three at a time; a desktop shows the six at
// once, so there no page is hidden from a screen reader.
export default function Team() {
  const phone = usePhoneLayout();
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
          <h2 id="team-title" className={styles.title} data-reveal>
            OUR TEAM
          </h2>
          <p className={styles.intro} data-reveal style={revealDelay(100)}>
            We manage the whole journey in-house —{" "}
            <br />
            land, design, construction, sales, asset{" "}
            <br />
            management
          </p>
          <p className={styles.introSecondary} data-reveal style={revealDelay(200)}>
            One team, one standard, full responsibility from{" "}
            <br />
            first sketch to final handover
          </p>
        </header>

        <div className={styles.pagination} data-reveal aria-label="Team pages">
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
          data-reveal-group
          onScroll={updateActiveSlide}
          aria-label="Team members"
          aria-roledescription={phone ? "carousel" : undefined}
        >
          <div className={styles.track}>
            {teamSlides.map((members, slideIndex) => (
              <div
                className={styles.slide}
                key={slideIndex}
                role="group"
                aria-roledescription={phone ? "slide" : undefined}
                aria-label={
                  phone ? `${slideIndex + 1} of ${teamSlides.length}` : undefined
                }
                aria-hidden={phone && activeSlide !== slideIndex ? true : undefined}
              >
                {members.map((member, memberIndex) => (
                  <article
                    className={styles.member}
                    key={member.name}
                    data-reveal
                    style={revealDelay(memberIndex * 120)}
                  >
                    <TeamPhoto member={member} />
                    <div className={styles.memberContent}>
                      <h3>{member.name}</h3>
                      <p className={styles.role}>
                        <RoleLine member={member} />
                      </p>
                      <p className={styles.description}>{member.about}</p>
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
