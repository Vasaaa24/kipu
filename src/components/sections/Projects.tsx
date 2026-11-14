"use client";

import { useMemo, useRef, useState } from "react";
import { Hammer, MapPin, Zap } from "lucide-react";
import { siteConfig } from "@/config/site";
import { projects, type ProjectCategory } from "@/data/projects";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

type Filter = "all" | ProjectCategory;

const FILTERS: Filter[] = ["all", "elektro", "stavebni"];

export function Projects() {
  const [filter, setFilter] = useState<Filter>("all");
  const gridRef = useRef<HTMLUListElement>(null);
  const { projects: cfg } = siteConfig;

  const visible = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  const counts = useMemo(
    () => ({
      all: projects.length,
      elektro: projects.filter((p) => p.category === "elektro").length,
      stavebni: projects.filter((p) => p.category === "stavebni").length,
    }),
    [],
  );

  // Animace při změně filtru (ne při prvním vykreslení – to řeší Reveal)
  const first = useRef(true);
  useGSAP(
    () => {
      if (first.current) {
        first.current = false;
        return;
      }
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          gridRef.current?.children ?? [],
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.06, overwrite: true },
        );
      });
      return () => mm.revert();
    },
    { dependencies: [filter], scope: gridRef },
  );

  return (
    <section id="realizace" aria-labelledby="realizace-title" className="scroll-mt-16 bg-surface py-20 sm:py-28">
      <Reveal className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="realizace-title" eyebrow={cfg.eyebrow} title={cfg.title} intro={cfg.intro} />

          <div data-reveal role="group" aria-label="Filtrovat realizace" className="flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(f)}
                  className={`inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors ${
                    active ? "bg-brand text-white" : "bg-white text-brand ring-1 ring-line hover:ring-brand/30"
                  }`}
                >
                  {cfg.filters[f]}
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${active ? "bg-white/15" : "bg-brand-50 text-brand/70"}`}
                  >
                    {counts[f]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          Zobrazeno {visible.length} realizací.
        </p>

        <ul ref={gridRef} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => {
            const isElektro = p.category === "elektro";
            return (
              <li key={p.id} data-reveal>
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-line transition-shadow hover:shadow-[0_24px_50px_-28px_rgb(20_71_58/0.45)]">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Media
                      image={p.image}
                      icon={isElektro ? Zap : Hammer}
                      tone={isElektro ? "brand" : "gold"}
                      className="transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          isElektro ? "bg-white text-brand" : "bg-white text-gold-ink"
                        }`}
                      >
                        {cfg.filters[p.category]}
                      </span>
                      {p.placeholder ? (
                        <span className="rounded-full bg-black/30 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                          Ukázka
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="flex items-center gap-2 text-sm text-muted">
                      <MapPin aria-hidden="true" className="size-4 text-gold" />
                      <span>{p.location}</span>
                      <span aria-hidden="true">·</span>
                      <span>{p.year}</span>
                    </p>
                    <h3 className="mt-3 text-lg font-bold text-brand">{p.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{p.description}</p>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}
