import Image from "next/image";
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

        {services.gallery.length ? (
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {services.gallery.map((photo) => (
              <li
                key={photo.src}
                data-reveal
                className="group relative aspect-[4/3] overflow-hidden rounded-3xl bg-brand-50 ring-1 ring-line sm:last:odd:col-span-2 sm:last:odd:aspect-[8/3] lg:last:odd:col-span-1 lg:last:odd:aspect-[4/3]"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brand-950/80 to-transparent" />
                <p className="absolute bottom-4 left-5 flex items-center gap-2 font-heading text-base font-bold text-white">
                  <span aria-hidden="true" className="h-px w-6 bg-gold" />
                  {photo.caption}
                </p>
              </li>
            ))}
          </ul>
        ) : null}
      </Reveal>
    </section>
  );
}
