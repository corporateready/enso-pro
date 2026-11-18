import type { Metadata } from "next";
import { inter } from "../fonts/cyrillic";
import RootDocument from "../root-document";

export const metadata: Metadata = {
  title: "ENSO DEVELOPMENT",
  description: "Премиальный проект с видом на Карпаты",
};

export default function RussianLayout({ children }: LayoutProps<"/">) {
  return (
    <RootDocument lang="ru" fontVariable={inter.variable}>
      {children}
    </RootDocument>
  );
}
