import Image from "next/image";

import { revealDelay } from "../../motion/reveal";
import RevealLines from "../../motion/reveal-lines";
import styles from "../../ro-page/values/values.module.css";

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
            НАШИ ЦЕННОСТИ
          </h2>
          <p
            className={styles.description}
            data-reveal-group
            style={revealDelay(150)}
          >
            <RevealLines
              pieces={[
                "Завершённый проект",
                { br: undefined },
                "уже не перестроить. ",
                { br: "inline-block sm:hidden" },
                "Продумываем всё безупречно ",
                { br: "inline-block sm:hidden" },
                "с самого начала",
                { br: undefined },
                "—",
                { br: undefined },
                "на сегодня и на десятилетия",
                { br: undefined },
                "вперёд.",
              ]}
            />
          </p>
        </div>
      </div>
    </section>
  );
}
