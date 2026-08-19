import { unstable_noStore as noStore } from "next/cache";
import { collection, getDocs, orderBy, query, where, Timestamp } from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { TESTIMONIALS } from "@/lib/constants";

export const TESTIMONIALS_COLLECTION = "testimonials";

export interface Testimonial {
  id?: string;
  key: string;
  name: string;
  role: string;
  quote: string;
  published?: boolean;
  authorEmail?: string;
  createdAt?: Timestamp | null;
}

const STATIC_TESTIMONIALS = TESTIMONIALS as Testimonial[];

async function fetchDynamicTestimonials(): Promise<Testimonial[]> {
  if (!db || !isFirebaseConfigured) return [];
  try {
    // Same reasoning as getPublishedBlogPosts: Firestore rejects an
    // unfiltered `list` query for unauthenticated readers, so the equality
    // filter on `published` is required, not just a nice-to-have.
    const q = query(
      collection(db, TESTIMONIALS_COLLECTION),
      where("published", "==", true),
      orderBy("createdAt", "desc"),
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data(), createdAt: null }) as Testimonial);
  } catch (err) {
    console.error("[testimonials] Failed to fetch testimonials from Firestore:", err);
    return [];
  }
}

export async function getPublishedTestimonials(): Promise<Testimonial[]> {
  noStore();
  if (!isFirebaseConfigured) return STATIC_TESTIMONIALS;
  return fetchDynamicTestimonials();
}
