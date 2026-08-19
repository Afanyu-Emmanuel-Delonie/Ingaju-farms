import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import { getPublishedBlogPosts } from "@/lib/blog";
import { getPublishedTestimonials } from "@/lib/testimonials";
import SiteChrome from "@/components/SiteChrome";
import { ModalProvider } from "@/components/shared/ModalContext";
import RequestModal from "@/components/shared/RequestModal";
import { AuthProvider } from "@/lib/AuthContext";
import StructuredData from "@/components/shared/StructuredData";
import Splash from "@/components/Splash";
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

// NOTE: `keywords` metadata field removed site-wide — Google hasn't used it
// as a ranking signal since 2009, and the array previously carried claims
// ("closed-loop farming system", "…Africa") the visible copy doesn't make.
// See Ingaju SEO Rules guide.
export const metadata: Metadata = {
  metadataBase: new URL("https://ingajufarms.com"),
  title: {
    default: "From Farm Waste to Farm Wealth — Ingaju Farms",
    template: "%s | Ingaju Farms",
  },
  description:
    "Ingaju Farms is an integrated circular agriculture enterprise in Nyagatare District, Rwanda — turning livestock, crops, and organic waste into food, income, and training for the farming community. One farm, multiple enterprises, closing the loop toward zero waste.",
  authors: [{ name: "Ingaju Farms", url: "https://ingajufarms.com" }],
  creator: "Ingaju Farms",
  publisher: "Ingaju Farms",
  category: "Agriculture",
  openGraph: {
    type: "website",
    locale: "en_RW",
    url: "https://ingajufarms.com",
    siteName: "Ingaju Farms",
    title: "From Farm Waste to Farm Wealth — Ingaju Farms",
    description:
      "Ingaju Farms is an integrated circular agriculture enterprise in Nyagatare District, Rwanda — turning livestock, crops, and organic waste into food, income, and training for the farming community.",
    images: [
      {
        url: "/images/hero/bg-img.webp",
        width: 1200,
        height: 630,
        alt: "Ingaju Farms — Circular agriculture in Eastern Province, Rwanda",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "From Farm Waste to Farm Wealth — Ingaju Farms",
    description:
      "Ingaju Farms is an integrated circular agriculture enterprise in Nyagatare District, Rwanda — turning livestock, crops, and organic waste into food, income, and training for the farming community.",
    images: ["/images/hero/bg-img.webp"],
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [posts, testimonials] = await Promise.all([
    getPublishedBlogPosts().catch(() => []),
    getPublishedTestimonials().catch(() => []),
  ]);
  const hasBlog = posts.length > 0;
  const hasTestimonials = testimonials.length > 0;

  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} h-full antialiased`}>
      <head>
        <StructuredData />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Splash />
        <AuthProvider>
          <ModalProvider>
            <SiteChrome hasBlog={hasBlog} hasTestimonials={hasTestimonials}>
              <SmoothScroll>
                {children}
              </SmoothScroll>
            </SiteChrome>
            <RequestModal />
          </ModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
