import Image from "next/image";

import styles from "./values.module.css";

export default function Values() {
  return (
    <section
      id="values"
      className={styles.section}
      aria-labelledby="values-title"
    >
      <div className={styles.inner}>
        <div className={styles.background} aria-hidden="true">
          <Image
            className={`${styles.image} ${styles.mobileImage}`}
            src="/values-bg-figma.avif"
            width={1809}
            height={2560}
            alt=""
            unoptimized
          />
          <Image
            className={`${styles.image} ${styles.desktopImage}`}
            src="/values-desktop-bg.avif"
            width={7680}
            height={4000}
            alt=""
          />
          <span className={styles.shade} />
        </div>

        <div className={styles.content}>
          <h2 id="values-title" className={styles.title}>
            VALORILE NOASTRE
          </h2>
          <p className={styles.description}>
            Un proiect, odată finalizat,
            <br className="hidden sm:inline-block" /> nu mai
            <br className="inline-block sm:hidden" />
            poate fi reconstruit. Gândim totul
            <br className="inline-block sm:hidden" />
            impecabil, de la început
            <br />
            —
            <br />
            pentru azi, și pentru deceniile
            <br />
            care urmează.
          </p>
        </div>
      </div>
    </section>
  );
}
