import type { Metadata } from "next";
import { notFound } from "next/navigation";

import MyEnsoVariants from "../../components/my-enso-variants";

export const metadata: Metadata = {
  title: "ENSO · MY ENSO, variante",
  robots: { index: false, follow: false },
};

// Colours for the cabinet on the MY ENSO block's screens, for the client to
// choose from. A working page: it is there on the dev server only, a 404 in
// a build.
export default function MyEnsoVariantsPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return <MyEnsoVariants />;
}
