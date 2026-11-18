import type { Metadata } from "next";
import { inter } from "../fonts/latin";
import RootDocument from "../root-document";

export const metadata: Metadata = {
  title: "ENSO DEVELOPMENT",
  description: "Proiect premium cu vedere spre Carpați",
};

export default function RomanianLayout({ children }: LayoutProps<"/">) {
  return <RootDocument lang="ro" fontVariable={inter.variable}>{children}</RootDocument>;
}
