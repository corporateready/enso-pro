"use client";

import { useSyncExternalStore } from "react";

// true where the site is laid out for phones (the stylesheets' max-width:
// 640px); false on the server and in the first render, so the markup sent is
// the desktop's and a phone switches over once the page is live
const phoneQuery = "(max-width: 640px)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(phoneQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

export function usePhoneLayout() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(phoneQuery).matches,
    () => false,
  );
}
