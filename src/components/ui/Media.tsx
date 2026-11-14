import Image from "next/image";
import type { LucideIcon } from "lucide-react";

type MediaProps = {
  image?: { src: string; alt: string } | null;
  icon: LucideIcon;
  /** Barevná varianta placeholderu */
  tone?: "brand" | "gold";
  /** Text pro správce webu – co sem patří (zobrazuje se nenápadně) */
  caption?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/**
 * Obrázek, nebo elegantní placeholder, dokud fotka není k dispozici.
 * Rodič musí mít definovaný rozměr / aspect-ratio (komponenta je `absolute inset-0`).
 */
export function Media({
  image,
  icon: Icon,
  tone = "brand",
  caption,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  priority = false,
  className = "",
}: MediaProps) {
  if (image) {
    return (
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${className}`}
      />
    );
  }

  const bg =
    tone === "brand"
      ? "bg-[radial-gradient(120%_90%_at_100%_0%,#2a6b59_0%,#14473a_45%,#0b2a22_100%)]"
      : "bg-[radial-gradient(120%_90%_at_100%_0%,#d8c39c_0%,#b6955c_45%,#7d6232_100%)]";

  return (
    <div aria-hidden="true" className={`absolute inset-0 overflow-hidden ${bg} ${className}`}>
      <div className="pattern-grid absolute inset-0" />
      {/* dekorativní „vedení“ */}
      <svg className="absolute inset-0 h-full w-full opacity-25" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
        <path d="M-10 220 H120 L160 180 H260 L300 140 H420" fill="none" stroke="white" strokeWidth="1.5" />
        <path d="M-10 250 H90 L130 210 H230 L270 170 H420" fill="none" stroke="white" strokeWidth="1" strokeDasharray="4 6" />
        <circle cx="160" cy="180" r="4" fill="white" />
        <circle cx="300" cy="140" r="4" fill="white" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex size-16 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20 backdrop-blur-sm">
          <Icon className="size-8 text-white" strokeWidth={1.5} />
        </span>
      </div>
      {caption ? (
        <span className="absolute right-3 bottom-3 rounded-full bg-black/20 px-2.5 py-1 text-[0.7rem] font-medium tracking-wide text-white/80">
          {caption}
        </span>
      ) : null}
    </div>
  );
}
