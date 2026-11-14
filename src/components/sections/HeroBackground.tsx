"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// WebGL pozadí se načítá líně a jen na větších displejích (úspora výkonu na mobilu)
const DotGrid = dynamic(() => import("@/components/reactbits/DotGrid"), { ssr: false });

export function HeroBackground() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f3f7f5_60%,#ffffff_100%)]" />
      {/* statický vzor jako základ (mobil, reduced motion, bez JS) */}
      <div className="pattern-grid-dark absolute inset-0 [mask-image:radial-gradient(70%_60%_at_70%_40%,black,transparent)]" />
      {enabled ? (
        <div className="absolute inset-0 [mask-image:radial-gradient(60%_70%_at_75%_45%,black,transparent)]">
          <DotGrid
            dotSize={3}
            gap={26}
            baseColor="#cfdcd6"
            activeColor="#b6955c"
            proximity={120}
            opacity={0.9}
            glow={0.4}
          />
        </div>
      ) : null}
      <div className="absolute -top-40 -right-40 size-[36rem] rounded-full bg-gold/10 blur-3xl" />
    </div>
  );
}
