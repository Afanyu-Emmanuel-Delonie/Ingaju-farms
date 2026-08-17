import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

// Called from the portal right after a post is created, edited, published,
// unpublished, deleted, or seeded — so the public blog reflects the change
// immediately instead of waiting out the page's time-based revalidation.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const slug = typeof body?.slug === "string" ? body.slug : undefined;

  revalidatePath("/blog");
  if (slug) revalidatePath(`/blog/${slug}`);
  revalidatePath("/");
  revalidatePath("/products/dairy");
  revalidatePath("/products/crops");

  return NextResponse.json({ ok: true });
}
