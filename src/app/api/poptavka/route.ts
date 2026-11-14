import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/config/site";
import { inquirySchema, type Inquiry } from "@/lib/schemas";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

function renderEmail(data: Inquiry) {
  const rows: [string, string][] = [
    ["Jméno", data.name],
    ["Telefon", data.phone || "—"],
    ["E-mail", data.email || "—"],
    ["Místo zakázky", data.location],
  ];

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;color:#17201d;max-width:640px">
    <h2 style="color:#14473a;margin:0 0 16px">Nová poptávka z webu</h2>
    <table style="border-collapse:collapse;width:100%">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:8px 12px 8px 0;color:#55615c;white-space:nowrap;vertical-align:top">${k}</td><td style="padding:8px 0;font-weight:600">${escapeHtml(v)}</td></tr>`,
        )
        .join("")}
    </table>
    <h3 style="color:#14473a;margin:24px 0 8px">Popis poptávky</h3>
    <p style="white-space:pre-wrap;line-height:1.6;margin:0">${escapeHtml(data.message)}</p>
  </div>`;

  const text = [...rows.map(([k, v]) => `${k}: ${v}`), "", "Popis poptávky:", data.message].join("\n");
  return { html, text };
}

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

  const { html, text } = renderEmail(data);
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to,
    subject: `Poptávka z webu – ${data.name} (${data.location})`,
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
