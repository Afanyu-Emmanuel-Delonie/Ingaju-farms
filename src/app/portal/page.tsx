"use client";

import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { useAuth } from "@/lib/AuthContext";
import {
  ShoppingCart,
  MessageSquare,
  FileText,
  Plus,
  X,
  ChevronDown,
  Clock,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────

type TabKey = "orders" | "inquiries" | "other";

interface Submission {
  id: string;
  type: TabKey;
  subject: string;
  body: string;
  submittedBy: string;
  createdAt: Timestamp | null;
}

// ── Static config ──────────────────────────────────────────────────────────

const TABS: {
  key: TabKey;
  label: string;
  icon: React.ElementType;
  color: string;
}[] = [
  {
    key: "orders",
    label: "Orders",
    icon: ShoppingCart,
    color: "text-[#3A7D5A]",
  },
  {
    key: "inquiries",
    label: "Inquiries",
    icon: MessageSquare,
    color: "text-[#D07A53]",
  },
  { key: "other", label: "Other", icon: FileText, color: "text-[#6B6259]" },
];

const ORDER_PRODUCTS = [
  "Fresh Milk (per litre)",
  "Yoghurt (500ml)",
  "Organic Fertilizer (50kg bag)",
  "Maize (per kg)",
  "Soy Beans (per kg)",
  "Mixed Fodder Pack",
  "Other / Custom",
];

const INQUIRY_TOPICS = [
  "Product Pricing",
  "Farm Tour",
  "Training Program",
  "Partnership / B2B",
  "Delivery & Logistics",
  "Other",
];

// ── Helpers ────────────────────────────────────────────────────────────────

function formatDate(ts: Timestamp | null) {
  if (!ts) return "Just now";
  return ts.toDate().toLocaleDateString("en-RW", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function statusBadge(type: TabKey) {
  const map: Record<TabKey, string> = {
    orders: "bg-[#3A7D5A]/10 text-[#3A7D5A]",
    inquiries: "bg-[#D07A53]/10 text-[#D07A53]",
    other: "bg-neutral-100 text-[#6B6259]",
  };
  return map[type];
}

// ── Component ──────────────────────────────────────────────────────────────

export default function PortalPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabKey>("orders");
  const [showForm, setShowForm] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Order form state
  const [orderForm, setOrderForm] = useState({
    product: "",
    qty: "",
    unit: "",
    notes: "",
  });
  // Inquiry form state
  const [inquiryForm, setInquiryForm] = useState({
    topic: "",
    name: "",
    email: "",
    message: "",
  });
  // Other form state
  const [otherForm, setOtherForm] = useState({ subject: "", details: "" });

  // Live Firestore listener
  useEffect(() => {
    if (!db || !isFirebaseConfigured) return;

    const q = query(
      collection(db, "portal_submissions"),
      orderBy("createdAt", "desc"),
    );
    const unsub = onSnapshot(q, (snap) => {
      setSubmissions(
        snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Submission),
      );
    });
    return unsub;
  }, []);

  const filtered = submissions.filter((s) => s.type === activeTab);

  // ── Submit handlers ──────────────────────────────────────────────────────

  const submitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    if (!db || !isFirebaseConfigured) {
      setSubmitting(false);
      setSuccessMsg(
        "Firebase is currently disabled. Configure your Firebase credentials to enable submissions.",
      );
      return;
    }

    await addDoc(collection(db, "portal_submissions"), {
      type: "orders",
      subject: `${orderForm.product} — ${orderForm.qty} ${orderForm.unit}`,
      body: orderForm.notes || "No additional notes.",
      submittedBy: user?.email ?? "unknown",
      createdAt: serverTimestamp(),
    });
    setOrderForm({ product: "", qty: "", unit: "", notes: "" });
    setShowForm(false);
    setSuccessMsg("Order submitted successfully.");
    setTimeout(() => setSuccessMsg(""), 4000);
    setSubmitting(false);
  };

  const submitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    if (!db || !isFirebaseConfigured) {
      setSubmitting(false);
      setSuccessMsg(
        "Firebase is currently disabled. Configure your Firebase credentials to enable submissions.",
      );
      return;
    }

    await addDoc(collection(db, "portal_submissions"), {
      type: "inquiries",
      subject: inquiryForm.topic,
      body: `From: ${inquiryForm.name} (${inquiryForm.email})\n\n${inquiryForm.message}`,
      submittedBy: user?.email ?? "unknown",
      createdAt: serverTimestamp(),
    });
    setInquiryForm({ topic: "", name: "", email: "", message: "" });
    setShowForm(false);
    setSuccessMsg("Inquiry submitted successfully.");
    setTimeout(() => setSuccessMsg(""), 4000);
    setSubmitting(false);
  };

  const submitOther = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    if (!db || !isFirebaseConfigured) {
      setSubmitting(false);
      setSuccessMsg(
        "Firebase is currently disabled. Configure your Firebase credentials to enable submissions.",
      );
      return;
    }

    await addDoc(collection(db, "portal_submissions"), {
      type: "other",
      subject: otherForm.subject,
      body: otherForm.details,
      submittedBy: user?.email ?? "unknown",
      createdAt: serverTimestamp(),
    });
    setOtherForm({ subject: "", details: "" });
    setShowForm(false);
    setSuccessMsg("Submission received.");
    setTimeout(() => setSuccessMsg(""), 4000);
    setSubmitting(false);
  };

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="container-pad mx-auto py-10 max-w-5xl">
      {/* Page title */}
      <div className="mb-8">
        <p className="text-xs font-body font-semibold uppercase tracking-widest text-[#3A7D5A] mb-1">
          Operations Portal
        </p>
        <h1 className="font-heading text-2xl font-bold text-[#1C2321]">
          Submissions Dashboard
        </h1>
        <p className="mt-1 text-sm font-body text-[#6B6259]">
          Manage orders, inquiries, and other requests in one place.
        </p>
      </div>

      {!isFirebaseConfigured && (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-body text-amber-800">
          Firebase is currently disabled. Add your Firebase credentials later to
          re-enable submissions and authentication.
        </div>
      )}

      {/* Success toast */}
      {successMsg && (
        <div className="mb-6 flex items-center gap-3 bg-[#3A7D5A]/10 border border-[#3A7D5A]/20 rounded-xl px-4 py-3">
          <div className="w-2 h-2 rounded-full bg-[#3A7D5A] shrink-0" />
          <p className="text-sm font-body font-medium text-[#3A7D5A]">
            {successMsg}
          </p>
        </div>
      )}

      {/* Tabs + New button */}
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div className="flex items-center gap-1 bg-white border border-neutral-200 rounded-xl p-1">
          {TABS.map(({ key, label, icon: Icon, color }) => (
            <button
              key={key}
              onClick={() => {
                setActiveTab(key);
                setShowForm(false);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-body font-semibold transition-all duration-200 ${
                activeTab === key
                  ? "bg-[#1C2321] text-white shadow-sm"
                  : "text-[#6B6259] hover:text-[#1C2321]"
              }`}
            >
              <Icon
                className={`w-3.5 h-3.5 ${activeTab === key ? "text-white" : color}`}
              />
              {label}
              <span
                className={`text-[10px] font-mono rounded-full px-1.5 py-0.5 ${
                  activeTab === key
                    ? "bg-white/15 text-white"
                    : "bg-neutral-100 text-[#6B6259]"
                }`}
              >
                {submissions.filter((s) => s.type === key).length}
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-2 bg-[#1C2321] hover:bg-[#3A7D5A] text-white text-sm font-body font-semibold px-4 py-2.5 rounded-xl transition-colors"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm
            ? "Cancel"
            : `New ${TABS.find((t) => t.key === activeTab)?.label.slice(0, -1)}`}
        </button>
      </div>

      {/* ── Inline form ── */}
      {showForm && (
        <div className="mb-6 bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm animate-fade-up">
          <p className="text-xs font-body font-semibold uppercase tracking-widest text-[#6B6259] mb-5">
            New {TABS.find((t) => t.key === activeTab)?.label.slice(0, -1)}
          </p>

          {/* ORDER FORM */}
          {activeTab === "orders" && (
            <form onSubmit={submitOrder} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-xs font-body font-semibold uppercase tracking-widest text-[#6B6259]">
                    Product
                  </label>
                  <div className="relative">
                    <select
                      required
                      value={orderForm.product}
                      onChange={(e) =>
                        setOrderForm((f) => ({ ...f, product: e.target.value }))
                      }
                      className="w-full rounded-xl border border-[#E0D8CE] px-4 py-3 text-sm font-body text-[#1C2321] bg-[#F8F6F2] outline-none focus:border-[#3A7D5A] appearance-none transition-colors"
                    >
                      <option value="" disabled>
                        Select a product
                      </option>
                      {ORDER_PRODUCTS.map((p) => (
                        <option key={p}>{p}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6259] pointer-events-none" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-body font-semibold uppercase tracking-widest text-[#6B6259]">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={orderForm.qty}
                    onChange={(e) =>
                      setOrderForm((f) => ({ ...f, qty: e.target.value }))
                    }
                    placeholder="e.g. 50"
                    className="rounded-xl border border-[#E0D8CE] px-4 py-3 text-sm font-body text-[#1C2321] bg-[#F8F6F2] outline-none focus:border-[#3A7D5A] transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-body font-semibold uppercase tracking-widest text-[#6B6259]">
                    Unit
                  </label>
                  <input
                    type="text"
                    required
                    value={orderForm.unit}
                    onChange={(e) =>
                      setOrderForm((f) => ({ ...f, unit: e.target.value }))
                    }
                    placeholder="e.g. litres, kg, bags"
                    className="rounded-xl border border-[#E0D8CE] px-4 py-3 text-sm font-body text-[#1C2321] bg-[#F8F6F2] outline-none focus:border-[#3A7D5A] transition-colors"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-body font-semibold uppercase tracking-widest text-[#6B6259]">
                  Notes{" "}
                  <span className="normal-case text-[#B0A89E]">(optional)</span>
                </label>
                <textarea
                  rows={3}
                  value={orderForm.notes}
                  onChange={(e) =>
                    setOrderForm((f) => ({ ...f, notes: e.target.value }))
                  }
                  placeholder="Delivery address, preferred date, special requirements..."
                  className="rounded-xl border border-[#E0D8CE] px-4 py-3 text-sm font-body text-[#1C2321] bg-[#F8F6F2] outline-none focus:border-[#3A7D5A] transition-colors resize-none"
                />
              </div>
              <button
                disabled={submitting}
                type="submit"
                className="self-end bg-[#1C2321] hover:bg-[#3A7D5A] text-white text-sm font-body font-semibold px-6 py-2.5 rounded-xl transition-colors disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Submit Order"}
              </button>
            </form>
          )}

          {/* INQUIRY FORM */}
          {activeTab === "inquiries" && (
            <form onSubmit={submitInquiry} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-body font-semibold uppercase tracking-widest text-[#6B6259]">
                  Topic
                </label>
                <div className="relative">
                  <select
                    required
                    value={inquiryForm.topic}
                    onChange={(e) =>
                      setInquiryForm((f) => ({ ...f, topic: e.target.value }))
                    }
                    className="w-full rounded-xl border border-[#E0D8CE] px-4 py-3 text-sm font-body text-[#1C2321] bg-[#F8F6F2] outline-none focus:border-[#3A7D5A] appearance-none transition-colors"
                  >
                    <option value="" disabled>
                      Select a topic
                    </option>
                    {INQUIRY_TOPICS.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6259] pointer-events-none" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-body font-semibold uppercase tracking-widest text-[#6B6259]">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={inquiryForm.name}
                    onChange={(e) =>
                      setInquiryForm((f) => ({ ...f, name: e.target.value }))
                    }
                    placeholder="Full name"
                    className="rounded-xl border border-[#E0D8CE] px-4 py-3 text-sm font-body text-[#1C2321] bg-[#F8F6F2] outline-none focus:border-[#3A7D5A] transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-body font-semibold uppercase tracking-widest text-[#6B6259]">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={inquiryForm.email}
                    onChange={(e) =>
                      setInquiryForm((f) => ({ ...f, email: e.target.value }))
                    }
                    placeholder="you@email.com"
                    className="rounded-xl border border-[#E0D8CE] px-4 py-3 text-sm font-body text-[#1C2321] bg-[#F8F6F2] outline-none focus:border-[#3A7D5A] transition-colors"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-body font-semibold uppercase tracking-widest text-[#6B6259]">
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  value={inquiryForm.message}
                  onChange={(e) =>
                    setInquiryForm((f) => ({ ...f, message: e.target.value }))
                  }
                  placeholder="Describe your inquiry in detail..."
                  className="rounded-xl border border-[#E0D8CE] px-4 py-3 text-sm font-body text-[#1C2321] bg-[#F8F6F2] outline-none focus:border-[#3A7D5A] transition-colors resize-none"
                />
              </div>
              <button
                disabled={submitting}
                type="submit"
                className="self-end bg-[#1C2321] hover:bg-[#3A7D5A] text-white text-sm font-body font-semibold px-6 py-2.5 rounded-xl transition-colors disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Submit Inquiry"}
              </button>
            </form>
          )}

          {/* OTHER FORM */}
          {activeTab === "other" && (
            <form onSubmit={submitOther} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-body font-semibold uppercase tracking-widest text-[#6B6259]">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  value={otherForm.subject}
                  onChange={(e) =>
                    setOtherForm((f) => ({ ...f, subject: e.target.value }))
                  }
                  placeholder="Brief subject line"
                  className="rounded-xl border border-[#E0D8CE] px-4 py-3 text-sm font-body text-[#1C2321] bg-[#F8F6F2] outline-none focus:border-[#3A7D5A] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-body font-semibold uppercase tracking-widest text-[#6B6259]">
                  Details
                </label>
                <textarea
                  rows={5}
                  required
                  value={otherForm.details}
                  onChange={(e) =>
                    setOtherForm((f) => ({ ...f, details: e.target.value }))
                  }
                  placeholder="Provide as much detail as possible..."
                  className="rounded-xl border border-[#E0D8CE] px-4 py-3 text-sm font-body text-[#1C2321] bg-[#F8F6F2] outline-none focus:border-[#3A7D5A] transition-colors resize-none"
                />
              </div>
              <button
                disabled={submitting}
                type="submit"
                className="self-end bg-[#1C2321] hover:bg-[#3A7D5A] text-white text-sm font-body font-semibold px-6 py-2.5 rounded-xl transition-colors disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          )}
        </div>
      )}

      {/* ── Submissions list ── */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center">
          <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-3">
            {(() => {
              const T = TABS.find((t) => t.key === activeTab)!;
              return <T.icon className={`w-4 h-4 ${T.color}`} />;
            })()}
          </div>
          <p className="text-sm font-body font-semibold text-[#1C2321]">
            No {activeTab} yet
          </p>
          <p className="text-xs font-body text-[#6B6259] mt-1">
            Use the button above to create the first one.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((s) => (
            <div
              key={s.id}
              className="bg-white rounded-2xl border border-neutral-200 p-5 flex flex-col sm:flex-row sm:items-start gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span
                    className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${statusBadge(s.type)}`}
                  >
                    {s.type}
                  </span>
                  <h3 className="text-sm font-heading font-bold text-[#1C2321] truncate">
                    {s.subject}
                  </h3>
                </div>
                <p className="text-xs font-body text-[#6B6259] leading-relaxed line-clamp-2">
                  {s.body}
                </p>
              </div>
              <div className="shrink-0 flex flex-col items-end gap-1 text-right">
                <span className="text-[10px] font-body text-[#6B6259]">
                  {s.submittedBy}
                </span>
                <span className="flex items-center gap-1 text-[10px] font-body text-[#B0A89E]">
                  <Clock className="w-3 h-3" />
                  {formatDate(s.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
