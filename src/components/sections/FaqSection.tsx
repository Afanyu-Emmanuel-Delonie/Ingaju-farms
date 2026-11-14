"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import JsonLd from "@/components/JsonLd";

const contactLinkClass =
  "font-semibold text-[#3A7D5A] underline underline-offset-2 hover:opacity-80";

// `answer` is the rendered JSX (may include links); `answerText` is the
// plain-text equivalent used for the FAQPage JSON-LD, which can't hold JSX.
// A FAQ is only rendered, and only emitted into the schema, when both are
// non-empty - see the `.filter()` below.
const faqs = [
  {
    question: "What products and services does Ingaju Farms offer?",
    answerText:
      "Ingaju Farms produces fresh milk and breeding livestock, along with maize, beans, soybeans, and macadamia nuts all grown within an integrated circular production system. Our organic fertilizer line is currently scaling up. We also offer structured farmer training programmes and farm visits for educational and professional groups.",
    answer:
      "Ingaju Farms produces fresh milk and breeding livestock, along with maize, beans, soybeans, and macadamia nuts all grown within an integrated circular production system. Our organic fertilizer line is currently scaling up. We also offer structured farmer training programmes and farm visits for educational and professional groups.",
  },
  {
    question: "How can I arrange a farm visit or educational tour?",
    answerText:
      "Farm visits can be arranged through our contact page or by reaching out to our team directly. We accommodate school groups, farmer delegations, research institutions, corporate teams, and individual visitors seeking to observe circular agriculture in practice.",
    answer: (
      <>
        Farm visits can be arranged through our{" "}
        <a href="/contact" className={contactLinkClass}>
          contact page
        </a>{" "}
        or by reaching out to our team directly. We accommodate school groups, farmer delegations, research institutions, corporate teams, and individual visitors seeking to observe circular agriculture in practice.
      </>
    ),
  },
  {
    question: "What training programmes does Ingaju Farms offer?",
    answerText:
      "We offer practical, on-farm training in livestock herd management, climate-smart crop production, and integrated circular agriculture systems. Programmes are tailored for smallholder farmers, farmer cooperatives, agricultural students, and agribusiness professionals at all experience levels.",
    answer:
      "We offer practical, on-farm training in livestock herd management, climate-smart crop production, and integrated circular agriculture systems. Programmes are tailored for smallholder farmers, farmer cooperatives, agricultural students, and agribusiness professionals at all experience levels.",
  },
  {
    question: "Does Ingaju Farms accept institutional or commercial partnerships?",
    answerText:
      "Yes. We actively pursue partnerships with development organizations, research institutions, government agencies, cooperatives, and private sector actors aligned with sustainable agriculture. Please contact us through our partnership inquiry page to initiate a discussion.",
    answer: (
      <>
        Yes. We actively pursue partnerships with development organizations, research institutions, government agencies, cooperatives, and private sector actors aligned with sustainable agriculture. Please{" "}
        <a href="/contact" className={contactLinkClass}>
          contact us
        </a>{" "}
        through our partnership inquiry page to initiate a discussion.
      </>
    ),
  },
  {
    question: "How does the circular agriculture system work at Ingaju Farms?",
    answerText:
      "Our circular system integrates livestock production, crop cultivation, and organic resource recovery into a single closing loop: crop residues become livestock feed, and manure is composted into organic fertilizer as that line scales up and returns to the fields. We track every stage of the loop, because in a circular economy, the record is what proves the claim.",
    answer:
      "Our circular system integrates livestock production, crop cultivation, and organic resource recovery into a single closing loop: crop residues become livestock feed, and manure is composted into organic fertilizer as that line scales up and returns to the fields. We track every stage of the loop, because in a circular economy, the record is what proves the claim.",
  },
];

// Only questions with a real answer are ever shown or emitted into schema.
const answeredFaqs = faqs.filter((faq) => Boolean(faq.answerText?.trim()));

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: answeredFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answerText },
  })),
};

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="w-full bg-white">
      {answeredFaqs.length > 0 && <JsonLd data={faqJsonLd} />}
      <div className="container-pad py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
          <div>
            <p className="text-sm font-body font-semibold tracking-widest uppercase text-[#3A7D5A]">
              FAQ
            </p>
            <h2 className="mt-2 text-3xl font-heading font-bold leading-tight text-[#1C2321] sm:text-4xl">
              Frequently Asked <span className="text-[#3A7D5A]">Questions</span>
            </h2>
            <p className="mt-4 text-sm font-body leading-relaxed text-[#6B6259]">
              Can&apos;t find what you&apos;re looking for? Feel free to{" "}
              <a href="/contact" className="text-[#3A7D5A] underline underline-offset-2 hover:opacity-80">
                contact us
              </a>{" "}
              directly.
            </p>
          </div>

          <div className="lg:col-span-2">
            <ul className="divide-y divide-[#E0D8CE]">
              {answeredFaqs.map((faq, i) => (
                <li key={i}>
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="text-base font-heading font-semibold text-[#1C2321]">
                      {faq.question}
                    </span>
                    <span className="flex-shrink-0 rounded-full bg-[#F0F7F4] p-1.5 text-[#3A7D5A]">
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
