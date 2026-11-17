/**
 * Centrální konfigurace webu KIPU, s.r.o.
 * Všechny texty, kontakty a nastavení upravujte zde.
 */

export type IconKey =
  | "zap"
  | "home"
  | "rebuild"
  | "panel"
  | "light"
  | "cable"
  | "wrench"
  | "drill"
  | "brick"
  | "roller"
  | "layers"
  | "user"
  | "file"
  | "chat"
  | "check"
  | "inbox"
  | "clipboard"
  | "calendar"
  | "handshake";

export type ServiceItem = {
  title: string;
  description: string;
  icon: IconKey;
};

/** Fotka – soubor v public/images, alt = popis pro nevidomé a vyhledávače */
export type Photo = { src: string; alt: string };

export type NavItem = { label: string; href: `#${string}` };

const phoneDisplay = "777 654 494";

export const siteConfig = {
  name: "KIPU",
  legalName: "KIPU, s.r.o.",
  ico: "25684574",
  /**
   * Produkční URL (pro náhledy odkazů – og:image, sitemap, kanonickou adresu).
   * Pořadí: NEXT_PUBLIC_SITE_URL → produkční adresa projektu na Vercelu
   * (nastavuje Vercel sám; po připojení vlastní domény je to ta doména) → www.kipu.cz.
   */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://www.kipu.cz"),
  locale: "cs_CZ",

  /**
   * Logo – pro výměnu za SVG stačí nahrát soubor do /public
   * a změnit `src` / `srcOnDark` (a poměr stran width/height).
   */
  logo: {
    src: "/logo-compact.png",
    srcOnDark: "/logo-compact-light.png",
    width: 1900,
    height: 482,
    alt: "KIPU, s.r.o. – elektromontážní firma",
  },

  seo: {
    title: "KIPU, s.r.o. – elektromontážní firma Praha",
    titleTemplate: "%s | KIPU, s.r.o.",
    description:
      "KIPU, s.r.o. – elektromontážní firma z Prahy. Elektromontážní práce a elektroinstalace, doplněné o související stavební úpravy. Nezávazná poptávka.",
    keywords: [
      "elektromontáže",
      "elektroinstalace",
      "elektrikář Praha",
      "elektromontážní firma",
      "rekonstrukce elektroinstalace",
      "rozvaděče",
      "Praha 10",
    ],
    ogImage: "/og-image.png",
  },

  /** Filmové intro před zobrazením webu (při každém načtení homepage). `enabled: false` = vypnout */
  intro: {
    enabled: true,
    tagline: "Elektromontážní firma",
  },

  /**
   * Slogan – zatím k ověření. Pro skrytí nastavte `enabled: false`
   * (zmizí z hero i z počítadla let).
   * POZOR: aktuální logo (logo.png) má slogan přímo v obrázku –
   * v headeru/footeru se proto používá kompaktní verze bez sloganu.
   */
  slogan: {
    enabled: true,
    text: "Jsme s vámi více než 25 let na trhu",
    years: 25,
    yearsLabel: "let na trhu",
  },

  contact: {
    phones: [
      {
        name: "Vadym",
        display: phoneDisplay,
        href: "tel:+420777654494",
      },
    ],
    emails: [
      { name: "Vadym", role: "Poptávky a realizace", email: "krychfalushii@kipu.cz" },
      { name: "Elvir Karadža", role: "Poptávky a realizace", email: "karadza@kipu.cz" },
      { name: "Fakturace", role: "Faktury a účetnictví", email: "faktury@kipu.cz" },
    ],
    address: {
      street: "Kazašská 1425/8",
      district: "Vršovice",
      postalCode: "101 00",
      city: "Praha 10",
      country: "CZ",
    },
    serviceArea: "Celá Česká republika",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Kaza%C5%A1sk%C3%A1+1425%2F8%2C+101+00+Praha+10",
    mapsEmbedUrl:
      "https://maps.google.com/maps?q=Kaza%C5%A1sk%C3%A1%201425%2F8%2C%20101%2000%20Praha%2010&z=15&output=embed",
  },

  /** Kam chodí poptávky z formuláře (lze přepsat v .env přes CONTACT_TO_OVERRIDE) */
  form: {
    recipients: ["krychfalushii@kipu.cz", "karadza@kipu.cz"],
  },

  nav: [
    { label: "Služby", href: "#sluzby" },
    { label: "Proč my", href: "#proc-my" },
    { label: "Spolupráce", href: "#spoluprace" },
    { label: "O nás", href: "#o-nas" },
    { label: "Kontakt", href: "#kontakt" },
  ] satisfies NavItem[],

  hero: {
    eyebrow: "Elektromontáže · Praha",
    title: "KIPU – elektromontážní firma",
    subtitle: "Elektroinstalace a doplňkové stavební práce.",
    ctaPrimary: { label: "Nezávazná poptávka", href: "#kontakt" },
    ctaSecondary: { label: "Naše služby", href: "#sluzby" },
    highlights: ["Elektromontážní práce", "Elektroinstalace", "Související stavební úpravy"],
    /** Štítek u vizuálu v hero */
    badge: "Elektromontáže Praha",
    /** Hlavní fotka v hero (null = elegantní placeholder) */
    image: {
      src: "/images/tym-rozvadece.jpg",
      alt: "Technici KIPU kontrolují výkresovou dokumentaci u rozvaděčů v průmyslové hale",
    } as Photo | null,
  },

  services: {
    eyebrow: "Služby",
    title: "Elektromontážní práce a elektroinstalace",
    intro:
      "Hlavní náplní naší práce jsou elektromontáže a elektroinstalace. Rozsah prací vždy upřesníme podle konkrétní zakázky.",
    items: [
      {
        title: "Elektroinstalace novostaveb",
        description:
          "Kompletní elektroinstalace v nových objektech – od rozvržení okruhů po montáž koncových prvků.",
        icon: "home",
      },
      {
        title: "Rekonstrukce elektroinstalace",
        description:
          "Výměna a modernizace stávajících rozvodů v bytech, domech a komerčních prostorech.",
        icon: "rebuild",
      },
      {
        title: "Rozvaděče a jištění",
        description:
          "Montáž a úpravy rozvaděčů, jističů a proudových chráničů.",
        icon: "panel",
      },
      {
        title: "Osvětlení",
        description:
          "Montáž vnitřního i venkovního osvětlení, svítidel a ovládacích prvků.",
        icon: "light",
      },
      {
        title: "Slaboproudé rozvody",
        description:
          "Datové a televizní rozvody, příprava pro zabezpečení a další slaboproudé instalace.",
        icon: "cable",
      },
      {
        title: "Elektromontážní práce na zakázku",
        description:
          "Úpravy, rozšíření a drobné elektromontáže podle potřeb zákazníka.",
        icon: "wrench",
      },
    ] satisfies ServiceItem[],
    /** Fotky pod kartami služeb (libovolný počet, ideálně 3) */
    gallery: [
      { src: "/images/rozvadec.jpg", alt: "Otevřený rozvaděč s jističi, přípojnicemi a přehledně vedenými vodiči", caption: "Rozvaděče a jištění" },
      { src: "/images/kabelove-trasy.jpg", alt: "Kabelové žlaby se silovými kabely vedené pod stropem technické chodby", caption: "Kabelové trasy" },
      { src: "/images/osvetleni-haly.jpg", alt: "Průmyslová hala s LED osvětlením a kabelovými žlaby pod střechou", caption: "Osvětlení hal" },
    ] satisfies (Photo & { caption: string })[],
  },

  construction: {
    eyebrow: "Doplňková služba",
    title: "Doplňkové stavební práce",
    intro:
      "Stavební úpravy související s elektromontážemi – abyste nemuseli shánět další firmu na zapravení po elektrikářích.",
    items: [
      {
        title: "Drážky a zapravení",
        description: "Sekání drážek pro rozvody a jejich následné zapravení.",
        icon: "drill",
      },
      {
        title: "Prostupy a drobné bourací práce",
        description: "Prostupy zdmi a stropy pro vedení kabeláže.",
        icon: "brick",
      },
      {
        title: "Omítky a malby",
        description: "Opravy omítek a povrchů po elektroinstalaci.",
        icon: "roller",
      },
      {
        title: "Sádrokartonové úpravy",
        description: "Podhledy a předstěny pro vedení instalací a osvětlení.",
        icon: "layers",
      },
    ] satisfies ServiceItem[],
  },

  whyUs: {
    eyebrow: "Proč my",
    title: "Proč spolupracovat s KIPU",
    items: [
      {
        title: "Jeden kontakt",
        description:
          "Elektromontáže i související stavební práce řešíte s jednou firmou. Bez koordinace dalších dodavatelů.",
        icon: "user",
      },
      {
        title: "Jasná nabídka",
        description:
          "Rozsah prací, cenu a termín si domluvíme předem. Nabídka je přehledná a bez skrytých položek.",
        icon: "file",
      },
      {
        title: "Průběžná komunikace",
        description:
          "Během realizace víte, v jaké fázi zakázka je. Případné změny řešíme včas a společně.",
        icon: "chat",
      },
      {
        title: "Pečlivé provedení a předání",
        description:
          "Práci odvádíme pečlivě a zakázku řádně předáme včetně potřebné dokumentace.",
        icon: "check",
      },
    ] satisfies ServiceItem[],
  },

  process: {
    eyebrow: "Spolupráce",
    title: "Jak probíhá spolupráce",
    intro:
      "Od první poptávky po předání zakázky. Víte, co vás čeká, a rozsah, cenu i termín máte domluvené předem.",
    image: {
      src: "/images/montaz-kabelovych-tras.jpg",
      alt: "Dva elektromontéři na pracovní plošině montují kabelový žlab v hale",
    } as Photo | null,
    steps: [
      {
        title: "Poptávka",
        description: "Pošlete nám poptávku přes formulář, e-mailem nebo zavolejte.",
        icon: "inbox",
      },
      {
        title: "Upřesnění zadání",
        description: "Probereme rozsah prací, případně se domluvíme na prohlídce místa.",
        icon: "clipboard",
      },
      {
        title: "Cenová nabídka",
        description: "Připravíme přehlednou cenovou nabídku podle upřesněného zadání.",
        icon: "file",
      },
      {
        title: "Dohoda o termínu",
        description: "Domluvíme termín zahájení a předpokládanou dobu realizace.",
        icon: "calendar",
      },
      {
        title: "Realizace a předání",
        description: "Práce provedeme a zakázku s vámi řádně předáme.",
        icon: "handshake",
      },
    ] satisfies ServiceItem[],
  },

  about: {
    eyebrow: "O nás",
    title: "Elektromontážní firma z Prahy",
    paragraphs: [
      "KIPU, s.r.o. je elektromontážní firma zaměřená na elektromontážní práce a elektroinstalace. Nabídku doplňujeme stavebními pracemi, aby zákazník mohl řešit i související úpravy v rámci jedné spolupráce.",
      "Zakládáme si na jasné domluvě, přehledné nabídce a pečlivém provedení. Rozsah prací, cenu a termín si domluvíme před zahájením zakázky.",
    ],
    values: ["Jasná domluva", "Přehledná nabídka", "Pečlivé provedení"],
    image: {
      src: "/images/montaz-konzoli.jpg",
      alt: "Elektromontér KIPU kotví nosnou konzoli kabelového žlabu do betonové stěny",
    } as Photo | null,
  },

  contactSection: {
    eyebrow: "Kontakt",
    title: "Nezávazná poptávka",
    intro:
      "Popište nám, co potřebujete. Ozveme se vám zpět a domluvíme další postup. Vyplňte prosím telefon nebo e-mail – stačí jedno z nich.",
    success: "Děkujeme, poptávka byla odeslána. Ozveme se vám co nejdříve.",
    error:
      "Poptávku se nepodařilo odeslat. Zkuste to prosím znovu, nebo nám zavolejte či napište e-mail.",
  },

  footer: {
    note: "Elektromontážní práce a elektroinstalace, doplněné o související stavební práce.",
  },
} as const;

export type SiteConfig = typeof siteConfig;

export const fullAddress = `${siteConfig.contact.address.street}, ${siteConfig.contact.address.district}, ${siteConfig.contact.address.postalCode} ${siteConfig.contact.address.city}`;
