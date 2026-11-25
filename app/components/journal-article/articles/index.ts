import type { ArticleText, Locale } from "../content";
import * as archimatikaPartnership from "./archimatika-partnership";
import * as artimaBusinessLifestyleOpening from "./artima-business-lifestyle-opening";
import * as azimutCopouExit from "./azimut-copou-exit";
import * as brasovMixedUseAcquisition from "./brasov-mixed-use-acquisition";
import * as carpathiaBrasovInvestment from "./carpathia-brasov-investment";
import * as cucorilorTenderChisinau from "./cucorilor-tender-chisinau";
import * as diminetiiIasiInvestment from "./diminetii-iasi-investment";
import * as ensoLivingConstructionStart from "./enso-living-construction-start";
import * as iasiCicoareiResidential from "./iasi-cicoarei-residential";
import * as newtonHouseSoldOut from "./newton-house-sold-out";

/*
 * The articles added after the first three (whose words are in
 * ../content.ts): one file each, its Romanian and English from the content
 * team's Google Docs (ClickUp «Text Articol | …»), its Russian ours
 * (2026-11-24). content.ts joins them to the rest; their cards are in
 * ../catalog.ts.
 */

type ArticleModule = { texts: Record<Locale, ArticleText> };

const modules: Record<string, ArticleModule> = {
  "cucorilor-tender-chisinau": cucorilorTenderChisinau,
  "iasi-cicoarei-residential": iasiCicoareiResidential,
  "carpathia-brasov-investment": carpathiaBrasovInvestment,
  "azimut-copou-exit": azimutCopouExit,
  "diminetii-iasi-investment": diminetiiIasiInvestment,
  "newton-house-sold-out": newtonHouseSoldOut,
  "artima-business-lifestyle-opening": artimaBusinessLifestyleOpening,
  "enso-living-construction-start": ensoLivingConstructionStart,
  "brasov-mixed-use-acquisition": brasovMixedUseAcquisition,
  "archimatika-partnership": archimatikaPartnership,
};

export const textsIn = (locale: Locale): Record<string, ArticleText> =>
  Object.fromEntries(
    Object.entries(modules).map(([id, module]) => [id, module.texts[locale]]),
  );
