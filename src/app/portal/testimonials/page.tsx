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
import { TESTIMONIALS_COLLECTION, type Testimonial } from "@/lib/testimonials";
import { TESTIMONIALS } from "@/lib/constants";
import { revalidateBlog } from "@/lib/revalidateBlog";
import { Eye, EyeOff, Pencil, Plus, Sprout, Trash2, X } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────

interface FormState {
  name: string;
  role: string;
  quote: string;
  published: boolean;
}

const STATIC_KEYS = new Set(TESTIMONIALS.map((t) => t.key));

const EMPTY_FORM: FormState = {
  name: "",
  role: "",
  quote: "",
  published: true,
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ── Component ──────────────────────────────────────────────────────────────

export default function PortalTestimonialsPage() {
  const { user } = useAuth();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState<FormState>(EMPTY_FORM);

  useEffect(() => {
    if (!db || !isFirebaseConfigured) return;
    const q = query(collection(db, TESTIMONIALS_COLLECTION), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setTestimonials(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Testimonial));
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

  const openEdit = (t: Testimonial) => {
    setForm({ name: t.name, role: t.role, quote: t.quote, published: t.published !== false });
    setEditingId(t.id ?? null);
    setError("");
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!db || !isFirebaseConfigured) {
      setError("Firebase is currently disabled. Configure your Firebase credentials to enable testimonials.");
      return;
    }
    if (!form.name.trim() || !form.role.trim() || !form.quote.trim()) {
      setError("Please fill in name, role, and quote.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        name: form.name.trim(),
        role: form.role.trim(),
        quote: form.quote.trim(),
        published: form.published,
      };

      if (editingId) {
        await updateDoc(doc(db, TESTIMONIALS_COLLECTION, editingId), payload);
        setSuccessMsg("Testimonial updated.");
      } else {
        await addDoc(collection(db, TESTIMONIALS_COLLECTION), {
          ...payload,
          key: `${slugify(form.name)}-${Date.now()}`,
          authorEmail: user?.email ?? "unknown",
          createdAt: serverTimestamp(),
        });
        setSuccessMsg("Testimonial published.");
      }
      revalidateBlog();
      closeForm();
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch {
      setError("Something went wrong while saving. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const togglePublished = async (t: Testimonial) => {
    if (!db || !t.id) return;
    await updateDoc(doc(db, TESTIMONIALS_COLLECTION, t.id), { published: !(t.published !== false) });
    revalidateBlog();
  };

  const handleDelete = async (t: Testimonial) => {
    if (!db || !t.id) return;
    if (!confirm(`Delete the testimonial from "${t.name}"? This cannot be undone.`)) return;
    await deleteDoc(doc(db, TESTIMONIALS_COLLECTION, t.id));
    revalidateBlog();
  };

  const unseeded = TESTIMONIALS.filter(
    (bt) => !testimonials.some((t) => t.key === bt.key),
  );

  const seedBuiltIn = async () => {
    const firestore = db;
    if (!firestore || unseeded.length === 0) return;
    setSubmitting(true);
    try {
      await Promise.all(
        unseeded.map((t) =>
          addDoc(collection(firestore, TESTIMONIALS_COLLECTION), {
            ...t,
            published: true,
            authorEmail: user?.email ?? "seed",
            createdAt: serverTimestamp(),
          }),
        ),
      );
      revalidateBlog();
      setSuccessMsg(`Seeded ${unseeded.length} built-in testimonial${unseeded.length === 1 ? "" : "s"}.`);
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch {
      setError("Something went wrong seeding the built-in testimonials. Please try again.");
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
          <h1 className="font-heading text-2xl font-bold text-[#1C2321]">Testimonials</h1>
          <p className="mt-1 text-sm font-body text-[#6B6259]">
            Manage the quotes shown in the homepage testimonials carousel.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {unseeded.length > 0 && (
            <button
              onClick={seedBuiltIn}
              disabled={submitting}
              className="flex items-center gap-2 rounded-xl border border-[#E0D8CE] text-[#6B6259] hover:border-[#3A7D5A] hover:text-[#3A7D5A] text-sm font-body font-semibold px-4 py-2.5 transition-colors disabled:opacity-60"
              title="Adds the built-in testimonials as editable entries in this list"
            >
              <Sprout className="w-4 h-4" />
              Seed Built-in Testimonials ({unseeded.length})
            </button>
          )}
          <button
            onClick={() => (showForm ? closeForm() : openNew())}
            className="flex items-center gap-2 bg-[#1C2321] hover:bg-[#3A7D5A] text-white text-sm font-body font-semibold px-4 py-2.5 rounded-xl transition-colors"
          >
            {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {showForm ? "Cancel" : "New Testimonial"}
          </button>
        </div>
      </div>

      {!isFirebaseConfigured && (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-body text-amber-800">
          Firebase is currently disabled. Add your Firebase credentials to enable testimonial publishing. The
          homepage carousel is showing the {TESTIMONIALS.length} built-in testimonials in the meantime.
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
            {editingId ? "Edit Testimonial" : "New Testimonial"}
          </p>

          {error && (
            <p className="text-xs font-body font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-body font-semibold uppercase tracking-widest text-[#6B6259]">Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Jean-Pierre Habimana"
                className="rounded-xl border border-[#E0D8CE] px-4 py-3 text-sm font-body text-[#1C2321] bg-[#F8F6F2] outline-none focus:border-[#3A7D5A] transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-body font-semibold uppercase tracking-widest text-[#6B6259]">Role</label>
              <input
                type="text"
                required
                value={form.role}
                onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                placeholder="Dairy Farmer, Eastern Province"
                className="rounded-xl border border-[#E0D8CE] px-4 py-3 text-sm font-body text-[#1C2321] bg-[#F8F6F2] outline-none focus:border-[#3A7D5A] transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-body font-semibold uppercase tracking-widest text-[#6B6259]">Quote</label>
            <textarea
              rows={4}
              required
              value={form.quote}
              onChange={(e) => setForm((f) => ({ ...f, quote: e.target.value }))}
              placeholder="What they said about working with Ingaju..."
              className="rounded-xl border border-[#E0D8CE] px-4 py-3 text-sm font-body text-[#1C2321] bg-[#F8F6F2] outline-none focus:border-[#3A7D5A] transition-colors resize-none"
            />
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
              {submitting ? "Saving..." : editingId ? "Save Changes" : "Publish Testimonial"}
            </button>
          </div>
        </form>
      )}

      {/* ── List ── */}
      {testimonials.length === 0 ? (
        <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center">
          <p className="text-sm font-body font-semibold text-[#1C2321]">No portal-authored testimonials yet</p>
          <p className="text-xs font-body text-[#6B6259] mt-1">
            The homepage carousel still shows the {TESTIMONIALS.length} built-in testimonials. Use “New Testimonial”
            to add more, or seed the built-in ones to make them editable here.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {testimonials.map((t) => {
            const published = t.published !== false;
            return (
              <div key={t.id} className="bg-white rounded-2xl border border-neutral-200 p-5 flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span
                      className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        published ? "bg-[#3A7D5A]/10 text-[#3A7D5A]" : "bg-neutral-100 text-[#6B6259]"
                      }`}
                    >
                      {published ? "Published" : "Draft"}
                    </span>
                    <h3 className="text-sm font-heading font-bold text-[#1C2321]">{t.name}</h3>
                    <span className="text-[10px] font-body font-semibold uppercase tracking-wider text-[#B0A89E]">{t.role}</span>
                  </div>
                  <p className="text-xs font-body text-[#6B6259] leading-relaxed line-clamp-2">{t.quote}</p>
                </div>
                <div className="shrink-0 flex items-center gap-1.5">
                  <button
                    onClick={() => togglePublished(t)}
                    className="p-2 rounded-lg text-[#6B6259] hover:text-[#1C2321] hover:bg-neutral-100 transition-colors"
                    title={published ? "Unpublish" : "Publish"}
                  >
                    {published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => openEdit(t)}
                    className="p-2 rounded-lg text-[#6B6259] hover:text-[#1C2321] hover:bg-neutral-100 transition-colors"
                    title="Edit"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(t)}
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
