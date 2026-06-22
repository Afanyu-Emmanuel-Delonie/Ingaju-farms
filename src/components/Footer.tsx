import Image from "next/image";
import { ArrowRight } from "lucide-react";

const links = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Farm", href: "/our-farm" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  products: [
    { label: "Dairy & Livestock", href: "/categories/dairy-livestock" },
    { label: "Crop Production", href: "/categories/crop-production" },
    { label: "Breeding Bulls", href: "/marketplace" },
    { label: "Marketplace", href: "/marketplace" },
  ],
  training: [
    { label: "Dairy Farming", href: "/trainings/dairy-farming" },
    { label: "Organic Farming", href: "/trainings/organic-farming" },
    { label: "Circular Agriculture", href: "/trainings/circular-agriculture" },
    { label: "Book a Farm Tour", href: "/book-a-tour" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative w-full text-white overflow-hidden">
      <Image
        src="/images/bg-img.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        aria-hidden
      />
      <div className="absolute inset-0 bg-black/92" aria-hidden />
      <div className="relative container-pad py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-xl font-heading font-bold text-[#F9F6F0]">
              Ingaju <span className="text-[#D07A53]">Farms</span>
            </h2>
            <p className="mt-4 text-sm font-body leading-relaxed text-white/65">
              Growing healthy food and empowering communities through circular
              farming and organic production.
            </p>
            <a
              href="/contact"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#2E4F41] px-5 py-2.5 text-sm font-body font-medium text-white transition-colors hover:bg-[#3a6352]"
            >
              Get In Touch
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-body font-semibold uppercase tracking-widest text-[#6DBE8C]">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {links.company.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm font-body text-white/65 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-body font-semibold uppercase tracking-widest text-[#6DBE8C]">
              Products
            </h3>
            <ul className="mt-4 space-y-3">
              {links.products.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm font-body text-white/65 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Training */}
          <div>
            <h3 className="text-sm font-body font-semibold uppercase tracking-widest text-[#6DBE8C]">
              Training & Visits
            </h3>
            <ul className="mt-4 space-y-3">
              {links.training.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm font-body text-white/65 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs font-body text-white/40">
            © {new Date().getFullYear()} Ingaju Farms. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="/privacy" className="text-xs font-body text-white/40 transition-colors hover:text-white/70">
              Privacy Policy
            </a>
            <a href="/terms" className="text-xs font-body text-white/40 transition-colors hover:text-white/70">
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
