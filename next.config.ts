import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors during the build
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors during production builds
  },
  experimental: {
    outputStandalone: true, // Required for Cloudflare Workers compatibility
  },
};

export default nextConfig;