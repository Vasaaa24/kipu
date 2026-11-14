import { siteConfig } from "@/config/site";
import { icons } from "@/lib/icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function WhyUs() {
  const { whyUs } = siteConfig;

  return (
    <section
      id="proc-my"
      aria-labelledby="proc-my-title"
      className="relative isolate scroll-mt-16 overflow-hidden bg-brand py-20 text-white sm:py-28"
    >
      <div aria-hidden="true" className="pattern-grid absolute inset-0 -z-10" />
      <div aria-hidden="true" className="absolute -bottom-48 -left-24 -z-10 size-[30rem] rounded-full bg-gold/15 blur-3xl" />

      <Reveal className="container-page">
        <SectionHeading id="proc-my-title" eyebrow={whyUs.eyebrow} title={whyUs.title} tone="dark" />

        <ul className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-white/10 ring-1 ring-white/10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {whyUs.items.map((item) => {
            const Icon = icons[item.icon];
            return (
              <li key={item.title} data-reveal className="bg-brand p-7 sm:p-8">
                <span className="flex size-12 items-center justify-center rounded-xl bg-gold/15 text-gold-light ring-1 ring-gold/30">
                  <Icon aria-hidden="true" className="size-6" strokeWidth={1.75} />
                </span>
                <h3 className="mt-6 text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-white/75">{item.description}</p>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}
