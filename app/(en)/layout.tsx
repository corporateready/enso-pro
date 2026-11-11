import type { Metadata } from "next";
import RootDocument from "../root-document";

export const metadata: Metadata = {
  title: "ENSO DEVELOPMENT",
  description: "Premium project with Carpathian view",
};

export default function EnglishLayout({ children }: LayoutProps<"/">) {
  return <RootDocument lang="en">{children}</RootDocument>;
}
