import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/config/site";
import { inquirySchema } from "@/lib/schemas";
import { inquirySubject, renderInquiryEmail } from "@/lib/email";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Neplatný požadavek." }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Neplatná data formuláře.", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const data = parsed.data;

  // Honeypot vyplněný = robot. Tváříme se, že vše proběhlo.
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[poptavka] Chybí RESEND_API_KEY v .env.local");
    return NextResponse.json({ ok: false, error: "Odesílání není nakonfigurováno." }, { status: 500 });
  }

  const override = process.env.CONTACT_TO_OVERRIDE?.split(",").map((s) => s.trim()).filter(Boolean);
  const to = override && override.length > 0 ? override : [...siteConfig.form.recipients];
  const from = process.env.RESEND_FROM ?? "KIPU web <onboarding@resend.dev>";

  const { html, text } = renderInquiryEmail(data, { siteUrl: siteConfig.url });
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to,
    subject: inquirySubject(data),
    html,
    text,
    ...(data.email ? { replyTo: data.email } : {}),
  });

  if (error) {
    console.error("[poptavka] Resend error:", error);
    return NextResponse.json({ ok: false, error: "E-mail se nepodařilo odeslat." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
