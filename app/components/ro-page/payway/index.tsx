import Image from "next/image";

import styles from "./payway.module.css";

const benefits = [
  {
    title: "Avans",
    description: (
      <>
        La semnarea contractului,
        <br />
        direct cu dezvoltatorul
      </>
    ),
    visualClassName: styles.downPaymentVisual,
    imageClassName: styles.downPaymentImage,
  },
  {
    title: "Rate trimestriale",
    description: (
      <>
        Plăți fixe, gândite pentru
        <br />
        confort pe termen lung
      </>
    ),
    visualClassName: styles.installmentsVisual,
    imageClassName: styles.installmentsImage,
  },
  {
    title: "Fără bănci și costuri ascunse",
    description: (
      <>
        Finanțare direct de la
        <br />
        dezvoltator, fără intermediari
      </>
    ),
    visualClassName: styles.feesVisual,
    imageClassName: styles.feesImage,
  },
] as const;

function DecorativeVisual({
  visualClassName,
  imageClassName,
}: {
  visualClassName: string;
  imageClassName: string;
}) {
  return (
    <span className={`${styles.visual} ${visualClassName}`} aria-hidden="true">
      <Image
        className={`${styles.sourceImage} ${imageClassName}`}
        src="/pay your way.png"
        width={394}
        height={732}
        unoptimized
        alt=""
      />
    </span>
  );
}

export default function Payway() {
  return (
    <section
      id="payment-method"
      className={styles.section}
      aria-labelledby="payway-title"
    >
      <div className={styles.inner}>
        <h2 id="payway-title" className={styles.title}>
          PLĂTEȘTI CUM
          <br />
          ÎȚI CONVINE
        </h2>

        <article className={styles.featuredCard}>
          <h3>Dobândă 0%</h3>
          <p>
            Cost total
            <br />
            transparent, fără taxe
            <br />
            suplimentare
          </p>
          <DecorativeVisual
            visualClassName={styles.interestVisual}
            imageClassName={styles.interestImage}
          />
        </article>

        <div className={styles.benefits}>
          {benefits.map((benefit) => (
            <article className={styles.benefitCard} key={benefit.title}>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
              <DecorativeVisual
                visualClassName={benefit.visualClassName}
                imageClassName={benefit.imageClassName}
              />
            </article>
          ))}
        </div>

        <a className={styles.requestButton} href="#request-offer">
          Calculează-ți ratele
        </a>
      </div>
    </section>
  );
}
