import { unstable_noStore as noStore } from "next/cache";
import { collection, getDocs, orderBy, query, where, Timestamp } from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { BLOG_POSTS } from "@/lib/constants";

export const BLOG_COLLECTION = "blog_posts";

export type BlogContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] };

export interface BlogPost {
  id?: string;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  alt: string;
  video?: string;
  content: BlogContentBlock[];
  published?: boolean;
  authorEmail?: string;
  createdAt?: Timestamp | null;
}

const STATIC_BLOG_POSTS = BLOG_POSTS as BlogPost[];

async function fetchDynamicPosts(): Promise<BlogPost[]> {
  if (!db || !isFirebaseConfigured) return [];
  try {
    // Firestore rejects an unfiltered `list` query outright for unauthenticated
    // readers (the security rule can't prove every result is published unless
    // the query itself is restricted), so the equality filter is required here,
    // not just a nice-to-have.
    const q = query(
      collection(db, BLOG_COLLECTION),
      where("published", "==", true),
      orderBy("createdAt", "desc"),
    );
    const snap = await getDocs(q);
    // createdAt is a Firestore Timestamp instance (used only for ordering
    // above) — it can't cross the Server -> Client Component boundary, and
    // nothing downstream reads it, so drop it rather than pass it through.
    return snap.docs.map((d) => ({ id: d.id, ...d.data(), createdAt: null }) as BlogPost);
  } catch (err) {
    console.error("[blog] Failed to fetch posts from Firestore:", err);
    return [];
  }
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  noStore();
  if (!isFirebaseConfigured) return STATIC_BLOG_POSTS as BlogPost[];
  return fetchDynamicPosts();
}
