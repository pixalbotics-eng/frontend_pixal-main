import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Layout from "@/components/Layout";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastProvider } from "@/contexts/ToastContext";
import ToastContainer from "@/components/ui/Toast";
import PingKeeper from "@/components/PingKeeper";
import {
  BRAND_ALTERNATE,
  BRAND_NAME,
  CORE_KEYWORDS,
  GLOBAL_DESCRIPTION,
  GLOBAL_TITLE,
  SITE_URL,
} from "@/lib/seo";

const FULL_DESCRIPTION = GLOBAL_DESCRIPTION;

/** SEO / metadata: cPanel par env se set hota hai (bina rebuild ke). */
function getSeoEnv() {
  return {
    siteUrl: SITE_URL,
    googleVerification: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    sameAs: process.env.SEO_SAME_AS
      ? process.env.SEO_SAME_AS.split(",").map((s) => s.trim()).filter(Boolean)
      : [] as string[],
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const { siteUrl, googleVerification } = getSeoEnv();
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: GLOBAL_TITLE,
      template: `%s | ${BRAND_NAME}`,
    },
    description: FULL_DESCRIPTION,
    keywords: CORE_KEYWORDS,
    authors: [{ name: BRAND_NAME, url: siteUrl }],
    creator: BRAND_NAME,
    publisher: BRAND_NAME,
    formatDetection: { email: false, address: false, telephone: false },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteUrl,
      siteName: BRAND_NAME,
      title: GLOBAL_TITLE,
      description: FULL_DESCRIPTION,
      images: [
        {
          url: "/pixalbotics-logo.png",
          width: 512,
          height: 512,
          alt: `${BRAND_NAME} logo`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: GLOBAL_TITLE,
      description: FULL_DESCRIPTION,
      images: ["/pixalbotics-logo.png"],
    },
    icons: {
      icon: [
        { url: "/icon.png", sizes: "48x48", type: "image/png" },
        { url: "/icon.png", sizes: "96x96", type: "image/png" },
        { url: "/icon.png", sizes: "192x192", type: "image/png" },
      ],
      apple: "/icon.png",
      shortcut: "/icon.png",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    verification: googleVerification ? { google: googleVerification } : undefined,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { siteUrl, sameAs } = getSeoEnv();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: BRAND_NAME,
        alternateName: BRAND_ALTERNATE,
        url: siteUrl,
        logo: { "@type": "ImageObject", url: `${siteUrl}/pixalbotics-logo.png` },
        description: FULL_DESCRIPTION,
        sameAs,
        areaServed: ["USA", "UK", "Pakistan"],
        knowsAbout: [
          "Web Development Services",
          "AI Solutions",
          "MERN Stack Development",
          "Custom Packaging",
          "Product Packaging Design",
          "Box Packaging Supplier Services",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Software and Packaging Services",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Development Services" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Solutions" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "MERN Stack Developers" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Packaging Solutions" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Product Packaging Design" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Box Packaging Supplier" } },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: BRAND_NAME,
        description: FULL_DESCRIPTION,
        publisher: { "@id": `${siteUrl}/#organization` },
      },
    ],
  };
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PMBJH9JQ');`,
          }}
        />
      </head>
      <body
        style={
          {
            "--font-geist-sans":
              'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            "--font-geist-mono":
              '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Monaco, monospace',
          } as CSSProperties
        }
        className="antialiased"
        suppressHydrationWarning
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PMBJH9JQ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AuthProvider>
          <ToastProvider>
            <PingKeeper />
            <Layout>{children}</Layout>
            <ToastContainer />
          </ToastProvider>
        </AuthProvider>
        <Analytics />
<script
  src="https://theconverge.netlify.app/widget.js"
  data-widget-key="wgt_bVSttJaXsF5EbPC44bKpUw"
  data-app-origin="https://convergit-saas.onrender.com"
  defer
></script>
</body>
    </html>
  );
}
