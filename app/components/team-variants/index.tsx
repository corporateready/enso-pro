"use client";

import Image from "next/image";
import { Fragment, useRef, useState } from "react";

import Team from "../ro-page/team";
import block from "./block.module.css";
import { teamSlides, type TeamMember } from "./members";
import styles from "./team-variants.module.css";

/*
 * The team block as it was when the client chose (the heading on the left,
 * three members a page on the right, the dots) six times over, each with the
 * members' text set another way. The client took the fourth, with a larger
 * name, and the block on the site has moved on; so the page keeps its own
 * copy of the block's stylesheet and data as they were (block.module.css,
 * members.ts), and shows the site's block of today first. The notes over
 * each are the client's, in Russian. Not part of the site: see
 * app/(ro)/team-variants.
 */

type Variant = "now" | "v1" | "v2" | "v3" | "v4" | "v5" | "v6";

const variants: readonly { id: Variant; title: string; note: string }[] = [
  {
    id: "now",
    title: "Прежний вид",
    note: "Каким блок был до выбора: имя, должность серыми заглавными, ниже стаж и одно предложение.",
  },
  {
    id: "v1",
    title: "Стаж синим",
    note: "Всё как сейчас, но строка со стажем выделена фирменным синим и полужирным.",
  },
  {
    id: "v2",
    title: "Стаж крупной цифрой",
    note: "Число лет вынесено справа крупно, под ним подпись. Должность чуть меньше.",
  },
  {
    id: "v3",
    title: "Должность мелкими заглавными",
    note: "Имя главное, должность мельче и с разрядкой. Длинные должности занимают меньше места.",
  },
  {
    id: "v4",
    title: "Должность и стаж одной строкой",
    note: "Как в присланном тексте: «Cofondator · 27 de ani în investiții și finanțe», мелкими заглавными.",
  },
  {
    id: "v5",
    title: "Стаж над именем",
    note: "Стаж стоит маленькой синей строкой над именем, под именем должность и текст.",
  },
  {
    id: "v6",
    title: "С линиями",
    note: "Всё как сейчас, между людьми тонкие линии.",
  },
];

// "27 de ani în investiții și finanțe": the figure, and what follows it
const figure = (years: string) => {
  const [, count = "", rest = ""] = years.match(/^(\d+)\s+(.*)$/) ?? [];
  return { count, rest };
};

function Photo({ member }: { member: TeamMember }) {
  if (!member.imageSrc) {
    return <span className={block.photoPlaceholder} aria-hidden="true" />;
  }

  return (
    <span className={block.photo}>
      <Image
        className={block.avatarImage}
        src={member.imageSrc}
        fill
        alt={`Portretul lui ${member.name}`}
        unoptimized
      />
    </span>
  );
}

function Member({ member, variant }: { member: TeamMember; variant: Variant }) {
  const joined = variant === "v4";
  const roleLines = joined
    ? [`${member.role.replace(/\n/g, " ")} · ${member.years}`]
    : member.role.split("\n");
  // where the years are not in the small text, it is the sentence alone
  const yearsElsewhere = joined || variant === "v2" || variant === "v5";
  const { count, rest } = figure(member.years);

  return (
    <article className={`${block.member} ${styles.row}`}>
      <Photo member={member} />
      <div className={block.memberContent}>
        {variant === "v5" && <p className={styles.eyebrow}>{member.years}</p>}
        <h3>{member.name}</h3>
        <p
          className={`${block.role} ${styles.role} ${
            member.longRole && !joined ? `${block.roleLong} ${styles.roleLong}` : ""
          }`}
        >
          {roleLines.map((line, index) => (
            <Fragment key={index}>
              {index > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </p>
        <p className={block.description}>
          {!yearsElsewhere && (
            <span className={`${block.years} ${styles.years}`}>{member.years}</span>
          )}
          <span className={block.about}>{member.about}</span>
        </p>
      </div>
      {variant === "v2" && (
        <p className={styles.figure}>
          <strong>{count}</strong>
          <span>{rest}</span>
        </p>
      )}
    </article>
  );
}

function Block({ variant }: { variant: Variant }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const scrollToSlide = (index: number) => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    viewport.scrollTo({ left: viewport.clientWidth * index, behavior: "smooth" });
    setActiveSlide(index);
  };

  const updateActiveSlide = () => {
    const viewport = viewportRef.current;
    if (!viewport || viewport.clientWidth === 0) return;

    setActiveSlide(
      Math.min(
        teamSlides.length - 1,
        Math.max(0, Math.round(viewport.scrollLeft / viewport.clientWidth)),
      ),
    );
  };

  return (
    <section
      className={`${block.section} ${styles[variant]}`}
      aria-labelledby={`team-${variant}-title`}
    >
      <div className={block.inner}>
        <header className={block.header}>
          <h2 id={`team-${variant}-title`} className={block.title}>
            ECHIPA NOASTRĂ
          </h2>
          <p className={block.intro}>
            Gestionăm întregul parcurs in-house — teren,{" "}
            <br />
            proiectare, construcție, vânzări, administrarea{" "}
            <br />
            activelor.
          </p>
          <p className={block.introSecondary}>
            O singură echipă, un singur standard,{" "}
            <br />
            responsabilitate completă de la prima schiță{" "}
            <br />
            până la predarea finală.
          </p>
        </header>

        <div className={block.pagination} aria-label="Paginile echipei">
          {teamSlides.map((_, index) => (
            <button
              className={`${block.dot} ${activeSlide === index ? block.dotActive : ""}`}
              key={index}
              type="button"
              onClick={() => scrollToSlide(index)}
              aria-label={`Afișează pagina echipei ${index + 1}`}
              aria-current={activeSlide === index ? "true" : undefined}
            />
          ))}
        </div>

        <div ref={viewportRef} className={block.viewport} onScroll={updateActiveSlide}>
          <div className={block.track}>
            {teamSlides.map((members, slideIndex) => (
              <div className={`${block.slide} ${styles.slide}`} key={slideIndex}>
                {members.map((member) => (
                  <Member member={member} variant={variant} key={member.name} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function TeamVariants() {
  return (
    <main className={styles.page}>
      <div className={styles.top}>
        <p className={styles.topTitle}>Блок команды: варианты</p>
        <p className={styles.topNote}>
          Сверху блок, как он стоит на главной: с 26 ноября на десктопе открыты
          все шесть человек (вариант с митинга 25 ноября). Ниже прежние шесть
          вариантов подачи текста.
        </p>
        <nav className={styles.topLinks} aria-label="Варианты">
          <a href="#live">На главной сейчас</a>
          {variants.map(({ id, title }, index) => (
            <a key={id} href={`#${id}`}>
              {index === 0 ? title : `${index}. ${title}`}
            </a>
          ))}
        </nav>
      </div>

      <div id="live" className={styles.tag}>
        <strong>На главной сейчас</strong>
        <span>
          Выбранный вариант 4 с крупным именем и мелким текстом под ним; на
          десктопе все шесть открыты, на телефоне по три с листанием. Это сам
          блок с главной страницы.
        </span>
      </div>
      <Team />

      {variants.map(({ id, title, note }, index) => (
        <Fragment key={id}>
          <div id={id} className={styles.tag}>
            <strong>{index === 0 ? title : `Вариант ${index}. ${title}`}</strong>
            <span>{note}</span>
          </div>
          <Block variant={id} />
        </Fragment>
      ))}
    </main>
  );
}
