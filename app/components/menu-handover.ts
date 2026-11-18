/*
 * A language chosen in the open menu loads the other language's page, and
 * each language is a document of its own (app/(ro), app/(en)), so that is a
 * full page load. The menu used to close first: the visitor was dropped onto
 * the page, and its logo blinked as the menu faded and the page came up.
 *
 * Now the menu stays open through the load. The page being left writes down
 * when the choice was made; the one being loaded reads that in a script in
 * its <head>, before anything is painted, and marks <html>, which the menu's
 * CSS draws as open (mobile-menu.module.css). Once the menu's own code is
 * running it takes over and the mark comes off.
 */

const KEY = "enso-menu-open";
const ATTRIBUTE = "data-menu-open";
// A note older than this is not from the load in progress (the link was
// opened in another tab, the load failed): the menu stays closed.
const FRESH_MS = 15000;

export function keepMenuOpenOnNextPage() {
  try {
    sessionStorage.setItem(KEY, String(Date.now()));
  } catch {
    // no storage (private mode): the next page opens with its menu closed
  }
}

/* Whether this page was loaded from an open menu. Reads the note once. */
export function takeMenuHandover() {
  try {
    const writtenAt = Number(sessionStorage.getItem(KEY));

    sessionStorage.removeItem(KEY);

    return Date.now() - writtenAt < FRESH_MS;
  } catch {
    return false;
  }
}

export function endMenuHandover() {
  document.documentElement.removeAttribute(ATTRIBUTE);
}

export const menuHandoverScript = `(function(){try{var t=Number(sessionStorage.getItem("${KEY}"));if(Date.now()-t<${FRESH_MS})document.documentElement.setAttribute("${ATTRIBUTE}","")}catch(e){}})()`;
