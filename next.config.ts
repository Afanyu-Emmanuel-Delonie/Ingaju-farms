import type { NextConfig } from "next";

// The site previously lived on the Vercel-assigned subdomain before
// ingajufarms.com launched. Redirect and noindex it so it stops competing
// with the real domain for search authority. See Domain Launch Checklist.
const OLD_VERCEL_HOST = "ingaju-farms.vercel.app";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: OLD_VERCEL_HOST }],
        destination: "https://ingajufarms.com/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: OLD_VERCEL_HOST }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
