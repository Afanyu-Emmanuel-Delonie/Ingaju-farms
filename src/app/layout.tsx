import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import BackToTop from "@/components/BackToTop";
import { Playfair_Display, DM_Sans } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import { ModalProvider } from "@/components/shared/ModalContext";
import RequestModal from "@/components/shared/RequestModal";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ingaju Farms — Organic Dairy, Crops & Circular Agriculture in Rwanda",
  description: "Ingaju Farms is Rwanda's leading circular agriculture enterprise. We produce fresh organic milk, crops, honey, and organic manure through a sustainable farming system that protects the environment and empowers communities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ModalProvider>
          <SmoothScroll>
            <Navbar />
            {children}
            <Footer />
            <BackToTop />
          </SmoothScroll>
          <RequestModal />
        </ModalProvider>
      </body>
    </html>
  );
}
