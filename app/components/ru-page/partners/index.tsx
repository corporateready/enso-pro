import Image from "next/image";
import { Fragment } from "react";

import { revealDelay } from "../../motion/reveal";
import styles from "../../ro-page/partners/partners.module.css";

const partners = [
  {
    name: "Archimatika",
    description:
      "Более 5\u00a0млн\u00a0м² спроектировано,\nпроекты с\u00a0мировыми наградами",
    logoSrc: "/arch 2.png",
    logoWidth: 760,
    logoHeight: 108,
    imageClassName: styles.archimatikaImage,
  },
  {
    name: "INAMSTRO",
    description:
      "70 жилых домов сдано \nв\u00a05\u00a0странах за\u00a020\u00a0лет",
    logoSrc: "/inamstro.png",
    logoWidth: 666,
    logoHeight: 112,
    imageClassName: styles.inamstroImage,
  },
  {
    name: "acla",
    description:
      "Зелёные зоны как экосистемы,\nа не как декор",
    logoSrc: "/acla.png",
    logoWidth: 376,
    logoHeight: 128,
    imageClassName: styles.aclaImage,
  },
  {
    name: "ARUTIN BUREAU",
    description:
      "Интерьеры и отделка \nпремиального уровня",
    logoSrc: "/abureau.png",
    logoWidth: 731,
    logoHeight: 68,
    imageClassName: styles.arutinImage,
  },
  {
    name: "Estate Invest Company",
    description:
      "11\u00a0лет и более 400\u00a0000\u00a0м²\u2028в\u00a050\u00a0проектах в\u00a0Кишинёве",
    logoSrc: "/eic.png",
    logoWidth: 500,
    logoHeight: 184,
    imageClassName: styles.estateImage,
  },
] as const;

/*
 * Line breaks as set in Figma: "\n" breaks on both breakpoints, "\u2028" on
 * desktop only (where the two layouts break a text differently).
 */
function cardLines(text: string) {
  return text.split("\n").map((line, index) => (
    <Fragment key={index}>
      {index > 0 && <br />}
      {line.split("\u2028").map((part, partIndex) => (
        <Fragment key={partIndex}>
          {partIndex > 0 && (
            <>
              {" "}
              <br className={styles.desktopBreak} />
            </>
          )}
          {part}
        </Fragment>
      ))}
    </Fragment>
  ));
}

function PartnerCards({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div
      className={`${styles.group} ${duplicate ? styles.duplicate : ""}`}
      aria-hidden={duplicate || undefined}
    >
      {partners.map((partner) => (
        <article className={styles.card} key={partner.name}>
          <div className={styles.logoVisual} aria-hidden="true">
            <Image
              className={`${styles.sourceImage} ${partner.imageClassName}`}
              src={partner.logoSrc}
              width={partner.logoWidth}
              height={partner.logoHeight}
              sizes="190px"
              alt=""
              unoptimized
            />
          </div>
          <h3 className={styles.visuallyHidden}>{partner.name}</h3>
          <p>{cardLines(partner.description)}</p>
        </article>
      ))}
    </div>
  );
}

export default function Partners() {
  return (
    <section
      id="partners"
      className={styles.section}
      aria-labelledby="partners-title"
    >
      <header className={styles.header}>
        <h2 id="partners-title" className={styles.title} data-reveal>
          НАШИ ПАРТНЁРЫ
        </h2>
        <p className={styles.subtitle} data-reveal style={revealDelay(100)}>
          {/* the break falls before the dash, where the sentence divides
              (2026-11-25 meeting); one sentence, so no full stop */}
          <span className={styles.subtitleLine}>
            Строим с командами
            <br className={styles.mobileBreak} /> с подтверждённой репутацией
          </span>
          <span className={styles.subtitleLine}>
            — экспертами в своём деле
          </span>
        </p>
      </header>

      <div className={styles.viewport}>
        <div className={styles.track}>
          <PartnerCards />
          <PartnerCards duplicate />
        </div>
      </div>
    </section>
  );
}
