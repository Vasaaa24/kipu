import { siteConfig } from "@/config/site";

/** Strukturovaná data LocalBusiness / Electrician pro vyhledávače */
export function JsonLd() {
  const { contact, url } = siteConfig;

  const data = {
    "@context": "https://schema.org",
    "@type": "Electrician",
    "@id": `${url}/#business`,
    name: siteConfig.legalName,
    description: siteConfig.seo.description,
    url,
    logo: `${url}/logo.png`,
    image: `${url}${siteConfig.seo.ogImage}`,
    telephone: contact.phones[0].href.replace("tel:", ""),
    email: contact.emails[0].email,
    identifier: {
      "@type": "PropertyValue",
      propertyID: "IČO",
      value: siteConfig.ico,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.street,
      addressLocality: `${contact.address.city} – ${contact.address.district}`,
      postalCode: contact.address.postalCode,
      addressCountry: contact.address.country,
    },
    areaServed: [
      { "@type": "City", name: "Praha" },
      { "@type": "Country", name: "Česká republika" },
    ],
    knowsAbout: ["Elektromontážní práce", "Elektroinstalace", "Stavební práce související s elektroinstalací"],
    // nabízené služby – přímo z konfigurace webu
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Služby",
      itemListElement: [...siteConfig.services.items, ...siteConfig.construction.items].map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.description },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify + escapování „<“ zabrání ukončení <script> v datech
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
