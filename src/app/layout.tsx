import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import BackToTop from "@/components/BackToTop";
import { Playfair_Display, DM_Sans } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import { ModalProvider } from "@/components/shared/ModalContext";
import RequestModal from "@/components/shared/RequestModal";
import { AuthProvider } from "@/lib/AuthContext";
import StructuredData from "@/components/shared/StructuredData";
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
    default: "Ingaju Farms | Dairy, Crops & Circular Agriculture - Eastern Province, Rwanda",
    template: "%s | Ingaju Farms",
  },
    description:
      "Ingaju Farms is an integrated agricultural enterprise based in Rebero Village, Nyagatare District, Eastern Province. We produce dairy, crops, and organic fertilizer through a circular farming system and train smallholder farmers across Rwanda.",
  keywords: [
    "Ingaju Farms",
    "circular agriculture Rwanda",
    "integrated dairy farm Rwanda",
    "organic dairy products Rwanda",
    "organic fertilizer Rwanda",
    "sustainable farming Eastern Province Rwanda",
    "circular economy agriculture Africa",
    "closed-loop farming system",
    "circular farming Rwanda",
    "regenerative agriculture Rwanda",
    "smallholder farmer training Rwanda",
    "dairy farm Eastern Province Rwanda",
    "organic crop production Rwanda",
    "farm training Rwanda",
    "Rebero Village Rwanda farm",
    "sustainable food systems Africa",
    "pasture-fed milk Rwanda",
  ],
  authors: [{ name: "Ingaju Farms", url: "https://ingajufarms.com" }],
  creator: "Ingaju Farms",
  publisher: "Ingaju Farms",
  category: "Agriculture",
  openGraph: {
    type: "website",
    locale: "en_RW",
    url: "https://ingajufarms.com",
    siteName: "Ingaju Farms",
    title: "Ingaju Farms | Dairy, Crops & Circular Agriculture - Eastern Province, Rwanda",
    description:
      "Ingaju Farms is an integrated farm in Rebero Village, Nyagatare District, Eastern Province. We produce dairy, crops, and organic fertilizer while training farmers in circular agriculture.",
    images: [
      {
        url: "/images/hero/bg-img.png",
        width: 1200,
        height: 630,
        alt: "Ingaju Farms - Circular agriculture in Eastern Province, Rwanda",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ingaju Farms | Dairy, Crops & Circular Agriculture - Eastern Province, Rwanda",
    description:
      "Ingaju Farms is an integrated farm in Rebero Village, Nyagatare District, Eastern Province. We produce dairy, crops, and organic fertilizer while training farmers in circular agriculture.",
    images: ["/images/hero/bg-img.png"],
  },
  alternates: {
    canonical: "https://ingajufarms.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
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
      <head>
        <StructuredData />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <AuthProvider>
          <ModalProvider>
            <SmoothScroll>
              <Navbar />
              {children}
              <Footer />
              <BackToTop />
            </SmoothScroll>
            <RequestModal />
          </ModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
