/*
 * The personal account's dialog stays open through a change of language, as
 * the menu does (menu-handover.ts). A language chosen in the dialog loads
 * the other language's page, a full page load, and the dialog used to be
 * lost on the way: the visitor had to find the account icon again.
 *
 * The page being left writes down when the choice was made and whether the
 * dialog was signing in or signing up. The page being loaded reads that in
 * a script in its <head>, before anything is painted, and marks <html>,
 * which draws its dialog open (account-modal.module.css: the dialog is on
 * every page, out of sight until opened). Once the header's code is running
 * it opens the dialog in earnest and the mark comes off.
 */

export type AccountMode = "signin" | "signup";

const KEY = "enso-account-open";
const ATTRIBUTE = "data-account-open";
// A note older than this is not from the load in progress (the link was
// opened in another tab, the load failed): the dialog stays closed.
const FRESH_MS = 15000;

export function keepAccountOpenOnNextPage(mode: AccountMode) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify({ mode, at: Date.now() }));
  } catch {
    // no storage (private mode): the next page opens with its dialog closed
  }
}

/* The dialog's mode if this page was loaded from it, else null. Reads the
   note once. */
export function takeAccountHandover(): AccountMode | null {
  try {
    const note = JSON.parse(sessionStorage.getItem(KEY) ?? "null");

    sessionStorage.removeItem(KEY);

    if (!note || !(Date.now() - note.at < FRESH_MS)) return null;

    return note.mode === "signup" ? "signup" : "signin";
  } catch {
    return null;
  }
}

export function endAccountHandover() {
  document.documentElement.removeAttribute(ATTRIBUTE);
}

export const accountHandoverScript = `(function(){try{var n=JSON.parse(sessionStorage.getItem("${KEY}"));if(n&&Date.now()-n.at<${FRESH_MS})document.documentElement.setAttribute("${ATTRIBUTE}","")}catch(e){}})()`;
