import { siteConfig } from "@/config/site";
import { icons } from "@/lib/icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/reactbits/SpotlightCard";

export function Services() {
  const { services } = siteConfig;

  return (
    <section id="sluzby" aria-labelledby="sluzby-title" className="scroll-mt-16 py-20 sm:py-28">
      <Reveal className="container-page">
        <SectionHeading id="sluzby-title" eyebrow={services.eyebrow} title={services.title} intro={services.intro} />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          {services.items.map((item, i) => {
            const Icon = icons[item.icon];
            return (
              <li key={item.title} data-reveal className="h-full">
                <SpotlightCard
                  theme="light"
                  spotlightColor="#b6955c"
                  intensity={0.35}
                  spotlightSize={420}
                  borderGlow={0.6}
                  grain={0}
                  className="h-full !p-7 sm:!p-8"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex size-13 items-center justify-center rounded-2xl bg-brand text-white shadow-[0_10px_24px_-12px_rgb(20_71_58/0.8)]">
                      <Icon aria-hidden="true" className="size-6" strokeWidth={1.75} />
                    </span>
                    <span aria-hidden="true" className="font-heading text-sm font-semibold text-brand/25">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-brand">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{item.description}</p>
                </SpotlightCard>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}
