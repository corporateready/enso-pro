import CTA from "../components/en-page/cta";
import Design from "../components/en-page/design";
import Enso from "../components/en-page/enso";
import Footer from "../components/en-page/footer";
import Hero from "../components/en-page/hero";
import Journal from "../components/en-page/journal";
import Partners from "../components/en-page/partners";
import Payway from "../components/en-page/payway";
import Projects from "../components/en-page/projects";
import Since from "../components/en-page/since";
import Team from "../components/en-page/team";
import Values from "../components/en-page/values";
import Why from "../components/en-page/why";

export default function EnglishHome() {
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
