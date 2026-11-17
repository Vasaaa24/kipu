"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { siteConfig } from "@/config/site";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useLenis } from "./SmoothScroll";

const MARK = "/logo-mark-light.png";
const maskStyle = {
  maskImage: `url(${MARK})`,
  WebkitMaskImage: `url(${MARK})`,
  maskSize: "contain",
  WebkitMaskSize: "contain",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
  maskPosition: "center",
  WebkitMaskPosition: "center",
} as const;

/**
 * „Filmové“ intro (~3 s) přes celou obrazovku, než se ukáže web – samostatná vrstva,
 * stránku samotnou nijak nemění. Viditelné jen při `<html data-intro="play">` (src/lib/intro.ts).
 *
 * Sekvence: zlatý „proud“ proběhne linkou → rozsvítí se emblém → vyjede KIPU a podtitul
 * → přes emblém přejede odlesk → průlet do logotypu a odkrytí webu.
 */
export function Intro() {
  const ref = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  const { intro, name } = siteConfig;

  // během intra stojí smooth scroll (Lenis se inicializuje asynchronně)
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

      tl
        // 1) proud: linka se natáhne zleva do středu, světelná hlava letí po ní
        .fromTo("[data-i-wire]", { scaleX: 0 }, { scaleX: 1, duration: 0.65, ease: "expo.inOut" }, 0.15)
        .fromTo("[data-i-spark]", { xPercent: -50, x: () => -window.innerWidth / 2, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.65, ease: "expo.inOut" }, 0.15)
        // 2) zásah: záblesk, linka zmizí do středu, emblém se rozsvítí
        .fromTo("[data-i-flash]", { autoAlpha: 0, scale: 0.4 }, { autoAlpha: 1, scale: 1.4, duration: 0.25, ease: "power2.out" }, 0.78)
        .to("[data-i-flash]", { autoAlpha: 0, scale: 2.2, duration: 0.6, ease: "power2.out" }, 1.03)
        .to("[data-i-wire]", { autoAlpha: 0, duration: 0.35 }, 0.8)
        .to("[data-i-spark]", { autoAlpha: 0, duration: 0.2 }, 0.8)
        .fromTo("[data-i-halo]", { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: 1.2 }, 0.8)
        .fromTo(
          "[data-i-mark]",
          { autoAlpha: 0, scale: 0.72, rotation: -10 },
          { autoAlpha: 1, scale: 1, rotation: 0, duration: 1.1, ease: "expo.out" },
          0.82,
        )
        // 3) logotyp a podtitul
        .fromTo("[data-i-char]", { y: 0, yPercent: 110 }, { y: 0, yPercent: 0, duration: 0.8, stagger: 0.06, ease: "expo.out" }, 1.15)
        .fromTo("[data-i-rule]", { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: "expo.inOut" }, 1.35)
        .fromTo("[data-i-tagline]", { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 1.5)
        // 4) odlesk přes emblém
        .fromTo("[data-i-shine]", { x: 0, xPercent: -160 }, { x: 0, xPercent: 160, duration: 0.9, ease: "power2.inOut" }, 1.55)
        // 5) průlet a odkrytí webu
        .addLabel("exit", 2.55)
        .to("[data-i-stage]", { scale: 1.18, autoAlpha: 0, duration: 0.7, ease: "power2.in" }, "exit")
        .to("[data-i-skip]", { autoAlpha: 0, duration: 0.3 }, "exit")
        .to(ref.current, { autoAlpha: 0, duration: 0.6, ease: "power1.inOut" }, "exit+=0.45");

      const skip = () => {
        if (tl.time() < tl.labels.exit) tl.seek("exit");
      };
      const el = ref.current;
      window.addEventListener("keydown", skip, { once: true });
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
    <div id="intro" ref={ref} className="fixed inset-0 z-[200] hidden cursor-pointer overflow-hidden bg-brand-950">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="pattern-grid-dark absolute inset-0 opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_45%,rgb(31_94_77/0.55),transparent_70%)]" />
        {/* vinětace */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_50%,transparent_55%,rgb(0_0_0/0.45))]" />

        <div data-i-stage className="relative flex h-full flex-col items-center justify-center px-6">
          {/* emblém */}
          <div className="relative -mt-[8vh] w-[min(38vw,170px)]">
            {/* proud – linka z levého okraje obrazovky do středu emblému */}
            <span
              data-i-wire
              style={{ transform: "scaleX(0)" }}
              className="absolute top-1/2 right-1/2 block h-px w-[50vw] origin-left bg-gradient-to-r from-transparent via-gold/60 to-gold-light"
            />
            <span
              data-i-spark
              style={{ opacity: 0 }}
              className="absolute top-1/2 left-1/2 size-2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_12px_4px_rgb(216_195_156/0.9),0_0_40px_10px_rgb(182_149_92/0.6)]"
            />
            <span
              data-i-halo
              style={{ opacity: 0 }}
              className="absolute -inset-[60%] rounded-full bg-[radial-gradient(circle,rgb(182_149_92/0.35),transparent_60%)]"
            />
            <span
              data-i-flash
              style={{ opacity: 0 }}
              className="absolute -inset-[30%] rounded-full bg-[radial-gradient(circle,rgb(255_255_255/0.9),rgb(216_195_156/0.4)_30%,transparent_65%)]"
            />
            <div data-i-mark style={{ opacity: 0 }} className="relative">
              <Image src={MARK} alt="" width={531} height={482} priority className="h-auto w-full" />
              {/* odlesk jen ve tvaru emblému */}
              <div className="absolute inset-0 overflow-hidden" style={maskStyle}>
                <span
                  data-i-shine
                  style={{ transform: "translateX(-160%)" }}
                  className="absolute inset-y-0 left-0 w-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/70 to-transparent"
                />
              </div>
            </div>
          </div>

          {/* logotyp */}
          <p className="mt-9 flex overflow-hidden pb-1 font-heading text-5xl font-extrabold tracking-[0.18em] text-white sm:text-6xl">
            {name.split("").map((ch, i) => (
              <span key={i} data-i-char className="inline-block" style={{ transform: "translateY(110%)" }}>
                {ch}
              </span>
            ))}
          </p>
          <span
            data-i-rule
            style={{ transform: "scaleX(0)" }}
            className="mt-4 block h-px w-40 bg-gradient-to-r from-transparent via-gold to-transparent"
          />
          <p
            data-i-tagline
            style={{ opacity: 0 }}
            className="mt-4 text-center text-[0.7rem] font-semibold tracking-[0.4em] text-gold-light uppercase sm:text-xs"
          >
            {intro.tagline}
          </p>
        </div>
      </div>

      <button
        type="button"
        data-i-skip
        className="absolute right-5 bottom-5 rounded-full px-4 py-2 text-xs font-semibold tracking-[0.2em] text-white/50 uppercase ring-1 ring-white/15 transition-colors hover:text-white hover:ring-white/40"
      >
        Přeskočit
      </button>
    </div>
  );
}
