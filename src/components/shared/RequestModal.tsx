"use client";

import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { X, ArrowRight } from "lucide-react";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { notifyNewLead } from "@/lib/notify";
import { useModal } from "./ModalContext";

const TOUR_TYPES = ["Individual", "School Group", "Corporate", "Farmer Group"];
const TRAINING_PROGRAMS = [
  "Dairy Farming Training",
  "Organic Farming Training",
  "Circular Agriculture Training",
];

const inputCls =
  "w-full rounded-xl border border-[#E0D8CE] bg-[#F8F6F2] px-4 py-3 text-sm font-body text-[#1C2321] outline-none placeholder:text-[#C0B8AE] focus:border-[#3A7D5A] transition-colors";
const labelCls =
  "text-[10px] font-body font-semibold uppercase tracking-widest text-[#6B6259]";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className={labelCls}>{label}</label>
      {children}
    </div>
  );
}

const EMPTY_ORDER = { qty: "", deliveryDate: "", name: "", phone: "", email: "", address: "", notes: "" };
const EMPTY_TOUR = { date: "", groupSize: "", tourType: "", name: "", phone: "", email: "", requests: "" };
const EMPTY_TRAINING = { program: "", name: "", phone: "", email: "", background: "" };

export default function RequestModal() {
  const { isOpen, close, config } = useModal();
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [orderForm, setOrderForm] = useState(EMPTY_ORDER);
  const [tourForm, setTourForm] = useState(EMPTY_TOUR);
  const [trainingForm, setTrainingForm] = useState(EMPTY_TRAINING);

  // Reset on new open
  useEffect(() => {
    if (isOpen) {
      setSent(false);
      setError("");
      setOrderForm(EMPTY_ORDER);
      setTourForm(EMPTY_TOUR);
      setTrainingForm({ ...EMPTY_TRAINING, program: config?.product ?? "" });
    }
  }, [isOpen, config?.product]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen || !config) return null;

  const titles: Record<string, string> = {
    order: `Order ${config.product ?? "Product"}`,
    tour: "Book a Farm Tour",
    training: `Enrol in ${config.product ?? "Training"}`,
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!config) return;

    if (!db || !isFirebaseConfigured) {
      setError("Sorry, this form is temporarily unavailable. Please contact us directly at support@ingajufarms.com.");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      const base = {
        source: config.variant,
        product: config.product ?? null,
        unit: config.unit ?? null,
        status: "new",
      };
      const leadPayload =
        config.variant === "order"
          ? { ...base, ...orderForm }
          : config.variant === "tour"
            ? { ...base, ...tourForm }
            : { ...base, ...trainingForm };

      await addDoc(collection(db, "leads"), { ...leadPayload, createdAt: serverTimestamp() });
      notifyNewLead(leadPayload);
      setSent(true);
    } catch {
      setError("Something went wrong sending your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      onClick={close}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative z-10 w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={close}
          className="absolute top-5 right-5 h-8 w-8 rounded-full border border-[#E0D8CE] flex items-center justify-center text-[#6B6259] hover:border-[#3A7D5A] hover:text-[#3A7D5A] transition-colors"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {sent ? (
          <div className="flex flex-col gap-4 py-8 items-start">
            <div className="w-12 h-12 rounded-full bg-[#3A7D5A]/10 flex items-center justify-center text-[#3A7D5A]">
              <ArrowRight className="h-5 w-5" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-[#1C2321]">Request Sent!</h3>
            <p className="text-sm font-body text-[#6B6259] leading-relaxed">
              Thank you — our team will get back to you within 24 hours to confirm the details.
            </p>
            <button
              onClick={close}
              className="mt-2 rounded-full bg-[#1C2321] px-6 py-3 text-sm font-body font-semibold text-white hover:bg-[#3A7D5A] transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <p className="text-[10px] font-body font-semibold uppercase tracking-widest text-[#3A7D5A] mb-1">
              {config.variant === "order" ? "Place an Order" : config.variant === "tour" ? "Farm Tour" : "Training Enrolment"}
            </p>
            <h2 className="font-heading text-2xl font-bold text-[#1C2321] mb-6">
              {titles[config.variant]}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              {/* ORDER FORM */}
              {config.variant === "order" && (
                <>
                  <Field label="Product">
                    <input className={inputCls} value={config.product ?? ""} readOnly />
                  </Field>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label={`Quantity (${config.unit ?? "units"})`}>
                      <input
                        className={inputCls} type="number" min="1" required placeholder="e.g. 50"
                        value={orderForm.qty} onChange={(e) => setOrderForm((f) => ({ ...f, qty: e.target.value }))}
                      />
                    </Field>
                    <Field label="Preferred Delivery Date">
                      <input
                        className={inputCls} type="date" required
                        value={orderForm.deliveryDate} onChange={(e) => setOrderForm((f) => ({ ...f, deliveryDate: e.target.value }))}
                      />
                    </Field>
                  </div>
                  <Field label="Full Name">
                    <input
                      className={inputCls} type="text" required placeholder="Jane Doe"
                      value={orderForm.name} onChange={(e) => setOrderForm((f) => ({ ...f, name: e.target.value }))}
                    />
                  </Field>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Phone Number">
                      <input
                        className={inputCls} type="tel" required placeholder="+250 700 000 000"
                        value={orderForm.phone} onChange={(e) => setOrderForm((f) => ({ ...f, phone: e.target.value }))}
                      />
                    </Field>
                    <Field label="Email">
                      <input
                        className={inputCls} type="email" required placeholder="jane@email.com"
                        value={orderForm.email} onChange={(e) => setOrderForm((f) => ({ ...f, email: e.target.value }))}
                      />
                    </Field>
                  </div>
                  <Field label="Delivery Address">
                    <input
                      className={inputCls} type="text" required placeholder="Street, City, District"
                      value={orderForm.address} onChange={(e) => setOrderForm((f) => ({ ...f, address: e.target.value }))}
                    />
                  </Field>
                  <Field label="Additional Notes (optional)">
                    <textarea
                      className={`${inputCls} resize-none`} rows={3} placeholder="Any special requirements..."
                      value={orderForm.notes} onChange={(e) => setOrderForm((f) => ({ ...f, notes: e.target.value }))}
                    />
                  </Field>
                </>
              )}

              {/* TOUR FORM */}
              {config.variant === "tour" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Preferred Date">
                      <input
                        className={inputCls} type="date" required
                        value={tourForm.date} onChange={(e) => setTourForm((f) => ({ ...f, date: e.target.value }))}
                      />
                    </Field>
                    <Field label="Group Size">
                      <input
                        className={inputCls} type="number" min="1" required placeholder="e.g. 12"
                        value={tourForm.groupSize} onChange={(e) => setTourForm((f) => ({ ...f, groupSize: e.target.value }))}
                      />
                    </Field>
                  </div>
                  <Field label="Tour Type">
                    <select
                      className={inputCls} required
                      value={tourForm.tourType} onChange={(e) => setTourForm((f) => ({ ...f, tourType: e.target.value }))}
                    >
                      <option value="" disabled>Select type</option>
                      {TOUR_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </Field>
                  <Field label="Full Name">
                    <input
                      className={inputCls} type="text" required placeholder="Jane Doe"
                      value={tourForm.name} onChange={(e) => setTourForm((f) => ({ ...f, name: e.target.value }))}
                    />
                  </Field>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Phone Number">
                      <input
                        className={inputCls} type="tel" required placeholder="+250 700 000 000"
                        value={tourForm.phone} onChange={(e) => setTourForm((f) => ({ ...f, phone: e.target.value }))}
                      />
                    </Field>
                    <Field label="Email">
                      <input
                        className={inputCls} type="email" required placeholder="jane@email.com"
                        value={tourForm.email} onChange={(e) => setTourForm((f) => ({ ...f, email: e.target.value }))}
                      />
                    </Field>
                  </div>
                  <Field label="Special Requests (optional)">
                    <textarea
                      className={`${inputCls} resize-none`} rows={3} placeholder="Accessibility needs, language preference..."
                      value={tourForm.requests} onChange={(e) => setTourForm((f) => ({ ...f, requests: e.target.value }))}
                    />
                  </Field>
                </>
              )}

              {/* TRAINING FORM */}
              {config.variant === "training" && (
                <>
                  <Field label="Program">
                    <select
                      className={inputCls} required
                      value={trainingForm.program} onChange={(e) => setTrainingForm((f) => ({ ...f, program: e.target.value }))}
                    >
                      <option value="" disabled>Select program</option>
                      {TRAINING_PROGRAMS.map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </Field>
                  <Field label="Full Name">
                    <input
                      className={inputCls} type="text" required placeholder="Jane Doe"
                      value={trainingForm.name} onChange={(e) => setTrainingForm((f) => ({ ...f, name: e.target.value }))}
                    />
                  </Field>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Phone Number">
                      <input
                        className={inputCls} type="tel" required placeholder="+250 700 000 000"
                        value={trainingForm.phone} onChange={(e) => setTrainingForm((f) => ({ ...f, phone: e.target.value }))}
                      />
                    </Field>
                    <Field label="Email">
                      <input
                        className={inputCls} type="email" required placeholder="jane@email.com"
                        value={trainingForm.email} onChange={(e) => setTrainingForm((f) => ({ ...f, email: e.target.value }))}
                      />
                    </Field>
                  </div>
                  <Field label="Farming Background (optional)">
                    <textarea
                      className={`${inputCls} resize-none`} rows={3} placeholder="Tell us briefly about your current farming situation..."
                      value={trainingForm.background} onChange={(e) => setTrainingForm((f) => ({ ...f, background: e.target.value }))}
                    />
                  </Field>
                </>
              )}

              {error && (
                <p className="text-xs font-body font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="mt-2 w-full rounded-full bg-[#1C2321] py-3.5 text-sm font-body font-semibold text-white hover:bg-[#3A7D5A] transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Submitting..." : "Submit Request"} <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
