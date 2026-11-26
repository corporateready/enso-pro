import type { Metadata } from "next";
import { inter } from "../fonts/latin";
import RootDocument from "../root-document";

export const metadata: Metadata = {
  title: "ENSO DEVELOPMENT",
  description: "Premium project with Carpathian views",
};

export default function EnglishLayout({ children }: LayoutProps<"/">) {
  return <RootDocument lang="en" fontVariable={inter.variable}>{children}</RootDocument>;
}
