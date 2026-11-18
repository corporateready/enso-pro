import Projects from "../../components/projects";
import Testimonials from "../../components/testimonials";
import CTA from "../../components/ru-page/cta";
import Design from "../../components/ru-page/design";
import Enso from "../../components/ru-page/enso";
import Footer from "../../components/ru-page/footer";
import Hero from "../../components/ru-page/hero";
import Journal from "../../components/ru-page/journal";
import Partners from "../../components/ru-page/partners";
import Payway from "../../components/ru-page/payway";
import Since from "../../components/ru-page/since";
import Team from "../../components/ru-page/team";
import Values from "../../components/ru-page/values";
import Why from "../../components/ru-page/why";

export default function RussianHome() {
  return (
    <div id="top" className="flex flex-col items-center w-full min-h-full">
      <main className="flex flex-col min-h-full w-full">
        <Hero />
        <Projects locale="ru" />
        <Since />
        <Payway />
        <Why />
        <Design />
        <Values />
        <Team />
        <Enso />
        <Partners />
        <Testimonials locale="ru" />
        <Journal />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
