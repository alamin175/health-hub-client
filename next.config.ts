import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allows images from any HTTPS source
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors temporarily
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors temporarily
  },
  experimental: {
    middlewarePrefetch: "flexible", // Optimize middleware prefetching
    outputStandalone: true, // For Docker/Cloudflare Workers
  },
  reactStrictMode: true, // Enforce strict React rules
  swcMinify: true, // Use SWC compiler for faster builds
};

export default nextConfig;
