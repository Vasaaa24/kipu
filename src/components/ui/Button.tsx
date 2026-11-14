import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost-light";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-[0.95rem] font-semibold transition-[background-color,color,box-shadow,transform] duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-white shadow-[0_10px_30px_-12px_rgb(20_71_58/0.6)] hover:bg-brand-700 hover:shadow-[0_14px_34px_-12px_rgb(20_71_58/0.7)]",
  secondary: "bg-white text-brand ring-1 ring-inset ring-brand/20 hover:bg-brand-50 hover:ring-brand/40",
  "ghost-light": "bg-white/10 text-white ring-1 ring-inset ring-white/25 hover:bg-white/20",
};

export function buttonClass(variant: Variant = "primary", className = "") {
  return `${base} ${variants[variant]} ${className}`.trim();
}

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  children: ReactNode;
};

export function LinkButton({ variant = "primary", className = "", children, ...rest }: LinkButtonProps) {
  return (
    <a className={buttonClass(variant, className)} {...rest}>
      {children}
    </a>
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
};

export function Button({ variant = "primary", className = "", children, ...rest }: ButtonProps) {
  return (
    <button className={buttonClass(variant, className)} {...rest}>
      {children}
    </button>
  );
}
