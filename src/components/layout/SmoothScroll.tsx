"use client";

import Lenis from "lenis";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const LenisContext = createContext<Lenis | null>(null);

/** Vrací instanci Lenis, nebo null (reduced motion / před inicializací) */
export function useLenis(): Lenis | null {
  return useContext(LenisContext);
}

/**
 * Smooth scroll přes Lenis, synchronizovaný s GSAP ScrollTrigger
 * podle README Lenis (lenis.on('scroll', ScrollTrigger.update) + gsap.ticker).
 * Při prefers-reduced-motion se Lenis vůbec nespustí.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let instance: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;

    const start = () => {
      if (instance) return;
      instance = new Lenis({
        anchors: true,
        autoRaf: false,
        stopInertiaOnNavigate: true,
      });
      instance.on("scroll", ScrollTrigger.update);
      tick = (time: number) => instance?.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      setLenis(instance);
    };

    const stop = () => {
      if (tick) gsap.ticker.remove(tick);
      tick = null;
      instance?.destroy();
      instance = null;
      setLenis(null);
    };

    const sync = () => (mq.matches ? stop() : start());
    sync();
    mq.addEventListener("change", sync);

    return () => {
      mq.removeEventListener("change", sync);
      stop();
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
