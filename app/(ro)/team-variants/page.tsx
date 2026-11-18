import type { Metadata } from "next";
import { notFound } from "next/navigation";

import TeamVariants from "../../components/team-variants";

export const metadata: Metadata = {
  title: "ENSO · echipa, variante",
  robots: { index: false, follow: false },
};

// Six ways to set the team block, for the client to choose from. A working
// page: it is there on the dev server only, a 404 in a build.
export default function TeamVariantsPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return <TeamVariants />;
}
