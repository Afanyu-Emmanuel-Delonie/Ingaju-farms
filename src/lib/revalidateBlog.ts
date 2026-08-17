export async function revalidateBlog(slug?: string) {
  try {
    await fetch("/api/revalidate-blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    });
  } catch (err) {
    console.error("[revalidate] Failed to revalidate blog pages:", err);
  }
}
