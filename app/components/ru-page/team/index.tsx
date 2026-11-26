"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import { revealDelay } from "../../motion/reveal";
import { usePhoneLayout } from "../../use-phone-layout";
import { teamSlides, type TeamMember } from "./members";
import styles from "../../ro-page/team/team.module.css";

// "role · years" in small capitals, set the same way for everyone: the role
// and the count of years on the first line ("Управляющий партнёр · 16 лет"),
// what the years were spent in on the next ("в девелопменте недвижимости").
// The dot is tied to the word before it and to the count after it, so a
// line never starts with the dot or ends with the bare number.
function RoleLine({ member }: { member: TeamMember }) {
  const [, count = member.years, field] =
    member.years.match(/^(\d+ (?:лет|года|год))(?: (.+))?$/) ?? [];

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
        alt={`Портрет: ${member.name}`}
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
            НАША КОМАНДА
          </h2>
          <p className={styles.intro} data-reveal style={revealDelay(100)}>
            Весь путь ведём сами — земля,{" "}
            <br />
            проектирование, строительство, продажи,{" "}
            <br />
            управление активами
          </p>
          <p className={styles.introSecondary} data-reveal style={revealDelay(200)}>
            Одна команда, один стандарт,{" "}
            <br />
            полная ответственность от первого эскиза{" "}
            <br />
            до передачи ключей
          </p>
        </header>

        <div className={styles.pagination} data-reveal aria-label="Страницы команды">
          {teamSlides.map((_, index) => (
            <button
              className={`${styles.dot} ${
                activeSlide === index ? styles.dotActive : ""
              }`}
              key={index}
              type="button"
              onClick={() => scrollToSlide(index)}
              aria-label={`Показать страницу команды ${index + 1}`}
              aria-current={activeSlide === index ? "true" : undefined}
            />
          ))}
        </div>

        <div
          ref={viewportRef}
          className={styles.viewport}
          data-reveal-group
          onScroll={updateActiveSlide}
          aria-label="Члены команды"
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
                  phone ? `${slideIndex + 1} из ${teamSlides.length}` : undefined
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
