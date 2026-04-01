import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: "out",   // 🔥 ye line important hai
  images: {
    unoptimized: true,
  },
};

export default nextConfig;