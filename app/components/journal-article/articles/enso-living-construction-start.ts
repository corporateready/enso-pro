import type { ArticleText, Locale } from "../content";

// The docs put the penthouse picture right under the lead; under the head
// picture that made two pictures in a row, so it follows the first paragraph.

export const texts: Record<Locale, ArticleText> = {
  ro: {
    title:
      "ENSŌ Development anunță demararea lucrărilor pentru proiectul ENSŌ LIVING în Brașov, România",
    lead: [
      [
        "ENSŌ Development a anunțat începerea lucrărilor pentru ENSŌ LIVING Brașov, un proiect imobiliar de tip mixed-use ce marchează extinderea în segmentul premium al companiei pe piața românească printr-o dezvoltare de referință.",
      ],
    ],
    body: [
      {
        kind: "p",
        text: [
          "Amplasat într-o zonă privilegiată a Brașovului, cu acces rapid către principalele repere urbane și cu deschideri panoramice asupra munților și centrului nou, proiectul reunește funcțiuni complementare: business, rezidențial și lifestyle.",
        ],
      },
      {
        kind: "figure",
        wide: true,
        pictures: [
          {
            src: "/journal/enso-living-construction-start-1.webp",
            width: 2000,
            height: 1125,
            alt: "Interiorul penthouse-ului ENSŌ LIVING, cu grădină interioară privată (randare)",
          },
        ],
      },
      {
        kind: "p",
        text: [
          "Dezvoltarea va cuprinde o suprafață vânzabilă de 5 810 m² și va fi desfășurată pe 10 etaje. Primele patru niveluri sunt dedicate unui business center premium. Între etajele patru și opt se află apartamente de tip studio și unități cu una, două sau trei camere, beneficiind de terase cu priveliști panoramice. Nivelurile superioare sunt rezervate locuințelor de tip duplex și triplex, iar ansamblul este completat de un ",
          { strong: "penthouse exclusiv" },
          ", singurul de acest tip disponibil, desfășurat pe trei niveluri și prevăzut cu grădină interioară privată și terasă.",
        ],
      },
      {
        kind: "p",
        text: [
          "Funcțiunile rezidențiale și de business sunt completate de un bistro-restaurant desfășurat pe două niveluri, un showroom comercial, spații verzi, precum și o infrastructură generoasă de parcări subterane.",
        ],
      },
      {
        kind: "figure",
        wide: true,
        pictures: [
          {
            src: "/journal/enso-living-construction-start-2.webp",
            width: 2000,
            height: 1125,
            alt: "Intrarea în ENSŌ LIVING și grădina din fața clădirii, seara (randare)",
          },
        ],
      },
      {
        kind: "p",
        text: [
          "Întregul proiect este conceput ca un ansamblu mixed-use, în care funcțiunile de business, rezidențial și lifestyle sunt reunite într-o singură structură. Dezvoltarea include facilități aliniate la standarde internaționale: design arhitectural avangardist, fațada din sticlă „floor-to-ceiling” cu elemente de umbrire și acces securizat digital.",
        ],
      },
      {
        kind: "p",
        text: [
          "Lucrările de construcție au început în martie 2025. Finalizarea și predarea în exploatare sunt planificate pentru martie 2027, moment în care ENSŌ LIVING va completa portofoliul companiei cu un proiect poziționat în segmentul premium.",
        ],
      },
      {
        kind: "p",
        text: [
          "Prin ENSŌ LIVING, ENSŌ Development își consolidează prezența pe piața din România și continuă să dezvolte proiecte care îmbină arhitectura contemporană, materialele high-end și funcționalitatea urbană.",
        ],
      },
    ],
  },

  en: {
    title:
      "ENSŌ Development announces the start of construction for ENSŌ LIVING in Brașov, Romania",
    lead: [
      [
        "ENSŌ Development has announced the start of construction for ENSŌ LIVING Brașov, a mixed-use real estate development that marks the company’s expansion into the premium segment of the Romanian market.",
      ],
    ],
    body: [
      {
        kind: "p",
        text: [
          "Located in a prime area of Brașov, with fast access to key urban landmarks and panoramic views of the surrounding mountains and the new city center, the project brings together business, residential and lifestyle functions.",
        ],
      },
      {
        kind: "figure",
        wide: true,
        pictures: [
          {
            src: "/journal/enso-living-construction-start-1.webp",
            width: 2000,
            height: 1125,
            alt: "Inside the ENSŌ LIVING penthouse, with its private indoor garden (rendering)",
          },
        ],
      },
      {
        kind: "p",
        text: [
          "The development will offer 5,810 sqm of sellable area across 10 floors. The first four levels will host a premium business center. Levels four to eight will include studio apartments as well as one-, two- and three-bedroom residences, all featuring terraces with panoramic views. The upper levels are reserved for duplex and triplex residences. The development will also include an exclusive penthouse — the only unit of its kind — arranged over three levels and featuring a private indoor garden and terrace.",
        ],
      },
      {
        kind: "p",
        text: [
          "Residential and business functions are complemented by a two-level bistro restaurant, a commercial showroom, landscaped green areas, as well as generous underground parking facilities.",
        ],
      },
      {
        kind: "figure",
        wide: true,
        pictures: [
          {
            src: "/journal/enso-living-construction-start-2.webp",
            width: 2000,
            height: 1125,
            alt: "The ENSŌ LIVING entrance and front garden in the evening (rendering)",
          },
        ],
      },
      {
        kind: "p",
        text: [
          "The project has been designed as a mixed-use development, integrating business, residential and lifestyle functions within a single structure. Amenities will include avant-garde architecture, floor-to-ceiling glass façades with shading elements, and digitally secured access systems.",
        ],
      },
      {
        kind: "p",
        text: [
          "Construction began in March 2025, with completion scheduled for March 2027, when ENSŌ LIVING will expand the company’s portfolio with a project positioned in the premium segment.",
        ],
      },
      {
        kind: "p",
        text: [
          "Through ENSŌ LIVING, ENSŌ Development continues to strengthen its presence in Romania while developing projects that combine contemporary architecture, high-end materials and urban functionality.",
        ],
      },
    ],
  },

  ru: {
    title: "ENSŌ Development объявляет о начале строительства ENSŌ LIVING в румынском Брашове",
    lead: [
      [
        "ENSŌ Development объявила о начале строительства ENSŌ LIVING в Брашове — знакового mixed-use проекта, с которым компания выходит в премиальный сегмент румынского рынка.",
      ],
    ],
    body: [
      {
        kind: "p",
        text: [
          "Проект расположен в престижном районе Брашова: отсюда легко добраться до главных точек города, а из окон открываются панорамные виды на горы и новый центр. Он объединяет взаимодополняющие функции — бизнес, жильё и lifestyle.",
        ],
      },
      {
        kind: "figure",
        wide: true,
        pictures: [
          {
            src: "/journal/enso-living-construction-start-1.webp",
            width: 2000,
            height: 1125,
            alt: "Интерьер пентхауса ENSŌ LIVING с собственным внутренним садом (визуализация)",
          },
        ],
      },
      {
        kind: "p",
        text: [
          "Продаваемая площадь проекта составит 5 810 м² на 10 этажах. Первые четыре уровня отведены под бизнес-центр премиум-класса. С четвёртого по восьмой этаж — студии и одно-, двух- и трёхкомнатные квартиры с террасами и панорамными видами. Верхние уровни отданы под дуплексы и триплексы, а завершает комплекс ",
          { strong: "эксклюзивный пентхаус" },
          " — единственный в своём роде: трёхуровневый, с собственным внутренним садом и террасой.",
        ],
      },
      {
        kind: "p",
        text: [
          "Жилую и деловую части дополняют двухуровневый бистро-ресторан, коммерческий шоурум, зелёные зоны и вместительный подземный паркинг.",
        ],
      },
      {
        kind: "figure",
        wide: true,
        pictures: [
          {
            src: "/journal/enso-living-construction-start-2.webp",
            width: 2000,
            height: 1125,
            alt: "Вход в ENSŌ LIVING и сад перед зданием вечером (визуализация)",
          },
        ],
      },
      {
        kind: "p",
        text: [
          "Весь проект задуман как mixed-use комплекс, в котором бизнес, жильё и lifestyle объединены в одном здании. Здесь предусмотрены решения международного уровня: авангардная архитектура, стеклянный фасад «от пола до потолка» с солнцезащитными элементами и цифровая система контроля доступа.",
        ],
      },
      {
        kind: "p",
        text: [
          "Строительство началось в марте 2025 года. Завершение и ввод в эксплуатацию запланированы на март 2027 года — тогда ENSŌ LIVING пополнит портфель компании проектом премиального сегмента.",
        ],
      },
      {
        kind: "p",
        text: [
          "С проектом ENSŌ LIVING компания ENSŌ Development укрепляет присутствие на румынском рынке и продолжает создавать проекты, в которых сочетаются современная архитектура, материалы высокого класса и городская функциональность.",
        ],
      },
    ],
  },
};
