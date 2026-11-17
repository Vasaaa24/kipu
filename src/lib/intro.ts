/**
 * Úvodní „filmové“ intro před zobrazením webu – sdílené konstanty.
 *
 * O přehrání rozhoduje inline skript v <head> ještě před prvním vykreslením
 * (aby web neprobliknul) – nastaví `<html data-intro="play">`.
 * Intro se nepřehraje: při prefers-reduced-motion, bez JavaScriptu,
 * mimo homepage a podruhé během jedné návštěvy (sessionStorage).
 */

export const INTRO_STORAGE_KEY = "kipu-intro-seen";

/**
 * Kritické CSS intra – vkládá se inline do <head> (nezávisle na globálním stylesheetu),
 * aby overlay zakryl web hned od prvního vykreslení.
 * Pojistka: kdyby se nenačetl JavaScript, overlay po 8 s sám zmizí.
 */
export const introCriticalCss = `html[data-intro="play"] #intro{display:block!important;animation:intro-failsafe .4s ease-out 8s forwards}@keyframes intro-failsafe{to{opacity:0;visibility:hidden;pointer-events:none}}@media (prefers-reduced-motion: reduce){#intro{display:none!important}}`;

/** Inline skript do <head> – nesmí mít žádné závislosti */
export const introInitScript = `(function(){try{var d=document.documentElement;if(location.pathname!=="/")return;if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;if(sessionStorage.getItem("${INTRO_STORAGE_KEY}"))return;sessionStorage.setItem("${INTRO_STORAGE_KEY}","1");d.setAttribute("data-intro","play");}catch(e){}})();`;
