/*
 * The articles' own words, for their pages (journal-article/index.tsx).
 *
 * Romanian and English are the content team's (ClickUp «Marketing / ENSO
 * Development / Content | ENSO Development», «Text Articol | …» tasks; the
 * texts themselves in Google Docs, Drive «10. ENSO DEVELOPMENT / 4. CONTENT /
 * ARTICOLE | ENSO Development»): «scriem în ro și traducem în eng». Russian is
 * our translation of the Romanian (2026-11-24), as the rest of the Russian
 * site. Copy-edits: "semnate by" → "semnate de"; the Moldova piece's two
 * draft headlines became one ("UE" → "Europa": Euronews ranks Europe).
 * The English BIM piece has a paragraph on the ~5% reserve that the
 * Romanian doesn't (so neither does the Russian): as the docs have it.
 *
 * Kept as data rather than markup so a new article is a new entry here and
 * in the journal's list (*-page/journal/index.tsx, same id).
 */

export type ArticleId = "bim-standard" | "eminescu-offices" | "moldova-growth-leader";

export type Inline = string | { text: string; href: string } | { strong: string };

export type ArticlePicture = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type Block =
  | { kind: "p"; text: readonly Inline[] }
  | { kind: "h2"; text: string }
  | { kind: "quote"; text: readonly Inline[]; source?: readonly Inline[] }
  | { kind: "list"; items: readonly (readonly Inline[])[] }
  | { kind: "figure"; pictures: readonly ArticlePicture[] };

export type ArticleText = {
  title: string;
  /* the paragraphs under the title, larger */
  lead: readonly (readonly Inline[])[];
  body: readonly Block[];
};

export type Locale = "ro" | "ru" | "en";

export const articleIds: readonly ArticleId[] = [
  "bim-standard",
  "eminescu-offices",
  "moldova-growth-leader",
];

/* the picture across the top of each article: the BIM photo of the
   journal's leading card; for the other two the originals the cards' small
   pictures were cut from (Drive «50. ARCHIVE / 5. EMINESCU OFFICES» drone
   shot DJI_0382, and the Shutterstock photo of Chișinău in ClickUp) */
export const articleHeads: Record<ArticleId, ArticlePicture & { position?: string }> = {
  "bim-standard": {
    src: "/journal-post-image.avif",
    width: 3200,
    height: 2520,
    alt: "",
    position: "50% 40%",
  },
  "eminescu-offices": {
    src: "/journal/eminescu-offices.webp",
    width: 2400,
    height: 1200,
    alt: "",
  },
  "moldova-growth-leader": {
    src: "/journal/moldova-growth-leader.webp",
    width: 2400,
    height: 1200,
    alt: "",
  },
};

const BCA =
  "https://www1.bca.gov.sg/safety-and-standards/lifts-escalators-and-mechanised-car-parking-systems/building-information-modelling-bim/";
const EURONEWS =
  "https://www.euronews.com/business/2025/04/26/where-in-europe-will-property-investment-pay-off-most-in-2025";
const NOMAD_LIST = "https://nomads.com/chisinau";
const GLOBAL_PROPERTY_GUIDE =
  "https://www.globalpropertyguide.com/europe/moldova/price-history";

const rentalYields = (alt: string): ArticlePicture => ({
  src: "/journal/moldova-rental-yields.png",
  width: 602,
  height: 407,
  alt,
});
const levelsPost = (alt: string): ArticlePicture => ({
  src: "/journal/moldova-levelsio-post.png",
  width: 493,
  height: 218,
  alt,
});
const levelsEurope = (alt: string): ArticlePicture => ({
  src: "/journal/moldova-levelsio-europe.png",
  width: 351,
  height: 398,
  alt,
});

export const articleTexts: Record<Locale, Record<ArticleId, ArticleText>> = {
  ro: {
    "bim-standard": {
      title:
        "ENSŌ Development integrează cu succes tehnologia BIM în procesul de proiectare",
      lead: [
        [
          "În industria imobiliară internațională, Building Information Modeling (BIM) a devenit standardul prin care se măsoară maturitatea tehnică a unui dezvoltator. Astăzi, BIM nu mai este o opțiune tehnologică — este un criteriu după care investitorii instituționali aleg cu cine lucrează. De aceea, ENSŌ Development proiectează în tehnologie BIM toate proiectele active din portofoliu, în Chișinău, Iași și Brașov.",
        ],
      ],
      body: [
        {
          kind: "quote",
          text: [
            "„Marea Britanie a impus BIM ca standard obligatoriu pentru toate proiectele publice începând cu 2016. Norvegia, Finlanda și Danemarca au adoptat mandate naționale BIM pentru sectorul public începând cu 2008. Singapore a mandatat depunerea electronică a documentației în format BIM pentru toate proiectele care depășesc 5 000 mp începând cu 2015.”",
          ],
          source: [
            { text: "Sursa:", href: BCA },
            " UK BIM Framework / HM Government; Statsbygg Norway; Building and Construction Authority Singapore (BCA)",
          ],
        },
        {
          kind: "p",
          text: [
            "Dezvoltarea unui proiect imobiliar implică zeci de echipe care lucrează simultan — arhitecți, ingineri de structură, specialiști în instalații, electrice și sanitare. În modelul tradițional, fiecare ramură produce propria documentație, iar coordonarea se face ulterior, prin suprapunerea planșelor. Conflictele dintre sisteme apar pe șantier, unde rezolvarea lor costă cel mai mult.",
          ],
        },
        {
          kind: "p",
          text: [
            "ENSŌ Development a eliminat acest risc din procesul de proiectare prin adoptarea tehnologiei BIM. Toate disciplinele lucrează în același model digital, actualizat în timp real. Când un inginer modifică un element de structură, arhitectul și specialistul în instalații văd imediat impactul. Erorile de coordonare sunt identificate și rezolvate în faza de proiectare, nu pe șantier.",
          ],
        },
        {
          kind: "p",
          text: [
            "Beneficiile depășesc faza de execuție. Modelul digital integrat rămâne activ pe întreg ciclul de viață al clădirii — de la proiectare și construcție, până la operarea și mentenanța ulterioară. Fiecare element al ansamblului este documentat digital, accesibil pentru intervenții viitoare, modernizări sau evaluări tehnice. Această continuitate informațională înseamnă decizii mai bine fundamentate și costuri de operare mai mici pe termen lung.",
          ],
        },
        {
          kind: "p",
          text: [
            "Pentru cumpărător, BIM înseamnă că produsul livrat corespunde proiectului asumat. Pentru investitor, înseamnă termene predictibile, costuri controlate și un risc de execuție gestionat înainte ca lucrările să înceapă. Iar pentru piața în care ENSŌ Development operează, înseamnă alinierea la standardele internaționale după care marii dezvoltatori din Marea Britanie, Scandinavia și Asia construiesc deja de mai bine de un deceniu.",
          ],
        },
        {
          kind: "p",
          text: [
            "ENSŌ Development operează ca dezvoltator activ în Republica Moldova și România, cu un portofoliu care depășește 500 000 m² livrați. Tehnologia BIM face parte din standardul de proiectare aplicat în toate proiectele companiei — o aliniere structurală la modul în care se proiectează astăzi în piețele mature.",
          ],
        },
      ],
    },
    "eminescu-offices": {
      title:
        "ENSŌ Development realizează exitul investițional din proiectul Eminescu Offices",
      lead: [
        [
          "ENSŌ Development a intrat în proiectul Eminescu Offices în calitate de partener investițional și își încheie participarea cu succes după comercializarea integrală a spațiilor business la prețurile țintă.",
        ],
      ],
      body: [
        {
          kind: "p",
          text: [
            "Proiectul este amplasat într-una dintre cele mai exclusiviste zone urbane ale capitalei. Strada Mihai Eminescu se află la câteva minute de Piața Marii Adunări Naționale, Parcul Catedralei și principalele instituții administrative și culturale ale orașului — un perimetru central în care dezvoltările noi sunt limitate, iar proprietățile au o valoare investițională ridicată.",
          ],
        },
        {
          kind: "p",
          text: [
            "Eminescu Offices face parte din complexul Eminescu Residence, un proiect imobiliar de lux, care integrează funcțiuni rezidențiale și spații de birouri într-o clădire concepută pentru a se integra în contextul arhitectural al centrului istoric. Proiectul se remarcă prin arhitectura inspirată din stilul neoclasic și prin interioare originale semnate de Arutin Art Bureau, elemente care conferă clădirii un caracter distinct și reprezentativ pentru această zonă a orașului.",
          ],
        },
        {
          kind: "p",
          text: [
            "Prin finalizarea acestei tranzacții, ENSŌ Development încheie participarea într-un proiect situat într-o zonă emblematică a Chișinăului și continuă strategia companiei de a participa în dezvoltări bine amplasate, cu identitate arhitecturală și relevanță urbană.",
          ],
        },
      ],
    },
    "moldova-growth-leader": {
      title: "Creștere record în imobiliare: Moldova — nr. 1 în Europa",
      lead: [
        [
          "Republica Moldova ocupă, potrivit celei mai recente analize publicate de ",
          { text: "Euronews Business", href: EURONEWS },
          ", prima poziție în Europa în ceea ce privește ritmul de creștere a valorii imobiliare.",
        ],
        [
          "Informația este susținută de datele agregate de platforma internațională ",
          { text: "Nomad List", href: NOMAD_LIST },
          ", fondată de antreprenorul tech Pieter Levels, care clasează Chișinăul printre orașele cu cel mai bun raport cost–calitate pentru relocare și investiții imobiliare în 2025.",
        ],
      ],
      body: [
        {
          kind: "p",
          text: [
            "Această repoziționare a Moldovei pe harta capitalurilor emergente din Europa vine într-un context în care piețele vestice traversează stagnări, iar investitorii cu viziune își mută interesul către est — acolo unde marginile de profit sunt încă neatinse de suprasaturare.",
          ],
        },
        {
          kind: "quote",
          text: [
            "„Moldova înregistrează cea mai rapidă creștere a valorii imobiliare din Europa în 2025”",
          ],
          source: ["Euronews Business, mai 2025"],
        },
        {
          kind: "figure",
          pictures: [rentalYields("Randamentele chiriilor în țările Europei în 2025: Moldova pe primul loc")],
        },
        { kind: "h2", text: "Dinamica pieței: între convergență economică și moment oportun" },
        {
          kind: "p",
          text: [
            "În ultimii cinci ani, piața imobiliară din Moldova a intrat într-un ciclu de apreciere accelerată, susținut de prețuri încă sub media regională, dar aflate pe un trend ascendent constant, de randamente solide, în special pe segmentul premium de închiriere, de o cerere în creștere din partea diasporei, antreprenorilor locali și a companiilor internaționale, precum și de o dezvoltare urbană activă, axată pe proiecte conforme cu standardele WELL și normele internaționale de locuire.",
          ],
        },
        {
          kind: "p",
          text: [
            "Această etapă de transformare este una istorică. Nu este vorba doar despre prețuri mai mari — ci despre schimbarea fundamentală a paradigmei investiționale în Moldova.",
          ],
        },
        { kind: "h2", text: "Analiză pe date: un trend susținut, nu o anomalie temporară" },
        {
          kind: "p",
          text: [
            "Potrivit ",
            { text: "Global Property Guide", href: GLOBAL_PROPERTY_GUIDE },
            ", prețurile locuințelor din Moldova au crescut cu +18,2% în termeni reali în 2023, înregistrând una dintre cele mai ridicate rate din Europa. În 2024, ritmul s-a menținut pozitiv, în ciuda inflației globale și incertitudinilor externe.",
          ],
        },
        {
          kind: "p",
          text: [
            "Această traiectorie ascendentă nu este conjuncturală, ci rezultatul unei convergențe economice accelerate, pe fondul stabilizării pieței, al revenirii capitalului din diaspora și al cererii pentru locuire modernă, centrală și sustenabilă.",
          ],
        },
        {
          kind: "p",
          text: [
            "În prezent, prețurile converg către valorile piețelor din Europa Centrală și de Est, oferind un avantaj competitiv clar investitorilor care intră în această etapă de piață.",
          ],
        },
        {
          kind: "h2",
          text: "Chișinău — punct de atracție pentru nomazi digitali și profesioniști mobili",
        },
        {
          kind: "p",
          text: [
            "Un alt indicator al maturizării pieței este ",
            { strong: "apariția unui nou profil de consumator urban" },
            ": nomadul digital – profesioniști care lucrează de la distanță și aleg să se stabilească temporar în orașe accesibile, dar bine conectate la rețelele globale.",
          ],
        },
        {
          kind: "figure",
          pictures: [
            levelsPost("Postarea lui Pieter Levels despre locurile cu imobiliare în creștere"),
            levelsEurope("Lista lui Pieter Levels: orașe din Europa cu imobiliare în creștere, Chișinău +39%"),
          ],
        },
        {
          kind: "p",
          text: [
            "Conform ",
            { text: "Nomad List", href: NOMAD_LIST },
            ", Chișinăul a devenit în ultimii ani un nod de interes pentru antreprenori globali și specialiști în tehnologii remote, datorită costului redus al vieții, infrastructurii IT solide, cadrului administrativ prietenos și calității generale a mediului urban.",
          ],
        },
        {
          kind: "p",
          text: [
            "Această categorie de profesioniști — care preferă închirieri mobilate, pe termen mediu și lung — a dus la creșterea cererii pentru apartamente urbane moderne, amplasate central, cu facilități smart și accesibilitate. Pentru investitori, aceasta se traduce prin randamente constante și stabilitate pe segmentul long-stay.",
          ],
        },
        { kind: "h2", text: "Oportunitatea investițională: momentul este acum" },
        {
          kind: "p",
          text: [
            "În absența unei supraoferte și cu cerere susținută atât din intern, cât și din exterior, Moldova rămâne una dintre puținele piețe europene în fază de expansiune clară. Acesta este un „early window” pentru capitalurile care caută protecție, randament și potențial de apreciere într-un cadru reglementat și predictibil.",
          ],
        },
      ],
    },
  },

  en: {
    "bim-standard": {
      title: "ENSŌ Development successfully integrates BIM technology into its design process",
      lead: [
        [
          "In the international real estate industry, Building Information Modeling (BIM) has become the standard by which a developer's technical maturity is measured. Today, BIM is no longer a technological option — it is a criterion by which institutional investors choose their partners. For this reason, ENSŌ Development designs all active projects in its portfolio using BIM technology, across Chișinău, Iași and Brașov.",
        ],
      ],
      body: [
        {
          kind: "quote",
          text: [
            "“The United Kingdom mandated BIM as a compulsory standard for all public projects starting in 2016. Norway, Finland and Denmark adopted national BIM mandates for the public sector starting in 2008. Singapore mandated the electronic submission of documentation in BIM format for all projects exceeding 5,000 sqm starting in 2015.”",
          ],
          source: [
            { text: "Source:", href: BCA },
            " UK BIM Framework / HM Government; Statsbygg Norway; Building and Construction Authority Singapore (BCA)",
          ],
        },
        {
          kind: "p",
          text: [
            "The development of a real estate project involves dozens of teams working simultaneously — architects, structural engineers, specialists in HVAC, electrical and plumbing systems. In the traditional model, each discipline produces its own documentation, and coordination is carried out subsequently, by overlaying drawings. Conflicts between systems emerge during construction, where resolving them is most costly.",
          ],
        },
        {
          kind: "p",
          text: [
            "ENSŌ Development has eliminated this risk from the design process through the adoption of BIM technology. All disciplines work within the same digital model, updated in real time. When an engineer modifies a structural element, the architect and the MEP specialist see the impact immediately. Coordination errors are identified and resolved in the design phase, not during construction.",
          ],
        },
        {
          kind: "p",
          text: [
            "The benefits extend beyond the construction phase. The integrated digital model remains active throughout the entire life cycle of the building — from design and construction through to subsequent operation and maintenance. Every element of the development is digitally documented, accessible for future interventions, upgrades or technical assessments. This informational continuity translates into better-founded decisions and lower operating costs over the long term.",
          ],
        },
        {
          kind: "p",
          text: [
            "In standard industry practice, developers allocate a contingency reserve of approximately 5% of the total project budget for modifications and unforeseen adjustments during construction. With BIM, technical conflicts and discrepancies between disciplines are identified and resolved in the design phase — significantly reducing or even eliminating the need for this reserve. At the scale of the projects ENSŌ Development delivers, this optimisation typically translates into savings of several million euros. For the investor, the result is a more precise cost structure from the earliest stage. BIM also enables the investor to assess the financial feasibility of a project before construction begins — verifying whether estimated costs align with expected return parameters.",
          ],
        },
        {
          kind: "p",
          text: [
            "For the buyer, BIM means that the delivered product corresponds to the project committed to. For the investor, it means predictable timelines, controlled costs and execution risk managed before works begin. And for the market in which ENSŌ Development operates, it means alignment with the international standards by which major developers in the United Kingdom, Scandinavia and Asia have been building for over a decade.",
          ],
        },
        {
          kind: "p",
          text: [
            "ENSŌ Development operates as an active developer across the Republic of Moldova and Romania, with a delivered portfolio exceeding 500,000 sqm. BIM technology is part of the design standard applied across all of the company's projects — a structural alignment with how design is carried out today in mature markets.",
          ],
        },
      ],
    },
    "eminescu-offices": {
      title: "ENSŌ Development completes the investment exit from Eminescu Offices",
      lead: [
        [
          "ENSŌ Development has completed its exit from the Eminescu Offices project. The company entered the development as an investment partner and has concluded its participation following the full sale of the office units, in line with its initial business plan.",
        ],
      ],
      body: [
        {
          kind: "p",
          text: [
            "The project is located in one of Chisinau’s most exclusive urban areas. Mihai Eminescu Street is within close proximity to Piata Marii Adunari Nationale, Cathedral Park, and the city’s key administrative and cultural institutions — a central district where new developments are limited and real estate assets remain highly sought after.",
          ],
        },
        {
          kind: "p",
          text: [
            "Eminescu Offices forms part of the Eminescu Residence complex, a high-end mixed-use development combining residential and office components within a building designed to integrate into the architectural fabric of the historic city center. The project is defined by neoclassical-inspired architecture and distinctive interiors by Arutin Art Bureau, giving the property a strong and recognizable identity within this prime location.",
          ],
        },
        {
          kind: "p",
          text: [
            "With the completion of this transaction, ENSŌ Development concludes its involvement in a project located in one of the city’s most established central districts and continues its strategy of participating in well-located developments with a clear architectural identity and strong urban positioning.",
          ],
        },
      ],
    },
    "moldova-growth-leader": {
      title: "Record growth in real estate: Moldova is #1 in Europe",
      lead: [
        [
          "The Republic of Moldova ranks first in Europe in terms of real estate value growth rate, according to the latest analysis published by ",
          { text: "Euronews Business", href: EURONEWS },
          ".",
        ],
        [
          "This information is supported by aggregated data from the international platform ",
          { text: "Nomad List", href: NOMAD_LIST },
          ", founded by tech entrepreneur Pieter Levels, which ranks Chișinău among the cities with the best cost-quality ratio for relocation and real estate investment in 2025.",
        ],
      ],
      body: [
        {
          kind: "p",
          text: [
            "This repositioning of Moldova on the map of emerging European capitals comes at a time when Western markets are experiencing stagnation, and visionary investors are shifting their interest eastward — where profit margins remain untouched by oversaturation.",
          ],
        },
        {
          kind: "quote",
          text: ["“Moldova records the fastest real estate value growth in Europe in 2025”"],
          source: ["Euronews Business, May 2025"],
        },
        {
          kind: "figure",
          pictures: [rentalYields("Rental yields in European countries in 2025: Moldova ranks first")],
        },
        {
          kind: "h2",
          text: "Market dynamics: between economic convergence and a window of opportunity",
        },
        {
          kind: "p",
          text: [
            "Over the past five years, Moldova’s real estate market has entered a cycle of accelerated appreciation, supported by:",
          ],
        },
        {
          kind: "list",
          items: [
            [{ strong: "Pricing advantages" }, ": prices still below regional averages but on a consistent upward trend"],
            [{ strong: "Solid returns" }, ": particularly strong in the premium rental segment"],
            [{ strong: "Growing demand" }, ": from diaspora, local entrepreneurs, and international companies"],
            [{ strong: "Active urban development" }, ": projects compliant with WELL standards and international housing norms"],
          ],
        },
        {
          kind: "p",
          text: [
            "This transformation phase is historic. It's not just about higher prices — but about a fundamental shift in Moldova's investment paradigm.",
          ],
        },
        { kind: "h2", text: "Data-driven analysis: a sustained trend, not a temporary anomaly" },
        {
          kind: "p",
          text: [
            "According to ",
            { text: "Global Property Guide", href: GLOBAL_PROPERTY_GUIDE },
            ", housing prices in Moldova increased by ",
            { strong: "+18.2% in real terms in 2023" },
            ", recording one of the highest rates in Europe. In 2024, the pace remained positive despite global inflation and external uncertainties.",
          ],
        },
        {
          kind: "p",
          text: [
            "This upward trajectory is not cyclical, but rather the result of accelerated economic convergence, driven by:",
          ],
        },
        {
          kind: "list",
          items: [
            ["Market stabilization"],
            ["Return of diaspora capital"],
            ["Demand for modern, central, and sustainable housing"],
          ],
        },
        {
          kind: "p",
          text: [
            "Currently, prices are converging toward Central and Eastern European market values, offering a clear competitive advantage to investors entering at this market stage.",
          ],
        },
        { kind: "h2", text: "Chișinău — a magnet for digital nomads and mobile professionals" },
        {
          kind: "p",
          text: [
            "Another indicator of market maturation is ",
            { strong: "the emergence of a new urban consumer profile" },
            ": the digital nomad — professionals who work remotely and choose to establish themselves temporarily in accessible cities that are well-connected to global networks.",
          ],
        },
        {
          kind: "figure",
          pictures: [
            levelsPost("Pieter Levels’s post on places with growing real estate"),
            levelsEurope("Pieter Levels’s list of European places with growing real estate, Chisinau +39%"),
          ],
        },
        {
          kind: "p",
          text: [
            "According to ",
            { text: "Nomad List", href: NOMAD_LIST },
            ", Chisinau has in recent years emerged as a hub of interest for global entrepreneurs and remote-tech specialists, thanks to its low cost of living, solid IT infrastructure, business-friendly administrative framework, and overall urban quality of life.",
          ],
        },
        {
          kind: "p",
          text: [
            "This category of professionals — who prefer furnished, medium to long-term rentals — has increased demand for modern urban apartments, centrally located, with smart facilities and accessibility. For investors, this translates into consistent returns and stability in the long-stay segment.",
          ],
        },
        { kind: "h2", text: "Investment opportunity: the time is now" },
        {
          kind: "p",
          text: [
            "In the absence of oversupply and with sustained demand from both domestic and foreign sources, Moldova remains one of the few European markets in a clear expansion phase. This represents an “early window” for capital seeking protection, returns, and appreciation potential within a regulated and predictable framework.",
          ],
        },
      ],
    },
  },

  ru: {
    "bim-standard": {
      title: "ENSŌ Development успешно внедряет технологию BIM в проектирование",
      lead: [
        [
          "В международной индустрии недвижимости Building Information Modeling (BIM) стал стандартом, по которому измеряют техническую зрелость девелопера. Сегодня BIM — уже не технологическая опция, а критерий, по которому институциональные инвесторы выбирают, с кем работать. Поэтому ENSŌ Development проектирует в BIM все активные проекты портфеля — в Кишинёве, Яссах и Брашове.",
        ],
      ],
      body: [
        {
          kind: "quote",
          text: [
            "«Великобритания сделала BIM обязательным стандартом для всех государственных проектов с 2016 года. Норвегия, Финляндия и Дания приняли национальные требования к BIM для государственного сектора начиная с 2008 года. Сингапур с 2015 года требует подавать документацию в формате BIM для всех проектов площадью более 5 000 м².»",
          ],
          source: [
            { text: "Источник:", href: BCA },
            " UK BIM Framework / HM Government; Statsbygg Norway; Building and Construction Authority Singapore (BCA)",
          ],
        },
        {
          kind: "p",
          text: [
            "Девелоперский проект — это десятки команд, которые работают одновременно: архитекторы, конструкторы, специалисты по вентиляции, электрике и сантехнике. В традиционной модели каждое направление готовит свою документацию, а согласование идёт потом — наложением чертежей. Конфликты между системами всплывают на стройке, где их устранение обходится дороже всего.",
          ],
        },
        {
          kind: "p",
          text: [
            "ENSŌ Development исключила этот риск из проектирования, перейдя на технологию BIM. Все дисциплины работают в одной цифровой модели, которая обновляется в реальном времени. Когда инженер меняет элемент конструкции, архитектор и специалист по инженерным системам сразу видят последствия. Ошибки согласования находят и устраняют на этапе проекта, а не на стройке.",
          ],
        },
        {
          kind: "p",
          text: [
            "Польза не заканчивается на строительстве. Единая цифровая модель работает весь жизненный цикл здания — от проектирования и строительства до эксплуатации и обслуживания. Каждый элемент комплекса описан в цифровом виде и доступен для будущих работ, модернизации или технической экспертизы. Такая непрерывность информации означает более обоснованные решения и более низкие расходы на эксплуатацию в долгосрочной перспективе.",
          ],
        },
        {
          kind: "p",
          text: [
            "Для покупателя BIM означает, что сданный объект соответствует заявленному проекту. Для инвестора — предсказуемые сроки, контролируемые расходы и риски строительства, просчитанные до начала работ. А для рынка, на котором работает ENSŌ Development, — соответствие международным стандартам, по которым крупные девелоперы Великобритании, Скандинавии и Азии строят уже больше десяти лет.",
          ],
        },
        {
          kind: "p",
          text: [
            "ENSŌ Development — действующий девелопер в Республике Молдова и Румынии, сданные проекты компании превышают 500 000 м². Технология BIM входит в стандарт проектирования всех проектов компании — это структурное соответствие тому, как сегодня проектируют на зрелых рынках.",
          ],
        },
      ],
    },
    "eminescu-offices": {
      title: "ENSŌ Development завершает выход из инвестиции в Eminescu Offices",
      lead: [
        [
          "ENSŌ Development вошла в проект Eminescu Offices как инвестиционный партнёр и успешно завершает участие после продажи всех офисных помещений по целевым ценам.",
        ],
      ],
      body: [
        {
          kind: "p",
          text: [
            "Проект расположен в одном из самых престижных районов столицы. Улица Михая Эминеску — в нескольких минутах от площади Великого Национального Собрания, Соборного парка и главных административных и культурных учреждений города. Это центральный район, где новых проектов почти не появляется, а недвижимость обладает высокой инвестиционной ценностью.",
          ],
        },
        {
          kind: "p",
          text: [
            "Eminescu Offices входит в комплекс Eminescu Residence — проект премиум-класса, который объединяет жильё и офисы в здании, вписанном в архитектурный контекст исторического центра. Проект выделяется архитектурой в духе неоклассики и авторскими интерьерами Arutin Art Bureau, которые придают зданию узнаваемый характер, достойный этой части города.",
          ],
        },
        {
          kind: "p",
          text: [
            "Завершив эту сделку, ENSŌ Development заканчивает участие в проекте в одном из знаковых районов Кишинёва и продолжает стратегию: участвовать в удачно расположенных проектах с архитектурной индивидуальностью и значимостью для города.",
          ],
        },
      ],
    },
    "moldova-growth-leader": {
      title: "Рекордный рост на рынке недвижимости: Молдова — №1 в Европе",
      lead: [
        [
          "По данным последнего анализа ",
          { text: "Euronews Business", href: EURONEWS },
          ", Республика Молдова занимает первое место в Европе по темпам роста стоимости недвижимости.",
        ],
        [
          "Это подтверждают данные международной платформы ",
          { text: "Nomad List", href: NOMAD_LIST },
          ", основанной технологическим предпринимателем Питером Левелсом (Pieter Levels): она относит Кишинёв к городам с лучшим соотношением цены и качества для переезда и инвестиций в недвижимость в 2025 году.",
        ],
      ],
      body: [
        {
          kind: "p",
          text: [
            "Молдова занимает новое место на карте развивающихся европейских рынков в то время, когда западные рынки переживают стагнацию, а дальновидные инвесторы переносят интерес на восток — туда, где доходность ещё не размыта перенасыщением.",
          ],
        },
        {
          kind: "quote",
          text: ["«Молдова показывает самый быстрый рост стоимости недвижимости в Европе в 2025 году»"],
          source: ["Euronews Business, май 2025"],
        },
        {
          kind: "figure",
          pictures: [rentalYields("Доходность аренды в странах Европы в 2025 году: Молдова на первом месте")],
        },
        { kind: "h2", text: "Динамика рынка: экономическое сближение и удачный момент" },
        {
          kind: "p",
          text: [
            "За последние пять лет рынок недвижимости Молдовы вошёл в цикл ускоренного роста. Его поддерживают цены, которые всё ещё ниже средних по региону, но стабильно растут; высокая доходность, особенно в премиальном сегменте аренды; растущий спрос со стороны диаспоры, местных предпринимателей и международных компаний; а также активное развитие города с проектами по стандартам WELL и международным нормам жилья.",
          ],
        },
        {
          kind: "p",
          text: [
            "Этот этап преобразований — исторический. Речь не только о росте цен, а о коренной смене инвестиционной парадигмы в Молдове.",
          ],
        },
        { kind: "h2", text: "Анализ данных: устойчивый тренд, а не временная аномалия" },
        {
          kind: "p",
          text: [
            "По данным ",
            { text: "Global Property Guide", href: GLOBAL_PROPERTY_GUIDE },
            ", в 2023 году цены на жильё в Молдове выросли на 18,2% в реальном выражении — это один из самых высоких показателей в Европе. В 2024 году рост продолжился, несмотря на мировую инфляцию и внешнюю неопределённость.",
          ],
        },
        {
          kind: "p",
          text: [
            "Эта восходящая траектория — не следствие конъюнктуры, а результат ускоренного экономического сближения на фоне стабилизации рынка, возвращения капитала диаспоры и спроса на современное, центральное и устойчивое жильё.",
          ],
        },
        {
          kind: "p",
          text: [
            "Сегодня цены приближаются к уровню рынков Центральной и Восточной Европы, что даёт явное конкурентное преимущество инвесторам, которые входят на рынок на этом этапе.",
          ],
        },
        { kind: "h2", text: "Кишинёв притягивает цифровых кочевников и мобильных профессионалов" },
        {
          kind: "p",
          text: [
            "Ещё один признак зрелости рынка — ",
            { strong: "появление нового типа городского потребителя" },
            ": цифрового кочевника. Это профессионалы, которые работают удалённо и на время селятся в доступных городах, хорошо связанных с мировыми сетями.",
          ],
        },
        {
          kind: "figure",
          pictures: [
            levelsPost("Пост Питера Левелса о местах, где растёт недвижимость"),
            levelsEurope("Список Питера Левелса: города Европы, где растёт недвижимость, Кишинёв +39%"),
          ],
        },
        {
          kind: "p",
          text: [
            "По данным ",
            { text: "Nomad List", href: NOMAD_LIST },
            ", в последние годы Кишинёв стал центром притяжения для предпринимателей со всего мира и IT-специалистов на удалёнке — благодаря низкой стоимости жизни, развитой IT-инфраструктуре, дружелюбной администрации и общему качеству городской среды.",
          ],
        },
        {
          kind: "p",
          text: [
            "Такие профессионалы предпочитают меблированную аренду на средний и долгий срок — и это повысило спрос на современные городские квартиры в центре, с умными системами и удобной доступностью. Для инвесторов это означает стабильный доход в сегменте долгосрочной аренды.",
          ],
        },
        { kind: "h2", text: "Инвестиционная возможность: момент — сейчас" },
        {
          kind: "p",
          text: [
            "Без избытка предложения и при устойчивом спросе как внутри страны, так и из-за рубежа Молдова остаётся одним из немногих европейских рынков в фазе явного роста. Это «раннее окно» для капитала, который ищет защиту, доходность и потенциал роста в регулируемой и предсказуемой среде.",
          ],
        },
      ],
    },
  },
};

/* an article's words as plain text, for its page's description */
export const plainText = (parts: readonly Inline[]) =>
  parts
    .map((part) =>
      typeof part === "string" ? part : "text" in part ? part.text : part.strong,
    )
    .join("");

export const isArticleId = (value: string): value is ArticleId =>
  (articleIds as readonly string[]).includes(value);

/* where the journal lives in each language; an article is /<that>/<id> */
export const journalPath: Record<Locale, string> = {
  ro: "/journal",
  ru: "/ru/journal",
  en: "/en/journal",
};

/* the language menus of an article's page lead to the same article in the
   other languages */
export const articleLanguages = (id: ArticleId) =>
  [
    { code: "ro", name: "Română", href: `${journalPath.ro}/${id}` },
    { code: "ru", name: "Русский", href: `${journalPath.ru}/${id}` },
    { code: "en", name: "English", href: `${journalPath.en}/${id}` },
  ] as const;
