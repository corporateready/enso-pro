import { Inter } from "next/font/google";
import ScrollReveal from "./components/motion/scroll-reveal";
import "./globals.css";

// latin-ext carries ă, ș, ț and the Ō of ENSŌ. Listed as a subset it is
// preloaded with the rest; left out, those letters showed in the fallback
// font first and jumped once the file arrived.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

/*
 * The document both languages share. Each language has its own root layout
 * (app/(ro), app/(en)) so that <html lang> says what the page is written in:
 * one layout for both had the Romanian page declared English.
 */
export default function RootDocument({
  lang,
  children,
}: {
  lang: "ro" | "en";
  children: React.ReactNode;
}) {
  return (
    <html lang={lang} className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <ScrollReveal />
      </body>
    </html>
  );
}
