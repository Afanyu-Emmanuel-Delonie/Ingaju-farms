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
