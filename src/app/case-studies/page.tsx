import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Case Studies – BrillianceAI",
  description:
    "Real agentic AI deployments for Singapore businesses — coming soon. In the meantime, explore our services or book a scope session.",
  alternates: { canonical: `${SITE_URL}/case-studies` },
  openGraph: {
    title: "Case Studies – BrillianceAI",
    description:
      "Real agentic AI deployments for Singapore businesses — coming soon.",
    url: `${SITE_URL}/case-studies`,
    type: "website",
  },
};

export default function CaseStudiesPage() {
  return (
    <>
      <Header />
      <main
        id="main-content"
        className="min-h-screen bg-[#050507] pt-24 pb-24 md:pt-28"
      >
        <div className="mx-auto max-w-[1100px] px-6 md:px-10">
          <header className="mb-12 md:mb-16">
            <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.14em] text-white/40">
              Case Studies
            </p>
            <h1 className="text-[clamp(32px,5vw,52px)] font-medium leading-[1.06] tracking-[-0.04em] text-white">
              The work, in the wild.
            </h1>
            <p className="mt-5 max-w-2xl text-[16px] font-normal leading-relaxed tracking-[-0.02em] text-white/55 md:text-[17px]">
              Anonymised deployments from Singapore businesses we've shipped
              agentic AI into — what we built, what it replaced, and what
              changed after the pilot.
            </p>
          </header>

          <section className="rounded-2xl border border-dashed border-white/[0.1] bg-white/[0.015] p-10 text-center md:p-16">
            <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-white/35">
              Coming soon
            </p>
            <h2 className="mx-auto mt-3 max-w-2xl gradient-text text-[clamp(22px,2.8vw,32px)] font-medium leading-[1.2] tracking-[-0.03em]">
              The first case studies go live shortly.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[14px] leading-relaxed text-white/50 md:text-[15px]">
              Until then, the fastest way to see what we build is to talk to us
              about your own workflow — or read the library for the thinking
              behind the work.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/contact/sales" className="btn-primary">
                <span>Book a scope session</span>
              </Link>
              <Link href="/blog" className="btn-secondary">
                <span>Read the AI Library</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
