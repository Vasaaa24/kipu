/**
 * Úvodní „filmové“ intro před zobrazením webu – sdílené konstanty.
 *
 * O přehrání rozhoduje inline skript v <head> ještě před prvním vykreslením
 * (aby web neprobliknul) – nastaví `<html data-intro="play">`.
 * Intro se přehraje při každém načtení homepage. Nepřehraje se při
 * prefers-reduced-motion, bez JavaScriptu a na ostatních stránkách (např. /gdpr).
 */

/**
 * Kritické CSS intra – vkládá se inline do <head> (nezávisle na globálním stylesheetu),
 * aby overlay zakryl web hned od prvního vykreslení.
 * Pojistka: kdyby se nenačetl JavaScript, overlay po 8 s sám zmizí.
 */
export const introCriticalCss = `html[data-intro="play"] #intro{display:block!important;animation:intro-failsafe .4s ease-out 8s forwards}@keyframes intro-failsafe{to{opacity:0;visibility:hidden;pointer-events:none}}@media (prefers-reduced-motion: reduce){#intro{display:none!important}}`;

/** Inline skript do <head> – nesmí mít žádné závislosti */
export const introInitScript = `(function(){try{if(location.pathname!=="/")return;if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;document.documentElement.setAttribute("data-intro","play");}catch(e){}})();`;
