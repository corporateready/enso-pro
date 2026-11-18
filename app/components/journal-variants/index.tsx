"use client";

import Journal, { siteArticles, type JournalArticle } from "../ro-page/journal";
import styles from "./journal-variants.module.css";

/*
 * The journal block with more articles than the site has, for the client to
 * see how it lays itself out: three as on the site, then four, five and six;
 * and the same in the block's other layout, the leading article over a row
 * of the others, as point.md's front page has its news. It is the site's own
 * block each time (ro-page/journal), given a longer list; the added articles
 * are made up, with the projects' pictures. The pills filter in each. The
 * notes are the client's, in Russian. Not part of the site: see
 * app/(ro)/journal-variants.
 */

const examples: readonly JournalArticle[] = [
  {
    id: "example-apartment",
    category: "buying-guide",
    badge: "Ghid de cumpărare",
    title: "Exemplu: cum alegi un apartament într-un proiect în construcție",
    date: "1 Iunie",
    readTime: "4 min de citit",
    src: "/enso-estate-project.avif",
    width: 2720,
    height: 2120,
  },
  {
    id: "example-prices",
    category: "market",
    badge: "Piață",
    title: "Exemplu: ce se întâmplă cu prețurile locuințelor noi din Chișinău",
    date: "30 Mai",
    readTime: "6 min de citit",
    src: "/enso-living-project.avif",
    width: 2756,
    height: 2120,
  },
  {
    id: "example-site",
    category: "inside-enso",
    badge: "Din interior",
    title: "Exemplu: o zi pe șantier alături de echipa de proiectare",
    date: "28 Mai",
    readTime: "3 min de citit",
    src: "/artima-project.avif",
    width: 2720,
    height: 2120,
  },
];

type Set = {
  id: string;
  title: string;
  note: string;
  count: number;
  layout: "side" | "rows";
};

const sets: readonly Set[] = [
  {
    id: "three",
    title: "А. Главная слева: 3 статьи — как на сайте сейчас",
    note: "Главная слева, две справа одна над другой.",
    count: 3,
    layout: "side",
  },
  {
    id: "four",
    title: "А. Главная слева: 4 статьи",
    note: "Справа три строки пониже: раздел и дата в одну строку, под ними название.",
    count: 4,
    layout: "side",
  },
  {
    id: "five",
    title: "А. Главная слева: 5 статей",
    note: "Справа четыре строки. Высота блока та же: всё помещается в один экран.",
    count: 5,
    layout: "side",
  },
  {
    id: "six",
    title: "А. Главная слева: 6 статей и больше",
    note: "Блок показывает пять самых новых. Шестая и дальше открываются по кнопке «Vezi toate articolele» или через фильтр своего раздела.",
    count: 6,
    layout: "side",
  },
  {
    id: "rows-three",
    title: "Б. Как на Point: 3 статьи",
    note: "Главная сверху во всю ширину, две другие под ней рядом. Высота блока та же, один экран.",
    count: 3,
    layout: "rows",
  },
  {
    id: "rows-four",
    title: "Б. Как на Point: 4 статьи",
    note: "Под главной три карточки в ряд: фото сверху, под ним раздел, дата и название.",
    count: 4,
    layout: "rows",
  },
  {
    id: "rows-five",
    title: "Б. Как на Point: 5 статей",
    note: "Под главной четыре карточки в ряд. Шестая и дальше — по кнопке «Vezi toate articolele».",
    count: 5,
    layout: "rows",
  },
];

export default function JournalVariants() {
  return (
    <main className={styles.page}>
      <div className={styles.top}>
        <p className={styles.topTitle}>Блок журнала: как он растёт вместе с числом статей</p>
        <p className={styles.topNote}>
          Это сам блок с сайта, ему только дан список подлиннее. Статьи со
          словом «Exemplu» выдуманы для показа, фото взяты у проектов.
          Первая статья в списке всегда главная; фильтры нажимаются, и
          первая из найденных тоже становится главной. Два расположения:
          А — главная слева (оно сейчас на сайте), Б — главная сверху и ряд
          под ней, как новости на главной Point. На телефоне оба выглядят
          одинаково.
        </p>
        <nav className={styles.topLinks} aria-label="Примеры">
          {sets.map(({ id, title }) => (
            <a key={id} href={`#${id}`}>
              {title}
            </a>
          ))}
        </nav>
      </div>

      {sets.map(({ id, title, note, count, layout }) => (
        <div key={id} className={styles.set}>
          <div id={id} className={styles.tag}>
            <strong>{title}</strong>
            <span>{note}</span>
          </div>
          <Journal
            articles={[...siteArticles, ...examples].slice(0, count)}
            layout={layout}
          />
        </div>
      ))}
    </main>
  );
}
