"use client";

import { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    label: "Location",
    value: "Ingaju Farm, Nakuru County, Kenya",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+254 700 000 000",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@ingajufarms.com",
  },
];

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <section className="w-full bg-[#FAF8F5]">
      <div className="container-pad py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left */}
          <div>
            <p className="text-sm font-body font-semibold tracking-widest uppercase text-[#D07A53]">
              Contact Us
            </p>
            <h2 className="mt-2 text-3xl font-heading font-bold leading-tight text-[#1C2321] sm:text-4xl">
              Let&apos;s <span className="text-[#D07A53]">Connect</span>
            </h2>
            <p className="mt-4 text-sm font-body leading-relaxed text-[#6B6259]">
              Whether you have a question about our products, training programs,
              farm tours, or partnership opportunities — we&apos;d love to hear
              from you.
            </p>

            <ul className="mt-8 space-y-5">
              {contactInfo.map(({ icon: Icon, label, value }) => (
                <li key={label} className="flex items-start gap-4">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#D07A53]/10 text-[#D07A53]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-body font-semibold uppercase tracking-widest text-[#6B6259]">
                      {label}
                    </p>
                    <p className="mt-0.5 text-sm font-body text-[#1C2321]">{value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 rounded-2xl bg-white p-8 shadow-sm"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-xs font-body font-semibold uppercase tracking-widest text-[#6B6259]">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="rounded-lg border border-[#E0D8CE] px-4 py-3 text-sm font-body text-[#1C2321] outline-none placeholder:text-[#B0A89E] focus:border-[#D07A53] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs font-body font-semibold uppercase tracking-widest text-[#6B6259]">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="rounded-lg border border-[#E0D8CE] px-4 py-3 text-sm font-body text-[#1C2321] outline-none placeholder:text-[#B0A89E] focus:border-[#D07A53] transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-xs font-body font-semibold uppercase tracking-widest text-[#6B6259]">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="How can we help you?"
                className="rounded-lg border border-[#E0D8CE] px-4 py-3 text-sm font-body text-[#1C2321] outline-none placeholder:text-[#B0A89E] focus:border-[#D07A53] transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-full bg-[#1C2321] py-3 text-sm font-body font-medium text-white transition-colors hover:bg-[#2E4F41]"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
