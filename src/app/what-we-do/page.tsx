import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatWeDoHero from "@/components/what-we-do/WhatWeDoHero";
import WhatWeDoServices from "@/components/what-we-do/WhatWeDoServices";
import Process from "@/components/Process";
import CallToAction from "@/components/CallToAction";

export const metadata: Metadata = {
  title: "What We Do – BrillianceAI",
  description:
    "Explore the AI systems we design for sales, marketing, and operations.",
};

export default function WhatWeDoPage() {
  return (
    <>
      <Header />
      <main className="relative z-0 min-h-screen w-full bg-[#050507]">
        <WhatWeDoHero />
        <WhatWeDoServices />
        <Process />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
