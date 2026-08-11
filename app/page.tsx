import CTA from "./components/ro-page/cta";
import Design from "./components/ro-page/design";
import Enso from "./components/ro-page/enso";
import Footer from "./components/ro-page/footer";
import Hero from "./components/ro-page/hero";
import Journal from "./components/ro-page/journal";
import Partners from "./components/ro-page/partners";
import Payway from "./components/ro-page/payway";
import Projects from "./components/ro-page/projects";
import Since from "./components/ro-page/since";
import Team from "./components/ro-page/team";
import Values from "./components/ro-page/values";
import Why from "./components/ro-page/why";

export default function RomanianHome() {
  return (
    <div id="top" className="flex flex-col items-center w-full min-h-full">
      <main className="flex flex-col min-h-full w-full">
        <Hero />
        <Projects />
        <Since />
        <Payway />
        <Why />
        <Design />
        <Values />
        <Team />
        <Enso />
        <Partners />
        <Journal />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
