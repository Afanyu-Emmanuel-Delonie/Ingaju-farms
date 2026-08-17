import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";

const links = {
  // NOTE: "Our Farm" (/our-farm) removed — route not built. Re-add once it exists.
  company: [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  products: [
    { label: "Livestock & Dairy", href: "/products/dairy" },
    { label: "Crop Production", href: "/products/crops" },
    { label: "Breeding Bulls", href: "/products/dairy" },
    { label: "Organic Manure", href: "/products/crops" },
  ],
  // NOTE: /trainings/* pages don't exist — repointed to Contact with a
  // preselected topic per Priority Fix Tracker, "Fix This First."
  training: [
    { label: "Livestock & Dairy Training", href: "/contact?topic=Training%20Program" },
    { label: "Climate-Smart Crop Production", href: "/contact?topic=Training%20Program" },
    { label: "Circular Agriculture", href: "/contact?topic=Training%20Program" },
    { label: "Book a Farm Tour", href: "/contact?topic=Farm%20Tour" },
  ],
};

const contact = [
  { icon: MapPin, value: "Rebero Village, Nyagatare District, Eastern Province, Rwanda" },
  { icon: Phone, value: "+250 788 304 921" },
  { icon: Mail,  value: "support@ingajufarms.com" },
];

export default function Footer() {
  return (
    <footer className="relative w-full text-white overflow-hidden">
      <Image
        src="/images/crops/nuts.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-right"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f0d] via-[#0a0f0d]/95 to-[#0a0f0d]/60" aria-hidden />

      <div className="relative container-pad py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5">

          {/* Brand — spans 2 cols on large */}
          <div className="lg:col-span-2">
            <div className="flex items-start gap-4">
              <Image
                src="/images/brand/Logo.webp"
                alt="Ingaju Farms"
                width={56}
                height={56}
                className="object-cover rounded-full shrink-0"
              />
              <p className="text-sm font-body leading-relaxed text-white/60">
              Growing healthy food and empowering communities through circular farming and organic production.
            </p>
            </div>
            {/* Contact info */}
            <ul className="mt-6 space-y-3">
              {contact.map(({ icon: Icon, value }) => (
                <li key={value} className="flex items-start gap-3">
                  <Icon className="h-4 w-4 text-[#6DBE8C] mt-0.5 shrink-0" />
                  <span className="text-sm font-body text-white/60">{value}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-body font-semibold uppercase tracking-widest text-[#6DBE8C]">Company</h3>
            <ul className="mt-4 space-y-3">
              {links.company.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm font-body text-white/60 transition-colors hover:text-white">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-body font-semibold uppercase tracking-widest text-[#6DBE8C]">Products</h3>
            <ul className="mt-4 space-y-3">
              {links.products.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm font-body text-white/60 transition-colors hover:text-white">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Training */}
          <div>
            <h3 className="text-sm font-body font-semibold uppercase tracking-widest text-[#6DBE8C]">Training & Visits</h3>
            <ul className="mt-4 space-y-3">
              {links.training.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm font-body text-white/60 transition-colors hover:text-white">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        {/* NOTE: Privacy Policy / Terms of Use links removed — /privacy and /terms don't exist yet. Re-add once built. */}
        <div className="mt-14 flex flex-col items-center justify-center gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs font-body text-white/35">
            © {new Date().getFullYear()} Ingaju Farms. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
