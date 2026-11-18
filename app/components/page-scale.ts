/*
 * The whole site is drawn in rem, and 1rem is a share of the window's width
 * (globals.css: 100vw / 1920, or / 390 on phones). Where scrollbars are
 * always visible (Windows, a Mac with a mouse) Chrome takes the scrollbar's
 * room off 100vw, because <html> keeps that room with scrollbar-gutter:
 * stable. But the first time it works out <html>'s own style it does not
 * (Chrome 157, measured 2026-11-17): the page was first drawn at 1920 / 1920
 * and went to 1905 / 1920 the next time anything changed <html>'s style,
 * which is what locking the scroll for the menu or a dialog does. Everything
 * on the screen shrank by 0.8% at that moment: the logo and the menu's items
 * jumped a few pixels the first time the menu was opened after a load, and
 * again when a page was loaded with its menu open.
 *
 * This script runs at the top of <body>, before anything is drawn: it has
 * the browser lay the empty page out once, then changes <html>'s style, so
 * the second, right, answer is in place from the first paint. Other browsers
 * leave 100vw alone either way and lose nothing by it.
 */
export const settlePageScaleScript = `(function(){var h=document.documentElement;h.offsetWidth;h.style.setProperty("--page-scale-settled","1")})()`;
