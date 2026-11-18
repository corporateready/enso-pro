// The team as the Romanian page shows it, three to a page.

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
      name: "Viorel Benderschi, MBA",
      role: "Cofondator",
      years: "27 de ani în investiții și finanțe",
      about: "A dezvoltat proiecte pentru NCH Capital, ZORILE și ARTIMA.",
    },
    {
      name: "Maxim Dumbrava",
      role: "Partener director",
      years: "16 ani în dezvoltare imobiliară",
      about:
        "A coordonat Diplomat Club, ARTIMA Business & Lifestyle, NEWTON HOUSE și ENSO LIVING Brașov.",
      imageSrc: "/team-avatar-2.webp",
    },
    {
      name: "Denis Vasiliev",
      role: "Marketing, vânzări și IT",
      years: "12 ani",
      about:
        "Strategii pentru proiecte însumând peste 3 000 de apartamente și 20 000 m² de birouri.",
      imageSrc: "/team-avatar-3.webp",
    },
  ],
  [
    {
      name: "Vladimir Ostrovoi",
      role: "Arhitectură, managementul proiectelor",
      years: "18 ani",
      about:
        "Dezvoltări rezidențiale, comerciale și culturale, inclusiv pentru Administrația Prezidențială a Republicii Moldova.",
      imageSrc: "/team-avatar-5.webp",
    },
    {
      name: "Zinaida Dumbrava",
      role: "Relații cu clienți",
      years: "20 de ani",
      about:
        "Două decenii de experiență în managementul relațiilor cu clienții.",
      imageSrc: "/team-avatar-4.webp",
    },
    {
      name: "Vitalie Șeremet",
      role: "Managementul construcțiilor, administrarea condominiilor",
      years: "20 de ani",
      about: "Economist; a condus echipe de până la 800 de angajați.",
    },
  ],
];
