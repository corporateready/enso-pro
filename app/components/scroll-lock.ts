// Holds the page still while an overlay (the mobile menu or a dialog) is open.
//
// overflow: hidden on <body> alone no longer does it: <html> carries
// overflow-x: clip (see globals.css), and once the root element's overflow is
// not visible the browser stops passing body's value on to the viewport, so a
// swipe on the overlay scrolled the page underneath. Lock both elements, and
// count the locks so the menu handing over to a dialog never unlocks early.

let locks = 0;
let saved: { html: string; body: string } | null = null;

export function lockPageScroll() {
  if (locks === 0) {
    const html = document.documentElement;
    const body = document.body;

    saved = { html: html.style.overflow, body: body.style.overflow };
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
  }
  locks += 1;

  let released = false;

  return function unlockPageScroll() {
    if (released) return;
    released = true;
    locks -= 1;

    if (locks === 0 && saved) {
      document.documentElement.style.overflow = saved.html;
      document.body.style.overflow = saved.body;
      saved = null;
    }
  };
}
