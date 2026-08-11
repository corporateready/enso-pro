import Image from "next/image";

import styles from "./partners.module.css";

const partners = [
  {
    name: "Archimatika",
    description:
      "Architecture Over 5 million m² designed. Internationally awarded residential developments.",
    logoSrc: "/arch 2.png",
    logoWidth: 760,
    logoHeight: 108,
    imageClassName: styles.archimatikaImage,
  },
  {
    name: "INAMSTRO",
    description:
      "Construction 70 residential buildings delivered across 5 countries in 20 years.",
    logoSrc: "/inamstro.png",
    logoWidth: 666,
    logoHeight: 112,
    imageClassName: styles.inamstroImage,
  },
  {
    name: "acla",
    description:
      "Landscape Green spaces designed as ecosystems, not decoration.",
    logoSrc: "/acla.png",
    logoWidth: 376,
    logoHeight: 128,
    imageClassName: styles.aclaImage,
  },
  {
    name: "ARUTIN BUREAU",
    description:
      "Interior design Interiors and finishes built to a premium standard.",
    logoSrc: "/abureau.png",
    logoWidth: 731,
    logoHeight: 68,
    imageClassName: styles.arutinImage,
  },
  {
    name: "Estate Invest Company",
    description:
      "11 years and over 400,000 m² built across 50 developments in Chișinău.",
    logoSrc: "/eic.png",
    logoWidth: 500,
    logoHeight: 184,
    imageClassName: styles.estateImage,
  },
] as const;

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
          <p>{partner.description}</p>
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
        <h2 id="partners-title" className={styles.title}>
          OUR PARTNERS
        </h2>
        <p className={styles.subtitle}>
          We build alongside teams with proven reputations — each an expert in
          their field.
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
