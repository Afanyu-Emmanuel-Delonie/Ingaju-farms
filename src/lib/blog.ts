import { cache } from "react";
import { collection, getDocs, orderBy, query, Timestamp } from "firebase/firestore";
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
  content: BlogContentBlock[];
  published?: boolean;
  authorEmail?: string;
  createdAt?: Timestamp | null;
}

const STATIC_BLOG_POSTS = BLOG_POSTS as BlogPost[];

async function fetchDynamicPosts(): Promise<BlogPost[]> {
  if (!db || !isFirebaseConfigured) return [];
  try {
    const q = query(collection(db, BLOG_COLLECTION), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs
      .map((d) => ({ id: d.id, ...d.data() }) as BlogPost)
      .filter((p) => p.published !== false);
  } catch {
    return [];
  }
}

// Dynamic (portal-authored) posts first, static posts fill the rest; a
// dynamic post can override a static one by reusing the same slug.
export const getPublishedBlogPosts = cache(async (): Promise<BlogPost[]> => {
  const dynamicPosts = await fetchDynamicPosts();
  const merged = [...dynamicPosts, ...STATIC_BLOG_POSTS];

  const seen = new Set<string>();
  return merged.filter((post) => {
    if (seen.has(post.slug)) return false;
    seen.add(post.slug);
    return true;
  });
});
