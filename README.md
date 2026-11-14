# KIPU, s.r.o. – firemní web

One-page web elektromontážní firmy KIPU, s.r.o. (Praha) + stránka `/gdpr`.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · GSAP + ScrollTrigger (`@gsap/react`) · Lenis · React Bits · React Hook Form + Zod · Resend

---

## Spuštění

Potřebujete Node.js 20+ (testováno na Node 24).

```bash
npm install
cp .env.example .env.local   # a doplňte hodnoty (viz níže)
npm run dev                  # http://localhost:3000
```

Produkční build:

```bash
npm run build
npm run start
npm run lint
```

> Pokud `npm install` spadne s chybou `Invalid Version:`, máte starou globální verzi npm (10.5.x).
> Aktualizujte ji (`npm i -g npm@latest`), nebo použijte `npx npm@11 install`.

---

## Kde co upravit

| Co | Kde |
|---|---|
| **Všechny texty, kontakty, navigace, slogan, služby** | `src/config/site.ts` |
| **Realizace (galerie)** | `src/data/projects.ts` |
| Barvy, písma, design tokeny | `src/app/globals.css` (`@theme`) |
| Sekce stránky | `src/components/sections/*` |
| Text zásad ochrany osobních údajů | `src/app/gdpr/page.tsx` |

### Položky k doplnění / ověření

Hledejte v kódu `DOPLNIT` a `TODO`:

- **Slogan „Jsme s vámi více než 25 let na trhu“** – `siteConfig.slogan`. Pro skrytí `enabled: false`
  (zmizí slogan v hero i počítadlo „25+ let na trhu“). Pozor: současný obrázek loga (`/public/logo.png`)
  má slogan přímo v sobě – v headeru a patičce se proto používá kompaktní verze bez sloganu.
- **Oblast působení** – `siteConfig.contact.serviceArea` (zatím „DOPLNIT“). Po doplnění se automaticky
  propíše i do strukturovaných dat (JSON-LD).
- **Texty služeb** – `siteConfig.services.items` a `siteConfig.construction.items` (označeno `[Text k doplnění]`).
- **Realizace** – `src/data/projects.ts` (místa, roky, popisy; u skutečných zakázek smažte `placeholder: true`).
- **Doba uchování osobních údajů** v `/gdpr` (zatím 12 měsíců) – nechte text ideálně zkontrolovat.
- **Produkční doména** – `NEXT_PUBLIC_SITE_URL` (výchozí `https://www.kipu.cz`).

---

## Fotky

Web je připravený tak, že kde chybí fotka, zobrazí se elegantní placeholder. Jakmile fotku doplníte,
placeholder se automaticky nahradí (přes `next/image` – optimalizace a responzivní velikosti).

1. **Realizace:** nahrajte fotky do `public/images/realizace/` a v `src/data/projects.ts` doplňte:
   ```ts
   image: { src: "/images/realizace/byt-praha-10.jpg", alt: "Nový rozvaděč v bytě, Praha 10" },
   ```
2. **Hero (hlavní vizuál):** nahrajte např. `public/images/hero.jpg` a v `src/config/site.ts` nastavte:
   ```ts
   hero: { …, image: { src: "/images/hero.jpg", alt: "Elektromontážní práce KIPU" } }
   ```

Doporučení: JPG/WebP, šířka cca 1600–2400 px, vždy vyplňte smysluplný `alt` text.

---

## Logo

Soubory v `public/`:

| Soubor | Použití |
|---|---|
| `logo-compact.png` | header (emblém + „KIPU s.r.o.“, bez sloganu) |
| `logo-compact-light.png` | patička – varianta pro tmavé pozadí (zelená → bílá) |
| `logo.png` / `logo-light.png` | plné logo vč. sloganu (JSON-LD, případné další použití) |
| `logo-mark.png` | samotný emblém (dekorace v sekcích) |
| `og-image.png` | náhled při sdílení (1200×630) |
| `src/app/icon.png`, `src/app/apple-icon.png` | favicon / ikona na plochu |

Všechny PNG jsou zatím vygenerované z dodaného JPG (pozadí odstraněno).

**Výměna za finální SVG:** nahrajte např. `public/logo.svg` a `public/logo-light.svg` a v `src/config/site.ts`
změňte `logo.src`, `logo.srcOnDark` a poměr stran `width`/`height` (podle `viewBox` SVG). Nic dalšího
měnit není potřeba – komponenta `Logo` SVG pozná a vykreslí ho bez optimalizace.
Favicon (`src/app/icon.png`) lze nahradit souborem `src/app/icon.svg`. OG obrázek doporučujeme
přegenerovat s finálním logem.

---

## Formulář a Resend

Poptávky se odesílají přes Route Handler `src/app/api/poptavka/route.ts` (validace Zod na klientu
i serveru, skryté pole proti spamu) službou [Resend](https://resend.com).
Příjemci: `siteConfig.form.recipients` → **krychfalushii@kipu.cz, karadza@kipu.cz**.
Pokud zákazník vyplní e-mail, je nastaven jako `Reply-To` – stačí odpovědět.

### 1. API klíč

1. Zaregistrujte se na [resend.com](https://resend.com) → **API Keys** → *Create API Key* (oprávnění *Sending access*).
2. Klíč vložte do `.env.local`:
   ```
   RESEND_API_KEY=re_…
   ```
3. Na hostingu (např. Vercel) nastavte stejné proměnné v *Environment Variables*.

### 2. Testování (před ověřením domény)

S odesílatelem `onboarding@resend.dev` Resend **doručuje jen na e-mail, pod kterým je účet Resend
registrován**. Pro test proto nastavte:

```
RESEND_FROM="KIPU web <onboarding@resend.dev>"
CONTACT_TO_OVERRIDE=vas-email-z-resend-uctu@example.com
```

### 3. Ověření domény kipu.cz (ostrý provoz)

1. V Resendu: **Domains → Add Domain** → zadejte `kipu.cz` (doporučený region EU – Ireland).
2. Resend zobrazí DNS záznamy (typicky **TXT** pro SPF a DKIM `resend._domainkey`, **MX** pro subdoménu
   `send`, volitelně **TXT** `_dmarc`). Přidejte je v DNS u správce domény kipu.cz.
   - Stávajících MX záznamů hlavní domény (doručování pošty na @kipu.cz) se to netýká – Resend používá
     subdoménu `send.kipu.cz`.
3. Počkejte na ověření (minuty až hodiny) – stav v Resendu se změní na **Verified**.
4. V `.env.local` / na hostingu nastavte:
   ```
   RESEND_FROM="KIPU web <web@kipu.cz>"
   CONTACT_TO_OVERRIDE=
   ```
   (prázdný `CONTACT_TO_OVERRIDE` = poptávky chodí na adresy z `site.ts`).

---

## Úvodní animace (intro)

Před zobrazením webu se přehraje krátké intro (~2,5 s): zlatá linka, logo, podtitul a odkrytí webu
dvouvrstvou „oponou“; hero animace na něj plynule navazují.

- Přehraje se **jen na homepage a jen jednou za návštěvu** (sessionStorage), kliknutím / klávesou jde přeskočit.
- Nepřehraje se při `prefers-reduced-motion` ani bez JavaScriptu (pojistka: overlay po 5 s zmizí vždy).
- Vypnutí / text: `siteConfig.intro` (`enabled`, `tagline`). Komponenta `src/components/layout/Intro.tsx`,
  časování `src/lib/intro.ts`. Logo v intru je `logo.srcOnDark` – po výměně za SVG se změní samo.
- Pro opakované testování: v DevTools smažte *Session Storage* → `kipu-intro-seen`, nebo otevřete nové okno.

## Animace a přístupnost

- **Lenis** (smooth scroll) je propojen s GSAP ScrollTrigger podle README Lenis
  (`lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker`) – `src/components/layout/SmoothScroll.tsx`.
- Při **`prefers-reduced-motion: reduce`** se Lenis vůbec nespustí a všechny GSAP animace jsou vypnuté
  (`gsap.matchMedia`); obsah je ihned viditelný. React Bits komponenty reduced motion respektují samy.
- Animace používají jen `transform` a `opacity`.
- Mapa (Google Maps) se načte až po kliknutí – bez cookies třetích stran při běžné návštěvě.

## React Bits

Komponenty jsou přidané přes shadcn CLI (registry `@react-bits` v `components.json`) do
`src/components/reactbits/`:

- **SplitText** – animace nadpisu v hero
- **SpotlightCard** – karty elektro služeb
- **CountUp** – počítadlo „25+ let na trhu“
- **DotGrid** – jemné interaktivní pozadí hero (jen desktop, načítá se líně)

Úprava oproti originálu: v `DotGrid` a `SpotlightCard` je zápis do `ref` přesunut z renderu do
`useLayoutEffect` (kvůli ESLint pravidlu `react-hooks/refs`).

Další komponenty:

```bash
npx shadcn@latest add @react-bits/<Nazev>-TS-TW
```

Pro Claude Code je v `.mcp.json` připojen **shadcn MCP server** (vyhledávání a přidávání komponent
z registry). Aktivuje se po restartu Claude Code ve složce projektu (potvrďte povolení serveru).

## SEO

Metadata + Open Graph (`src/app/layout.tsx`), `sitemap.xml`, `robots.txt`, JSON-LD typu `Electrician`
(`src/components/layout/JsonLd.tsx`), `lang="cs"`.
