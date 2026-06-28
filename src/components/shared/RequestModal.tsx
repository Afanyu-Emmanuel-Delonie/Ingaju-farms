"use client";

import { useEffect, useState } from "react";
import { X, ArrowRight } from "lucide-react";
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

export default function RequestModal() {
  const { isOpen, close, config } = useModal();
  const [sent, setSent] = useState(false);

  // Reset on new open
  useEffect(() => { if (isOpen) setSent(false); }, [isOpen]);

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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
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
                      <input className={inputCls} type="number" min="1" required placeholder="e.g. 50" />
                    </Field>
                    <Field label="Preferred Delivery Date">
                      <input className={inputCls} type="date" required />
                    </Field>
                  </div>
                  <Field label="Full Name">
                    <input className={inputCls} type="text" required placeholder="Jane Doe" />
                  </Field>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Phone Number">
                      <input className={inputCls} type="tel" required placeholder="+250 700 000 000" />
                    </Field>
                    <Field label="Email">
                      <input className={inputCls} type="email" required placeholder="jane@email.com" />
                    </Field>
                  </div>
                  <Field label="Delivery Address">
                    <input className={inputCls} type="text" required placeholder="Street, City, District" />
                  </Field>
                  <Field label="Additional Notes (optional)">
                    <textarea className={`${inputCls} resize-none`} rows={3} placeholder="Any special requirements..." />
                  </Field>
                </>
              )}

              {/* TOUR FORM */}
              {config.variant === "tour" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Preferred Date">
                      <input className={inputCls} type="date" required />
                    </Field>
                    <Field label="Group Size">
                      <input className={inputCls} type="number" min="1" required placeholder="e.g. 12" />
                    </Field>
                  </div>
                  <Field label="Tour Type">
                    <select className={inputCls} required defaultValue="">
                      <option value="" disabled>Select type</option>
                      {TOUR_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </Field>
                  <Field label="Full Name">
                    <input className={inputCls} type="text" required placeholder="Jane Doe" />
                  </Field>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Phone Number">
                      <input className={inputCls} type="tel" required placeholder="+250 700 000 000" />
                    </Field>
                    <Field label="Email">
                      <input className={inputCls} type="email" required placeholder="jane@email.com" />
                    </Field>
                  </div>
                  <Field label="Special Requests (optional)">
                    <textarea className={`${inputCls} resize-none`} rows={3} placeholder="Accessibility needs, language preference..." />
                  </Field>
                </>
              )}

              {/* TRAINING FORM */}
              {config.variant === "training" && (
                <>
                  <Field label="Program">
                    <select className={inputCls} required defaultValue={config.product ?? ""}>
                      <option value="" disabled>Select program</option>
                      {TRAINING_PROGRAMS.map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </Field>
                  <Field label="Full Name">
                    <input className={inputCls} type="text" required placeholder="Jane Doe" />
                  </Field>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Phone Number">
                      <input className={inputCls} type="tel" required placeholder="+250 700 000 000" />
                    </Field>
                    <Field label="Email">
                      <input className={inputCls} type="email" required placeholder="jane@email.com" />
                    </Field>
                  </div>
                  <Field label="Farming Background (optional)">
                    <textarea className={`${inputCls} resize-none`} rows={3} placeholder="Tell us briefly about your current farming situation..." />
                  </Field>
                </>
              )}

              <button
                type="submit"
                className="mt-2 w-full rounded-full bg-[#1C2321] py-3.5 text-sm font-body font-semibold text-white hover:bg-[#3A7D5A] transition-colors inline-flex items-center justify-center gap-2"
              >
                Submit Request <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
