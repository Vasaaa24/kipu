"use client";

import { useRef } from "react";
import { siteConfig } from "@/config/site";
import { icons } from "@/lib/icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

/** Animovaná timeline: linka se „kreslí“ podle scrollu, kroky se postupně rozsvěcují */
export function Process() {
  const ref = useRef<HTMLElement>(null);
  const { process } = siteConfig;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-line-fill]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: "[data-timeline]",
              start: "top 70%",
              end: "bottom 60%",
              scrub: 0.6,
            },
          },
        );

        gsap.utils.toArray<HTMLElement>("[data-step]").forEach((step) => {
          const dot = step.querySelector("[data-step-dot]");
          const body = step.querySelector("[data-step-body]");
          const tl = gsap.timeline({
            scrollTrigger: { trigger: step, start: "top 72%", toggleActions: "play none none reverse" },
          });
          tl.fromTo(dot, { scale: 0.6, autoAlpha: 0.35 }, { scale: 1, autoAlpha: 1, duration: 0.45, ease: "back.out(2)" }).fromTo(
            body,
            { autoAlpha: 0, x: 24 },
            { autoAlpha: 1, x: 0, duration: 0.6, ease: "power3.out" },
            "<0.05",
          );
        });

        gsap.from("[data-process-heading]", {
          autoAlpha: 0,
          y: 28,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-process-heading]", start: "top 88%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="spoluprace" aria-labelledby="spoluprace-title" className="scroll-mt-16 py-20 sm:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div data-process-heading className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading id="spoluprace-title" eyebrow={process.eyebrow} title={process.title} />
          <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">{process.intro}</p>
        </div>

        <ol data-timeline className="relative">
          {/* podkladová a „vyplňovaná“ linka */}
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-6 w-0.5 -translate-x-1/2 bg-line sm:left-7" />
          <span
            aria-hidden="true"
            data-line-fill
            className="absolute top-2 bottom-2 left-6 w-0.5 origin-top -translate-x-1/2 bg-gradient-to-b from-gold to-brand sm:left-7"
          />

          {process.steps.map((step, i) => {
            const Icon = icons[step.icon];
            return (
              <li key={step.title} data-step className="relative flex gap-5 pb-10 last:pb-0 sm:gap-7">
                <span
                  data-step-dot
                  className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full bg-brand text-white ring-8 ring-white sm:size-14"
                >
                  <Icon aria-hidden="true" className="size-5 sm:size-6" strokeWidth={1.75} />
                </span>
                <div data-step-body className="flex-1 rounded-2xl bg-surface p-5 ring-1 ring-line sm:p-6">
                  <p className="text-xs font-semibold tracking-[0.15em] text-gold-ink uppercase">Krok {i + 1}</p>
                  <h3 className="mt-1.5 text-lg font-bold text-brand sm:text-xl">{step.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{step.description}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
