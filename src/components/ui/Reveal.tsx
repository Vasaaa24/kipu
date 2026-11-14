"use client";

import { useRef, type ElementType, type ReactNode, type ComponentPropsWithoutRef } from "react";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";

type RevealProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  /** Prodleva mezi prvky [data-reveal] ve stejné dávce */
  stagger?: number;
  /** Posun při náběhu v px */
  y?: number;
} & Omit<ComponentPropsWithoutRef<T>, "children">;

/**
 * Obal sekce: prvky s atributem [data-reveal] uvnitř se při scrollu
 * plynule objeví (jen opacity + transform). Při reduced motion se nic neanimuje.
 */
export function Reveal<T extends ElementType = "div">({
  as,
  children,
  stagger = 0.1,
  y = 28,
  ...rest
}: RevealProps<T>) {
  const Tag: ElementType = as ?? "div";
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-reveal]", ref.current);
        if (!items.length) return;
        gsap.set(items, { autoAlpha: 0, y });
        const triggers = ScrollTrigger.batch(items, {
          start: "top 90%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              stagger,
              overwrite: true,
            }),
        });
        return () => triggers.forEach((t) => t.kill());
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} {...rest}>
      {children}
    </Tag>
  );
}
