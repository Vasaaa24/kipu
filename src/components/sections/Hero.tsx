"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowRight, CircleCheck, Zap } from "lucide-react";
import { siteConfig } from "@/config/site";
import { LinkButton } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import SplitText from "@/components/reactbits/SplitText";
import CountUp from "@/components/reactbits/CountUp";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { getIntroDelay } from "@/lib/intro";
import { HeroBackground } from "./HeroBackground";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { hero, slogan } = siteConfig;
  // pokud běží úvodní intro, hero animace na něj navážou
  const [introDelay] = useState(getIntroDelay);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from("[data-hero-fade]", {
          autoAlpha: 0,
          y: 24,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          delay: 0.35 + introDelay,
        });
        gsap.from("[data-hero-visual]", {
          autoAlpha: 0,
          scale: 0.96,
          duration: 1.1,
          ease: "power3.out",
          delay: 0.2 + introDelay,
        });
        // jemná parallaxa vizuálu při scrollu
        gsap.to("[data-hero-parallax]", {
          yPercent: -8,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-40 lg:pb-28"
    >
      <HeroBackground />

      <div className="container-page grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <p
            data-hero-fade
            className="mb-5 inline-flex items-center gap-2 rounded-full bg-brand-50 px-3.5 py-1.5 text-xs font-semibold tracking-[0.14em] text-brand uppercase ring-1 ring-brand/10"
          >
            <Zap aria-hidden="true" className="size-3.5 text-gold-ink" />
            {hero.eyebrow}
          </p>

          <div id="hero-title">
            <SplitText
              tag="h1"
              text={hero.title}
              trigger="load"
              splitType="words"
              textAlign="left"
              delay={70}
              startDelay={introDelay}
              duration={0.9}
              className="font-heading text-[2.4rem] leading-[1.05] font-extrabold tracking-tight text-brand sm:text-6xl lg:text-[4.25rem]"
            />
          </div>

          <p data-hero-fade className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            {hero.subtitle}
          </p>

          <ul data-hero-fade className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[0.95rem] text-ink/80">
            {hero.highlights.map((h) => (
              <li key={h} className="inline-flex items-center gap-2">
                <CircleCheck aria-hidden="true" className="size-4 text-gold" />
                {h}
              </li>
            ))}
          </ul>

          <div data-hero-fade className="mt-9 flex flex-col gap-3 sm:flex-row">
            <LinkButton href={hero.ctaPrimary.href} className="group">
              {hero.ctaPrimary.label}
              <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
            </LinkButton>
            <LinkButton href={hero.ctaSecondary.href} variant="secondary">
              {hero.ctaSecondary.label}
            </LinkButton>
          </div>

          {slogan.enabled ? (
            <p data-hero-fade className="mt-8 flex items-center gap-3 text-sm font-medium text-gold-ink">
              <span aria-hidden="true" className="h-px w-10 bg-gold" />
              {slogan.text}
            </p>
          ) : null}
        </div>

        <div data-hero-visual className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div data-hero-parallax className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-40px_rgb(20_71_58/0.55)] sm:aspect-[5/5] lg:aspect-[4/5]">
              <Media
                image={hero.image}
                icon={Zap}
                priority
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-[72%_50%]"
                caption={hero.image ? undefined : "Místo pro fotografii"}
              />
              {!hero.image ? (
                <Image
                  src="/logo-mark.png"
                  alt=""
                  aria-hidden="true"
                  width={523}
                  height={481}
                  className="pointer-events-none absolute -right-10 -bottom-10 w-56 opacity-[0.12] brightness-0 invert"
                />
              ) : null}
            </div>

            {slogan.enabled ? (
              <div className="absolute -bottom-6 -left-2 rounded-2xl bg-white px-5 py-4 shadow-[0_20px_50px_-20px_rgb(20_71_58/0.45)] ring-1 ring-line sm:-left-8">
                <p className="font-heading text-4xl font-extrabold text-brand">
                  <CountUp to={slogan.years} duration={2} delay={introDelay} suffix="+" />
                </p>
                <p className="mt-1 text-sm font-medium text-muted">{slogan.yearsLabel}</p>
              </div>
            ) : null}

            <div className="absolute -top-4 right-4 hidden items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-brand shadow-lg ring-1 ring-line sm:flex">
              <span className="size-2 rounded-full bg-gold" aria-hidden="true" />
              {hero.badge}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
