import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/AboutHero";
import PinnedVisionMission from "@/components/about/PinnedVisionMission";
import ValuesAccordion from "@/components/about/ValuesAccordion";
import AboutTeam from "@/components/about/AboutTeam";
import AboutCta from "@/components/about/AboutCta";

export const metadata: Metadata = {
  title: "About Us – BrillianceAI",
  description:
    "We build structured, agentic AI workflows for sales, marketing, and operations — designed to run reliably in real business environments.",
  openGraph: {
    title: "About Us – BrillianceAI",
    description:
      "Structured, agentic AI workflows — designed to run reliably in real business environments.",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="relative z-0 w-full bg-[#050507]">
        <AboutHero />
        <PinnedVisionMission />
        <ValuesAccordion />
        <AboutTeam />
        <AboutCta />
      </main>
      <Footer />
    </>
  );
}

