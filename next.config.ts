// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // This is a wildcard; be cautious about security implications
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: false, // It's better to leave this false in development
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors during production builds
  },
  experimental: {
    outputStandalone: true, // Required for Cloudflare Workers compatibility
  },
};

export default nextConfig;
