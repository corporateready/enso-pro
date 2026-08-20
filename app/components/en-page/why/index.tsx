import Image from "next/image";

import styles from "./why.module.css";

export default function Why() {
  return (
    <section id="why-enso" className={styles.section} aria-labelledby="why-title">
      <div className={styles.inner}>
        <Image
          className={`${styles.image} ${styles.mobileImage}`}
          src="/why-mobile-bg.webp"
          fill
          alt=""
          unoptimized
        />
        <Image
          className={`${styles.image} ${styles.desktopImage}`}
          src="/why-desktop-bg.avif"
          width={7680}
          height={3300}
          unoptimized
          alt=""
        />
        <Image
          className={styles.buildingImage}
          src="/why-building-desktop.avif"
          width={3872}
          height={4058}
          unoptimized
          alt=""
        />

        <div className={styles.content}>
          <h2 id="why-title" className={styles.title}>
            NUMBERS YOU CAN
            <br />
            BUILD ON
          </h2>

          <div className={styles.award}>
            <Image
              className={styles.decor}
              src="/why-2024-decor.png"
              width={1085}
              height={475}
              alt="2024"
              unoptimized
            />
            <div className={styles.awardText}>
              <p className={styles.awardKicker}>REAL ESTATE</p>
              <p className={styles.awardTitle}>SALES LEADER</p>
            </div>
          </div>

          <ul className={styles.metrics}>
            <li>
              <strong>500k+</strong>
              <span>
                m<sup>2</sup> delivered
                <br />
                successfully
              </span>
            </li>
            <li>
              <strong>25+</strong>
              <span>
                years of
                <br />
                experience
              </span>
            </li>
            <li>
              <strong>2</strong>
              <span>
                countries
                <br />
                active
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
