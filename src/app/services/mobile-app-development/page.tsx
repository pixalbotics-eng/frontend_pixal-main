import type { Metadata } from "next";
import SeoPage from "@/components/SeoPage";
import { BRAND_NAME, CORE_KEYWORDS, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Mobile App Development | Pixalbotics" },
  description:
    "Pixalbotics builds native-quality iOS and Android apps with React Native, from product strategy through App Store and Play Store launch.",
  keywords: [
    ...CORE_KEYWORDS,
    "mobile app development",
    "React Native developers",
    "iOS app development",
    "Android app development",
  ],
  alternates: { canonical: `${SITE_URL}/services/mobile-app-development` },
};

export default function MobileAppDevelopmentPage() {
  return (
    <SeoPage
      path="/services/mobile-app-development"
      title="Mobile App Development"
      intro={`${BRAND_NAME} designs and ships cross-platform mobile apps that feel native, perform reliably, and scale alongside your product roadmap.`}
      imageAlt="mobile app development on iOS and Android"
      sections={[
        {
          heading: "Cross-Platform React Native Apps",
          content:
            "We build iOS and Android apps from a single React Native codebase, cutting development time without compromising on native performance or platform-specific polish. This means one team, one codebase, and consistent feature parity across both platforms — ideal for startups that need to launch fast and enterprises that need to maintain efficiently.",
        },
        {
          heading: "Product Strategy & UX",
          content:
            "Every engagement starts with mapping user journeys, core flows, and business goals before a single screen is designed. We prioritize features that drive activation and retention, and design interfaces that feel intuitive on both iOS and Android conventions.",
        },
        {
          heading: "Backend, APIs & Integrations",
          content:
            "Our apps connect cleanly to your existing backend, third-party APIs, push notification services, and analytics — including CRM and GoHighLevel integrations when mobile needs to feed your sales and support pipelines in real time.",
        },
        {
          heading: "App Store & Play Store Launch",
          content:
            "We manage the full release process: store listings, compliance review, versioning, and staged rollouts. Post-launch, we monitor crash reports and performance metrics so issues get caught and fixed quickly.",
        },
        {
          heading: "Ongoing Support & Iteration",
          content:
            "Mobile products evolve fast. We offer dedicated support and iteration cycles to ship new features, keep pace with OS updates, and continuously improve performance based on real usage data.",
        },
        {
          heading: "Who It Is For",
          content:
            "Our mobile work suits founders turning an idea into a first app, businesses adding a customer or staff app to an existing system, and product teams that need extra engineering capacity to ship faster. We regularly work with clients in the United States, United Kingdom, Australia and the UAE, and set up working hours and check-ins around your time zone.",
        },
        {
          heading: "Our App Development Process",
          content:
            "We begin by mapping the core user journeys and the smallest feature set worth launching. Designs are shared as clickable prototypes so you can test the flow before development starts. The app is then built in short sprints with test builds sent to your phone through TestFlight and internal testing tracks, so you see real progress every week instead of waiting until the end.",
        },
      ]}
    />
  );
}
