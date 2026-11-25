import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers — Software & AI Jobs",
  description: "Join Pixalbotics, a software development and AI agency in Pakistan. See open roles in engineering, design and marketing.",
  alternates: { canonical: "/careers" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
