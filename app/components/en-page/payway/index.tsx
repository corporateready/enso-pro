import Image from "next/image";

import styles from "./payway.module.css";

const benefits = [
  {
    title: "Down Payment",
    description: (
      <>
        Upon signing the contract
        <br />
        directly with the developer
      </>
    ),
    visualClassName: styles.downPaymentVisual,
    imageClassName: styles.downPaymentImage,
  },
  {
    title: "Quarterly Installments",
    description: (
      <>
        Fixed payments, designed
        <br />
        for long-term comfort
      </>
    ),
    visualClassName: styles.installmentsVisual,
    imageClassName: styles.installmentsImage,
  },
  {
    title: "No banks & hidden fees",
    description: (
      <>
        Direct financing from the
        <br />
        developer, no intermediaries
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
          PAY YOUR WAY
        </h2>

        <article className={styles.featuredCard}>
          <h3>0% Interest</h3>
          <p>
            Fully transparent
            <br />
            total cost, with
            <br />
            no extra charges
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
          Request a custom schedule
        </a>
      </div>
    </section>
  );
}
