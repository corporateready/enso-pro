"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./aurora-video.module.css";

/*
 * Desktop background of the hero's third slide: the Figma "BLUE ANIMATION"
 * (node 110:295) exactly as Figma renders it, recorded from the prototype of
 * "EN hero desktop 3" (1284:4102) and looped: "ENSO tulip1" -> "ENSO tulip2"
 * in 6s, back in 3s, both ease-out.
 *
 * The petals alone can be rebuilt in CSS (the phone version does), but the
 * rainbow fringes Figma draws where the blurred petals overlap exist only in
 * its renderer, so a recording is the one way to have them sweep with the
 * petals as they do in Figma. The frame's texts, button and header were
 * painted out of the recording; the page draws its own on top.
 */
export function AuroraVideo({ active }: { active: boolean }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // The desktop carousel is in the DOM on phones too, only hidden: never
    // fetch the video there.
    const mediaQuery = window.matchMedia("(min-width: 641px)");
    const update = () => setEnabled(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (active && !reducedMotion) {
      // Start from "tulip1" every time the slide arrives, as the phone does.
      video.muted = true;
      video.currentTime = 0;
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [active, enabled]);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element -- the first
          frame, shown until the video plays and for reduced motion */}
      <img
        className={styles.frame}
        src="/hero-aurora-desktop.webp"
        alt=""
        aria-hidden="true"
        decoding="async"
        loading="lazy"
      />
      {enabled && (
        <video
          ref={videoRef}
          className={styles.frame}
          muted
          playsInline
          loop
          preload="auto"
          poster="/hero-aurora-desktop.webp"
          aria-hidden="true"
          tabIndex={-1}
          disablePictureInPicture
        >
          <source src="/hero-aurora-desktop.webm" type="video/webm" />
          <source src="/hero-aurora-desktop.mp4" type="video/mp4" />
        </video>
      )}
    </>
  );
}
