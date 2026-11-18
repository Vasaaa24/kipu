"use client";

import { Menu, Phone, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/ui/Logo";
import { buttonClass } from "@/components/ui/Button";
import { useLenis } from "@/components/layout/SmoothScroll";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lenis = useLenis();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const phone = siteConfig.contact.phones[0];
  // Na podstránkách (např. /gdpr) vedou kotvy na úvodní stránku
  const prefix = usePathname() === "/" ? "" : "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  // Při otevřeném menu zastavit scroll stránky
  useEffect(() => {
    if (open) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
    }
  }, [open, lenis]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        solid ? "bg-white/95 shadow-[0_1px_0_rgb(20_71_58/0.08),0_8px_24px_-16px_rgb(20_71_58/0.25)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-20">
        <a href={prefix + "#top"} className="shrink-0 rounded-md" aria-label="KIPU, s.r.o. – na začátek stránky" onClick={close}>
          <Logo priority className="h-9 w-auto lg:h-11" />
        </a>

        <nav aria-label="Hlavní navigace" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={prefix + item.href}
                  className="rounded-full px-3.5 py-2 text-[0.92rem] font-medium text-ink/80 transition-colors hover:bg-brand-50 hover:text-brand"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={phone.href}
            className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-brand hover:bg-brand-50 sm:inline-flex"
          >
            <Phone aria-hidden="true" className="size-4" />
            {phone.display}
          </a>
          <div className="hidden lg:block">
            <a href={prefix + siteConfig.hero.ctaPrimary.href} className={buttonClass("primary", "min-h-11 px-5")}>
              {siteConfig.hero.ctaPrimary.label}
            </a>
          </div>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full text-brand hover:bg-brand-50 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Zavřít menu" : "Otevřít menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          className="animate-fade-in h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-white lg:hidden"
          data-lenis-prevent
        >
          <nav aria-label="Mobilní navigace" className="container-page py-6">
            <ul className="flex flex-col">
              {siteConfig.nav.map((item) => (
                <li key={item.href} className="border-b border-line">
                  <a
                    href={prefix + item.href}
                    onClick={close}
                    className="flex items-center justify-between py-4 font-heading text-xl font-semibold text-brand"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3">
              <a href={prefix + siteConfig.hero.ctaPrimary.href} onClick={close} className={buttonClass("primary", "w-full")}>
                {siteConfig.hero.ctaPrimary.label}
              </a>
              <a href={phone.href} className={buttonClass("secondary", "w-full")}>
                <Phone aria-hidden="true" className="size-4" />
                {phone.display}
              </a>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
