import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FAQList } from "@/components/blog/BlogRenderer";
import { FAQ_CATEGORIES, ALL_FAQS_FLAT, EDG_LINK } from "@/data/faq";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ – BrillianceAI",
  description:
    "Common questions about agentic AI for Singapore businesses — pricing, EDG and PSG grants, build timelines, PDPA and IMDA compliance, ROI, and support.",
  alternates: { canonical: `${SITE_URL}/faq` },
  openGraph: {
    title: "FAQ – BrillianceAI",
    description:
      "Common questions about agentic AI for Singapore businesses — pricing, grants, compliance, ROI, and support.",
    url: `${SITE_URL}/faq`,
    type: "website",
  },
};

function stripMarkdown(s: string) {
  return s
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // [text](url) → text
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1");
}

export default function FaqPage() {
  const faqPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ALL_FAQS_FLAT.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: stripMarkdown(f.a),
      },
    })),
  };

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "FAQ", item: `${SITE_URL}/faq` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <Header />
      <main
        id="main-content"
        className="min-h-screen bg-[#050507] pt-24 pb-24 md:pt-28"
      >
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          {/* Header */}
          <header className="mb-12 md:mb-16">
            <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.14em] text-white/40">
              FAQ
            </p>
            <h1 className="text-[clamp(32px,5vw,52px)] font-medium leading-[1.06] tracking-[-0.04em] text-white">
              Questions, answered
              <br />
              <span className="gradient-text-subtle">straight.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-[16px] font-normal leading-relaxed tracking-[-0.02em] text-white/55 md:text-[17px]">
              Everything Singapore business owners ask us about agentic AI —
              pricing, grants, build timelines, compliance, and what to expect
              after go-live. If your question isn&apos;t here,{" "}
              <Link href="/contact/sales" className="text-white/80 underline decoration-white/20 underline-offset-4 hover:text-white">
                ask us directly
              </Link>
              .
            </p>
          </header>

          {/* Category quick-nav */}
          <nav
            aria-label="FAQ sections"
            className="mb-12 flex flex-wrap gap-2 md:mb-16"
          >
            {FAQ_CATEGORIES.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-2 text-[13px] font-medium tracking-[-0.01em] text-white/70 transition-colors hover:border-[var(--gold-line)] hover:bg-white/[0.05] hover:text-white"
              >
                {cat.label}
                <span className="rounded-full bg-white/[0.06] px-1.5 py-0.5 text-[10px] font-normal text-white/50">
                  {cat.faqs.length}
                </span>
              </a>
            ))}
          </nav>

          {/* Categories */}
          <div className="space-y-16 md:space-y-20">
            {FAQ_CATEGORIES.map((cat) => (
              <section
                key={cat.id}
                id={cat.id}
                aria-labelledby={`${cat.id}-heading`}
                className="scroll-mt-28"
              >
                <div className="mb-6 border-b border-white/[0.06] pb-4 md:mb-8">
                  <h2
                    id={`${cat.id}-heading`}
                    className="text-[20px] font-medium tracking-[-0.02em] text-white md:text-[24px]"
                  >
                    {cat.label}
                  </h2>
                  <p className="mt-1 text-[13px] leading-relaxed text-white/45 md:text-[14px]">
                    {cat.description}
                  </p>
                </div>

                <FAQList faqs={cat.faqs} />
              </section>
            ))}
          </div>

          {/* Grants callout */}
          <section
            aria-label="Grants"
            className="mt-20 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.03] to-white/[0.005] p-8 md:p-12"
          >
            <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-white/35">
              Singapore grants
            </p>
            <h2 className="mt-3 gradient-text-gold text-[clamp(22px,2.8vw,32px)] font-medium leading-[1.2] tracking-[-0.03em]">
              Up to 50% of your project cost may be covered.
            </h2>
            <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-white/55 md:text-[15px]">
              Most of our SME clients claim a portion of the build through the{" "}
              <strong className="text-white/80">Enterprise Development Grant (EDG)</strong>{" "}
              — covering up to 50% of qualifying project costs. We help you
              align scope to the EDG <em>Innovation &amp; Productivity</em>{" "}
              pillar, and flag any other grants you qualify for during scoping.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={EDG_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary-sm"
              >
                <span>Read about EDG on Enterprise SG →</span>
              </a>
              <Link href="/contact/sales" className="btn-primary-sm">
                <span>Book a free scope session</span>
              </Link>
            </div>
          </section>

          {/* Final help block */}
          <section className="mt-12 text-center">
            <p className="text-[14px] text-white/45">
              Didn&apos;t find what you were looking for?
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <Link href="/contact/sales" className="btn-primary-sm">
                <span>Talk to us</span>
              </Link>
              <Link href="/blog" className="btn-secondary-sm">
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
