import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects & Case Studies",
  description: "Explore Pixalbotics projects: SaaS platforms, AI automation, mobile apps, CRM and GoHighLevel builds for clients worldwide.",
  alternates: { canonical: "/projects" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
