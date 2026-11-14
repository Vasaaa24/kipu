import { z } from "zod";

const PHONE_RE = /^\+?[\d\s()-]{9,20}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Schéma poptávky – sdílené klientem (React Hook Form) i serverem (Route Handler) */
export const inquirySchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Vyplňte prosím jméno.")
      .max(100, "Jméno je příliš dlouhé."),
    phone: z
      .string()
      .trim()
      .max(20, "Telefon je příliš dlouhý.")
      .refine((v) => v === "" || PHONE_RE.test(v), "Zadejte platné telefonní číslo."),
    email: z
      .string()
      .trim()
      .max(150, "E-mail je příliš dlouhý.")
      .refine((v) => v === "" || EMAIL_RE.test(v), "Zadejte platnou e-mailovou adresu."),
    location: z
      .string()
      .trim()
      .min(2, "Uveďte prosím místo zakázky.")
      .max(150, "Text je příliš dlouhý."),
    message: z
      .string()
      .trim()
      .min(10, "Popište prosím poptávku (alespoň pár slov).")
      .max(4000, "Popis je příliš dlouhý."),
    /** Honeypot proti spamu – skryté pole, člověk ho nevyplní */
    website: z.string().max(200).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.phone === "" && data.email === "") {
      const message = "Vyplňte telefon nebo e-mail (stačí jedno).";
      ctx.addIssue({ code: "custom", path: ["phone"], message });
      ctx.addIssue({ code: "custom", path: ["email"], message });
    }
  });

export type InquiryInput = z.input<typeof inquirySchema>;
export type Inquiry = z.output<typeof inquirySchema>;
