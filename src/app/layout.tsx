import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import { siteConfig } from "@/config/site";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/layout/JsonLd";
import { Intro } from "@/components/layout/Intro";
import { introCriticalCss, introInitScript } from "@/lib/intro";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.seo.title,
    template: siteConfig.seo.titleTemplate,
  },
  description: siteConfig.seo.description,
  keywords: [...siteConfig.seo.keywords],
  applicationName: siteConfig.legalName,
  authors: [{ name: siteConfig.legalName }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    siteName: siteConfig.legalName,
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [{ url: siteConfig.seo.ogImage, width: 1200, height: 630, alt: siteConfig.logo.alt }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [siteConfig.seo.ogImage],
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: true, email: true, address: true },
};

export const viewport: Viewport = {
  themeColor: "#14473a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: atribut data-intro nastavuje inline skript ještě před hydratací
    <html lang="cs" className={`${inter.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <head>
        {siteConfig.intro.enabled ? (
          <>
            <style dangerouslySetInnerHTML={{ __html: introCriticalCss }} />
            <script dangerouslySetInnerHTML={{ __html: introInitScript }} />
          </>
        ) : null}
      </head>
      <body className="min-h-dvh">
        <a
          href="#obsah"
          className="sr-only z-[100] rounded-full bg-brand px-5 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Přeskočit na obsah
        </a>
        <JsonLd />
        <SmoothScroll>
          {siteConfig.intro.enabled ? <Intro /> : null}
          <Header />
          <main id="obsah">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
