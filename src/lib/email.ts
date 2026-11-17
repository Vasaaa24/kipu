/**
 * Šablona e-mailu s poptávkou z webového formuláře.
 * Psáno tabulkami a inline styly – tak to spolehlivě zobrazí Gmail, Outlook, Seznam i mobilní aplikace.
 * Soubor nemá žádné importy, aby šel vykreslit i samostatně (náhled e-mailu).
 */

export type InquiryEmailData = {
  name: string;
  phone?: string;
  email?: string;
  location: string;
  message: string;
};

type Options = {
  /** Veřejná adresa webu – kvůli logu v hlavičce (obrázek musí mít absolutní URL) */
  siteUrl: string;
  /** Čas přijetí poptávky */
  receivedAt?: Date;
};

const C = {
  brand: "#14473a",
  brandDark: "#0b2a22",
  gold: "#b6955c",
  goldInk: "#7d6232",
  ink: "#17201d",
  muted: "#5d6b66",
  line: "#e3e9e6",
  surface: "#f4f7f5",
};

const esc = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/** Telefon do odkazu tel: (jen číslice a +) */
const telHref = (phone: string) => {
  const digits = phone.replace(/[^\d+]/g, "");
  return `tel:${digits.startsWith("+") || digits.length !== 9 ? digits : `+420${digits}`}`;
};

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("cs-CZ", {
    timeZone: "Europe/Prague",
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);

export function inquirySubject(data: InquiryEmailData) {
  return `Nová poptávka: ${data.name} – ${data.location}`;
}

export function renderInquiryEmail(data: InquiryEmailData, { siteUrl, receivedAt = new Date() }: Options) {
  const phone = data.phone?.trim();
  const email = data.email?.trim();
  const when = formatDate(receivedAt);
  const domain = siteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");

  // tlačítka jako inline-block – na úzkém displeji se zalomí pod sebe, text se nezalamuje
  const button = (href: string, label: string, primary: boolean) =>
    `<a href="${esc(href)}" style="display:inline-block;margin:0 8px 8px 0;padding:12px 20px;border-radius:999px;font-size:14px;font-weight:700;text-decoration:none;white-space:nowrap;${
      primary ? `background:${C.brand};color:#ffffff;` : `background:#ffffff;color:${C.brand};border:1px solid ${C.line};`
    }">${label}</a>`;

  const buttons = [
    phone ? button(telHref(phone), `Zavolat ${esc(phone)}`, true) : "",
    email ? button(`mailto:${email}?subject=${encodeURIComponent("Re: Vaše poptávka – KIPU, s.r.o.")}`, "Odpovědět e-mailem", !phone) : "",
  ].join("");

  const row = (label: string, value: string, href?: string) => `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid ${C.line};color:${C.muted};font-size:13px;width:140px;vertical-align:top">${label}</td>
      <td style="padding:12px 0;border-bottom:1px solid ${C.line};color:${C.ink};font-size:15px;font-weight:600;vertical-align:top">${
        href ? `<a href="${esc(href)}" style="color:${C.brand};text-decoration:none">${esc(value)}</a>` : esc(value)
      }</td>
    </tr>`;

  const html = `<!doctype html>
<html lang="cs">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<title>${esc(inquirySubject(data))}</title>
</head>
<body style="margin:0;padding:0;background:${C.surface};font-family:Arial,Helvetica,sans-serif;-webkit-text-size-adjust:100%">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(data.name)} · ${esc(data.location)} · ${esc(data.message.slice(0, 90))}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.surface}">
    <tr>
      <td align="center" style="padding:24px 12px">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid ${C.line}">
          <!-- hlavička -->
          <tr>
            <td style="background:${C.brand};padding:24px 28px">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td><img src="${siteUrl}/logo-compact-light.png" width="150" alt="KIPU, s.r.o." style="display:block;border:0;height:auto;width:150px"></td>
                  <td align="right" style="color:#d8c39c;font-size:12px;letter-spacing:1px;text-transform:uppercase;font-weight:700">Poptávka z webu</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr><td style="height:4px;background:${C.gold};font-size:0;line-height:0">&nbsp;</td></tr>

          <!-- nadpis -->
          <tr>
            <td style="padding:28px 28px 8px">
              <p style="margin:0 0 6px;color:${C.goldInk};font-size:12px;letter-spacing:1px;text-transform:uppercase;font-weight:700">Nová nezávazná poptávka</p>
              <h1 style="margin:0;color:${C.brand};font-size:24px;line-height:1.25">${esc(data.name)}</h1>
              <p style="margin:6px 0 0;color:${C.muted};font-size:14px">${esc(data.location)} · přijato ${when}</p>
            </td>
          </tr>

          <!-- rychlé akce -->
          ${
            buttons
              ? `<tr><td style="padding:16px 28px 8px">${buttons}</td></tr>`
              : ""
          }

          <!-- údaje -->
          <tr>
            <td style="padding:12px 28px 0">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${row("Jméno", data.name)}
                ${row("Telefon", phone || "—", phone ? telHref(phone) : undefined)}
                ${row("E-mail", email || "—", email ? `mailto:${email}` : undefined)}
                ${row("Místo zakázky", data.location)}
              </table>
            </td>
          </tr>

          <!-- popis -->
          <tr>
            <td style="padding:24px 28px 28px">
              <p style="margin:0 0 10px;color:${C.muted};font-size:13px">Popis poptávky</p>
              <div style="background:${C.surface};border-left:4px solid ${C.gold};border-radius:8px;padding:16px 18px;color:${C.ink};font-size:15px;line-height:1.6;white-space:pre-wrap">${esc(data.message)}</div>
            </td>
          </tr>

          <!-- patička -->
          <tr>
            <td style="padding:18px 28px;border-top:1px solid ${C.line};color:${C.muted};font-size:12px;line-height:1.5">
              ${email ? "Na tento e-mail můžete rovnou odpovědět – odpověď půjde zákazníkovi." : "Zákazník nevyplnil e-mail – ozvěte se mu telefonicky."}<br>
              Odesláno z formuláře na <a href="${siteUrl}" style="color:${C.brand}">${esc(domain)}</a>.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = [
    "NOVÁ POPTÁVKA Z WEBU",
    `Přijato: ${when}`,
    "",
    `Jméno: ${data.name}`,
    `Telefon: ${phone || "—"}`,
    `E-mail: ${email || "—"}`,
    `Místo zakázky: ${data.location}`,
    "",
    "Popis poptávky:",
    data.message,
    "",
    `Odesláno z formuláře na ${domain}.`,
  ].join("\n");

  return { html, text };
}
