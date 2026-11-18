import { Building2, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { fullAddress, siteConfig } from "@/config/site";
import { ContactForm } from "@/components/ui/ContactForm";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Contact() {
  const { contactSection, contact } = siteConfig;

  return (
    <section id="kontakt" aria-labelledby="kontakt-title" className="scroll-mt-16 py-20 sm:py-28">
      <Reveal className="container-page">
        <SectionHeading id="kontakt-title" eyebrow={contactSection.eyebrow} title={contactSection.title} intro={contactSection.intro} />

        <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <div data-reveal className="relative self-start rounded-[2rem] bg-surface p-6 ring-1 ring-line sm:p-10">
            <ContactForm />
          </div>

          <aside data-reveal aria-label="Kontaktní údaje" className="flex flex-col gap-6">
            <div className="rounded-[2rem] bg-brand p-6 text-white sm:p-8">
              <h3 className="font-heading text-lg font-bold">Kontaktujte nás přímo</h3>
              {/* kontaktní osoba – jméno a funkce jen jednou, pod tím telefon a e-mail */}
              <p className="mt-5 border-b border-white/15 pb-5">
                <span className="block font-semibold">{contact.phones[0].name}</span>
                <span className="block text-sm text-gold-light">{contact.phones[0].role}</span>
              </p>
              <ul className="mt-5 space-y-5">
                {contact.phones.map((p) => (
                  <li key={p.href}>
                    <a href={p.href} className="group flex items-center gap-4">
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15 group-hover:bg-white/20">
                        <Phone aria-hidden="true" className="size-5 text-gold-light" />
                      </span>
                      <span>
                        <span className="block text-sm text-white/70">Telefon</span>
                        <span className="block font-heading text-xl font-bold tracking-wide">{p.display}</span>
                      </span>
                    </a>
                  </li>
                ))}
                {contact.emails.map((e) => (
                  <li key={e.email}>
                    <a href={`mailto:${e.email}`} className="group flex items-center gap-4">
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15 group-hover:bg-white/20">
                        <Mail aria-hidden="true" className="size-5 text-gold-light" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm text-white/70">
                          {/* u kontaktní osoby jen „E-mail“, u ostatních (fakturace) i název a účel */}
                          {e.name === contact.phones[0].name ? "E-mail" : `${e.name} · ${e.role}`}
                        </span>
                        <span className="block font-semibold break-all group-hover:underline group-hover:underline-offset-4">
                          {e.email}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <dl className="grid gap-4 rounded-[2rem] bg-white p-6 ring-1 ring-line sm:grid-cols-2 sm:p-8 lg:grid-cols-1 xl:grid-cols-2">
              <InfoItem icon={<MapPin aria-hidden="true" className="size-5" />} label="Adresa">
                <address className="not-italic">{fullAddress}</address>
              </InfoItem>
              <InfoItem icon={<Building2 aria-hidden="true" className="size-5" />} label="Společnost">
                {siteConfig.legalName}
                <br />
                IČO {siteConfig.ico}
              </InfoItem>
              <InfoItem icon={<Navigation aria-hidden="true" className="size-5" />} label="Oblast působení">
                {contact.serviceArea}
              </InfoItem>
            </dl>

            <MapEmbed />
          </aside>
        </div>
      </Reveal>
    </section>
  );
}

function InfoItem({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-gold-50 text-gold-ink">{icon}</span>
      <div>
        <dt className="text-sm text-muted">{label}</dt>
        <dd className="mt-0.5 font-medium text-ink">{children}</dd>
      </div>
    </div>
  );
}
