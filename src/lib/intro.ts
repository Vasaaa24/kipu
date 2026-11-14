/**
 * Úvodní animace (intro) – sdílené konstanty.
 *
 * O tom, zda se intro přehraje, rozhoduje inline skript v <head> (ještě před prvním
 * vykreslením, aby nebylo vidět „probliknutí“ webu). Nastaví `<html data-intro="play">`.
 * Intro se nepřehraje: při prefers-reduced-motion, bez JavaScriptu, mimo homepage
 * a podruhé během jedné návštěvy (sessionStorage).
 */

export const INTRO_STORAGE_KEY = "kipu-intro-seen";

/** Za kolik sekund od startu intra se odkrývá web (hero animace na to navazují) */
export const INTRO_REVEAL_AT = 1.75;

/** Inline skript do <head> – nesmí mít žádné závislosti */
export const introInitScript = `(function(){try{var d=document.documentElement;if(location.pathname!=="/")return;if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;if(sessionStorage.getItem("${INTRO_STORAGE_KEY}"))return;sessionStorage.setItem("${INTRO_STORAGE_KEY}","1");d.setAttribute("data-intro","play");}catch(e){}})();`;

/** Zpoždění (s), o které mají hero animace počkat, pokud právě běží intro */
export function getIntroDelay(): number {
  if (typeof document === "undefined") return 0;
  return document.documentElement.dataset.intro === "play" ? INTRO_REVEAL_AT : 0;
}
