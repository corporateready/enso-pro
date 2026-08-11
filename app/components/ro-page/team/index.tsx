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
      role: "Investiții & Finanțe",
      description:
        "27 de ani în managementul investițiilor și dezvoltare imobiliară.",
    },
    {
      name: "Maxim Dumbrava",
      role: "Dezvoltare",
      description:
        "16 ani de proiecte livrate, inclusiv ARTIMA, NEWTON HOUSE și Eminescu Residence.",
      imageSrc: "/team-avatar-2.png",
    },
    {
      name: "Denis Vasiliev",
      role: "Marketing & Vânzări",
      description:
        "12 ani în marketing și vânzări — peste 3.000 de apartamente vândute.",
      imageSrc: "/team-avatar-3.png",
    },
  ],
  [
    {
      name: "Zinaida Dumbrava",
      role: "Relații cu clienții",
      description:
        "20 de ani de expertiză în relații cu clienții, pe întreg ciclul.",
      imageSrc: "/team-avatar-4.png",
    },
    {
      name: "Vladimir Ostrovoi",
      role: "Arhitectură & Management de proiect",
      description:
        "18 ani de proiecte rezidențiale, comerciale și culturale.",
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
        alt={`Portretul lui ${member.name}`}
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
            ECHIPA NOASTRĂ
          </h2>
          <p className={styles.intro}>
            Gestionăm întregul parcurs in-house —
            <br />
            teren, proiectare, construcție, vânzări,
            <br />
            administrarea activelor.
          </p>
          <p className={styles.introSecondary}>
            O singură echipă, un singur standard,
            <br />
            responsabilitate completă de la prima schiță
            <br />
            până la predarea finală.
          </p>
        </header>

        <div className={styles.pagination} aria-label="Paginile echipei">
          {teamSlides.map((_, index) => (
            <button
              className={`${styles.dot} ${
                activeSlide === index ? styles.dotActive : ""
              }`}
              key={index}
              type="button"
              onClick={() => scrollToSlide(index)}
              aria-label={`Afișează pagina echipei ${index + 1}`}
              aria-current={activeSlide === index ? "true" : undefined}
            />
          ))}
        </div>

        <div
          ref={viewportRef}
          className={styles.viewport}
          onScroll={updateActiveSlide}
          aria-label="Membrii echipei"
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
