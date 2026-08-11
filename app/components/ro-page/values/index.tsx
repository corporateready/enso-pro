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
            className={styles.image}
            src="/values-bg-figma.jpg"
            width={1809}
            height={2560}
            alt=""
            unoptimized
          />
          <span className={styles.shade} />
        </div>

        <div className={styles.content}>
          <h2 id="values-title" className={styles.title}>
            OUR VALUES
          </h2>
          <p className={styles.description}>
            Un proiect, odată finalizat, nu mai
            <br />
            poate fi reconstruit. Gândim totul
            <br />
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
