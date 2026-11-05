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
  HOME_FAQS,
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

const DEFAULT_SAME_AS = [
  "https://www.linkedin.com/company/pixalbotics",
  "https://www.instagram.com/Pixal_Botics",
  "https://www.facebook.com/share/1CaExqPQG4",
];

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
    category: "technology",
    applicationName: BRAND_NAME,
    formatDetection: { email: false, address: false, telephone: false },
    alternates: {
      canonical: siteUrl,
      types: {
        "text/plain": [`${siteUrl}/llms.txt`, `${siteUrl}/llms-full.txt`],
      },
    },
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
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
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
  const socialProfiles = [...new Set([...DEFAULT_SAME_AS, ...sameAs])];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": `${siteUrl}/#organization`,
        name: BRAND_NAME,
        alternateName: [BRAND_ALTERNATE, "Pixal Botics"],
        url: siteUrl,
        logo: { "@type": "ImageObject", url: `${siteUrl}/pixalbotics-logo.png` },
        image: `${siteUrl}/pixalbotics-logo.png`,
        description: FULL_DESCRIPTION,
        slogan: "Software Development Agency & AI Company",
        email: "pixalbotics@gmail.com",
        sameAs: socialProfiles,
        areaServed: [
          { "@type": "Country", name: "United States" },
          { "@type": "Country", name: "United Kingdom" },
          { "@type": "Country", name: "Pakistan" },
          "Worldwide",
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            email: "pixalbotics@gmail.com",
            telephone: "+44-7769-649531",
            areaServed: ["GB", "US", "PK", "Worldwide"],
            availableLanguage: ["English", "Urdu"],
          },
          {
            "@type": "ContactPoint",
            contactType: "customer support",
            telephone: "+92-343-1743916",
            areaServed: ["PK", "Worldwide"],
            availableLanguage: ["English", "Urdu"],
          },
        ],
        knowsAbout: [
          "Software Development",
          "AI Software",
          "AI Development",
          "AI Automation",
          "Web Development Services",
          "Mobile App Development",
          "React Native",
          "MERN Stack Development",
          "SaaS Development",
          "CRM Development",
          "GoHighLevel Setup and Management",
          "Digital Marketing and Design",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Software & AI Development Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "AI Solutions & Automation",
                url: `${siteUrl}/services/ai-solutions`,
                provider: { "@id": `${siteUrl}/#organization` },
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Web Development Services",
                url: `${siteUrl}/services/web-development`,
                provider: { "@id": `${siteUrl}/#organization` },
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Mobile App Development",
                url: `${siteUrl}/services/mobile-app-development`,
                provider: { "@id": `${siteUrl}/#organization` },
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "CRM & GoHighLevel",
                url: `${siteUrl}/services/crm-gohighlevel`,
                provider: { "@id": `${siteUrl}/#organization` },
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Digital Marketing & Design",
                url: `${siteUrl}/services/digital-marketing`,
                provider: { "@id": `${siteUrl}/#organization` },
              },
            },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: BRAND_NAME,
        alternateName: BRAND_ALTERNATE,
        description: FULL_DESCRIPTION,
        inLanguage: "en-US",
        publisher: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/#webpage`,
        url: siteUrl,
        name: GLOBAL_TITLE,
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#organization` },
        description: FULL_DESCRIPTION,
        inLanguage: "en-US",
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", "h2", "[data-speakable]"],
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/#faq`,
        // Mirrors the FAQ section actually rendered on the homepage -
        // structured data should always match visible on-page content.
        mainEntity: HOME_FAQS.map((faq: { question: string; answer: string }) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };
  return (
    <html lang="en">
      <head>
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLMs.txt" />
        <link rel="alternate" type="text/plain" href="/llms-full.txt" title="LLMs full context" />
        <link rel="describedby" href="/ai" title="AI assistant overview" />
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
<script data-cfasync="false" src="https://api-staging.convergeit.app/widget/quasars/quasars-solutions/pixalbotics.com/assetsloader.js" defer></script>
      </body>
    </html>
  );
}
