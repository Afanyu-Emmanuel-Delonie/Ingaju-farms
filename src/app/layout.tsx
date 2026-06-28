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
    default: "Ingaju Farms | Circular Agriculture in Rwanda",
    template: "%s | Ingaju Farms"
  },
  description: "Ingaju Farms is Rwanda's leading circular agriculture enterprise. We produce fresh organic milk, crops, honey, and organic manure through a sustainable zero-waste system.",
  keywords: ["organic farming Rwanda", "circular agriculture", "zero waste farming", "organic dairy Africa", "sustainable crops", "Ingaju Farms"],
  authors: [{ name: "Ingaju Farms" }],
  creator: "Ingaju Farms",
  openGraph: {
    type: "website",
    locale: "en_RW",
    url: "https://ingajufarms.com",
    siteName: "Ingaju Farms",
    title: "Ingaju Farms | Circular Agriculture in Rwanda",
    description: "Discover Rwanda's leading zero-waste farming system. Producing organic dairy, crops, and natural manure.",
    images: [
      {
        url: "/images/bg-img.png",
        width: 1200,
        height: 630,
        alt: "Ingaju Farms Circular Agriculture",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ingaju Farms | Circular Agriculture in Rwanda",
    description: "Discover Rwanda's leading zero-waste farming system. Producing organic dairy, crops, and natural manure.",
    images: ["/images/bg-img.png"],
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
