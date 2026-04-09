import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,

  experimental: {
    viewTransition: true,
    // Tree-shake large packages — only import what's used
    optimizePackageImports: [
      "framer-motion",
      "lucide-react",
      "@supabase/supabase-js",
    ],
  },

  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production"
      ? { exclude: ["error", "warn"] }
      : false,
  },
};

export default nextConfig;
