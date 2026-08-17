"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export default function SiteChrome({ children, hasBlog }: { children: React.ReactNode; hasBlog: boolean }) {
  const pathname = usePathname();
  const isPortal = pathname.startsWith("/portal");

  return (
    <>
      {!isPortal && <Navbar hasBlog={hasBlog} />}
      {children}
      {!isPortal && <Footer />}
      {!isPortal && <BackToTop />}
    </>
  );
}
