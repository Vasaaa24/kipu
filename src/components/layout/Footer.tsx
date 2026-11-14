import Link from "next/link";
import { cacheLife } from "next/cache";
import { Mail, MapPin, Phone } from "lucide-react";
import { fullAddress, siteConfig } from "@/config/site";
import { Logo } from "@/components/ui/Logo";

async function getYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export async function Footer() {
  const year = await getYear();
  const { contact } = siteConfig;

  return (
    <footer className="relative overflow-hidden bg-brand-950 text-white/80">
      <div aria-hidden="true" className="pattern-grid absolute inset-0 opacity-60" />
      <div className="container-page relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4 lg:py-20">
        <div className="lg:col-span-2">
          <Link href="/" className="inline-block rounded-md" aria-label="KIPU, s.r.o. – úvodní stránka">
            <Logo onDark className="h-11 w-auto" />
          </Link>
          <p className="mt-5 max-w-sm leading-relaxed">{siteConfig.footer.note}</p>
          <p className="mt-5 text-sm">
            {siteConfig.legalName} · IČO {siteConfig.ico}
          </p>
        </div>

        <div>
          <h2 className="font-heading text-sm font-semibold tracking-[0.15em] text-gold-light uppercase">Kontakt</h2>
          <ul className="mt-5 space-y-3 text-[0.95rem]">
            {contact.phones.map((p) => (
              <li key={p.href}>
                <a href={p.href} className="inline-flex items-center gap-2.5 hover:text-white">
                  <Phone aria-hidden="true" className="size-4 text-gold" />
                  {p.name} – {p.display}
                </a>
              </li>
            ))}
            {contact.emails.map((e) => (
              <li key={e.email}>
                <a href={`mailto:${e.email}`} className="inline-flex items-center gap-2.5 break-all hover:text-white">
                  <Mail aria-hidden="true" className="size-4 shrink-0 text-gold" />
                  {e.email}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-heading text-sm font-semibold tracking-[0.15em] text-gold-light uppercase">Sídlo</h2>
          <address className="mt-5 flex gap-2.5 text-[0.95rem] not-italic">
            <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold" />
            <span>{fullAddress}</span>
          </address>
          <nav aria-label="Odkazy v patičce" className="mt-6">
            <ul className="space-y-2 text-[0.95rem]">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link href={`/${item.href}`} className="hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-page flex flex-col gap-3 py-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.legalName} Všechna práva vyhrazena.
          </p>
          <Link href="/gdpr" className="underline-offset-4 hover:text-white hover:underline">
            Zásady zpracování osobních údajů
          </Link>
        </div>
      </div>
    </footer>
  );
}
