"use client";

import Image from "next/image";
import { useRef } from "react";
import { CircleCheck } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

export function About() {
  const ref = useRef<HTMLElement>(null);
  const { about } = siteConfig;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-about-parallax]",
          { yPercent: 10 },
          {
            yPercent: -10,
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="o-nas" aria-labelledby="o-nas-title" className="scroll-mt-16 bg-surface py-20 sm:py-28">
      <Reveal className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="relative order-2 lg:order-1">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] bg-[radial-gradient(120%_100%_at_0%_0%,#ffffff_0%,#eff5f2_55%,#dfeae5_100%)] ring-1 ring-line">
            <div aria-hidden="true" className="pattern-grid-dark absolute inset-0" />
            <div data-about-parallax className="absolute inset-0 flex items-center justify-center">
              <Image
                src="/logo-mark.png"
                alt=""
                aria-hidden="true"
                width={523}
                height={481}
                sizes="(min-width: 1024px) 280px, 50vw"
                className="w-2/5 max-w-[280px] drop-shadow-[0_30px_40px_rgb(20_71_58/0.25)]"
              />
            </div>
          </div>
          <ul className="absolute -bottom-6 left-4 right-4 flex flex-wrap justify-center gap-2 sm:left-8 sm:right-auto sm:justify-start">
            {about.values.map((v) => (
              <li
                key={v}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand shadow-md ring-1 ring-line"
              >
                <CircleCheck aria-hidden="true" className="size-4 text-gold" />
                {v}
              </li>
            ))}
          </ul>
        </div>

        <div className="order-1 lg:order-2">
          <SectionHeading id="o-nas-title" eyebrow={about.eyebrow} title={about.title} />
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink/80">
            {about.paragraphs.map((p) => (
              <p key={p} data-reveal>
                {p}
              </p>
            ))}
          </div>
          <dl data-reveal className="mt-8 grid grid-cols-2 gap-4 border-t border-line pt-8 text-sm">
            <div>
              <dt className="text-muted">Společnost</dt>
              <dd className="mt-1 font-semibold text-brand">{siteConfig.legalName}</dd>
            </div>
            <div>
              <dt className="text-muted">IČO</dt>
              <dd className="mt-1 font-semibold text-brand">{siteConfig.ico}</dd>
            </div>
          </dl>
        </div>
      </Reveal>
    </section>
  );
}
