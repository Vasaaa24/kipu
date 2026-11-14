import { siteConfig } from "@/config/site";
import { icons } from "@/lib/icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Menší, vizuálně podřízená sekce – stavební práce jsou doplňková služba */
export function ExtraConstruction() {
  const { construction } = siteConfig;

  return (
    <section id="stavebni-prace" aria-labelledby="stavebni-title" className="scroll-mt-16 pb-20 sm:pb-28">
      <Reveal className="container-page">
        <div className="relative overflow-hidden rounded-[2rem] bg-surface px-6 py-12 ring-1 ring-line sm:px-10 lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:px-14 lg:py-14">
          <div aria-hidden="true" className="pattern-grid-dark absolute inset-0 opacity-60" />
          <div className="relative">
            <SectionHeading
              id="stavebni-title"
              eyebrow={construction.eyebrow}
              title={construction.title}
              intro={construction.intro}
              className="[&_h2]:text-2xl [&_h2]:sm:text-3xl"
            />
          </div>
          <ul className="relative mt-10 grid gap-4 sm:grid-cols-2 lg:mt-0">
            {construction.items.map((item) => {
              const Icon = icons[item.icon];
              return (
                <li key={item.title} data-reveal className="flex gap-4 rounded-2xl bg-white p-5 ring-1 ring-line">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gold-50 text-gold-ink">
                    <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="font-heading font-semibold text-brand">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{item.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
