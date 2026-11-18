import { Inter } from "next/font/google";

// latin-ext carries ă, ș, ț and the Ō of ENSŌ. Listed as a subset it is
// preloaded with the rest; left out, those letters showed in the fallback
// font first and jumped once the file arrived.
export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});
