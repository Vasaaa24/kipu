import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { fullAddress, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Zásady zpracování osobních údajů",
  description: `Informace o zpracování osobních údajů společností ${siteConfig.legalName}.`,
  alternates: { canonical: "/gdpr" },
};

/*
 * Jednoduchý vzorový text – doporučujeme nechat zkontrolovat
 * (zejména dobu uchování a seznam zpracovatelů).
 */
export default function GdprPage() {
  const { contact } = siteConfig;
  const contactEmail = contact.emails[0].email;

  return (
    <article className="container-page max-w-3xl pt-32 pb-20 sm:pt-40 sm:pb-28">
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline">
        <ArrowLeft aria-hidden="true" className="size-4" />
        Zpět na úvodní stránku
      </Link>

      <h1 className="mt-6 text-3xl font-bold tracking-tight text-brand sm:text-4xl">Zásady zpracování osobních údajů</h1>

      <div className="mt-10 space-y-8 leading-relaxed text-ink/85 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-brand [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-1">
        <section>
          <h2>Správce osobních údajů</h2>
          <p>
            {siteConfig.legalName}, IČO {siteConfig.ico}, se sídlem {fullAddress} (dále jen „správce“).
            <br />
            Kontakt: <a className="text-brand underline" href={`mailto:${contactEmail}`}>{contactEmail}</a>, tel.{" "}
            <a className="text-brand underline" href={contact.phones[0].href}>{contact.phones[0].display}</a>
          </p>
        </section>

        <section>
          <h2>Jaké údaje zpracováváme</h2>
          <p>Prostřednictvím poptávkového formuláře zpracováváme údaje, které nám sami poskytnete:</p>
          <ul className="mt-3">
            <li>jméno,</li>
            <li>telefonní číslo a/nebo e-mailovou adresu,</li>
            <li>místo zakázky a popis poptávky.</li>
          </ul>
        </section>

        <section>
          <h2>Účel a právní základ</h2>
          <p>
            Údaje zpracováváme za účelem vyřízení vaší poptávky, přípravy cenové nabídky a následné komunikace. Právním
            základem je jednání o uzavření smlouvy na vaši žádost (čl. 6 odst. 1 písm. b) GDPR) a oprávněný zájem
            správce na komunikaci se zájemci o služby (čl. 6 odst. 1 písm. f) GDPR).
          </p>
        </section>

        <section>
          <h2>Doba uchování</h2>
          <p>
            Údaje uchováváme po dobu nezbytnou k vyřízení poptávky, nejdéle však 12 měsíců od
            posledního kontaktu, pokud nedojde k uzavření smlouvy. V případě uzavření smlouvy po dobu stanovenou
            právními předpisy.
          </p>
        </section>

        <section>
          <h2>Příjemci a zpracovatelé</h2>
          <p>
            Údaje nepředáváme třetím stranám za účelem marketingu. K doručení zprávy z formuláře využíváme e-mailovou
            službu Resend (Resend, Inc.) a služby hostingu webu, které údaje zpracovávají pouze podle našich pokynů.
          </p>
        </section>

        <section>
          <h2>Mapa</h2>
          <p>
            Mapa na stránce se načte ze služby Google Maps až poté, co na ni kliknete. Do té doby se žádný obsah od
            společnosti Google nenačítá.
          </p>
        </section>

        <section>
          <h2>Vaše práva</h2>
          <p>Máte právo:</p>
          <ul className="mt-3">
            <li>požadovat přístup ke svým osobním údajům,</li>
            <li>požadovat jejich opravu nebo výmaz,</li>
            <li>požadovat omezení zpracování,</li>
            <li>vznést námitku proti zpracování,</li>
            <li>na přenositelnost údajů,</li>
            <li>
              podat stížnost u Úřadu pro ochranu osobních údajů (
              <a className="text-brand underline" href="https://uoou.gov.cz" target="_blank" rel="noopener noreferrer">
                uoou.gov.cz
              </a>
              ).
            </li>
          </ul>
          <p className="mt-3">
            Svá práva můžete uplatnit e-mailem na{" "}
            <a className="text-brand underline" href={`mailto:${contactEmail}`}>{contactEmail}</a>.
          </p>
        </section>
      </div>
    </article>
  );
}
