import { accountHandoverScript } from "./components/account-handover";
import { menuHandoverScript } from "./components/menu-handover";
import ScrollReveal from "./components/motion/scroll-reveal";
import { settlePageScaleScript } from "./components/page-scale";
import "./globals.css";

/*
 * The document the languages share. Each language has its own root layout
 * (app/(ro), app/(en), app/(ru)) so that <html lang> says what the page is
 * written in: one layout for all had the Romanian page declared English.
 * The layout also hands over its Inter (app/fonts): the Russian page's
 * preloads the Cyrillic file, the others' do not.
 */
export default function RootDocument({
  lang,
  fontVariable,
  children,
}: {
  lang: "ro" | "en" | "ru";
  /* the class of the layout's Inter that sets --font-inter */
  fontVariable: string;
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning: the script below may mark <html> before React
    // has seen it
    <html
      lang={lang}
      className={`${fontVariable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* keep the menu and the account's dialog open through a change of
            language, see components/menu-handover.ts and
            components/account-handover.ts */}
        <script dangerouslySetInnerHTML={{ __html: menuHandoverScript }} />
        <script dangerouslySetInnerHTML={{ __html: accountHandoverScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        {/* one scale for the page from the first paint, see
            components/page-scale.ts */}
        <script dangerouslySetInnerHTML={{ __html: settlePageScaleScript }} />
        {children}
        <ScrollReveal />
      </body>
    </html>
  );
}
