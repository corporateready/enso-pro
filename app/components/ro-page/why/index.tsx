import Image from "next/image";

import styles from "./why.module.css";

export default function Why() {
  return (
    <section id="why-enso" className={styles.section} aria-labelledby="why-title">
      <div className={styles.inner}>
        <Image
          className={styles.image}
          src="/why-mobile-bg.webp"
          fill
          alt=""
          unoptimized
        />

        <div className={styles.content}>
          <h2 id="why-title" className={styles.title}>
            EXPERIENȚA,
            <br />
            ÎN CIFRE
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
              <p className={styles.awardKicker}>LIDER ÎN VÂNZĂRI</p>
              <p className={styles.awardTitle}>IMOBILIARE</p>
              <p className={styles.awardLocation}>în Moldova</p>
            </div>
          </div>

          <ul className={styles.metrics}>
            <li>
              <strong>500k+</strong>
              <span>
                m<sup>2</sup> livrați
                <br />
                cu succes
              </span>
            </li>
            <li>
              <strong>25+</strong>
              <span>
                ani de
                <br />
                experiență
              </span>
            </li>
            <li>
              <strong>2</strong>
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
