import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import { getPublishedBlogPosts } from "@/lib/blog";
import SiteChrome from "@/components/SiteChrome";
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

// NOTE: `keywords` metadata field removed site-wide — Google hasn't used it
// as a ranking signal since 2009, and the array previously carried claims
// ("closed-loop farming system", "…Africa") the visible copy doesn't make.
// See Ingaju SEO Rules guide.
export const metadata: Metadata = {
  metadataBase: new URL("https://ingajufarms.com"),
  title: {
    default: "Livestock, Crops & Circular Agriculture — Ingaju Farms",
    template: "%s | Ingaju Farms",
  },
    description:
      "Ingaju Farms is an integrated agricultural enterprise based in Rebero Village, Nyagatare District, Eastern Province. We produce livestock, dairy, crops, and organic fertilizer through a circular farming system and train smallholder farmers across Rwanda.",
  authors: [{ name: "Ingaju Farms", url: "https://ingajufarms.com" }],
  creator: "Ingaju Farms",
  publisher: "Ingaju Farms",
  category: "Agriculture",
  openGraph: {
    type: "website",
    locale: "en_RW",
    url: "https://ingajufarms.com",
    siteName: "Ingaju Farms",
    title: "Livestock, Crops & Circular Agriculture — Ingaju Farms",
    description:
      "Ingaju Farms is an integrated farm in Rebero Village, Nyagatare District, Eastern Province. We produce livestock, dairy, crops, and organic fertilizer while training farmers in circular agriculture.",
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
    title: "Livestock, Crops & Circular Agriculture — Ingaju Farms",
    description:
      "Ingaju Farms is an integrated farm in Rebero Village, Nyagatare District, Eastern Province. We produce livestock, dairy, crops, and organic fertilizer while training farmers in circular agriculture.",
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const posts = await getPublishedBlogPosts().catch(() => []);
  const hasBlog = posts.length > 0;

  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} h-full antialiased`}>
      <head>
        <StructuredData />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <AuthProvider>
          <ModalProvider>
            <SiteChrome hasBlog={hasBlog}>
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
