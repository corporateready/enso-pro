import Image from "next/image";

import { revealDelay } from "../../motion/reveal";
import styles from "../../ro-page/payway/payway.module.css";

const benefits = [
  {
    title: "Первый взнос",
    description: (
      <>
        При подписании договора
        <br />
        с застройщиком
      </>
    ),
    visualClassName: styles.firstRateVisual,
    imageSrc: "/first-rate.webp",
    imageWidth: 468,
    imageHeight: 400,
    desktopSrc: "/payway-down-desktop.webp",
    desktopWidth: 504,
    desktopHeight: 433,
  },
  {
    title: "Квартальные платежи",
    description: (
      <>
        Фиксированные суммы,
        <br />
        удобные на долгий срок
      </>
    ),
    visualClassName: styles.secondRateVisual,
    imageSrc: "/second-rate.webp",
    imageWidth: 469,
    imageHeight: 440,
    desktopSrc: "/payway-quarterly-desktop.webp",
    desktopWidth: 446,
    desktopHeight: 426,
  },
  {
    title: "Без банков и переплат",
    description: (
      <>
        Напрямую застройщику,
        <br />
        без посредников
      </>
    ),
    visualClassName: styles.thirdRateVisual,
    imageSrc: "/third-rate.webp",
    imageWidth: 516,
    imageHeight: 404,
    desktopSrc: "/payway-nobank-desktop.webp",
    desktopWidth: 562,
    desktopHeight: 430,
  },
] as const;

function RateVisual({
  visualClassName,
  imageSrc,
  imageWidth,
  imageHeight,
  desktopSrc,
  desktopWidth,
  desktopHeight,
}: {
  visualClassName: string;
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
  desktopSrc: string;
  desktopWidth: number;
  desktopHeight: number;
}) {
  return (
    <span className={`${styles.rateVisual} ${visualClassName}`} aria-hidden="true">
      <Image
        className={`${styles.rateImage} ${styles.rateImageMobile}`}
        src={imageSrc}
        width={imageWidth}
        height={imageHeight}
        unoptimized
        alt=""
      />
      {/* the card's corner exactly as Figma renders it, glass and all */}
      <Image
        className={`${styles.rateImage} ${styles.rateImageDesktop}`}
        src={desktopSrc}
        width={desktopWidth}
        height={desktopHeight}
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
        <h2 id="payway-title" className={styles.title} data-reveal>
          ПЛАТИТЕ ТАК,{" "}
          <br />
          КАК ВАМ УДОБНО
        </h2>

        <article
          className={styles.featuredCard}
          data-reveal
          style={revealDelay(100)}
        >
          <h3>Ставка 0%</h3>
          <p>
            Прозрачная{" "}
            <br />
            итоговая стоимость,{" "}
            <br />
            без доплат
          </p>

          <span
            className={`${styles.zeroMobile} absolute bottom-0 right-0 z-1 w-[126rem] h-[152rem]`}
            aria-hidden="true"
          >
            <Image
              className={`absolute bottom-0 right-0 z-2`}
              src="/zero-rate.webp"
              width={126}
              height={152}
              unoptimized
              alt=""
            />
          </span>
          <Image
            className={styles.zeroDesktop}
            src="/payway-zero-desktop.webp"
            width={640}
            height={524}
            unoptimized
            alt=""
            aria-hidden="true"
          />
        </article>

        <div className={styles.benefits} data-reveal-group>
          {benefits.map((benefit, index) => (
            <article
              className={styles.benefitCard}
              key={benefit.title}
              data-reveal
              style={revealDelay(index * 100)}
            >
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
              <RateVisual
                visualClassName={benefit.visualClassName}
                imageSrc={benefit.imageSrc}
                imageWidth={benefit.imageWidth}
                imageHeight={benefit.imageHeight}
                desktopSrc={benefit.desktopSrc}
                desktopWidth={benefit.desktopWidth}
                desktopHeight={benefit.desktopHeight}
              />
            </article>
          ))}
        </div>

        <a
          className={`${styles.requestButton} motion-button`}
          href="#request-offer"
          data-reveal
        >
          Рассчитать платежи
        </a>
      </div>
    </section>
  );
}
