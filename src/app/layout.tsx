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
  metadataBase: new URL("https://ingajufarms.com"),
  title: {
    default: "Ingaju Farms | Integrated Dairy Farm & Circular Agriculture Rwanda",
    template: "%s | Ingaju Farms"
  },
  description: "Ingaju Farms is Rwanda's leading integrated dairy farm using a closed-loop circular economy system. We produce organic milk, value-added dairy products, organic fertilizer, and sustainable crops through an 8-stage zero-waste circular agriculture model.",
  keywords: [
    "integrated dairy farming Rwanda",
    "circular economy in agriculture",
    "closed-loop farming system",
    "circular dairy farm Rwanda",
    "sustainable integrated farm Africa",
    "organic dairy products Rwanda",
    "organic fertilizer from farm waste",
    "value-added milk products",
    "biogas energy recovery farm",
    "farm waste utilization system",
    "agricultural water reuse",
    "organic nutrient recycling soil",
    "anaerobic digester small farm",
    "sustainable dairy farm Africa",
    "regenerative agriculture Rwanda",
    "Ingaju Farms",
    "circular agriculture Rwanda",
    "zero waste farming",
  ],
  authors: [{ name: "Ingaju Farms" }],
  creator: "Ingaju Farms",
  openGraph: {
    type: "website",
    locale: "en_RW",
    url: "https://ingajufarms.com",
    siteName: "Ingaju Farms",
    title: "Ingaju Farms | Integrated Dairy Farm & Circular Agriculture Rwanda",
    description: "Rwanda's leading closed-loop farm. Organic dairy, sustainable crops, biogas energy, and organic fertilizer — all from one circular system.",
    images: [
      {
        url: "/images/hero/bg-img.png",
        width: 1200,
        height: 630,
        alt: "Ingaju Farms Circular Agriculture Rwanda",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ingaju Farms | Integrated Dairy Farm & Circular Agriculture Rwanda",
    description: "Rwanda's leading closed-loop farm. Organic dairy, sustainable crops, biogas energy, and organic fertilizer — all from one circular system.",
    images: ["/images/hero/bg-img.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
