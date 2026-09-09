"use client";

import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { useAuth } from "@/lib/AuthContext";
import { BLOG_COLLECTION, type BlogContentBlock, type BlogPost } from "@/lib/blog";
import { BLOG_POSTS } from "@/lib/constants";
import { toDirectImageUrl } from "@/lib/driveImage";
import { revalidateBlog } from "@/lib/revalidateBlog";
import {
  ChevronDown,
  Clock,
  Eye,
  EyeOff,
  ExternalLink,
  GripVertical,
  Pencil,
  Plus,
  Sprout,
  Trash2,
  X,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────

interface BlockDraft {
  type: BlogContentBlock["type"];
  text: string; // paragraph/heading: the text itself. list: newline-separated items.
}

interface FormState {
  title: string;
  slug: string;
  slugTouched: boolean;
  category: string;
  excerpt: string;
  image: string;
  alt: string;
  video: string;
  readTime: string;
  published: boolean;
  blocks: BlockDraft[];
}

const STATIC_SLUGS = new Set(BLOG_POSTS.map((p) => p.slug));

const EMPTY_FORM: FormState = {
  title: "",
  slug: "",
  slugTouched: false,
  category: "",
  excerpt: "",
  image: "",
  alt: "",
  video: "",
  readTime: "5 min read",
  published: true,
  blocks: [{ type: "paragraph", text: "" }],
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function blocksToDraft(content: BlogContentBlock[]): BlockDraft[] {
  if (!content?.length) return [{ type: "paragraph", text: "" }];
  return content.map((b) =>
    b.type === "list"
      ? { type: "list", text: b.items.join("\n") }
      : { type: b.type, text: b.text },
  );
}

function draftToBlocks(blocks: BlockDraft[]): BlogContentBlock[] {
  return blocks
    .map((b): BlogContentBlock | null => {
      if (b.type === "list") {
        const items = b.text.split("\n").map((i) => i.trim()).filter(Boolean);
        return items.length ? { type: "list", items } : null;
      }
      const text = b.text.trim();
      return text ? { type: b.type, text } : null;
    })
    .filter((b): b is BlogContentBlock => b !== null);
}

function formatDate(post: BlogPost) {
  if (!post.createdAt) return post.date || "—";
  return post.createdAt.toDate().toLocaleDateString("en-RW", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ── Component ──────────────────────────────────────────────────────────────

export default function PortalBlogPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState<FormState>(EMPTY_FORM);

  useEffect(() => {
    if (!db || !isFirebaseConfigured) return;
    const q = query(collection(db, BLOG_COLLECTION), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setPosts(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as BlogPost));
    });
    return unsub;
  }, []);

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setError("");
  };

  const openNew = () => {
    resetForm();
    setShowForm(true);
  };

  const openEdit = (post: BlogPost) => {
    setForm({
      title: post.title,
      slug: post.slug,
      slugTouched: true,
      category: post.category,
      excerpt: post.excerpt,
      image: post.image,
      alt: post.alt,
      video: post.video ?? "",
      readTime: post.readTime,
      published: post.published !== false,
      blocks: blocksToDraft(post.content),
    });
    setEditingId(post.id ?? null);
    setError("");
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    resetForm();
  };

  // ── Block editing ─────────────────────────────────────────────────────

  const addBlock = (type: BlockDraft["type"]) => {
    setForm((f) => ({ ...f, blocks: [...f.blocks, { type, text: "" }] }));
  };

  const removeBlock = (index: number) => {
    setForm((f) => ({ ...f, blocks: f.blocks.filter((_, i) => i !== index) }));
  };

  const updateBlockText = (index: number, text: string) => {
    setForm((f) => ({
      ...f,
      blocks: f.blocks.map((b, i) => (i === index ? { ...b, text } : b)),
    }));
  };

  const updateBlockType = (index: number, type: BlockDraft["type"]) => {
    setForm((f) => ({
      ...f,
      blocks: f.blocks.map((b, i) => (i === index ? { ...b, type } : b)),
    }));
  };

  // ── Submit ────────────────────────────────────────────────────────────

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!db || !isFirebaseConfigured) {
      setError("Firebase is currently disabled. Configure your Firebase credentials to enable blog publishing.");
      return;
    }

    const slug = slugify(form.slug || form.title);
    const content = draftToBlocks(form.blocks);

    if (!form.title.trim() || !slug || !form.category.trim() || !form.excerpt.trim() || !form.image.trim() || !form.alt.trim()) {
      setError("Please fill in title, slug, category, excerpt, image, and alt text.");
      return;
    }
    if (!content.length) {
      setError("Add at least one content block for the article body.");
      return;
    }

    const slugTaken =
      STATIC_SLUGS.has(slug) ||
      posts.some((p) => p.slug === slug && p.id !== editingId);
    if (slugTaken) {
      setError(`The slug "${slug}" is already in use. Choose a different title or slug.`);
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        title: form.title.trim(),
        slug,
        category: form.category.trim(),
        excerpt: form.excerpt.trim(),
        image: toDirectImageUrl(form.image),
        alt: form.alt.trim(),
        video: form.video.trim(),
        readTime: form.readTime.trim() || "5 min read",
        published: form.published,
        content,
        date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      };

      if (editingId) {
        await updateDoc(doc(db, BLOG_COLLECTION, editingId), payload);
        setSuccessMsg("Post updated.");
      } else {
        await addDoc(collection(db, BLOG_COLLECTION), {
          ...payload,
          authorEmail: user?.email ?? "unknown",
          createdAt: serverTimestamp(),
        });
        setSuccessMsg("Post published.");
      }
      revalidateBlog(slug);
      closeForm();
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch {
      setError("Something went wrong while saving. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const togglePublished = async (post: BlogPost) => {
    if (!db || !post.id) return;
    await updateDoc(doc(db, BLOG_COLLECTION, post.id), { published: !(post.published !== false) });
    revalidateBlog(post.slug);
  };

  const handleDelete = async (post: BlogPost) => {
    if (!db || !post.id) return;
    if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    await deleteDoc(doc(db, BLOG_COLLECTION, post.id));
    revalidateBlog(post.slug);
  };

  const unseededPosts = BLOG_POSTS.filter(
    (bp) => !posts.some((p) => p.slug === bp.slug),
  );

  const seedBuiltInPosts = async () => {
    const firestore = db;
    if (!firestore || unseededPosts.length === 0) return;
    setSubmitting(true);
    try {
      await Promise.all(
        unseededPosts.map((post) =>
          addDoc(collection(firestore, BLOG_COLLECTION), {
            ...post,
            published: true,
            authorEmail: user?.email ?? "seed",
            createdAt: serverTimestamp(),
          }),
        ),
      );
      unseededPosts.forEach((post) => revalidateBlog(post.slug));
      setSuccessMsg(`Seeded ${unseededPosts.length} built-in post${unseededPosts.length === 1 ? "" : "s"}.`);
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch {
      setError("Something went wrong seeding the built-in posts. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────

  return (
    <div className="container-pad mx-auto py-10 max-w-5xl">
      <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs font-body font-semibold uppercase tracking-widest text-[#3A7D5A] mb-1">
            Operations Portal
          </p>
          <h1 className="font-heading text-2xl font-bold text-[#1C2321]">Blog Posts</h1>
          <p className="mt-1 text-sm font-body text-[#6B6259]">
            Publish and manage articles that appear on the public blog.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {unseededPosts.length > 0 && (
            <button
              onClick={seedBuiltInPosts}
              disabled={submitting}
              className="flex items-center gap-2 rounded-xl border border-[#E0D8CE] text-[#6B6259] hover:border-[#3A7D5A] hover:text-[#3A7D5A] text-sm font-body font-semibold px-4 py-2.5 transition-colors disabled:opacity-60"
              title="Adds the built-in articles as editable posts in this list"
            >
              <Sprout className="w-4 h-4" />
              Seed Built-in Posts ({unseededPosts.length})
            </button>
          )}
          <button
            onClick={() => (showForm ? closeForm() : openNew())}
            className="flex items-center gap-2 bg-[#1C2321] hover:bg-[#3A7D5A] text-white text-sm font-body font-semibold px-4 py-2.5 rounded-xl transition-colors"
          >
            {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {showForm ? "Cancel" : "New Post"}
          </button>
        </div>
      </div>

      {!isFirebaseConfigured && (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-body text-amber-800">
          Firebase is currently disabled. Add your Firebase credentials to enable blog publishing.
        </div>
      )}

      {successMsg && (
        <div className="mb-6 flex items-center gap-3 bg-[#3A7D5A]/10 border border-[#3A7D5A]/20 rounded-xl px-4 py-3">
          <div className="w-2 h-2 rounded-full bg-[#3A7D5A] shrink-0" />
          <p className="text-sm font-body font-medium text-[#3A7D5A]">{successMsg}</p>
        </div>
      )}

      {/* ── Form ── */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-8 bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm flex flex-col gap-5"
        >
          <p className="text-xs font-body font-semibold uppercase tracking-widest text-[#6B6259]">
            {editingId ? "Edit Post" : "New Post"}
          </p>

          {error && (
            <p className="text-xs font-body font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-xs font-body font-semibold uppercase tracking-widest text-[#6B6259]">Title</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    title: e.target.value,
                    slug: f.slugTouched ? f.slug : slugify(e.target.value),
                  }))
                }
                placeholder="How Circular Agriculture Is Transforming Small-Scale Farms"
                className="rounded-xl border border-[#E0D8CE] px-4 py-3 text-sm font-body text-[#1C2321] bg-[#F8F6F2] outline-none focus:border-[#3A7D5A] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-body font-semibold uppercase tracking-widest text-[#6B6259]">Slug</label>
              <input
                type="text"
                required
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: slugify(e.target.value), slugTouched: true }))}
                placeholder="how-circular-agriculture..."
                className="rounded-xl border border-[#E0D8CE] px-4 py-3 text-sm font-mono text-[#1C2321] bg-[#F8F6F2] outline-none focus:border-[#3A7D5A] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-body font-semibold uppercase tracking-widest text-[#6B6259]">Category</label>
              <input
                type="text"
                required
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                placeholder="Circular Farming"
                className="rounded-xl border border-[#E0D8CE] px-4 py-3 text-sm font-body text-[#1C2321] bg-[#F8F6F2] outline-none focus:border-[#3A7D5A] transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-body font-semibold uppercase tracking-widest text-[#6B6259]">Excerpt</label>
            <textarea
              rows={2}
              required
              value={form.excerpt}
              onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
              placeholder="A short summary shown on the blog listing page..."
              className="rounded-xl border border-[#E0D8CE] px-4 py-3 text-sm font-body text-[#1C2321] bg-[#F8F6F2] outline-none focus:border-[#3A7D5A] transition-colors resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-xs font-body font-semibold uppercase tracking-widest text-[#6B6259]">
                Image URL <span className="normal-case text-[#B0A89E]">(local /images path, Google Drive share link, or an allowed remote domain)</span>
              </label>
              <input
                type="text"
                required
                value={form.image}
                onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                placeholder="/images/blog-example.png, a Google Drive share link, or https://images.unsplash.com/..."
                className="rounded-xl border border-[#E0D8CE] px-4 py-3 text-sm font-body text-[#1C2321] bg-[#F8F6F2] outline-none focus:border-[#3A7D5A] transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-body font-semibold uppercase tracking-widest text-[#6B6259]">Read Time</label>
              <input
                type="text"
                value={form.readTime}
                onChange={(e) => setForm((f) => ({ ...f, readTime: e.target.value }))}
                placeholder="6 min read"
                className="rounded-xl border border-[#E0D8CE] px-4 py-3 text-sm font-body text-[#1C2321] bg-[#F8F6F2] outline-none focus:border-[#3A7D5A] transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-body font-semibold uppercase tracking-widest text-[#6B6259]">Image Alt Text</label>
            <input
              type="text"
              required
              value={form.alt}
              onChange={(e) => setForm((f) => ({ ...f, alt: e.target.value }))}
              placeholder="Farmer working on a circular agriculture farm"
              className="rounded-xl border border-[#E0D8CE] px-4 py-3 text-sm font-body text-[#1C2321] bg-[#F8F6F2] outline-none focus:border-[#3A7D5A] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-body font-semibold uppercase tracking-widest text-[#6B6259]">
              Hero Video URL <span className="normal-case text-[#B0A89E]">(optional — a direct .mp4/.webm link plays in the article hero instead of the image above, which is still used as its poster frame and everywhere else the post is listed)</span>
            </label>
            <input
              type="text"
              value={form.video}
              onChange={(e) => setForm((f) => ({ ...f, video: e.target.value }))}
              placeholder="/images/blog-example.mp4 or https://..."
              className="rounded-xl border border-[#E0D8CE] px-4 py-3 text-sm font-body text-[#1C2321] bg-[#F8F6F2] outline-none focus:border-[#3A7D5A] transition-colors"
            />
          </div>

          {/* Content blocks */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-body font-semibold uppercase tracking-widest text-[#6B6259]">Article Body</label>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => addBlock("paragraph")} className="text-[11px] font-body font-semibold text-[#3A7D5A] hover:underline">
                  + Paragraph
                </button>
                <button type="button" onClick={() => addBlock("heading")} className="text-[11px] font-body font-semibold text-[#3A7D5A] hover:underline">
                  + Heading
                </button>
                <button type="button" onClick={() => addBlock("list")} className="text-[11px] font-body font-semibold text-[#3A7D5A] hover:underline">
                  + List
                </button>
              </div>
            </div>

            {form.blocks.map((block, i) => (
              <div key={i} className="flex gap-2 items-start bg-[#F8F6F2] border border-[#E0D8CE] rounded-xl p-3">
                <GripVertical className="w-4 h-4 text-[#B0A89E] mt-2.5 shrink-0" />
                <div className="flex-1 flex flex-col gap-2">
                  <div className="relative w-fit">
                    <select
                      value={block.type}
                      onChange={(e) => updateBlockType(i, e.target.value as BlockDraft["type"])}
                      className="appearance-none rounded-lg border border-[#E0D8CE] bg-white pl-3 pr-7 py-1 text-[11px] font-body font-semibold uppercase tracking-wide text-[#6B6259] outline-none focus:border-[#3A7D5A]"
                    >
                      <option value="paragraph">Paragraph</option>
                      <option value="heading">Heading</option>
                      <option value="list">List</option>
                    </select>
                    <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-[#6B6259] pointer-events-none" />
                  </div>
                  <textarea
                    rows={block.type === "list" ? 3 : block.type === "heading" ? 1 : 3}
                    value={block.text}
                    onChange={(e) => updateBlockText(i, e.target.value)}
                    placeholder={block.type === "list" ? "One item per line" : block.type === "heading" ? "Section heading" : "Paragraph text"}
                    className="w-full rounded-lg border border-[#E0D8CE] px-3 py-2 text-sm font-body text-[#1C2321] bg-white outline-none focus:border-[#3A7D5A] transition-colors resize-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeBlock(i)}
                  disabled={form.blocks.length === 1}
                  className="text-[#B0A89E] hover:text-red-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed mt-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#E0D8CE]">
            <label className="flex items-center gap-2 text-sm font-body text-[#1C2321] cursor-pointer">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
                className="w-4 h-4 accent-[#3A7D5A]"
              />
              Publish immediately
            </label>
            <button
              disabled={submitting}
              type="submit"
              className="bg-[#1C2321] hover:bg-[#3A7D5A] text-white text-sm font-body font-semibold px-6 py-2.5 rounded-xl transition-colors disabled:opacity-60"
            >
              {submitting ? "Saving..." : editingId ? "Save Changes" : "Publish Post"}
            </button>
          </div>
        </form>
      )}

      {/* ── List ── */}
      {posts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center">
          <p className="text-sm font-body font-semibold text-[#1C2321]">No portal-authored posts yet</p>
          <p className="text-xs font-body text-[#6B6259] mt-1">
            The public blog still shows the {BLOG_POSTS.length} built-in articles. Use “New Post” to add more.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {posts.map((post) => {
            const published = post.published !== false;
            return (
              <div key={post.id} className="bg-white rounded-2xl border border-neutral-200 p-5 flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span
                      className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        published ? "bg-[#3A7D5A]/10 text-[#3A7D5A]" : "bg-neutral-100 text-[#6B6259]"
                      }`}
                    >
                      {published ? "Published" : "Draft"}
                    </span>
                    <span className="text-[10px] font-body font-semibold uppercase tracking-wider text-[#B0A89E]">{post.category}</span>
                    <h3 className="text-sm font-heading font-bold text-[#1C2321] truncate">{post.title}</h3>
                  </div>
                  <p className="text-xs font-body text-[#6B6259] leading-relaxed line-clamp-2">{post.excerpt}</p>
                  <div className="mt-2 flex items-center gap-3 text-[10px] font-body text-[#B0A89E]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDate(post)}
                    </span>
                    <span className="font-mono">/blog/{post.slug}</span>
                  </div>
                </div>
                <div className="shrink-0 flex items-center gap-1.5">
                  {published && (
                    <a
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-[#6B6259] hover:text-[#1C2321] hover:bg-neutral-100 transition-colors"
                      title="View live"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <button
                    onClick={() => togglePublished(post)}
                    className="p-2 rounded-lg text-[#6B6259] hover:text-[#1C2321] hover:bg-neutral-100 transition-colors"
                    title={published ? "Unpublish" : "Publish"}
                  >
                    {published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => openEdit(post)}
                    className="p-2 rounded-lg text-[#6B6259] hover:text-[#1C2321] hover:bg-neutral-100 transition-colors"
                    title="Edit"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(post)}
                    className="p-2 rounded-lg text-[#6B6259] hover:text-red-500 hover:bg-red-50 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
