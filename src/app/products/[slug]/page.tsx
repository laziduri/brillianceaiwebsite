import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ProductHeroVideo } from "@/components/ProductHeroVideo";
import MarketingLandingPage from "@/components/marketing/MarketingLandingPage";
import { MARKETING_LANDING_META } from "@/data/marketing-landing";
import {
  PRODUCTS,
  PRODUCT_SLUGS,
  isProductSlug,
  type ProductPageData,
  type ProductSlug,
} from "@/data/products";
import { ProductHero } from "@/components/product/ProductHero";
import { IntroStanza } from "@/components/product/IntroStanza";
import { WorkflowSection } from "@/components/product/WorkflowSection";
import { ProcessStrip } from "@/components/product/ProcessStrip";
import { ProductFaq } from "@/components/product/ProductFaq";
import { FinalCta } from "@/components/product/FinalCta";
import { SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PRODUCT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isProductSlug(slug)) return { title: "Product – BrillianceAI" };
  if (slug === "marketing") {
    return {
      title: MARKETING_LANDING_META.title,
      description: MARKETING_LANDING_META.description,
      openGraph: {
        title: MARKETING_LANDING_META.title,
        description: MARKETING_LANDING_META.description,
        type: "website",
      },
    };
  }
  const p = PRODUCTS[slug];
  const url = `${SITE_URL}/products/${slug}`;
  return {
    title: `${p.title} – BrillianceAI`,
    description: p.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: `${p.title} – BrillianceAI`,
      description: p.metaDescription,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${p.title} – BrillianceAI`,
      description: p.metaDescription,
    },
  };
}

function hasWorkflows(
  p: ProductPageData,
): p is ProductPageData & Required<Pick<ProductPageData, "workflows" | "process" | "faqs" | "intro" | "heroKicker" | "heroHeadline" | "heroSub">> {
  return Boolean(p.workflows && p.process && p.faqs && p.intro && p.heroKicker && p.heroHeadline && p.heroSub);
}

function WorkflowLayout({ p }: { p: ProductPageData }) {
  if (!hasWorkflows(p)) return null;
  return (
    <>
      <ProductHero
        kicker={p.heroKicker}
        headline={p.heroHeadline}
        sub={p.heroSub}
        videoSrc={p.videoSrc}
      />
      <IntroStanza
        eyebrow={p.intro.eyebrow}
        heading={p.intro.heading}
        body={p.intro.body}
      />
      {p.workflows.map((w, i) => (
        <div key={w.id} id={i === 0 ? "workflow-01" : undefined}>
          <WorkflowSection workflow={w} reverse={i % 2 === 1} />
        </div>
      ))}
      <ProcessStrip steps={p.process} />
      <ProductFaq faqs={p.faqs} />
      <FinalCta
        headline={p.heroHeadline}
        sub="Scope the workflow with us. Live in 4 to 8 weeks."
      />
    </>
  );
}

function LegacyLayout({ p }: { p: ProductPageData }) {
  return (
    <main
      id="main-content"
      className="min-h-screen bg-[#050507] pt-24 pb-20 md:pt-28"
    >
      <article className="mx-auto max-w-[1100px] px-6 md:px-10">
        <nav
          className="mb-8 text-[13px] text-white/35 tracking-[-0.01em]"
          aria-label="Breadcrumb"
        >
          <Link
            href="/#services"
            className="text-white/45 transition-colors hover:text-white/70"
          >
            Services
          </Link>
          <span className="mx-2 text-white/20" aria-hidden>
            /
          </span>
          <span className="text-white/55">{p.title}</span>
        </nav>

        <header className="mb-10 md:mb-14">
          <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.14em] text-white/40">
            Product
          </p>
          <h1 className="text-[clamp(32px,5vw,52px)] font-medium leading-[1.06] tracking-[-0.04em] text-white">
            {p.headline}
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] font-normal leading-relaxed tracking-[-0.02em] text-white/55 md:text-[17px]">
            {p.description}
          </p>
        </header>

        <div className="mb-14 md:mb-16">
          <ProductHeroVideo src={p.videoSrc} />
        </div>

        <section aria-labelledby="highlights-heading" className="mb-16">
          <h2
            id="highlights-heading"
            className="mb-6 text-[18px] font-medium tracking-[-0.03em] text-white md:text-[20px]"
          >
            What you get
          </h2>
          <ul className="space-y-4">
            {p.highlights.map((item) => (
              <li
                key={item}
                className="flex gap-3 border-b border-white/[0.06] pb-4 text-[15px] leading-relaxed tracking-[-0.01em] text-white/70 last:border-0 md:text-[16px]"
              >
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/35"
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <div className="flex flex-col gap-4 border-t border-white/[0.08] pt-12 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[14px] text-white/45 tracking-[-0.01em]">
            Ready to scope this for your business?
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact/sales" className="btn-primary-sm">
              <span>Talk to us</span>
            </Link>
            <Link href="/#services" className="btn-secondary-sm">
              <span>All services</span>
            </Link>
          </div>
        </div>

        <p className="mt-16 text-center text-[13px] text-white/25 tracking-[-0.01em]">
          <Link
            href="/"
            className="text-white/40 transition-colors hover:text-white/60"
          >
            ← Back to home
          </Link>
        </p>
      </article>
    </main>
  );
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  if (!isProductSlug(slug)) notFound();
  if (slug === "marketing") {
    return <MarketingLandingPage />;
  }
  const p = PRODUCTS[slug as ProductSlug];
  const useWorkflowLayout = hasWorkflows(p);

  return (
    <>
      <Header />
      {useWorkflowLayout ? (
        <main id="main-content" className="bg-[#050507]">
          <WorkflowLayout p={p} />
        </main>
      ) : (
        <LegacyLayout p={p} />
      )}
      <Footer />
    </>
  );
}
