import { NextResponse } from "next/server";

const SOURCE_LABELS: Record<string, string> = {
  contact: "Contact Message",
  order: "Order Request",
  tour: "Tour Request",
  training: "Training Request",
};

const HIDDEN_FIELDS = new Set(["source", "status", "createdAt"]);

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );
}

function formatLabel(key: string) {
  return key.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/^./, (c) => c.toUpperCase());
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.NOTIFY_EMAIL;
  const ccEmail = process.env.NOTIFY_EMAIL_CC;
  const fromEmail = process.env.FROM_EMAIL;

  if (!apiKey || !notifyEmail || !fromEmail) {
    return NextResponse.json({ ok: false, error: "Email notifications are not configured." }, { status: 200 });
  }

  const payload = await request.json().catch(() => null);
  if (!payload || typeof payload !== "object" || typeof payload.source !== "string") {
    return NextResponse.json({ ok: false, error: "Invalid payload." }, { status: 400 });
  }

  const { source, ...fields } = payload as { source: string } & Record<string, unknown>;
  const label = SOURCE_LABELS[source] ?? source;
  const name = typeof fields.name === "string" && fields.name ? fields.name : "Someone";

  const rows = Object.entries(fields)
    .filter(([key, value]) => !HIDDEN_FIELDS.has(key) && value !== null && value !== undefined && value !== "")
    .map(
      ([key, value]) =>
        `<tr><td style="padding:4px 16px 4px 0;color:#6B6259;font-weight:600;white-space:nowrap;">${escapeHtml(formatLabel(key))}</td><td style="padding:4px 0;color:#1C2321;">${escapeHtml(String(value))}</td></tr>`,
    )
    .join("");

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:480px;">
      <h2 style="color:#1C2321;margin-bottom:16px;">New ${escapeHtml(label)}</h2>
      <table cellpadding="0" cellspacing="0">${rows}</table>
      <p style="margin-top:20px;"><a href="https://ingajufarms.com/portal" style="color:#3A7D5A;">View in Operations Portal →</a></p>
    </div>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [notifyEmail],
        ...(ccEmail ? { cc: [ccEmail] } : {}),
        subject: `New ${label} — ${name}`,
        html,
      }),
    });

    if (!res.ok) {
      console.error("[notify] Resend error:", await res.text());
      return NextResponse.json({ ok: false }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[notify] Failed to send email:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
