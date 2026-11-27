import { Fragment } from "react";

import Partners from "../ro-page/partners";
import styles from "./partners-variants.module.css";

/*
 * The partners block of the home page, three times over, its cards set in
 * the three ways proposed on 2026-11-26: the block itself, with its texts
 * and its running row, each copy wrapped in a variant's class that sets the
 * cards another way (partners-variants.module.css). The notes over each
 * are the client's, in Russian. Not part of the site: see
 * app/(ro)/partners-variants.
 */

type Variant = "v1" | "v2" | "v3";

const variants: readonly { id: Variant; title: string; note: string }[] = [
  {
    id: "v1",
    title: "Вариант 1. По центру — сейчас на сайте",
    note: "Логотип и текст по центру карточки, буквы логотипов на одной линии. Выбран 26 ноября.",
  },
  {
    id: "v2",
    title: "Вариант 2. Слева под логотипом",
    note: "Логотип у левого края карточки, текст под ним. Стоял на сайте до 26 ноября.",
  },
  {
    id: "v3",
    title: "Вариант 3. По центру, с линией",
    note: "Как первый, но между логотипом и текстом тонкая линия.",
  },
];

export default function PartnersVariants() {
  return (
    <main className={styles.page}>
      <div className={styles.top}>
        <p className={styles.topTitle}>Партнёры: варианты карточек</p>
        <p className={styles.topNote}>
          Три варианта, которые я предлагал 26 ноября, с нынешними текстами.
          Каждый раз это сам блок с главной: карточки идут бегущей строкой.
          На сайте теперь первый.
        </p>
        <nav className={styles.topLinks} aria-label="Варианты">
          {variants.map(({ id, title }) => (
            <a key={id} href={`#${id}`}>
              {title}
            </a>
          ))}
        </nav>
      </div>

      {variants.map(({ id, title, note }) => (
        <Fragment key={id}>
          <div id={id} className={styles.tag}>
            <strong>{title}</strong>
            <span>{note}</span>
          </div>
          <div className={styles[id]}>
            <Partners />
          </div>
        </Fragment>
      ))}
    </main>
  );
}
