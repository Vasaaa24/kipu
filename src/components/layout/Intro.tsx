"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { siteConfig } from "@/config/site";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { INTRO_REVEAL_AT } from "@/lib/intro";
import { useLenis } from "./SmoothScroll";

/**
 * Úvodní animace před zobrazením webu.
 * Overlay je v HTML vždy, ale viditelný jen při `<html data-intro="play">` (viz src/lib/intro.ts).
 * Kliknutím nebo klávesou lze intro přeskočit.
 */
export function Intro() {
  const ref = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  const { intro, logo } = siteConfig;

  // během intra zastavit smooth scroll (Lenis se inicializuje asynchronně)
  useEffect(() => {
    lenisRef.current = lenis;
    if (document.documentElement.dataset.intro === "play") lenis?.stop();
  }, [lenis]);

  useGSAP(
    () => {
      const root = document.documentElement;
      if (root.dataset.intro !== "play") return;

      root.style.overflow = "hidden";

      const finish = () => {
        root.dataset.intro = "done";
        root.style.overflow = "";
        lenisRef.current?.start();
        ScrollTrigger.refresh();
      };

      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, onComplete: finish });

      tl.fromTo("[data-intro-line]", { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: "expo.inOut" }, 0.1)
        .fromTo("[data-intro-logo]", { y: 0, yPercent: 110 }, { y: 0, yPercent: 0, duration: 0.8, ease: "expo.out" }, 0.45)
        .fromTo("[data-intro-tagline]", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.75)
        .fromTo("[data-intro-progress]", { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: "power1.inOut" }, 0.45)
        // odchod: obsah vyjede nahoru, pak se zvedne dvouvrstvá „opona“
        .to("[data-intro-content]", { autoAlpha: 0, y: -30, duration: 0.45, ease: "power2.in" }, INTRO_REVEAL_AT - 0.4)
        .to("[data-intro-panel='brand']", { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, INTRO_REVEAL_AT - 0.2)
        .to("[data-intro-panel='gold']", { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, INTRO_REVEAL_AT - 0.1);

      const skip = () => {
        if (tl.time() < INTRO_REVEAL_AT - 0.4) tl.time(INTRO_REVEAL_AT - 0.4);
      };
      window.addEventListener("keydown", skip, { once: true });
      const el = ref.current;
      el?.addEventListener("pointerdown", skip, { once: true });

      return () => {
        window.removeEventListener("keydown", skip);
        el?.removeEventListener("pointerdown", skip);
        tl.kill();
        // bez finish(): v dev StrictMode se efekt spouští dvakrát a intro se má přehrát znovu
        root.style.overflow = "";
      };
    },
    { scope: ref },
  );

  return (
    <div id="intro" ref={ref} aria-hidden="true" className="fixed inset-0 z-[200] hidden cursor-pointer">
      {/* zlatá vrstva vyjíždí o chvilku později → jemný zlatý „lem“ při odkrytí */}
      <div data-intro-panel="gold" className="absolute inset-0 bg-gold" />
      <div data-intro-panel="brand" className="absolute inset-0 overflow-hidden bg-brand-950">
        <div className="pattern-grid-dark absolute inset-0 opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_45%,rgb(42_107_89/0.55),transparent_70%)]" />

        <div data-intro-content className="relative flex h-full flex-col items-center justify-center px-6">
          <div className="overflow-hidden pb-1">
            <div data-intro-logo style={{ transform: "translateY(110%)" }}>
              <Image
                src={logo.srcOnDark}
                alt=""
                width={logo.width}
                height={logo.height}
                priority
                unoptimized={logo.srcOnDark.endsWith(".svg")}
                className="h-auto w-[min(70vw,22rem)]"
              />
            </div>
          </div>

          <span data-intro-line style={{ transform: "scaleX(0)" }} className="mt-6 block h-px w-[min(70vw,22rem)] origin-center bg-white/15">
            <span data-intro-progress style={{ transform: "scaleX(0)" }} className="block h-full origin-left bg-gold" />
          </span>

          <p
            data-intro-tagline
            style={{ opacity: 0 }}
            className="mt-5 text-center text-[0.7rem] font-semibold tracking-[0.35em] text-white/70 uppercase sm:text-xs"
          >
            {intro.tagline}
          </p>
        </div>
      </div>
    </div>
  );
}
