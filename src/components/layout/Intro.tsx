"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { siteConfig } from "@/config/site";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { INTRO_REVEAL_AT } from "@/lib/intro";
import { useLenis } from "./SmoothScroll";

/** Světelné paprsky za logem – pevné hodnoty (žádné Math.random → stejné HTML na serveru i klientu) */
const STREAKS = [
  { x: -46, w: 2, c: "gold" },
  { x: -38, w: 5, c: "green" },
  { x: -31, w: 1, c: "gold" },
  { x: -24, w: 3, c: "gold" },
  { x: -17, w: 8, c: "green" },
  { x: -11, w: 2, c: "gold" },
  { x: -5, w: 4, c: "gold" },
  { x: 0, w: 10, c: "green" },
  { x: 5, w: 3, c: "gold" },
  { x: 10, w: 1, c: "gold" },
  { x: 16, w: 6, c: "green" },
  { x: 22, w: 2, c: "gold" },
  { x: 29, w: 4, c: "gold" },
  { x: 36, w: 7, c: "green" },
  { x: 43, w: 2, c: "gold" },
] as const;

const STREAK_BG = {
  gold: "linear-gradient(to bottom, transparent 0%, rgb(216 195 156 / 0.9) 45%, rgb(182 149 92 / 0.6) 55%, transparent 100%)",
  green: "linear-gradient(to bottom, transparent 0%, rgb(42 107 89 / 0.85) 45%, rgb(20 71 58 / 0.6) 60%, transparent 100%)",
};

/**
 * Úvodní „filmová“ animace před zobrazením webu.
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

      const EXIT = INTRO_REVEAL_AT - 0.45;
      const tl = gsap.timeline({ onComplete: finish });

      tl
        // 1) paprsky vyjedou ze středu
        .fromTo(
          "[data-intro-streak]",
          { scaleY: 0, autoAlpha: 0 },
          {
            scaleY: 1,
            autoAlpha: 1,
            duration: 0.9,
            ease: "expo.out",
            stagger: { each: 0.035, from: "center" },
          },
          0,
        )
        .fromTo("[data-intro-glow]", { scale: 0.6, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1.2, ease: "power2.out" }, 0.1)
        // 2) logo „najede“ ze zoomu
        .fromTo(
          "[data-intro-logo]",
          { scale: 1.35, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: 1.2, ease: "expo.out" },
          0.4,
        )
        // paprsky se rozplynou do stran
        .to(
          "[data-intro-streak]",
          { scaleY: 0.2, autoAlpha: 0, duration: 0.8, ease: "power2.in", stagger: { each: 0.02, from: "edges" } },
          0.95,
        )
        // 3) světelný odlesk přes logo
        .fromTo(
          "[data-intro-shine]",
          { xPercent: 0, skewX: -20 },
          { xPercent: 420, skewX: -20, duration: 0.9, ease: "power2.inOut" },
          1.0,
        )
        .fromTo("[data-intro-tagline]", { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" }, 1.15)
        // 4) „průlet“ logem a odkrytí webu
        .to("[data-intro-tagline]", { autoAlpha: 0, y: -10, duration: 0.3, ease: "power2.in" }, EXIT - 0.1)
        .to("[data-intro-glow]", { scale: 2.5, autoAlpha: 0, duration: 0.7, ease: "power3.in" }, EXIT)
        .to("[data-intro-logo]", { scale: 9, duration: 0.75, ease: "power4.in" }, EXIT)
        .to("[data-intro-logo]", { autoAlpha: 0, duration: 0.3, ease: "power1.in" }, EXIT + 0.45)
        .to(ref.current, { autoAlpha: 0, duration: 0.55, ease: "power2.out" }, INTRO_REVEAL_AT);

      const skip = () => {
        if (tl.time() < EXIT - 0.1) tl.time(EXIT - 0.1);
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
    <div
      id="intro"
      ref={ref}
      aria-hidden="true"
      className="fixed inset-0 z-[200] hidden cursor-pointer overflow-hidden bg-[#04100c]"
    >
      {/* záře za logem */}
      <div
        data-intro-glow
        style={{ opacity: 0 }}
        className="absolute inset-0 bg-[radial-gradient(45%_40%_at_50%_50%,rgb(42_107_89/0.55),rgb(20_71_58/0.15)_55%,transparent_75%)]"
      />

      {/* světelné paprsky */}
      <div className="absolute inset-0">
        {STREAKS.map((s, i) => (
          <span
            key={i}
            data-intro-streak
            style={{
              left: `calc(50% + ${s.x}vw)`,
              width: s.w,
              background: STREAK_BG[s.c],
              opacity: 0,
              boxShadow: s.c === "gold" ? "0 0 18px rgb(182 149 92 / 0.55)" : "0 0 24px rgb(42 107 89 / 0.6)",
            }}
            className="absolute inset-y-0 origin-center"
          />
        ))}
      </div>

      {/* jemná vinětace */}
      <div className="absolute inset-0 bg-[radial-gradient(80%_70%_at_50%_50%,transparent_50%,rgb(0_0_0/0.55)_100%)]" />

      <div className="relative flex h-full flex-col items-center justify-center px-6">
        <div data-intro-logo style={{ opacity: 0 }} className="relative w-[min(72vw,24rem)]">
          <Image
            src={logo.srcOnDark}
            alt=""
            width={logo.width}
            height={logo.height}
            priority
            unoptimized={logo.srcOnDark.endsWith(".svg")}
            className="h-auto w-full drop-shadow-[0_0_30px_rgb(182_149_92/0.35)]"
          />
          {/* odlesk – maskovaný tvarem loga, takže svítí jen na logu */}
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden"
            style={{
              maskImage: `url(${logo.srcOnDark})`,
              WebkitMaskImage: `url(${logo.srcOnDark})`,
              maskSize: "100% 100%",
              WebkitMaskSize: "100% 100%",
            }}
          >
            <span
              data-intro-shine
              className="absolute inset-y-[-20%] left-[-35%] w-[30%] bg-gradient-to-r from-transparent via-white/85 to-transparent"
            />
          </div>
        </div>

        <p
          data-intro-tagline
          style={{ opacity: 0 }}
          className="mt-8 text-center text-[0.7rem] font-semibold tracking-[0.4em] text-white/70 uppercase sm:text-xs"
        >
          {intro.tagline}
        </p>
      </div>
    </div>
  );
}
