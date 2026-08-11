import Image from "next/image";

import EnsoFeatureIcon, {
  type EnsoFeatureIconName,
} from "../../enso-feature-icon";
import styles from "./enso.module.css";

const features: readonly {
  icon: EnsoFeatureIconName;
  text: string;
  className: string;
}[] = [
  { icon: "tag", text: "Get Prices", className: styles.featureOne },
  {
    icon: "property",
    text: "Buy, Sell or Rent Out",
    className: styles.featureTwo,
  },
  {
    icon: "message",
    text: "Direct Line to Our Team",
    className: styles.featureThree,
  },
  {
    icon: "construction",
    text: "Construction Tracking",
    className: styles.featureFour,
  },
];

export default function Enso() {
  return (
    <section
      id="my-enso"
      className={styles.section}
      aria-labelledby="my-enso-title"
    >
      <div className={styles.inner}>
        <Image
          className={styles.background}
          src="/enso-mobile-bg.webp"
          width={1576}
          height={2591}
          sizes="(max-width: 639px) 100vw, 394px"
          alt=""
        />

        <div className={styles.content}>
          <h2 id="my-enso-title" className={styles.title}>
            MY ENSO
          </h2>
          <p className={styles.intro}>
            Everything about your property, in one place
            <br />— prices, documents, and your ENSO team.
          </p>

          <ul className={styles.features}>
            {features.map((feature) => (
              <li
                className={`${styles.feature} ${feature.className}`}
                key={feature.text}
              >
                <EnsoFeatureIcon
                  className={styles.featureIcon}
                  name={feature.icon}
                />
                <span>{feature.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <a
          id="create-account"
          className={styles.accountLink}
          href="#create-account"
        >
          Create your account
        </a>
      </div>
    </section>
  );
}
