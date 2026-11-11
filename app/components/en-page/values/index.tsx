import Image from "next/image";

import { revealDelay } from "../../motion/reveal";
import RevealLines from "../../motion/reveal-lines";
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
            src="/values-mobile-bg.avif"
            width={1533}
            height={2169}
            alt=""
            unoptimized
          />
          <Image
            className={`${styles.image} ${styles.desktopImage}`}
            src="/values-desktop-bg.avif"
            width={7680}
            height={4000}
            // without sizes it went out at 3840 even on a 1920 screen
            sizes="(min-width: 641px) 100vw, 1px"
            quality={90}
            alt=""
          />
          <span className={styles.shade} />
        </div>

        <div className={styles.content}>
          <h2 id="values-title" className={styles.title} data-reveal>
            OUR VALUES
          </h2>
          <p
            className={styles.description}
            data-reveal-group
            style={revealDelay(150)}
          >
            <RevealLines
              pieces={[
                "A finished building",
                { br: undefined },
                " can't be redrawn.",
                { br: undefined },
                "So we build as if we'll live here",
                { br: undefined },
                "—",
                { br: undefined },
                "because for decades,",
                { br: undefined },
                "someone will.",
              ]}
            />
          </p>
        </div>
      </div>
    </section>
  );
}
