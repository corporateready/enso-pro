import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PartnersVariants from "../../components/partners-variants";

export const metadata: Metadata = {
  title: "ENSO · parteneri, variante",
  robots: { index: false, follow: false },
};

// Ways to set the partner cards, for the client to choose from. A working
// page: it is there on the dev server only, a 404 in a build.
export default function PartnersVariantsPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return <PartnersVariants />;
}
