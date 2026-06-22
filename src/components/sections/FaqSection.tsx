"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What products does Ingaju Farms offer?",
    answer:
      "Ingaju Farms offers a range of organic products including fresh milk, organic manure, breeding livestock, corn, beans, soybeans, and macadamia nuts — all produced through sustainable circular farming practices.",
  },
  {
    question: "How can I book a farm tour?",
    answer:
      "You can book a farm tour by visiting our Book a Tour page or contacting us directly. We offer educational tours, school visits, corporate visits, and agricultural learning experiences.",
  },
  {
    question: "What training programs does Ingaju offer?",
    answer:
      "We offer hands-on training in dairy farming, organic farming, and circular agriculture. Our programs are designed for both beginner and experienced farmers looking to adopt sustainable methods.",
  },
  {
    question: "Can I partner with Ingaju Farms?",
    answer:
      "Yes, we welcome partnership opportunities with individuals, organizations, and businesses aligned with sustainable agriculture. Reach out through our contact page to start the conversation.",
  },
  {
    question: "How does circular farming work at Ingaju?",
    answer:
      "At Ingaju, circular farming integrates dairy livestock, crop production, and natural resource recycling. Manure from cattle is used as organic fertilizer for crops, and crop residues feed back into the livestock system — creating a closed, sustainable loop.",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="w-full bg-white">
      <div className="container-pad py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
          <div>
            <p className="text-sm font-body font-semibold tracking-widest uppercase text-[#2E4F41]">
              FAQ
            </p>
            <h2 className="mt-2 text-3xl font-heading font-bold leading-tight text-[#1C2321] sm:text-4xl">
              Frequently Asked <span className="text-[#2E4F41]">Questions</span>
            </h2>
            <p className="mt-4 text-sm font-body leading-relaxed text-[#6B6259]">
              Can&apos;t find what you&apos;re looking for? Feel free to{" "}
              <a href="/contact" className="text-[#2E4F41] underline underline-offset-2 hover:opacity-80">
                contact us
              </a>{" "}
              directly.
            </p>
          </div>

          <div className="lg:col-span-2">
            <ul className="divide-y divide-[#E0D8CE]">
              {faqs.map((faq, i) => (
                <li key={i}>
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="text-base font-heading font-semibold text-[#1C2321]">
                      {faq.question}
                    </span>
                    <span className="flex-shrink-0 rounded-full bg-[#F0F7F4] p-1.5 text-[#2E4F41]">
                      {open === i ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>
                  {open === i && (
                    <p className="pb-5 text-sm font-body leading-relaxed text-[#6B6259]">
                      {faq.answer}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
