import Image from "next/image";
import { siteConfig } from "@/config/site";

type LogoProps = {
  /** Varianta pro tmavé pozadí (zelené části bílé) */
  onDark?: boolean;
  className?: string;
  priority?: boolean;
};

export function Logo({ onDark = false, className, priority = false }: LogoProps) {
  const { logo } = siteConfig;
  const src = onDark ? logo.srcOnDark : logo.src;

  return (
    <Image
      src={src}
      alt={logo.alt}
      width={logo.width}
      height={logo.height}
      priority={priority}
      unoptimized={src.endsWith(".svg")}
      sizes="(min-width: 640px) 200px, 160px"
      className={className}
    />
  );
}
