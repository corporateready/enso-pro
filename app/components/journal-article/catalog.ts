/*
 * Every article of the journal, newest first, and what its cards need: the
 * category, the month it is dated, the reading time, the pictures and the
 * card's title in each language. The home block (*-page/journal), the
 * journal's own page (journal-page) and the articles' pages all read this
 * list; the articles' own words are elsewhere (content.ts, articles/*.ts),
 * so a card does not carry a whole article into the home page's script.
 *
 * A new article: an entry here (where its date puts it) and its words in
 * articles/<id>.ts.
 *
 * Dates: the client's content team publishes its pieces "in the past"
 * (ClickUp «Статьи ENSO Development»: «le vom publica în trecut»), dated by
 * the event. Their topics list dates some (Sept 2024, Dec 2024, May 2025,
 * Sept 2025; ENSŌ LIVING's «Февраль 2025» is March here, as its text says
 * the works began in March 2025); the others carry «Дата?» there and have a
 * month of ours meanwhile (marked "provisional" below) until the client
 * says. Month and year only: the day is known for none.
 *
 * onHome: false — the same list marks some pieces «публикуем статью, которую
 * будут находить только те, кто ищут»: they have their page and are in the
 * journal's own list, but not in the home page's block.
 */

export type Locale = "ro" | "ru" | "en";

export const articleIds = [
  "bim-standard",
  "cucorilor-tender-chisinau",
  "iasi-cicoarei-residential",
  "eminescu-offices",
  "carpathia-brasov-investment",
  "azimut-copou-exit",
  "diminetii-iasi-investment",
  "newton-house-sold-out",
  "artima-business-lifestyle-opening",
  "moldova-growth-leader",
  "enso-living-construction-start",
  "brasov-mixed-use-acquisition",
  "archimatika-partnership",
] as const;

export type ArticleId = (typeof articleIds)[number];

/* "buying-guide" waits for its first guide: a category with no article is
   not offered as a filter */
export type ArticleCategory =
  | "investments"
  | "projects"
  | "market"
  | "inside-enso"
  | "buying-guide";

export type JournalCategory = "all" | ArticleCategory;

/* the filters' order */
const categoryOrder: readonly JournalCategory[] = [
  "all",
  "investments",
  "projects",
  "market",
  "inside-enso",
  "buying-guide",
];

export const categoryLabels: Record<Locale, Record<JournalCategory, string>> = {
  ro: {
    all: "Toate",
    investments: "Investiții",
    projects: "Proiecte",
    market: "Piață",
    "inside-enso": "Din interior",
    "buying-guide": "Ghid de cumpărare",
  },
  ru: {
    all: "Все",
    investments: "Инвестиции",
    projects: "Проекты",
    market: "Рынок",
    "inside-enso": "Изнутри",
    "buying-guide": "Гид покупателя",
  },
  en: {
    all: "All",
    investments: "Investments",
    projects: "Projects",
    market: "Market",
    "inside-enso": "Inside ENSO",
    "buying-guide": "Buying guide",
  },
};

type Picture = { src: string; width: number; height: number };

type Entry = {
  id: ArticleId;
  category: ArticleCategory;
  /* "YYYY-MM" */
  published: string;
  minutes: number;
  onHome?: false;
  /* the card's title: the designers' cover line, shorter than the
     article's own; line breaks as Figma set the first three */
  title: Record<Locale, string>;
  /* the home block's picture (its cards are square) */
  picture: Picture;
  /* the journal page's cards, 1.27 : 1 */
  cover: Picture;
};

const squareOf = (id: string): Picture => ({
  src: `/journal/${id}-square.webp`,
  width: 1200,
  height: 1200,
});

const coverOf = (id: string): Picture => ({
  src: `/journal/${id}-cover.webp`,
  width: 1270,
  height: 1000,
});

const entries: readonly Entry[] = [
  {
    id: "bim-standard",
    category: "inside-enso",
    published: "2026-06", // provisional
    minutes: 3,
    title: {
      ro: "BIM\u00a0— standardul\ninternațional aplicat în\nfiecare proiect ENSŌ Development",
      ru: "Международный стандарт\nBIM\u00a0— в\u00a0каждом проекте\nENSŌ Development",
      en: "BIM is the international\nstandard applied in every\nENSŌ Development project",
    },
    picture: { src: "/journal-post-image.avif", width: 3200, height: 2520 },
    cover: { src: "/journal-post-image.avif", width: 3200, height: 2520 },
  },
  {
    id: "cucorilor-tender-chisinau",
    // ENSO's own development, not a stake in another's (2026-11-25
    // meeting: check the categories)
    category: "projects",
    published: "2026-05", // provisional
    minutes: 2,
    title: {
      ro: "ENSŌ Development câștigă licitația pentru 3\u00a0hectare în Chișinău",
      ru: "ENSŌ Development выиграла тендер на 3\u00a0гектара в\u00a0Кишинёве",
      en: "ENSŌ Development wins the tender for 3\u00a0hectares in Chișinău",
    },
    picture: squareOf("cucorilor-tender-chisinau"),
    cover: coverOf("cucorilor-tender-chisinau"),
  },
  {
    id: "iasi-cicoarei-residential",
    category: "projects",
    published: "2026-04", // provisional
    minutes: 2,
    onHome: false,
    title: {
      ro: "ENSŌ Development dezvoltă cel mai mare ansamblu rezidențial din Iași, în cartierul Cicoarei",
      ru: "ENSŌ Development проектирует крупнейший жилой комплекс в\u00a0Яссах\u00a0— в\u00a0районе Чикоарей",
      en: "ENSŌ Development is developing Iași's largest residential project, in the Cicoarei district",
    },
    picture: squareOf("iasi-cicoarei-residential"),
    cover: coverOf("iasi-cicoarei-residential"),
  },
  {
    id: "eminescu-offices",
    category: "investments",
    published: "2026-03", // provisional
    minutes: 2,
    title: {
      ro: "Exit investițional realizat cu succes în proiectul Eminescu Offices",
      ru: "ENSŌ Development завершает выход из инвестиции в\u00a0Eminescu Offices",
      en: "ENSŌ Development completes the investment exit from Eminescu Offices",
    },
    picture: { src: "/journal-eminescu-square.avif", width: 690, height: 690 },
    cover: { src: "/journal-eminescu.avif", width: 690, height: 543 },
  },
  {
    id: "carpathia-brasov-investment",
    category: "investments",
    published: "2026-02", // provisional
    minutes: 2,
    onHome: false,
    title: {
      ro: "O nouă investiție într-un proiect mixt-use de anvergură: Carpathia, Brașov",
      ru: "Новая инвестиция в\u00a0масштабный многофункциональный проект: Carpathia, Брашов",
      en: "A new investment in a large-scale mixed-use project: Carpathia, Brașov",
    },
    picture: squareOf("carpathia-brasov-investment"),
    cover: coverOf("carpathia-brasov-investment"),
  },
  {
    id: "azimut-copou-exit",
    category: "investments",
    published: "2026-01", // provisional
    minutes: 2,
    onHome: false,
    title: {
      ro: "Exit investițional realizat cu succes în proiectul AZIMUT COPOU din Iași",
      ru: "Успешный выход из проекта AZIMUT COPOU в\u00a0Яссах",
      en: "Successful investment exit from the AZIMUT COPOU project in Iași",
    },
    picture: squareOf("azimut-copou-exit"),
    cover: coverOf("azimut-copou-exit"),
  },
  {
    id: "diminetii-iasi-investment",
    category: "investments",
    published: "2025-12", // provisional
    minutes: 2,
    onHome: false,
    title: {
      ro: "Investiție ENSŌ Development în Iași: proiectul Dimineții",
      ru: "Инвестиция ENSŌ Development в\u00a0Яссах: проект Dimineții",
      en: "ENSŌ Development investment in Iași: the Dimineții project",
    },
    picture: squareOf("diminetii-iasi-investment"),
    cover: coverOf("diminetii-iasi-investment"),
  },
  {
    id: "newton-house-sold-out",
    category: "projects",
    published: "2025-11", // provisional
    minutes: 2,
    onHome: false,
    title: {
      ro: "Sold out înainte de termen la NEWTON HOUSE Grădina Botanică",
      ru: "Всё продано раньше срока: NEWTON HOUSE Grădina Botanică",
      en: "Sold out ahead of schedule at NEWTON HOUSE Grădina Botanică",
    },
    picture: squareOf("newton-house-sold-out"),
    cover: coverOf("newton-house-sold-out"),
  },
  {
    id: "artima-business-lifestyle-opening",
    category: "projects",
    published: "2025-09",
    minutes: 2,
    title: {
      ro: "ARTIMA Business & Lifestyle\u00a0— finalizat și lansat oficial",
      ru: "ARTIMA Business & Lifestyle\u00a0— построен и\u00a0официально открыт",
      en: "ARTIMA Business & Lifestyle\u00a0— completed and officially launched",
    },
    picture: squareOf("artima-business-lifestyle-opening"),
    cover: coverOf("artima-business-lifestyle-opening"),
  },
  {
    id: "moldova-growth-leader",
    category: "market",
    published: "2025-05",
    minutes: 3,
    title: {
      ro: "Moldova\u00a0— locul\u00a01 în Europa\nla creșterea pieței\nimobiliare în 2025",
      ru: "Молдова\u00a0— №1 в\u00a0Европе\nпо\u00a0росту рынка жилья,\n2025",
      en: "Moldova — #1 in Europe\nReal Estate Growth\nLeader 2025",
    },
    picture: { src: "/journal-moldova-square.avif", width: 588, height: 588 },
    cover: { src: "/journal-moldova.avif", width: 746, height: 588 },
  },
  {
    id: "enso-living-construction-start",
    category: "projects",
    published: "2025-03",
    minutes: 2,
    title: {
      ro: "Au început lucrările la ENSŌ LIVING în Brașov",
      ru: "Началось строительство ENSŌ LIVING в\u00a0Брашове",
      en: "Construction begins on ENSŌ LIVING in Brașov",
    },
    picture: squareOf("enso-living-construction-start"),
    cover: coverOf("enso-living-construction-start"),
  },
  {
    id: "brasov-mixed-use-acquisition",
    // ENSO's own development, not a stake in another's (2026-11-25
    // meeting: check the categories)
    category: "projects",
    published: "2024-12",
    minutes: 3,
    title: {
      ro: "ENSŌ Development se extinde în România cu un proiect mixed-use în Brașov",
      ru: "ENSŌ Development расширяет присутствие в\u00a0Румынии: mixed-use проект в\u00a0Брашове",
      en: "ENSŌ Development expands into Romania with a mixed-use project in Brașov",
    },
    picture: squareOf("brasov-mixed-use-acquisition"),
    cover: coverOf("brasov-mixed-use-acquisition"),
  },
  {
    id: "archimatika-partnership",
    category: "inside-enso",
    published: "2024-09",
    minutes: 3,
    title: {
      ro: "ENSŌ Development × Archimatika: parteneriat strategic în arhitectură și masterplanning urban",
      ru: "ENSŌ Development × Archimatika: стратегическое партнёрство в\u00a0архитектуре и\u00a0градостроительстве",
      en: "ENSŌ Development × Archimatika: a strategic partnership in architecture and urban masterplanning",
    },
    picture: squareOf("archimatika-partnership"),
    cover: coverOf("archimatika-partnership"),
  },
];

const months: Record<Locale, readonly string[]> = {
  ro: [
    "Ianuarie",
    "Februarie",
    "Martie",
    "Aprilie",
    "Mai",
    "Iunie",
    "Iulie",
    "August",
    "Septembrie",
    "Octombrie",
    "Noiembrie",
    "Decembrie",
  ],
  ru: [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ],
  en: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
};

/* "2025-09" → "Septembrie 2025" */
export const monthLabel = (published: string, locale: Locale) => {
  const [year, month] = published.split("-");
  return `${months[locale][Number(month) - 1]} ${year}`;
};

const readTimeLabel = (minutes: number, locale: Locale) =>
  locale === "ro"
    ? `${minutes} min de citit`
    : locale === "ru"
      ? `${minutes} мин чтения`
      : `${minutes} min read`;

export type JournalArticle = {
  id: string;
  category: ArticleCategory;
  badge: string;
  title: string;
  date: string;
  /* "YYYY-MM", for <time dateTime> */
  dateTime: string;
  readTime: string;
  src: string;
  width: number;
  height: number;
  /* the picture in the leading article's shape (1.27 : 1), for the cards of
     the journal's own page (components/journal-page); src where missing */
  cover?: Picture;
  /* false: on the journal's own page, not in the home page's block */
  onHome?: false;
};

const cardsIn = (locale: Locale): readonly JournalArticle[] =>
  entries.map((entry) => ({
    id: entry.id,
    category: entry.category,
    badge: categoryLabels[locale][entry.category],
    title: entry.title[locale],
    date: monthLabel(entry.published, locale),
    dateTime: entry.published,
    readTime: readTimeLabel(entry.minutes, locale),
    src: entry.picture.src,
    width: entry.picture.width,
    height: entry.picture.height,
    cover: entry.cover,
    ...(entry.onHome === false ? { onHome: false as const } : {}),
  }));

export const journalArticles: Record<Locale, readonly JournalArticle[]> = {
  ro: cardsIn("ro"),
  ru: cardsIn("ru"),
  en: cardsIn("en"),
};

/* the filters for a list of articles: "all", then each category that has
   an article in it */
export const categoriesFor = (
  locale: Locale,
  articles: readonly JournalArticle[],
): readonly { id: JournalCategory; label: string }[] =>
  categoryOrder
    .filter(
      (id) =>
        id === "all" || articles.some((article) => article.category === id),
    )
    .map((id) => ({ id, label: categoryLabels[locale][id] }));

/* the month an article is dated, "YYYY-MM" */
export const publishedOf = (id: ArticleId) =>
  entries.find((entry) => entry.id === id)?.published;
