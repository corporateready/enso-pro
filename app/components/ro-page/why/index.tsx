import Image from "next/image";

import CountUp from "../../motion/count-up";
import { revealDelay } from "../../motion/reveal";

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
          // the sources are 2-4x the largest screen: let the optimiser size
          // them, or each is a 100MB bitmap to decode as it scrolls in
          sizes="(min-width: 641px) 100vw, 1px"
          quality={90}
          alt=""
        />
        <Image
          className={styles.buildingImage}
          src="/why-building-desktop.avif"
          width={3872}
          height={4058}
          sizes="(min-width: 641px) 51vw, 1px"
          quality={90}
          alt=""
        />

        <div className={styles.content}>
          <h2 id="why-title" className={styles.title} data-reveal>
            EXPERIENȚA,
            <br />
            ÎN CIFRE
          </h2>

          <div className={styles.award} data-reveal style={revealDelay(100)}>
            <Image
              className={styles.decor}
              src="/why-2024-decor.png"
              width={1085}
              height={475}
              alt="2024"
              sizes="(min-width: 641px) 20vw, 70vw"
              quality={90}
            />
            <div className={styles.awardText}>
              <p className={styles.awardKicker}>LIDER ÎN VÂNZĂRI</p>
              <p className={styles.awardTitle}>IMOBILIARE</p>
              <p className={styles.awardPlace}>în Moldova</p>
            </div>
          </div>

          <ul className={styles.metrics} data-reveal-group>
            <li data-reveal>
              <strong>
                <CountUp value={500} suffix="k+" />
              </strong>
              <span>
                m² livrați
                <br />
                cu succes
              </span>
            </li>
            <li data-reveal style={revealDelay(120)}>
              <strong>
                <CountUp value={25} suffix="+" delay={120} />
              </strong>
              <span>
                ani de
                <br />
                experiență
              </span>
            </li>
            <li data-reveal style={revealDelay(240)}>
              <strong>
                <CountUp value={2} delay={240} />
              </strong>
              <span>
                țări în care
                <br />
                activăm
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
