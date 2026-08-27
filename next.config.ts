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
      {
        // Cover images used by the automated daily blog posts
        protocol: 'https',
        hostname: 'picsum.photos',
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
  // SEO: 301-redirect old packaging URLs (previously indexed by Google) to
  // the closest relevant page on the new software-agency site structure,
  // instead of letting them 404 and lose their existing search equity.
  async redirects() {
    return [
      { source: '/services/packaging', destination: '/services', permanent: true },
      { source: '/packaging/:path*', destination: '/services', permanent: true },
      { source: '/usa-packaging-company', destination: '/services/crm-gohighlevel', permanent: true },
      { source: '/uk-packaging-company', destination: '/services/crm-gohighlevel', permanent: true },
      { source: '/pakistan-packaging-company', destination: '/services/crm-gohighlevel', permanent: true },
      { source: '/blogs/best-packaging-company-in-usa', destination: '/blogs', permanent: true },
      { source: '/blogs/custom-box-packaging-trends-2026', destination: '/blogs', permanent: true },
      { source: '/blogs/how-to-choose-packaging-supplier', destination: '/blogs', permanent: true },
    ];
  },
};

export default nextConfig;
