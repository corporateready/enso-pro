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
    visualClassName: styles.firstRateVisual,
    imageSrc: "/first-rate.png",
    imageWidth: 468,
    imageHeight: 400,
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
    visualClassName: styles.secondRateVisual,
    imageSrc: "/second-rate.png",
    imageWidth: 469,
    imageHeight: 440,
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
    visualClassName: styles.thirdRateVisual,
    imageSrc: "/third-rate.png",
    imageWidth: 516,
    imageHeight: 404,
  },
] as const;

function RateVisual({
  visualClassName,
  imageSrc,
  imageWidth,
  imageHeight,
}: {
  visualClassName: string;
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
}) {
  return (
    <span className={`${styles.rateVisual} ${visualClassName}`} aria-hidden="true">
      <Image
        className={styles.rateImage}
        src={imageSrc}
        width={imageWidth}
        height={imageHeight}
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
          PLĂTEȘTI CUM{" "}
          <br />
          ÎȚI CONVINE
        </h2>

        <article className={styles.featuredCard}>
          <h3>Dobândă 0%</h3>
          <p>
            Cost total{" "}
            <br />
            transparent, fără taxe{" "}
            <br />
            suplimentare
          </p>

          <span
            className={`absolute bottom-0 right-0 z-1 w-[126rem] h-[152rem]`}
            aria-hidden="true"
          >
            <Image
              className={`absolute bottom-0 right-0 z-2`}
              src="/zero-rate.png"
              width={126}
              height={152}
              unoptimized
              alt=""
            />
          </span>
        </article>

        <div className={styles.benefits}>
          {benefits.map((benefit) => (
            <article className={styles.benefitCard} key={benefit.title}>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
              <RateVisual
                visualClassName={benefit.visualClassName}
                imageSrc={benefit.imageSrc}
                imageWidth={benefit.imageWidth}
                imageHeight={benefit.imageHeight}
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
