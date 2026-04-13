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
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:text-[#08090a]"
      >
        Skip to content →
      </a>
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

