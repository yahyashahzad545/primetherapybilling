import type { NextConfig } from "next";

// Files in public/ are served with `max-age=0` by default, so every page view re-checks every icon and
// image with the server. In production they are cached for a day (and may be reused for a further week
// while the browser re-checks them in the background). Development keeps the default, so a swapped
// image shows up straight away while working on the site.
const PUBLIC_ASSET_CACHE = "public, max-age=86400, stale-while-revalidate=604800";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async headers() {
    if (process.env.NODE_ENV !== "production") return [];
    return ["/icons/:path*", "/imgs/:path*", "/logos/:path*", "/flags/:path*"].map(
      (source) => ({
        source,
        headers: [{ key: "Cache-Control", value: PUBLIC_ASSET_CACHE }],
      })
    );
  },
};

export default nextConfig;
