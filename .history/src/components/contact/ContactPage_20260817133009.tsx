"use client";

import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { notifyNewLead } from "@/lib/notify";
import FaqSection from "@/components/sections/FaqSection";
import BrandPattern from "@/components/shared/BrandPattern";

const INFO = [
  {
    icon: MapPin,
    label: "Location",
    value: "Rebero Village, Nyagatare District, Eastern Province, Rwanda",
    sub: "Open for farm tours by appointment",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+250 788 304 921",
    sub: "Mon – Sat, 8am to 5pm",
  },
  {
    icon: Mail,
    label: "Email",
    value: "support@ingajufarms.com",
    sub: "We reply within 24 hours",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Mon – Sat: 8:00am – 5:00pm",
    sub: "Sunday: Closed",
  },
];

const TOPICS = [
  "Product Order",
  "Farm Tour",
  "Training Program",
  "Partnership",
  "Other",
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", topic: "", message: "" });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const topic = new URLSearchParams(window.location.search).get("topic");
    if (topic && TOPICS.includes(topic)) {
      setForm((f) => ({ ...f, topic }));
    }
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!db || !isFirebaseConfigured) {
      setError("Sorry, this form is temporarily unavailable. Please email us directly at support@ingajufarms.com.");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      const leadPayload = {
        source: "contact",
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        topic: form.topic,
        message: form.message,
        status: "new",
      };
      await addDoc(collection(db, "leads"), { ...leadPayload, createdAt: serverTimestamp() });
      notifyNewLead(leadPayload);
      setSent(true);
    } catch (err) {
      console.error("[Contact form] Firestore error:", err);
      setError("Something went wrong sending your message. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="flex flex-col min-h-screen">

      {/* ── Hero ── */}
      <section className="relative w-full h-[60vh] lg:h-[70vh] overflow-hidden bg-[#1C2321] flex items-end">
        <video
          className="absolute inset-0 w-full h-full object-cover object-center"
          src="/images/about/about.mp4"
          poster="/images/about/about-3.png"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
        />
        <div aria-hidden className="absolute inset-0 bg-black/80" />

        <div className="relative z-10 container-pad pb-12 w-full">
          <span className="mb-4 inline-block rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-1.5 text-xs font-body font-semibold uppercase tracking-widest text-white">
            Get In Touch
          </span>
          <h1 className="max-w-3xl text-3xl font-heading font-bold leading-tight text-white md:text-5xl">
            Let&apos;s Start a<br />
            <span className="text-[#6DBE8C]">Conversation.</span>
          </h1>
          <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-white/70">
            Whether you&apos;re looking to order products, book a farm tour, join a training, or explore a partnership — we&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* ── Split: Info + Form ── */}
      <section className="w-full bg-[#F8F6F2]">
        <div className="container-pad py-20">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-12">

            {/* Left — dark info panel */}
            <div className="relative overflow-hidden rounded-3xl bg-[#1C2321] p-8 lg:p-10 flex flex-col justify-between gap-10">
              <BrandPattern />

              <div>
                <p className="text-xs font-body font-semibold uppercase tracking-widest text-[#6DBE8C] mb-3">Contact Information</p>
                <h2 className="font-heading text-2xl font-bold text-white leading-snug">
                  We&apos;re always<br />happy to help.
                </h2>
                <p className="mt-3 text-sm font-body text-white/55 leading-relaxed max-w-xs">
                  Reach out through any channel below and our team will get back to you promptly.
                </p>
              </div>

              {/* Info items */}
              <ul className="flex flex-col gap-6">
                {INFO.map(({ icon: Icon, label, value, sub }) => (
                  <li key={label} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#3A7D5A]/15 border border-[#3A7D5A]/20 flex items-center justify-center text-[#6DBE8C]">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-body font-semibold uppercase tracking-widest text-white/40">{label}</p>
                      <p className="mt-0.5 text-sm font-body font-medium text-white">{value}</p>
                      <p className="mt-0.5 text-xs font-body text-white/40">{sub}</p>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Bottom accent line */}
              <div className="w-12 h-0.5 bg-[#3A7D5A]" />
            </div>

            {/* Right — form */}
            <div className="rounded-3xl bg-white p-8 lg:p-10 shadow-sm">
              {sent ? (
                <div className="flex flex-col items-start justify-center h-full gap-4 py-12">
                  <div className="w-12 h-12 rounded-full bg-[#3A7D5A]/10 flex items-center justify-center text-[#3A7D5A]">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-[#1C2321]">Message Sent!</h3>
                  <p className="text-sm font-body text-[#6B6259] leading-relaxed max-w-sm">
                    Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: "", email: "", phone: "", topic: "", message: "" }); }}
                    className="mt-2 text-sm font-body font-semibold text-[#3A7D5A] border-b border-[#3A7D5A]/40 pb-0.5 hover:border-[#3A7D5A] transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                      <div className="flex flex-col gap-1.5">
                      <label htmlFor="name" className="text-xs font-body font-semibold uppercase tracking-widest text-[#6B6259]">Full Name</label>
                      <input
                        id="name" name="name" type="text" required
                        value={form.name} onChange={handleChange}
                        placeholder="Jane Doe"
                        className="rounded-xl border border-[#E0D8CE] px-4 py-3 text-sm font-body text-[#1C2321] outline-none placeholder:text-[#C0B8AE] focus:border-[#3A7D5A] transition-colors bg-[#F8F6F2]"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-xs font-body font-semibold uppercase tracking-widest text-[#6B6259]">Email Address</label>
                      <input
                        id="email" name="email" type="email" required
                        value={form.email} onChange={handleChange}
                        placeholder="jane@email.com"
                        className="rounded-xl border border-[#E0D8CE] px-4 py-3 text-sm font-body text-[#1C2321] outline-none placeholder:text-[#C0B8AE] focus:border-[#3A7D5A] transition-colors bg-[#F8F6F2]"
                      />
                    </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="phone" className="text-xs font-body font-semibold uppercase tracking-widest text-[#6B6259]">Phone <span className="normal-case text-[#B0A89E]">(optional)</span></label>
                      <input
                        id="phone" name="phone" type="tel"
                        value={form.phone} onChange={handleChange}
                        placeholder="+250 700 000 000"
                        className="rounded-xl border border-[#E0D8CE] px-4 py-3 text-sm font-body text-[#1C2321] outline-none placeholder:text-[#C0B8AE] focus:border-[#3A7D5A] transition-colors bg-[#F8F6F2]"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="topic" className="text-xs font-body font-semibold uppercase tracking-widest text-[#6B6259]">Topic</label>
                      <select
                        id="topic" name="topic" required
                        value={form.topic} onChange={handleChange}
                        className="rounded-xl border border-[#E0D8CE] px-4 py-3 text-sm font-body text-[#1C2321] outline-none focus:border-[#3A7D5A] transition-colors bg-[#F8F6F2] appearance-none"
                      >
                        <option value="" disabled>Select a topic</option>
                        {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-xs font-body font-semibold uppercase tracking-widest text-[#6B6259]">Message</label>
                    <textarea
                      id="message" name="message" required rows={5}
                      value={form.message} onChange={handleChange}
                      placeholder="Tell us how we can help you..."
                      className="rounded-xl border border-[#E0D8CE] px-4 py-3 text-sm font-body text-[#1C2321] outline-none placeholder:text-[#C0B8AE] focus:border-[#3A7D5A] transition-colors bg-[#F8F6F2] resize-none"
                    />
                  </div>

                  {error && (
                    <p className="text-xs font-body font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-1 w-full rounded-full bg-[#1C2321] py-3.5 text-sm font-body font-semibold text-white transition-colors hover:bg-[#3A7D5A] inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Sending..." : "Send Message"} <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ── Map ── */}
      <section className="w-full">
        <div className="relative h-[420px] w-full overflow-hidden">
          {/* Overlay top fade to blend with section above */}
          <div className="absolute top-0 inset-x-0 h-8 bg-gradient-to-b from-[#F8F6F2] to-transparent z-10 pointer-events-none" />
          <iframe
            src="https://www.google.com/maps?q=Rebero%20Village%2C%20Nyagatare%20District%2C%20Eastern%20Province%2C%20Rwanda&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "grayscale(20%) contrast(1.05)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ingaju Farms Location in Rebero Village, Nyagatare District"
          />
        </div>
      </section>

      {/* ── FAQ ── */}
      <FaqSection />

    </main>
  );
}
