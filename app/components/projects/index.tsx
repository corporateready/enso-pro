import Image from "next/image";

import { revealDelay } from "../motion/reveal";
import ProjectsScroller from "../projects-scroller";
import styles from "./projects.module.css";

/*
 * The featured projects block, one for all the languages, with photo-first
 * cards the client chose over Figma's white frames: all three projects in one
 * row on a desktop, the same cards in the swipe row on a phone. The photo
 * fills the card, the status is a small pill on it, and the name sits under
 * it with the city and the kind of project ("\n" breaks a name: ARTIMA's
 * brand is the whole "ARTIMA Business & Lifestyle"). ARTIMA's card opens its
 * site (PROJECT_SITES); the others lead nowhere yet. The title is the
 * client's in place of Figma's "Our projects"; on a phone it keeps to one
 * line, so a new one has to fit 360 wide at 32px.
 */

type Tone = "soon" | "building" | "done";

// Inter's left side bearing (em) of each capital a name or a city opens
// with: a line pulled left by its own puts the letter's ink, not its glyph
// box, on the photo's edge (an E stood 3.7 off it at 42px, a C 1.3 at 21px)
const SIDE_BEARINGS: Record<string, number> = {
  A: 0.0254,
  B: 0.0879,
  C: 0.0596,
  E: 0.0879,
  // Cyrillic: the upright stems of Б and К stand where B's and E's do
  Б: 0.0879,
  К: 0.0879,
};

// The projects with a site of their own: the card opens it in a new tab.
// The others have no page yet.
const PROJECT_SITES: Record<string, string | undefined> = {
  artima: "https://artima.md/",
};

function onPhotoEdge(line: string) {
  return { marginLeft: `${-(SIDE_BEARINGS[line[0]] ?? 0)}em` };
}

const content = {
  ro: {
    title: "PROIECTE SELECTATE",
    projects: [
      {
        id: "enso-estate",
        src: "/projects-slide-1.webp",
        name: "ENSO ESTATE",
        meta: "Chișinău, Moldova · Rezidențial",
        status: "În curând",
        tone: "soon",
      },
      {
        id: "enso-living",
        src: "/projects-slide-2.webp",
        name: "ENSO LIVING",
        meta: "Brașov, Romania · Multifuncțional",
        status: "În construcție",
        tone: "building",
      },
      {
        id: "artima",
        src: "/projects-slide-3.webp",
        name: "ARTIMA\nBusiness & Lifestyle",
        meta: "Chișinău, Moldova",
        status: "Finalizat",
        tone: "done",
      },
    ],
  },
  ru: {
    title: "ИЗБРАННЫЕ ПРОЕКТЫ",
    projects: [
      {
        id: "enso-estate",
        src: "/projects-slide-1.webp",
        name: "ENSO ESTATE",
        meta: "Кишинёв · Жилой комплекс",
        status: "Скоро старт",
        tone: "soon",
      },
      {
        id: "enso-living",
        src: "/projects-slide-2.webp",
        name: "ENSO LIVING",
        meta: "Брашов · Многофункциональный",
        status: "Строится",
        tone: "building",
      },
      {
        id: "artima",
        src: "/projects-slide-3.webp",
        name: "ARTIMA\nBusiness & Lifestyle",
        meta: "Кишинёв",
        status: "Сдан",
        tone: "done",
      },
    ],
  },
  en: {
    title: "FEATURED PROJECTS",
    projects: [
      {
        id: "enso-estate",
        src: "/projects-slide-1.webp",
        name: "ENSO ESTATE",
        meta: "Chisinau, Moldova · Residential",
        status: "Starting soon",
        tone: "soon",
      },
      {
        id: "enso-living",
        src: "/projects-slide-2.webp",
        name: "ENSO LIVING",
        meta: "Brasov, Romania · Mixed-use",
        status: "Under construction",
        tone: "building",
      },
      {
        id: "artima",
        src: "/projects-slide-3.webp",
        name: "ARTIMA\nBusiness & Lifestyle",
        meta: "Chisinau, Moldova",
        status: "Ready to move in",
        tone: "done",
      },
    ],
  },
} as const satisfies Record<
  string,
  {
    title: string;
    projects: readonly {
      id: string;
      src: string;
      name: string;
      meta: string;
      status: string;
      tone: Tone;
    }[];
  }
>;

export default function Projects({ locale }: { locale: "ro" | "ru" | "en" }) {
  const text = content[locale];

  return (
    <section
      id="projects"
      className={styles.section}
      aria-labelledby="projects-title"
    >
      <h2 id="projects-title" className={styles.title} data-reveal>
        {text.title}
      </h2>

      <ProjectsScroller
        itemCount={text.projects.length}
        scrollerClassName={styles.scroller}
        trackClassName={styles.track}
        scrollbarClassName={styles.scrollbar}
        thumbClassName={styles.scrollbarThumb}
      >
        {text.projects.map((project, index) => (
          <article
            id={project.id}
            className={styles.card}
            key={project.id}
            data-reveal
            style={revealDelay(index * 100)}
          >
            <a
              className={styles.link}
              href={PROJECT_SITES[project.id] ?? "#request-offer"}
              {...(PROJECT_SITES[project.id] && {
                target: "_blank",
                rel: "noopener noreferrer",
              })}
            >
              <span className={styles.photo}>
                {/* the name below says what it shows */}
                <Image
                  className={styles.image}
                  src={project.src}
                  fill
                  sizes="(max-width: 640px) 77vw, 27vw"
                  quality={90}
                  alt=""
                />
                <span className={`${styles.status} ${styles[project.tone]}`}>
                  {project.status}
                </span>
              </span>

              <span className={styles.caption}>
                <span className={styles.copy}>
                  <span className={styles.name}>
                    {project.name.split("\n").map((line) => (
                      <span key={line} style={onPhotoEdge(line)}>
                        {line}
                      </span>
                    ))}
                  </span>
                  <span className={styles.meta} style={onPhotoEdge(project.meta)}>
                    {project.meta}
                  </span>
                </span>
                <span className={styles.arrow} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 12h15M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </span>
              </span>
            </a>
          </article>
        ))}
      </ProjectsScroller>
    </section>
  );
}
