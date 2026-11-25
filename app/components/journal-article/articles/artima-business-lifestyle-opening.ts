import type { ArticleText, Locale } from "../content";

// The docs open with the building on Calea Ieșilor: it is the head picture
// here (public/journal/artima-business-lifestyle-opening.webp), so the text
// starts with the walkway; the photos keep their numbers (-2, -3).

export const texts: Record<Locale, ArticleText> = {
  ro: {
    title:
      "ENSŌ Development anunță finalizarea și lansarea oficială a centrului de afaceri ARTIMA Business & Lifestyle",
    lead: [
      [
        "ENSŌ Development anunță finalizarea lucrărilor și predarea în exploatare a centrului de afaceri ARTIMA Business & Lifestyle. Un proiect mixt-use emblematic, amplasat strategic la prima linie a străzii Calea Ieșilor — una dintre cele mai importante artere ale Chișinăului.",
      ],
    ],
    body: [
      {
        kind: "p",
        text: [
          "Acest nou reper arhitectural este conceput pentru a redefini experiența business printr-o combinație de spații de birouri premium, spații comerciale la parter și zone verzi de recreere generoase — creând un mediu complet pentru activitatea de afaceri contemporană.",
        ],
      },
      {
        kind: "p",
        text: [
          "ARTIMA Business & Lifestyle cuprinde o suprafață totală de 18 000 m², dintre care 12 000 m² destinați birourilor și 6 000 m² spațiilor comerciale. Centrul de afaceri pune accent pe sustenabilitate, funcționalitate operațională și confort, oferind locuitorilor și vizitatorilor o infrastructură completă.",
        ],
      },
      {
        kind: "figure",
        wide: true,
        pictures: [
          {
            src: "/journal/artima-business-lifestyle-opening-2.webp",
            width: 1366,
            height: 1695,
            alt: "Aleea cu verdeață de-a lungul clădirii ARTIMA Business & Lifestyle",
          },
        ],
      },
      {
        kind: "p",
        text: [
          "Poziționarea privilegiată oferă acces imediat la o gamă extinsă de servicii și infrastructură urbană de calitate. Construcția a fost realizată conform celor mai stricte standarde internaționale, utilizând tehnologii de ultimă generație pentru eficiență energetică și design durabil.",
        ],
      },
      {
        kind: "p",
        text: [
          "ARTIMA Business & Lifestyle se remarcă printr-un set de facilități de top care răspund celor mai înalte standarde internaționale: mentenanță preventivă constantă, sistem inovator ARTIMA Helpdesk, standarde de curățenie premium, 5 lifturi de mare capacitate, sistem modern de climatizare VRF cu reglaj individual și o parcare subterană cu o capacitate de locuri fără precedent în țară.",
        ],
      },
      {
        kind: "figure",
        wide: true,
        pictures: [
          {
            src: "/journal/artima-business-lifestyle-opening-3.webp",
            width: 2000,
            height: 1333,
            alt: "Lobby-ul ARTIMA Business & Lifestyle",
          },
        ],
      },
      {
        kind: "p",
        text: [
          "Proiectul a fost vândut integral înainte de finalizarea lucrărilor, reflectând cererea consistentă pentru spații de lucru de înalt nivel.",
        ],
      },
      {
        kind: "p",
        text: [
          "Centrul de afaceri dispune de o capacitate de parcare subterană fără precedent în Republica Moldova, acces direct în lobby, geamuri panoramice, tavane cu înălțimi de 3–4 metri. Zonele exterioare sunt amenajate cu arbori maturi, mobilier urban premium și spații dedicate relaxării și networking-ului.",
        ],
      },
      {
        kind: "p",
        text: [
          "ARTIMA Business & Lifestyle se alătură portofoliului ENSŌ Development ca un proiect de referință pe segmentul birourilor premium din Chișinău și contribuie la consolidarea profilului capitalei ca destinație competitivă pentru mediul de afaceri internațional. Acest proiect reflectă viziunea noastră pe termen lung în Moldova și România, ca hub global al excelenței în locuire și afaceri.",
        ],
      },
    ],
  },

  en: {
    title:
      "ENSŌ Development announces completion and official launch of ARTIMA Business & Lifestyle Center",
    lead: [
      [
        "ENSŌ Development announces the completion of construction and delivery of the ARTIMA Business & Lifestyle business center. This emblematic mixed-use project is strategically located on the frontline of Calea Ieșilor Street — one of Chișinău's most important thoroughfares.",
      ],
    ],
    body: [
      {
        kind: "p",
        text: [
          "This new architectural landmark is designed to redefine the business experience through a combination of premium office spaces, ground-floor commercial areas, and generous green recreation zones — creating a comprehensive environment for contemporary business activities.",
        ],
      },
      {
        kind: "p",
        text: [
          "ARTIMA Business & Lifestyle spans a total area of 18,000 m², including 12,000 m² of office space and 6,000 m² of retail space. The business center emphasizes sustainability, operational functionality, and comfort, offering both residents and visitors a comprehensive urban infrastructure.",
        ],
      },
      {
        kind: "figure",
        wide: true,
        pictures: [
          {
            src: "/journal/artima-business-lifestyle-opening-2.webp",
            width: 1366,
            height: 1695,
            alt: "A landscaped walkway along the ARTIMA Business & Lifestyle building",
          },
        ],
      },
      { kind: "h2", text: "Strategic location & construction standards" },
      {
        kind: "p",
        text: [
          "The privileged positioning offers immediate access to an extensive range of services and quality urban infrastructure. Construction was carried out in accordance with the strictest international standards, utilizing cutting-edge technologies for energy efficiency and sustainable design.",
        ],
      },
      {
        kind: "p",
        text: [
          "ARTIMA Business & Lifestyle stands out through a comprehensive suite of top-tier facilities meeting the highest international standards: constant preventive maintenance, innovative ARTIMA Helpdesk system, premium cleaning standards, 5 high-capacity elevators, modern VRF air conditioning system with individual controls, underground parking with unprecedented capacity in the country. The project was sold out entirely before construction completion, reflecting consistent demand for high-level workspace solutions.",
        ],
      },
      {
        kind: "figure",
        wide: true,
        pictures: [
          {
            src: "/journal/artima-business-lifestyle-opening-3.webp",
            width: 2000,
            height: 1333,
            alt: "The ARTIMA Business & Lifestyle lobby",
          },
        ],
      },
      {
        kind: "p",
        text: [
          "The business center offers an unprecedented underground parking capacity in the Republic of Moldova, direct lobby access, panoramic windows, and ceilings with heights ranging from 3 to 4 meters. The exterior areas are landscaped with mature trees, premium urban furniture, and dedicated spaces for relaxation and networking.",
        ],
      },
      {
        kind: "p",
        text: [
          "ARTIMA Business & Lifestyle joins the ENSŌ Development portfolio as a flagship project in Chișinău’s premium office segment, strengthening the city’s profile as a competitive destination for the international business community. This project embodies our long-term vision for Moldova and Romania as a global hub of excellence in living and business.",
        ],
      },
    ],
  },

  ru: {
    title:
      "ENSŌ Development объявляет о завершении строительства и официальном открытии бизнес-центра ARTIMA Business & Lifestyle",
    lead: [
      [
        "ENSŌ Development объявляет о завершении строительства и вводе в эксплуатацию бизнес-центра ARTIMA Business & Lifestyle. Это знаковый mixed-use проект, стратегически расположенный на первой линии Калеа Ешилор — одной из главных магистралей Кишинёва.",
      ],
    ],
    body: [
      {
        kind: "p",
        text: [
          "Новый архитектурный ориентир задуман, чтобы изменить представление о деловой среде: премиальные офисы, коммерческие помещения на первом этаже и просторные зелёные зоны отдыха вместе создают полноценное пространство для современного бизнеса.",
        ],
      },
      {
        kind: "p",
        text: [
          "Общая площадь ARTIMA Business & Lifestyle — 18 000 м², из них 12 000 м² отведены под офисы и 6 000 м² — под коммерческие помещения. В бизнес-центре сделан акцент на устойчивость, удобство эксплуатации и комфорт, а резидентам и гостям доступна вся необходимая инфраструктура.",
        ],
      },
      {
        kind: "figure",
        wide: true,
        pictures: [
          {
            src: "/journal/artima-business-lifestyle-opening-2.webp",
            width: 1366,
            height: 1695,
            alt: "Озеленённая аллея вдоль здания ARTIMA Business & Lifestyle",
          },
        ],
      },
      {
        kind: "p",
        text: [
          "Выгодное расположение даёт прямой доступ к широкому спектру услуг и качественной городской инфраструктуре. Здание построено по самым строгим международным стандартам, с применением новейших технологий энергоэффективности и устойчивого проектирования.",
        ],
      },
      {
        kind: "p",
        text: [
          "ARTIMA Business & Lifestyle выделяется набором первоклассных сервисов и решений, отвечающих самым высоким международным стандартам: постоянное профилактическое обслуживание, инновационная система ARTIMA Helpdesk, премиальные стандарты уборки, пять вместительных лифтов, современная система кондиционирования VRF с индивидуальной регулировкой и подземный паркинг небывалого для страны масштаба.",
        ],
      },
      {
        kind: "figure",
        wide: true,
        pictures: [
          {
            src: "/journal/artima-business-lifestyle-opening-3.webp",
            width: 2000,
            height: 1333,
            alt: "Лобби ARTIMA Business & Lifestyle",
          },
        ],
      },
      {
        kind: "p",
        text: [
          "Проект был полностью продан ещё до завершения строительства — это говорит об устойчивом спросе на офисные пространства высокого класса.",
        ],
      },
      {
        kind: "p",
        text: [
          "В бизнес-центре — беспрецедентный для Республики Молдова подземный паркинг, прямой доступ в лобби, панорамные окна и потолки высотой 3–4 метра. Прилегающая территория благоустроена: взрослые деревья, премиальная городская мебель, пространства для отдыха и нетворкинга.",
        ],
      },
      {
        kind: "p",
        text: [
          "ARTIMA Business & Lifestyle пополняет портфель ENSŌ Development как эталонный проект в сегменте премиальных офисов Кишинёва и укрепляет репутацию столицы как конкурентоспособной площадки для международного бизнеса. Этот проект отражает наше долгосрочное видение Молдовы и Румынии как глобального центра высоких стандартов жизни и бизнеса.",
        ],
      },
    ],
  },
};
