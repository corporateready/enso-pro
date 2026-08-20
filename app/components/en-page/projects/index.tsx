import Image from "next/image";

import ProjectsScroller from "../../projects-scroller";
import styles from "./projects.module.css";

const projects = [
  {
    id: "enso-estate",
    src: "/projects-slide-1.webp",
    desktopSrc: "/enso-estate-project.avif",
    name: "ENSO ESTATE",
    location: "Chisinau, Moldova",
    status: "Starting soon",
    statusTone: "green" as const,
    imageAlt: "Enso Estate residential complex",
  },
  {
    id: "enso-living",
    src: "/projects-slide-2.webp",
    desktopSrc: "/enso-living-project.avif",
    name: "ENSO LIVING",
    location: "Brasov, Romania",
    status: "Under construction",
    statusTone: "light" as const,
    imageAlt: "Enso Living mixed-use development",
  },
  {
    id: "artima",
    src: "/projects-slide-3.webp",
    desktopSrc: "/artima-project.avif",
    name: "ARTIMA\nBusiness & Lifestyle",
    location: "Chisinau, Moldova",
    status: "Ready to move in",
    statusTone: "light" as const,
    imageAlt: "Artima Business and Lifestyle building",
  },
] as const;

export default function Projects() {
  return (
    <section id="projects" className={styles.section} aria-labelledby="projects-title">
      <div className={styles.inner}>
        <h2 id="projects-title" className={styles.title}>
          OUR PROJECTS
        </h2>

        <ProjectsScroller
          itemCount={projects.length}
          scrollerClassName={styles.scroller}
          trackClassName={styles.track}
          scrollbarClassName={styles.scrollbar}
          thumbClassName={styles.scrollbarThumb}
        >
          {projects.map((project) => (
              <article id={project.id} className={styles.card} key={project.id}>
                <div className={styles.media}>
                  <Image
                    className={`${styles.sourceImage} ${styles.mobileImage}`}
                    src={project.src}
                    fill
                    sizes="(max-width: 640px) 68vw, 13.81vw"
                    quality={100}
                    alt={project.imageAlt}
                  />
                  <Image
                    className={`${styles.sourceImage} ${styles.desktopImage}`}
                    src={project.desktopSrc}
                    fill
                    unoptimized
                    sizes="(min-width: 641px) 36vw, 1px"
                    quality={100}
                    alt={project.imageAlt}
                  />
                  <span
                    className={`${styles.status} ${
                      project.statusTone === "green" ? styles.statusGreen : ""
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                <a className={styles.details} href="#request-offer">
                  <span className={styles.projectCopy}>
                    <span className={styles.projectName}>
                      {project.name.split("\n").map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </span>
                    <span className={styles.location}>{project.location}</span>
                  </span>

                  <svg
                    className={styles.arrow}
                    viewBox="0 0 14 26"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d="M1 1L13 13L1 25" stroke="currentColor" />
                  </svg>
                  <span className={styles.visuallyHidden}>
                    Learn more about {project.name.replace("\n", " ")}
                  </span>
                </a>
              </article>
          ))}
        </ProjectsScroller>
      </div>
    </section>
  );
}
