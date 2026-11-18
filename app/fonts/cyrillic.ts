import { Inter } from "next/font/google";

// The Russian page's Inter: the Cyrillic file is preloaded as well, so its
// text does not show in the fallback font first. It is a module of its own
// (and not a second font in fonts/latin.ts) so that only the Russian page
// preloads it. The Latin files stay: ENSŌ, the project names and BIM are
// set in Latin there too.
export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext", "cyrillic"],
});
