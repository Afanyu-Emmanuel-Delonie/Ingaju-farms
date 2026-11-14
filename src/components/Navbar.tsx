"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ArrowRight, ChevronDown, type LucideProps } from "lucide-react";

type IconProps = Omit<LucideProps, "ref"> & { className?: string };
const IMenu = (p: IconProps) => <Menu {...(p as LucideProps)} />;
const IX = (p: IconProps) => <X {...(p as LucideProps)} />;
const IArrow = (p: IconProps) => <ArrowRight {...(p as LucideProps)} />;
const IChevron = (p: IconProps) => <ChevronDown {...(p as LucideProps)} />;

interface NavLink {
  label: string;
  href: string;
  dropdown?: { label: string; href: string }[];
}

const BASE_NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Enterprises",
    href: "/products/dairy",
    dropdown: [
      { label: "Livestock & Dairy", href: "/products/dairy" },
      { label: "Crops Production", href: "/products/crops" },
      { label: "Organic Fertilizer", href: "/products/organic-fertilizer" },
    ]
  },
  { label: "Circular System", href: "/circular-system" },
  { label: "Contact Us", href: "/contact" },
];

export default function Navbar({ hasBlog, hasTestimonials }: { hasBlog: boolean; hasTestimonials: boolean }) {
  const navLinks = BASE_NAV_LINKS;
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled
          ? "bg-white/90 backdrop-blur-md py-3 shadow-sm border-b border-primary/5"
          : "bg-transparent py-5"
        }`}
    >
      <div className="container-pad flex items-center justify-between">
        {/* Brand/Logo Area */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-12 w-12 overflow-hidden rounded-full transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/images/brand/Logo.webp"
              alt="Ingaju Farms"
              fill
              sizes="48px"
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span
              className={`font-heading text-xl font-bold leading-none tracking-tight transition-colors duration-300 ${scrolled ? "text-primary" : "text-white"
                }`}
            >
              Ingaju <span className="text-tertiary">Farms</span>
            </span>
            <span
              className={`text-[9px] font-body font-semibold uppercase tracking-widest transition-colors duration-300 mt-0.5 ${scrolled ? "text-secondary" : "text-[#6DBE8C]"
                }`}
            >
              Organic & Circular
            </span>
          </div>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <div key={link.label} className="relative group/nav">
              <Link
                href={link.href}
                className={`relative py-1 flex items-center gap-1 text-sm font-body font-medium transition-colors duration-300 group ${scrolled
                    ? "text-primary/80 hover:text-primary"
                    : "text-white/80 hover:text-white"
                  }`}
              >
                {link.label}
                {link.dropdown && (
                  <IChevron className="w-4 h-4 transition-transform duration-300 group-hover/nav:rotate-180" />
                )}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full ${scrolled ? "bg-secondary" : "bg-[#6DBE8C]"
                    }`}
                />
              </Link>

              {link.dropdown && (
                <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-300">
                  <div className="flex flex-col min-w-50 rounded-xl shadow-xl overflow-hidden bg-white border border-primary/10">
                    {link.dropdown.map(drop => (
                      <Link
                        key={drop.label}
                        href={drop.href}
                        className="px-5 py-3 text-sm font-body transition-colors text-primary/80 hover:bg-secondary/5 hover:text-secondary"
                      >
                        {drop.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Desktop Call To Action */}
        <Link
          href="/contact"
          className="group hidden lg:inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-2.5 text-sm font-body font-semibold text-white transition-all duration-300 hover:bg-primary hover:shadow-md hover:-translate-y-0.5"
        >
          <span>Visit Our Farm</span>
          <IArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>

        {/* Mobile menu toggle button */}
        <button
          onClick={() => setMenuOpen((v: boolean) => !v)}
          className={`lg:hidden rounded-full p-2 transition-colors duration-300 hover:bg-black/5 ${scrolled ? "text-primary" : "text-white"
            }`}
          aria-label="Toggle menu"
        >
          {menuOpen ? <IX className="h-6 w-6" /> : <IMenu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`absolute top-full left-0 w-full bg-primary/95 backdrop-blur-md border-b border-white/10 transition-all duration-300 origin-top shadow-xl ${menuOpen
            ? "scale-y-100 opacity-100 visible"
            : "scale-y-95 opacity-0 invisible"
          }`}
      >
        <nav className="flex flex-col gap-5 px-6 py-8">
          {navLinks.map((link) => (
            <div key={link.label} className="flex flex-col gap-2 border-b border-white/5 pb-2">
              <Link
                href={link.href}
                onClick={() => {
                  if (!link.dropdown) setMenuOpen(false);
                }}
                className="text-base font-body font-medium text-white/80 transition-colors hover:text-white flex items-center justify-between"
              >
                <span>{link.label}</span>
                {!link.dropdown && <IArrow className="h-4 w-4 text-[#6DBE8C]" />}
                {link.dropdown && <IChevron className="h-4 w-4 text-[#6DBE8C]" />}
              </Link>
              {link.dropdown && (
                <div className="flex flex-col gap-3 pl-4 pt-2 pb-2">
                  {link.dropdown.map(drop => (
                    <Link
                      key={drop.label}
                      href={drop.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-sm font-body text-white/60 transition-colors hover:text-white flex items-center justify-between"
                    >
                      <span>{drop.label}</span>
                      <IArrow className="h-3 w-3 text-[#6DBE8C]/70" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-secondary px-5 py-3 text-sm font-body font-semibold text-white transition-colors hover:bg-secondary-hover"
          >
            Visit Our Farm
            <IArrow className="h-4 w-4" />
          </Link>
        </nav>
      </div>
    </header>
  );
}

