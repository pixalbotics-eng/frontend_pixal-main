import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Free Consultation",
  description: "Book a free discovery call with Pixalbotics to scope your software, AI automation, mobile app or GoHighLevel project.",
  alternates: { canonical: "/booking" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
