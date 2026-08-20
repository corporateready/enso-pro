import Image from "next/image";

import styles from "./payway.module.css";

const benefits = [
  {
    id: "down-payment",
    title: (
      <>
        Down{" "}
        <br className={styles.titleBreak} />
        Payment
      </>
    ),
    description: (
      <>
        Upon signing the contract
        <br />
        directly with the developer
      </>
    ),
    visualClassName: styles.firstRateVisual,
    imageSrc: "/first-rate.png",
    imageWidth: 468,
    imageHeight: 400,
  },
  {
    id: "quarterly-installments",
    title: "Quarterly Installments",
    description: (
      <>
        Fixed payments, designed
        <br />
        for long-term comfort
      </>
    ),
    visualClassName: styles.secondRateVisual,
    imageSrc: "/second-rate.png",
    imageWidth: 469,
    imageHeight: 440,
  },
  {
    id: "no-banks",
    title: "No banks & hidden fees",
    description: (
      <>
        Direct financing from the
        <br />
        developer, no intermediaries
      </>
    ),
    visualClassName: styles.thirdRateVisual,
    imageSrc: "/third-rate.png",
    imageWidth: 516,
    imageHeight: 404,
  },
];

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
          PAY YOUR WAY
        </h2>

        <article className={styles.featuredCard}>
          <h3>0% Interest</h3>
          <p>
            Fully transparent{" "}
            <br />
            total cost, with{" "}
            <br />
            no extra charges
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
            <article className={styles.benefitCard} key={benefit.id}>
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
          Request a custom schedule
        </a>
      </div>
    </section>
  );
}
