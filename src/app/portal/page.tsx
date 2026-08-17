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
  Copy,
  Check,
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

interface Lead {
  id: string;
  source: string;
  name?: string;
  email?: string;
  phone?: string;
  status?: string;
  createdAt: Timestamp | null;
  [field: string]: unknown;
}

const LEAD_SOURCE_LABELS: Record<string, string> = {
  contact: "Contact",
  order: "Order Request",
  tour: "Tour Request",
  training: "Training Request",
};

const LEAD_HIDDEN_FIELDS = new Set(["id", "source", "name", "email", "status", "createdAt"]);

function formatFieldLabel(key: string) {
  return key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/^./, (c) => c.toUpperCase());
}

function leadDetailFields(lead: Lead) {
  return Object.entries(lead).filter(
    ([key, value]) => !LEAD_HIDDEN_FIELDS.has(key) && value !== null && value !== undefined && value !== "",
  ) as [string, string | number][];
}

// Which portal tab a public lead belongs in, based on the form it came from.
function leadTabFor(lead: Lead): TabKey {
  if (lead.source === "order") return "orders";
  return "inquiries"; // contact, tour, training
}

// ── Static config ──────────────────────────────────────────────────────────

const TABS: { key: TabKey; label: string; icon: React.ElementType; color: string }[] = [
  { key: "orders",    label: "Orders",    icon: ShoppingCart,  color: "text-[#3A7D5A]" },
  { key: "inquiries", label: "Inquiries", icon: MessageSquare, color: "text-[#D07A53]" },
  { key: "other",     label: "Other",     icon: FileText,      color: "text-[#6B6259]" },
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
    day: "numeric", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function whatsappLink(phone: string) {
  const digits = phone.replace(/\D/g, "");
  const normalized = digits.startsWith("0") ? `250${digits.slice(1)}` : digits;
  return `https://wa.me/${normalized}`;
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.76.46 3.48 1.35 5L2 22l5.15-1.35a10 10 0 0 0 4.89 1.25h.01c5.52 0 10-4.48 10-10s-4.48-10-10.01-10Zm0 18.13h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.06.8.82-3-.2-.31a8.18 8.18 0 0 1-1.26-4.4c0-4.52 3.68-8.2 8.2-8.2 2.19 0 4.25.85 5.8 2.4a8.14 8.14 0 0 1 2.4 5.8c0 4.52-3.68 8.2-8.2 8.2Zm4.5-6.14c-.25-.12-1.45-.72-1.68-.8-.22-.08-.38-.12-.55.12-.16.25-.63.8-.77.96-.14.16-.28.18-.53.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.71-.14-.25-.02-.38.11-.5.11-.11.25-.28.37-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.42-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.25-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.13 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.45-.59 1.65-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  );
}

function statusBadge(type: TabKey) {
  const map: Record<TabKey, string> = {
    orders:    "bg-[#3A7D5A]/10 text-[#3A7D5A]",
    inquiries: "bg-[#D07A53]/10 text-[#D07A53]",
    other:     "bg-neutral-100 text-[#6B6259]",
  };
  return map[type];
}

// ── Cards ──────────────────────────────────────────────────────────────────

function LeadCard({ lead, copiedKey, onCopy }: { lead: Lead; copiedKey: string | null; onCopy: (text: string, key: string) => void }) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-5 flex flex-col sm:flex-row sm:items-start gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#6DBE8C]/10 text-[#3A7D5A]">
            {LEAD_SOURCE_LABELS[lead.source] ?? lead.source}
          </span>
          <h3 className="text-sm font-heading font-bold text-[#1C2321]">{lead.name}</h3>
        </div>
        <dl className="grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-2">
          {leadDetailFields(lead).map(([key, value]) => (
            <div key={key} className="flex gap-1.5 text-xs font-body">
              <dt className="shrink-0 font-semibold text-[#6B6259]">{formatFieldLabel(key)}:</dt>
              <dd className="text-[#6B6259] break-words">{String(value)}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="shrink-0 flex flex-col items-end gap-2 text-right">
        {lead.email && <span className="text-[10px] font-body text-[#3A7D5A] font-semibold">{lead.email}</span>}
        <div className="flex items-center gap-1.5">
          {lead.email && (
            <button
              onClick={() => onCopy(lead.email!, `${lead.id}-email`)}
              title="Copy email"
              className="flex items-center gap-1 rounded-lg border border-[#E0D8CE] px-2 py-1 text-[10px] font-body font-semibold text-[#6B6259] hover:border-[#3A7D5A] hover:text-[#3A7D5A] transition-colors"
            >
              {copiedKey === `${lead.id}-email` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              Email
            </button>
          )}
          {lead.phone && (
            <>
              <button
                onClick={() => onCopy(lead.phone!, `${lead.id}-phone`)}
                title="Copy phone number"
                className="flex items-center gap-1 rounded-lg border border-[#E0D8CE] px-2 py-1 text-[10px] font-body font-semibold text-[#6B6259] hover:border-[#3A7D5A] hover:text-[#3A7D5A] transition-colors"
              >
                {copiedKey === `${lead.id}-phone` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                Phone
              </button>
              <a
                href={whatsappLink(lead.phone)}
                target="_blank"
                rel="noopener noreferrer"
                title="Reply on WhatsApp"
                className="flex items-center gap-1 rounded-lg bg-[#25D366]/10 px-2 py-1 text-[10px] font-body font-semibold text-[#128C4A] hover:bg-[#25D366]/20 transition-colors"
              >
                <WhatsAppIcon className="w-3 h-3" />
                WhatsApp
              </a>
            </>
          )}
        </div>
        <span className="flex items-center gap-1 text-[10px] font-body text-[#B0A89E]">
          <Clock className="w-3 h-3" />
          {formatDate(lead.createdAt)}
        </span>
      </div>
    </div>
  );
}

function SubmissionCard({ submission }: { submission: Submission }) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-5 flex flex-col sm:flex-row sm:items-start gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${statusBadge(submission.type)}`}>{submission.type}</span>
          <h3 className="text-sm font-heading font-bold text-[#1C2321] truncate">{submission.subject}</h3>
        </div>
        <p className="text-xs font-body text-[#6B6259] leading-relaxed line-clamp-2">{submission.body}</p>
      </div>
      <div className="shrink-0 flex flex-col items-end gap-1 text-right">
        <span className="text-[10px] font-body text-[#6B6259]">{submission.submittedBy}</span>
        <span className="flex items-center gap-1 text-[10px] font-body text-[#B0A89E]">
          <Clock className="w-3 h-3" />
          {formatDate(submission.createdAt)}
        </span>
      </div>
    </div>
  );
}

// ── Component ──────────────────────────────────────────────────────────────

export default function PortalPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabKey>("orders");
  const [showForm, setShowForm] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 1500);
  };

  const [orderForm, setOrderForm] = useState({ product: "", qty: "", unit: "", notes: "" });
  const [inquiryForm, setInquiryForm] = useState({ topic: "", name: "", email: "", message: "" });
  const [otherForm, setOtherForm] = useState({ subject: "", details: "" });

  // Listen to portal_submissions
  useEffect(() => {
    if (!db || !isFirebaseConfigured) return;
    const q = query(collection(db, "portal_submissions"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snap) => {
      setSubmissions(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Submission));
    });
  }, []);

  // Listen to leads (contact form)
  useEffect(() => {
    if (!db || !isFirebaseConfigured) return;
    const q = query(collection(db, "leads"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snap) => {
      setLeads(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Lead));
    });
  }, []);

  const tabCount = (key: TabKey) =>
    leads.filter((l) => leadTabFor(l) === key).length + submissions.filter((s) => s.type === key).length;

  const tabLeads = leads.filter((l) => leadTabFor(l) === activeTab);
  const tabSubmissions = submissions.filter((s) => s.type === activeTab);
  const feed = [
    ...tabLeads.map((data) => ({ kind: "lead" as const, data })),
    ...tabSubmissions.map((data) => ({ kind: "submission" as const, data })),
  ].sort((a, b) => (b.data.createdAt?.toMillis() ?? Date.now()) - (a.data.createdAt?.toMillis() ?? Date.now()));

  // ── Submit handlers ──────────────────────────────────────────────────────

  const submitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    if (!db || !isFirebaseConfigured) { setSubmitting(false); return; }
    await addDoc(collection(db, "portal_submissions"), {
      type: "orders",
      subject: `${orderForm.product} — ${orderForm.qty} ${orderForm.unit}`,
      body: orderForm.notes || "No additional notes.",
      submittedBy: user?.email ?? "unknown",
      createdAt: serverTimestamp(),
    });
    setOrderForm({ product: "", qty: "", unit: "", notes: "" });
    setShowForm(false);
    setSuccessMsg("Order submitted.");
    setTimeout(() => setSuccessMsg(""), 4000);
    setSubmitting(false);
  };

  const submitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    if (!db || !isFirebaseConfigured) { setSubmitting(false); return; }
    await addDoc(collection(db, "portal_submissions"), {
      type: "inquiries",
      subject: inquiryForm.topic,
      body: `From: ${inquiryForm.name} (${inquiryForm.email})\n\n${inquiryForm.message}`,
      submittedBy: user?.email ?? "unknown",
      createdAt: serverTimestamp(),
    });
    setInquiryForm({ topic: "", name: "", email: "", message: "" });
    setShowForm(false);
    setSuccessMsg("Inquiry submitted.");
    setTimeout(() => setSuccessMsg(""), 4000);
    setSubmitting(false);
  };

  const submitOther = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    if (!db || !isFirebaseConfigured) { setSubmitting(false); return; }
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
      <div className="mb-8">
        <p className="text-xs font-body font-semibold uppercase tracking-widest text-[#3A7D5A] mb-1">Operations Portal</p>
        <h1 className="font-heading text-2xl font-bold text-[#1C2321]">Submissions Dashboard</h1>
        <p className="mt-1 text-sm font-body text-[#6B6259]">Orders, inquiries, and other requests in one place.</p>
      </div>

      {!isFirebaseConfigured && (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-body text-amber-800">
          Firebase is currently disabled. Add your Firebase credentials to enable live data.
        </div>
      )}

      {successMsg && (
        <div className="mb-6 flex items-center gap-3 bg-[#3A7D5A]/10 border border-[#3A7D5A]/20 rounded-xl px-4 py-3">
          <div className="w-2 h-2 rounded-full bg-[#3A7D5A] shrink-0" />
          <p className="text-sm font-body font-medium text-[#3A7D5A]">{successMsg}</p>
        </div>
      )}

      {/* Tabs + New button */}
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div className="flex items-center gap-1 bg-white border border-neutral-200 rounded-xl p-1 flex-wrap">
          {TABS.map(({ key, label, icon: Icon, color }) => (
            <button
              key={key}
              onClick={() => { setActiveTab(key); setShowForm(false); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-body font-semibold transition-all duration-200 ${
                activeTab === key ? "bg-[#1C2321] text-white shadow-sm" : "text-[#6B6259] hover:text-[#1C2321]"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${activeTab === key ? "text-white" : color}`} />
              {label}
              <span className={`text-[10px] font-mono rounded-full px-1.5 py-0.5 ${
                activeTab === key ? "bg-white/15 text-white" : "bg-neutral-100 text-[#6B6259]"
              }`}>
                {tabCount(key)}
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-2 bg-[#1C2321] hover:bg-[#3A7D5A] text-white text-sm font-body font-semibold px-4 py-2.5 rounded-xl transition-colors"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? "Cancel" : `New ${TABS.find((t) => t.key === activeTab)?.label.slice(0, -1)}`}
        </button>
      </div>

      {/* ── Inline form (portal submissions only) ── */}
      {showForm && (
        <div className="mb-6 bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm animate-fade-up">
          <p className="text-xs font-body font-semibold uppercase tracking-widest text-[#6B6259] mb-5">
            New {TABS.find((t) => t.key === activeTab)?.label.slice(0, -1)}
          </p>

          {activeTab === "orders" && (
            <form onSubmit={submitOrder} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-xs font-body font-semibold uppercase tracking-widest text-[#6B6259]">Product</label>
                  <div className="relative">
                    <select required value={orderForm.product} onChange={(e) => setOrderForm((f) => ({ ...f, product: e.target.value }))}
                      className="w-full rounded-xl border border-[#E0D8CE] px-4 py-3 text-sm font-body text-[#1C2321] bg-[#F8F6F2] outline-none focus:border-[#3A7D5A] appearance-none transition-colors">
                      <option value="" disabled>Select a product</option>
                      {ORDER_PRODUCTS.map((p) => <option key={p}>{p}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6259] pointer-events-none" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-body font-semibold uppercase tracking-widest text-[#6B6259]">Quantity</label>
                  <input type="number" min="1" required value={orderForm.qty} onChange={(e) => setOrderForm((f) => ({ ...f, qty: e.target.value }))} placeholder="e.g. 50"
                    className="rounded-xl border border-[#E0D8CE] px-4 py-3 text-sm font-body text-[#1C2321] bg-[#F8F6F2] outline-none focus:border-[#3A7D5A] transition-colors" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-body font-semibold uppercase tracking-widest text-[#6B6259]">Unit</label>
                  <input type="text" required value={orderForm.unit} onChange={(e) => setOrderForm((f) => ({ ...f, unit: e.target.value }))} placeholder="e.g. litres, kg, bags"
                    className="rounded-xl border border-[#E0D8CE] px-4 py-3 text-sm font-body text-[#1C2321] bg-[#F8F6F2] outline-none focus:border-[#3A7D5A] transition-colors" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-body font-semibold uppercase tracking-widest text-[#6B6259]">Notes <span className="normal-case text-[#B0A89E]">(optional)</span></label>
                <textarea rows={3} value={orderForm.notes} onChange={(e) => setOrderForm((f) => ({ ...f, notes: e.target.value }))} placeholder="Delivery address, preferred date..."
                  className="rounded-xl border border-[#E0D8CE] px-4 py-3 text-sm font-body text-[#1C2321] bg-[#F8F6F2] outline-none focus:border-[#3A7D5A] transition-colors resize-none" />
              </div>
              <button disabled={submitting} type="submit" className="self-end bg-[#1C2321] hover:bg-[#3A7D5A] text-white text-sm font-body font-semibold px-6 py-2.5 rounded-xl transition-colors disabled:opacity-60">
                {submitting ? "Submitting..." : "Submit Order"}
              </button>
            </form>
          )}

          {activeTab === "inquiries" && (
            <form onSubmit={submitInquiry} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-body font-semibold uppercase tracking-widest text-[#6B6259]">Topic</label>
                <div className="relative">
                  <select required value={inquiryForm.topic} onChange={(e) => setInquiryForm((f) => ({ ...f, topic: e.target.value }))}
                    className="w-full rounded-xl border border-[#E0D8CE] px-4 py-3 text-sm font-body text-[#1C2321] bg-[#F8F6F2] outline-none focus:border-[#3A7D5A] appearance-none transition-colors">
                    <option value="" disabled>Select a topic</option>
                    {INQUIRY_TOPICS.map((t) => <option key={t}>{t}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6259] pointer-events-none" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-body font-semibold uppercase tracking-widest text-[#6B6259]">Name</label>
                  <input type="text" required value={inquiryForm.name} onChange={(e) => setInquiryForm((f) => ({ ...f, name: e.target.value }))} placeholder="Full name"
                    className="rounded-xl border border-[#E0D8CE] px-4 py-3 text-sm font-body text-[#1C2321] bg-[#F8F6F2] outline-none focus:border-[#3A7D5A] transition-colors" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-body font-semibold uppercase tracking-widest text-[#6B6259]">Email</label>
                  <input type="email" required value={inquiryForm.email} onChange={(e) => setInquiryForm((f) => ({ ...f, email: e.target.value }))} placeholder="you@email.com"
                    className="rounded-xl border border-[#E0D8CE] px-4 py-3 text-sm font-body text-[#1C2321] bg-[#F8F6F2] outline-none focus:border-[#3A7D5A] transition-colors" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-body font-semibold uppercase tracking-widest text-[#6B6259]">Message</label>
                <textarea rows={4} required value={inquiryForm.message} onChange={(e) => setInquiryForm((f) => ({ ...f, message: e.target.value }))} placeholder="Describe your inquiry..."
                  className="rounded-xl border border-[#E0D8CE] px-4 py-3 text-sm font-body text-[#1C2321] bg-[#F8F6F2] outline-none focus:border-[#3A7D5A] transition-colors resize-none" />
              </div>
              <button disabled={submitting} type="submit" className="self-end bg-[#1C2321] hover:bg-[#3A7D5A] text-white text-sm font-body font-semibold px-6 py-2.5 rounded-xl transition-colors disabled:opacity-60">
                {submitting ? "Submitting..." : "Submit Inquiry"}
              </button>
            </form>
          )}

          {activeTab === "other" && (
            <form onSubmit={submitOther} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-body font-semibold uppercase tracking-widest text-[#6B6259]">Subject</label>
                <input type="text" required value={otherForm.subject} onChange={(e) => setOtherForm((f) => ({ ...f, subject: e.target.value }))} placeholder="Brief subject line"
                  className="rounded-xl border border-[#E0D8CE] px-4 py-3 text-sm font-body text-[#1C2321] bg-[#F8F6F2] outline-none focus:border-[#3A7D5A] transition-colors" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-body font-semibold uppercase tracking-widest text-[#6B6259]">Details</label>
                <textarea rows={5} required value={otherForm.details} onChange={(e) => setOtherForm((f) => ({ ...f, details: e.target.value }))} placeholder="Provide as much detail as possible..."
                  className="rounded-xl border border-[#E0D8CE] px-4 py-3 text-sm font-body text-[#1C2321] bg-[#F8F6F2] outline-none focus:border-[#3A7D5A] transition-colors resize-none" />
              </div>
              <button disabled={submitting} type="submit" className="self-end bg-[#1C2321] hover:bg-[#3A7D5A] text-white text-sm font-body font-semibold px-6 py-2.5 rounded-xl transition-colors disabled:opacity-60">
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          )}
        </div>
      )}

      {/* ── Leads list ── */}
      {activeTab === "leads" && (
        leads.length === 0 ? (
          <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center">
            <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-3">
              <Mail className="w-4 h-4 text-[#6DBE8C]" />
            </div>
            <p className="text-sm font-body font-semibold text-[#1C2321]">No contact leads yet</p>
            <p className="text-xs font-body text-[#6B6259] mt-1">Submissions from the public contact form will appear here.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {leads.map((lead) => (
              <div key={lead.id} className="bg-white rounded-2xl border border-neutral-200 p-5 flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#6DBE8C]/10 text-[#3A7D5A]">
                      {LEAD_SOURCE_LABELS[lead.source] ?? lead.source}
                    </span>
                    <h3 className="text-sm font-heading font-bold text-[#1C2321]">{lead.name}</h3>
                  </div>
                  <dl className="grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-2">
                    {leadDetailFields(lead).map(([key, value]) => (
                      <div key={key} className="flex gap-1.5 text-xs font-body">
                        <dt className="shrink-0 font-semibold text-[#6B6259]">{formatFieldLabel(key)}:</dt>
                        <dd className="text-[#6B6259] break-words">{String(value)}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div className="shrink-0 flex flex-col items-end gap-2 text-right">
                  {lead.email && <span className="text-[10px] font-body text-[#3A7D5A] font-semibold">{lead.email}</span>}
                  <div className="flex items-center gap-1.5">
                    {lead.email && (
                      <button
                        onClick={() => copyToClipboard(lead.email!, `${lead.id}-email`)}
                        title="Copy email"
                        className="flex items-center gap-1 rounded-lg border border-[#E0D8CE] px-2 py-1 text-[10px] font-body font-semibold text-[#6B6259] hover:border-[#3A7D5A] hover:text-[#3A7D5A] transition-colors"
                      >
                        {copiedKey === `${lead.id}-email` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        Email
                      </button>
                    )}
                    {lead.phone && (
                      <>
                        <button
                          onClick={() => copyToClipboard(lead.phone!, `${lead.id}-phone`)}
                          title="Copy phone number"
                          className="flex items-center gap-1 rounded-lg border border-[#E0D8CE] px-2 py-1 text-[10px] font-body font-semibold text-[#6B6259] hover:border-[#3A7D5A] hover:text-[#3A7D5A] transition-colors"
                        >
                          {copiedKey === `${lead.id}-phone` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          Phone
                        </button>
                        <a
                          href={whatsappLink(lead.phone)}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Reply on WhatsApp"
                          className="flex items-center gap-1 rounded-lg bg-[#25D366]/10 px-2 py-1 text-[10px] font-body font-semibold text-[#128C4A] hover:bg-[#25D366]/20 transition-colors"
                        >
                          <WhatsAppIcon className="w-3 h-3" />
                          WhatsApp
                        </a>
                      </>
                    )}
                  </div>
                  <span className="flex items-center gap-1 text-[10px] font-body text-[#B0A89E]">
                    <Clock className="w-3 h-3" />
                    {formatDate(lead.createdAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {/* ── Portal submissions list ── */}
      {activeTab !== "leads" && (
        filteredSubmissions.length === 0 ? (
          <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center">
            <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-3">
              {(() => { const T = TABS.find((t) => t.key === activeTab)!; return <T.icon className={`w-4 h-4 ${T.color}`} />; })()}
            </div>
            <p className="text-sm font-body font-semibold text-[#1C2321]">No {activeTab} yet</p>
            <p className="text-xs font-body text-[#6B6259] mt-1">Use the button above to create the first one.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filteredSubmissions.map((s) => (
              <div key={s.id} className="bg-white rounded-2xl border border-neutral-200 p-5 flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${statusBadge(s.type)}`}>{s.type}</span>
                    <h3 className="text-sm font-heading font-bold text-[#1C2321] truncate">{s.subject}</h3>
                  </div>
                  <p className="text-xs font-body text-[#6B6259] leading-relaxed line-clamp-2">{s.body}</p>
                </div>
                <div className="shrink-0 flex flex-col items-end gap-1 text-right">
                  <span className="text-[10px] font-body text-[#6B6259]">{s.submittedBy}</span>
                  <span className="flex items-center gap-1 text-[10px] font-body text-[#B0A89E]">
                    <Clock className="w-3 h-3" />
                    {formatDate(s.createdAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}


