"use client";

import Image from "next/image";
import { Fragment, useState } from "react";

import LanguageMenu, { type LanguageCode, type LanguageMenuLook } from "./index";
import styles from "./examples.module.css";

/*
 * The language menu for three languages (RO, RU, EN) in three looks, each
 * shown open in the site's header: on a computer and on a phone, over the
 * hero's picture and on the white bar the header turns into once the page
 * moves. The bars are drawn to the header's measurements; the menus are
 * live (a press on the code closes and opens one, a press on a language
 * changes the code and closes the menu). The notes are the client's, in Russian. Not part of
 * the site: see app/(ro)/language-menu.
 */

type Tone = "onPicture" | "onWhite";

const looks: readonly { id: LanguageMenuLook; title: string; note: string }[] = [
  {
    id: "names",
    title: "Список с названиями (советую)",
    note: "В шапке код текущего языка со стрелкой. По нажатию открывается карточка: код и название на самом языке, текущий отмечен галочкой.",
  },
  {
    id: "codes",
    title: "Короткий список кодов",
    note: "То же, но в карточке только три кода. Места занимает меньше, зато человеку надо знать, что значит RU или EN.",
  },
  {
    id: "row",
    title: "Коды выезжают в строку",
    note: "Без карточки: по нажатию два других кода выезжают слева от текущего прямо в шапке, соседние элементы сдвигаются.",
  },
];

function AccountIcon() {
  return (
    <svg className={styles.accountIcon} viewBox="0 0 19 21" fill="none" aria-hidden="true">
      <path
        d="M18.5 20.5C18.5 17.4318 14.4706 14.9444 9.5 14.9444C4.52944 14.9444 0.5 17.4318 0.5 20.5M9.5 11.6111C6.3934 11.6111 3.875 9.12381 3.875 6.05556C3.875 2.98731 6.3934 0.5 9.5 0.5C12.6066 0.5 15.125 2.98731 15.125 6.05556C15.125 9.12381 12.6066 11.6111 9.5 11.6111Z"
        stroke="currentColor"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Burger() {
  return (
    <span className={styles.burger} aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

function Logo() {
  return (
    <Image className={styles.logo} src="/black-logo.svg" width={75} height={25} alt="" />
  );
}

function Menu({ look, tone }: { look: LanguageMenuLook; tone: Tone }) {
  const [current, setCurrent] = useState<LanguageCode>("ro");

  return (
    <LanguageMenu
      look={look}
      tone={tone}
      current={current}
      onChoose={setCurrent}
      defaultOpen
      pinned
    />
  );
}

// the desktop header, 1920 wide
function DesktopBar({ look, tone }: { look: LanguageMenuLook; tone: Tone }) {
  return (
    <div className={`${styles.stage} ${styles.desktop} ${styles[tone]} ${styles[look]}`}>
      {tone === "onPicture" && (
        <Image
          className={styles.picture}
          src="/hero-slide-first-desktop-bg.avif"
          fill
          sizes="100vw"
          alt=""
        />
      )}
      <div className={styles.bar}>
        <Logo />
        <span className={styles.nav}>
          <span>Proiecte</span>
          <span>Istoria noastră</span>
          <span>Modalități de plată</span>
          <span>Journal</span>
          <span>Contacte</span>
        </span>
        <span className={styles.actions}>
          <span className={styles.capsule}>
            Cont personal
            <AccountIcon />
          </span>
          <Menu look={look} tone={tone} />
          <Burger />
        </span>
      </div>
    </div>
  );
}

// the phone header, 390 wide
function PhoneBar({ look, tone }: { look: LanguageMenuLook; tone: Tone }) {
  return (
    <div className={`${styles.stage} ${styles.phone} ${styles[tone]} ${styles[look]}`}>
      {tone === "onPicture" && (
        <Image
          className={styles.picture}
          src="/hero-build-first.webp"
          fill
          sizes="(min-width: 641px) 31vw, 100vw"
          alt=""
        />
      )}
      <div className={styles.bar}>
        <Logo />
        <span className={styles.actions}>
          <AccountIcon />
          <Menu look={look} tone={tone} />
          <Burger />
        </span>
      </div>
    </div>
  );
}

export default function LanguageMenuExamples() {
  return (
    <main className={styles.page}>
      <div className={styles.top}>
        <p className={styles.topTitle}>Меню языков на три языка: RO · RU · EN</p>
        <p className={styles.topNote}>
          Три примера. Каждый показан открытым в шапке сайта: на фото первого
          экрана и на белой шапке, которая появляется при прокрутке. Меню
          живые: нажатие на язык меняет код и сворачивает меню, как будет на
          сайте; нажатие на код открывает его снова. Русской страницы пока
          нет, поэтому сам сайт не переключается.
        </p>
        <nav className={styles.topLinks} aria-label="Примеры">
          {looks.map(({ id, title }, index) => (
            <a key={id} href={`#${id}`}>
              {index + 1}. {title}
            </a>
          ))}
        </nav>
      </div>

      {looks.map(({ id, title, note }, index) => (
        <Fragment key={id}>
          <div id={id} className={styles.tag}>
            <strong>
              Пример {index + 1}. {title}
            </strong>
            <span>{note}</span>
          </div>

          <p className={`${styles.caption} ${styles.desktopOnly}`}>Компьютер</p>
          <div className={styles.desktopOnly}>
            <DesktopBar look={id} tone="onPicture" />
            <DesktopBar look={id} tone="onWhite" />
          </div>

          <p className={styles.caption}>Телефон</p>
          <div className={styles.phones}>
            <PhoneBar look={id} tone="onPicture" />
            <PhoneBar look={id} tone="onWhite" />
          </div>
        </Fragment>
      ))}
    </main>
  );
}
