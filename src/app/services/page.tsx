import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ServicesSection } from "@/components/Services";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services – BrillianceAI",
  description:
    "AI Sales, AI Marketing, and AI Operations — end-to-end agentic AI services built for Singapore businesses.",
  alternates: { canonical: `${SITE_URL}/services` },
  openGraph: {
    title: "Services – BrillianceAI",
    description:
      "AI Sales, AI Marketing, and AI Operations — end-to-end agentic AI services built for Singapore businesses.",
    url: `${SITE_URL}/services`,
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-[#08090a] pt-24 md:pt-28">
        <ServicesSection />
      </main>
      <Footer />
    </>
  );
}
