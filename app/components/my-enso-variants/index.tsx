import { Fragment } from "react";

import Enso from "../ro-page/enso";
import styles from "./my-enso-variants.module.css";

/*
 * The MY ENSO block of the home page, five times over, each with another
 * colour of the client's cabinet on the laptop's screen (and the phone's):
 * the colours proposed on 2026-11-27, taken from the block's own picture —
 * the red house, the bushes, the path's stone, the pale facades. It is the
 * block itself, with its texts and its pills; only the screens' pictures
 * differ (public/my-enso-variants; the first variant is the site's own).
 * The notes over each are the client's, in Russian. Not part of the site:
 * see app/(ro)/my-enso-variants.
 */

const pictures = (name: string) => ({
  laptopSrc: `/my-enso-variants/laptop-${name}.avif`,
  phoneSrc: `/my-enso-variants/phone-${name}.webp`,
});

const variants: readonly {
  id: string;
  title: string;
  note: string;
  pictures?: { laptopSrc: string; phoneSrc: string };
}[] = [
  {
    id: "v0",
    title: "Вариант 0. Тёмно-синий — сейчас на сайте",
    note: "Цвет сайта. В самой картинке блока синего нет.",
  },
  {
    id: "v1",
    title: "Вариант 1. Бордо красного дома",
    note: "Тот же цвет, что у дома рядом с ноутбуком: меню кабинета почти сливается с домом.",
    pictures: pictures("terracotta"),
  },
  {
    id: "v2",
    title: "Вариант 2. Зелень сада",
    note: "Перекликается с кустами слева и отделяет экран от красного дома. Мой совет.",
    pictures: pictures("garden"),
  },
  {
    id: "v3",
    title: "Вариант 3. Камень дорожки",
    note: "Серо-коричневый, самый спокойный. Близок к чёрной рамке ноутбука.",
    pictures: pictures("graphite"),
  },
  {
    id: "v4",
    title: "Вариант 4. Светлый, как фасады домов",
    note: "Экран лёгкий, но белые плашки над светлым меню видны хуже. На телефоне почти как вариант 1: бокового меню там нет.",
    pictures: pictures("sand"),
  },
];

export default function MyEnsoVariants() {
  return (
    <main className={styles.page}>
      <div className={styles.top}>
        <p className={styles.topTitle}>MY ENSO: цвет экрана кабинета</p>
        <p className={styles.topNote}>
          Пять вариантов одного блока. Меняется только цвет кабинета на
          экране: меню слева, цифра «68%», кнопка и полоски. Цвета взяты с
          картинки самого блока. На сайте сейчас нулевой.
        </p>
        <nav className={styles.topLinks} aria-label="Варианты">
          {variants.map(({ id, title }) => (
            <a key={id} href={`#${id}`}>
              {title}
            </a>
          ))}
        </nav>
      </div>

      {variants.map(({ id, title, note, pictures }) => (
        <Fragment key={id}>
          <div id={id} className={styles.tag}>
            <strong>{title}</strong>
            <span>{note}</span>
          </div>
          <div className={styles.block}>
            <Enso {...pictures} />
          </div>
        </Fragment>
      ))}
    </main>
  );
}
