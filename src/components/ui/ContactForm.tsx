"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck, LoaderCircle, Send, TriangleAlert } from "lucide-react";
import { siteConfig } from "@/config/site";
import { inquirySchema, type Inquiry, type InquiryInput } from "@/lib/schemas";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "success" | "error";

const fieldBase =
  "block w-full rounded-xl border-0 bg-white px-4 py-3.5 text-base text-ink ring-1 ring-line placeholder:text-muted/70 transition-shadow focus:ring-2 focus:ring-brand focus:outline-none aria-[invalid=true]:ring-red-600";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const { contactSection } = siteConfig;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InquiryInput, unknown, Inquiry>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { name: "", phone: "", email: "", location: "", message: "", website: "" },
    mode: "onTouched",
  });

  const onSubmit = async (data: Inquiry) => {
    setStatus("idle");
    try {
      const res = await fetch("/api/poptavka", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  const contactError = errors.phone?.message ?? errors.email?.message;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5" aria-describedby="form-note">
      {/* Honeypot – pro roboty, skryto lidem i čtečkám */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Web
          <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>

      <Field label="Jméno" htmlFor="name" required error={errors.name?.message}>
        <input
          id="name"
          type="text"
          autoComplete="name"
          className={fieldBase}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "name-error" : undefined}
          {...register("name")}
        />
      </Field>

      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-ink">
          Telefon nebo e-mail <span className="font-normal text-muted">(stačí jedno)</span>
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="phone" className="sr-only">
              Telefon
            </label>
            <input
              id="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="Telefon"
              className={fieldBase}
              aria-invalid={errors.phone ? true : undefined}
              aria-describedby={contactError ? "contact-error" : undefined}
              {...register("phone")}
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="E-mail"
              className={fieldBase}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={contactError ? "contact-error" : undefined}
              {...register("email")}
            />
          </div>
        </div>
        {contactError ? (
          <p id="contact-error" role="alert" className="mt-2 text-sm font-medium text-red-700">
            {contactError}
          </p>
        ) : null}
      </fieldset>

      <Field label="Místo zakázky" htmlFor="location" required error={errors.location?.message}>
        <input
          id="location"
          type="text"
          autoComplete="address-level2"
          placeholder="Např. Praha 10"
          className={fieldBase}
          aria-invalid={errors.location ? true : undefined}
          aria-describedby={errors.location ? "location-error" : undefined}
          {...register("location")}
        />
      </Field>

      <Field label="Popis poptávky" htmlFor="message" required error={errors.message?.message}>
        <textarea
          id="message"
          rows={5}
          placeholder="Co potřebujete udělat, rozsah prací, případně termín…"
          className={`${fieldBase} resize-y`}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          {...register("message")}
        />
      </Field>

      <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <p id="form-note" className="text-sm leading-relaxed text-muted sm:max-w-xs">
          Odesláním souhlasíte se{" "}
          <Link href="/gdpr" className="font-medium text-brand underline underline-offset-4">
            zpracováním osobních údajů
          </Link>{" "}
          za účelem vyřízení poptávky.
        </p>
        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? (
            <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
          ) : (
            <Send aria-hidden="true" className="size-4" />
          )}
          {isSubmitting ? "Odesílám…" : "Odeslat poptávku"}
        </Button>
      </div>

      <div aria-live="polite">
        {status === "success" ? (
          <p className="flex items-start gap-3 rounded-xl bg-brand-50 p-4 font-medium text-brand ring-1 ring-brand/15">
            <CircleCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
            {contactSection.success}
          </p>
        ) : null}
        {status === "error" ? (
          <p role="alert" className="flex items-start gap-3 rounded-xl bg-red-50 p-4 font-medium text-red-800 ring-1 ring-red-200">
            <TriangleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
            {contactSection.error}
          </p>
        ) : null}
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold text-ink">
        {label}
        {required ? (
          <span className="text-red-700" aria-hidden="true">
            {" "}
            *
          </span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} role="alert" className="mt-2 text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
