import type { CSSProperties } from "react";
import type { Metadata } from "next";
import "./globals.css";
import Layout from "@/components/Layout";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastProvider } from "@/contexts/ToastContext";
import ToastContainer from "@/components/ui/Toast";
import PingKeeper from "@/components/PingKeeper";

const SITE_NAME = "Pixalbotics";
const TAGLINE = "AI & Technology Solutions – Smart Solutions for Digital Evolution";
const FULL_DESCRIPTION =
  "Pixalbotics delivers intelligent AI-powered solutions to streamline operations, enhance efficiency, and drive innovation. We specialize in robotics, automation, smart retail, and digital transformation for businesses worldwide.";

/** SEO / metadata: cPanel par env se set hota hai (bina rebuild ke). */
function getSeoEnv() {
  return {
    siteUrl: process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "https://pixalbotics.com",
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
      default: `${SITE_NAME} - ${TAGLINE}`,
      template: `%s | ${SITE_NAME}`,
    },
    description: FULL_DESCRIPTION,
    keywords: [
      "Pixalbotics",
      "pixalbotics",
      "AI solutions",
      "technology solutions",
      "robotics",
      "automation",
      "smart retail",
      "digital transformation",
      "intelligent automation",
      "innovation",
    ],
    authors: [{ name: SITE_NAME, url: siteUrl }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    formatDetection: { email: false, address: false, telephone: false },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteUrl,
      siteName: SITE_NAME,
      title: `${SITE_NAME} - ${TAGLINE}`,
      description: FULL_DESCRIPTION,
      images: [
        {
          url: "/pixalbotics-logo.png",
          width: 512,
          height: 512,
          alt: `${SITE_NAME} Logo`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${SITE_NAME} - ${TAGLINE}`,
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
        name: SITE_NAME,
        url: siteUrl,
        logo: { "@type": "ImageObject", url: `${siteUrl}/pixalbotics-logo.png` },
        description: FULL_DESCRIPTION,
        sameAs,
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: SITE_NAME,
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
      </body>
    </html>
  );
}
