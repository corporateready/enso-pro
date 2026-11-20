// The team as the Russian page shows it, three to a page. The names are the
// Romanian page's, written in Cyrillic. As there, no-break spaces keep a
// name or a number with its unit on one line.

export type TeamMember = {
  name: string;
  // the role and the years make one line, "role · years", as the client's
  // text has them
  role: string;
  years: string;
  about: string;
  imageSrc?: string;
};

export const teamSlides: readonly (readonly TeamMember[])[] = [
  [
    {
      name: "Виорел Бендерский, MBA",
      role: "Сооснователь",
      years: "27 лет в инвестициях и финансах",
      about: "Развивал проекты для NCH Capital, ZORILE и ARTIMA.",
    },
    {
      name: "Максим Думбрава",
      role: "Управляющий партнёр",
      years: "16 лет в девелопменте недвижимости",
      about:
        "Руководил проектами Diplomat Club, ARTIMA Business & Lifestyle, NEWTON HOUSE и ENSO LIVING Брашов.",
      imageSrc: "/team-maxim-dumbrava.webp",
    },
    {
      name: "Денис Васильев",
      role: "Маркетинг, продажи и IT",
      years: "12 лет",
      about:
        "Стратегии для проектов общим объёмом более 3 000 квартир и 20 000 м² офисов.",
      imageSrc: "/team-denis-vasiliev.webp",
    },
  ],
  [
    {
      name: "Владимир Островой",
      role: "Архитектура, управление проектами",
      years: "18 лет",
      about:
        "Жилые, коммерческие и культурные объекты, в том числе для Администрации Президента Республики Молдова.",
      imageSrc: "/team-vladimir-ostrovoi.webp",
    },
    {
      name: "Зинаида Думбрава",
      role: "Работа с клиентами",
      years: "20 лет",
      about: "Два десятилетия опыта в управлении отношениями с клиентами.",
      imageSrc: "/team-zinaida-dumbrava.webp",
    },
    {
      name: "Виталий Шеремет",
      role: "Управление строительством и кондоминиумами",
      years: "20 лет",
      about: "Экономист; руководил командами до 800 человек.",
      imageSrc: "/team-vitalie-seremet.webp",
    },
  ],
];
