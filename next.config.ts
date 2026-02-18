import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Production optimizations
  // For cPanel: use 'export' for static export
  // For VPS/Server with PM2: use 'standalone'
  output: process.env.NEXT_OUTPUT === 'export' ? 'export' : 'standalone',
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
