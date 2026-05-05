import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: { ignoreBuildErrors: true },
  // Keep Netlify/Next runtime defaults unless explicitly exporting static files.
  output: process.env.NEXT_OUTPUT === "export" ? "export" : undefined,
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost', pathname: '/**' },
      { protocol: 'https', hostname: 'localhost', pathname: '/**' },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'logo.clearbit.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.simpleicons.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pixalbotics.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pixal-fe5o.onrender.com',
        pathname: '/**',
      },
    ],
    // For static export, images need to be unoptimized
    unoptimized: process.env.NEXT_OUTPUT === 'export',
  },
  poweredByHeader: false, // Remove X-Powered-By header for security
  compress: true, // Enable gzip compression
  // Ensure Next.js works behind reverse proxy
  async rewrites() {
    return [];
  },
};

export default nextConfig;
