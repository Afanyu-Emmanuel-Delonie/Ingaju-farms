const WHATSAPP_NUMBER = "250788304921";

// Called synchronously from the submit handler (before any await) so the
// browser still treats opening the tab as a direct result of the user's click.
export function pingWhatsApp(name: string, submission: string) {
  if (typeof window === "undefined") return;
  const safeName = name && name.trim() ? name.trim() : "Someone";
  const text = `Hi! ${safeName} here, I just submitted ${submission}. I'll be expecting a reply.`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

export async function notifyNewLead(payload: Record<string, unknown>) {
  try {
    await fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("[notify] Failed to notify:", err);
  }
}
