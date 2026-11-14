import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  id?: string;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  id,
  intro,
  align = "left",
  tone = "light",
  className = "",
}: SectionHeadingProps) {
  const onDark = tone === "dark";
  return (
    <div
      data-reveal
      className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""} ${className}`}
    >
      <p
        className={`mb-3 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase ${
          onDark ? "text-gold-light" : "text-gold-ink"
        }`}
      >
        <span aria-hidden="true" className="h-px w-8 bg-gold" />
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`text-3xl leading-tight font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] ${
          onDark ? "text-white" : "text-brand"
        }`}
      >
        {title}
      </h2>
      {intro ? (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${onDark ? "text-white/80" : "text-muted"}`}>
          {intro}
        </p>
      ) : null}
    </div>
  );
}
