/*
 * The offer dialog shows the picture of the slide whose button opened it
 * (asked 2026-11-27): ENSO CITY's courtyard from the first slide, ENSO
 * LIVING's building from the second. Both are squares cut from the slides'
 * own desktop pictures: offer-modal-photo-city.webp is x 2000–6232 of
 * hero-slide-second-desktop-bg.avif (7680 × 4232: the sun, the courtyard and
 * the near balconies), offer-modal-photo.webp the LIVING building on its
 * rock. One list for the three languages.
 */
export type OfferPhoto = "city" | "living";

export const offerPhotoSrc: Record<OfferPhoto, string> = {
  city: "/offer-modal-photo-city.webp",
  living: "/offer-modal-photo.webp",
};
