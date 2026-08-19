"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export default function SiteChrome({
  children,
  hasBlog,
  hasTestimonials,
}: {
  children: React.ReactNode;
  hasBlog: boolean;
  hasTestimonials: boolean;
}) {
  const pathname = usePathname();
  const isPortal = pathname.startsWith("/portal");

  return (
    <>
      {!isPortal && <Navbar hasBlog={hasBlog} hasTestimonials={hasTestimonials} />}
      {children}
      {!isPortal && <Footer />}
      {!isPortal && <BackToTop />}
    </>
  );
}
