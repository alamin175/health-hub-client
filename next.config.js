/** @type {import('next').NextConfig} */
const nextConfig = {
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

module.exports = nextConfig;
