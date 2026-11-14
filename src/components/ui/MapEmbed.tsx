"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { fullAddress, siteConfig } from "@/config/site";

/**
 * Mapa se načte až po kliknutí – Google Maps neukládá cookies
 * bez akce návštěvníka a stránka zůstane rychlá.
 */
export function MapEmbed() {
  const [loaded, setLoaded] = useState(false);
  const { contact } = siteConfig;

  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-brand-50 ring-1 ring-line">
      {loaded ? (
        <iframe
          title={`Mapa – ${fullAddress}`}
          src={contact.mapsEmbedUrl}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          data-lenis-prevent
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
          <div aria-hidden="true" className="pattern-grid-dark absolute inset-0" />
          <span className="relative flex size-12 items-center justify-center rounded-full bg-brand text-white shadow-lg">
            <MapPin aria-hidden="true" className="size-6" />
          </span>
          <p className="relative text-sm font-medium text-ink">{fullAddress}</p>
          <div className="relative flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => setLoaded(true)}
              className="min-h-10 rounded-full bg-white px-4 text-sm font-semibold text-brand ring-1 ring-line hover:ring-brand/30"
            >
              Zobrazit mapu
            </button>
            <a
              href={contact.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center rounded-full px-4 text-sm font-semibold text-brand underline underline-offset-4"
            >
              Otevřít v Google Maps
              <span className="sr-only"> (otevře se v novém okně)</span>
            </a>
          </div>
          <p className="relative text-xs text-muted">Zobrazením mapy se načte obsah ze služby Google Maps.</p>
        </div>
      )}
    </div>
  );
}
