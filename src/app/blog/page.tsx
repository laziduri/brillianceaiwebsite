import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BLOG_INDEX, BLOG_CATEGORIES, type BlogCategoryId } from "@/data/blog";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI Library – BrillianceAI",
  description:
    "Field notes on agentic AI for Singapore businesses — fundamentals, the Singapore market, workflows, and playbooks.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: "AI Library – BrillianceAI",
    description:
      "Field notes on agentic AI for Singapore businesses — fundamentals, the Singapore market, workflows, and playbooks.",
    url: `${SITE_URL}/blog`,
    type: "website",
  },
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-SG", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogIndexPage() {
  const byCategory = new Map<BlogCategoryId, typeof BLOG_INDEX>();
  for (const cat of BLOG_CATEGORIES) byCategory.set(cat.id, []);
  for (const post of BLOG_INDEX) {
    const arr = byCategory.get(post.category);
    if (arr) arr.push(post);
  }

  const featured = BLOG_INDEX[0];
  const rest = BLOG_INDEX.slice(1);

  return (
    <>
      <Header />
      <main
        id="main-content"
        className="min-h-screen bg-[#050507] pt-24 pb-24 md:pt-28"
      >
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          {/* Header */}
          <header className="mb-12 md:mb-16">
            <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.14em] text-white/40">
              AI Library
            </p>
            <h1 className="text-[clamp(32px,5vw,52px)] font-medium leading-[1.06] tracking-[-0.04em] text-white">
              Field notes on agentic AI,
              <br />
              <span className="gradient-text-subtle">written for Singapore businesses.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-[16px] font-normal leading-relaxed tracking-[-0.02em] text-white/55 md:text-[17px]">
              Where AI actually earns its keep, where it is still hype, and how
              to tell the difference. Updated as the landscape moves.
            </p>
          </header>

          {/* Category chips for quick navigation */}
          <nav
            aria-label="Library sections"
            className="mb-12 flex flex-wrap gap-2 md:mb-16"
          >
            {BLOG_CATEGORIES.map((cat) => {
              const count = byCategory.get(cat.id)?.length ?? 0;
              const disabled = count === 0;
              return (
                <a
                  key={cat.id}
                  href={disabled ? undefined : `#${cat.id}`}
                  aria-disabled={disabled || undefined}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-medium tracking-[-0.01em] transition-colors ${
                    disabled
                      ? "cursor-not-allowed border-white/[0.04] bg-transparent text-white/25"
                      : "border-white/[0.08] bg-white/[0.02] text-white/70 hover:border-white/[0.18] hover:bg-white/[0.05] hover:text-white"
                  }`}
                >
                  {cat.label}
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] font-normal ${
                      disabled ? "bg-white/[0.03] text-white/25" : "bg-white/[0.06] text-white/50"
                    }`}
                  >
                    {count}
                  </span>
                </a>
              );
            })}
          </nav>

          {/* Featured post */}
          {featured && (
            <section aria-label="Featured" className="mb-16 md:mb-20">
              <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.16em] text-white/35">
                Latest
              </p>
              <Link
                href={`/blog/${featured.slug}`}
                className="group block overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-8 transition-colors hover:border-white/[0.18] hover:from-white/[0.05] md:p-12"
              >
                <div className="mb-4 flex flex-wrap items-center gap-3 text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">
                  <span>{featured.kicker}</span>
                  <span className="h-3 w-px bg-white/15" aria-hidden />
                  <time dateTime={featured.datePublished}>
                    {formatDate(featured.datePublished)}
                  </time>
                  <span className="h-3 w-px bg-white/15" aria-hidden />
                  <span>{featured.readMinutes} min read</span>
                </div>
                <h2 className="gradient-text text-[clamp(24px,3.2vw,36px)] font-medium leading-[1.12] tracking-[-0.035em]">
                  {featured.title}
                </h2>
                <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-white/60 md:text-[16px]">
                  {featured.excerpt}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-white/70 transition-colors group-hover:text-white">
                  Read the article
                  <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path
                      d="M2 6h8M6.5 2.5L10 6l-3.5 3.5"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            </section>
          )}

          {/* Grouped by category */}
          <div className="space-y-16 md:space-y-20">
            {BLOG_CATEGORIES.map((cat) => {
              const posts = (byCategory.get(cat.id) ?? []).filter(
                (p) => p.slug !== featured?.slug,
              );
              if (posts.length === 0) return null;
              return (
                <section
                  key={cat.id}
                  id={cat.id}
                  aria-labelledby={`${cat.id}-heading`}
                  className="scroll-mt-28"
                >
                  <div className="mb-6 flex items-end justify-between gap-6 border-b border-white/[0.06] pb-4 md:mb-8">
                    <div>
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
                    <span className="shrink-0 text-[12px] font-medium uppercase tracking-[0.14em] text-white/30">
                      {posts.length} {posts.length === 1 ? "article" : "articles"}
                    </span>
                  </div>

                  <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {posts.map((post) => (
                      <li key={post.slug}>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="group block h-full rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6 transition-colors hover:border-white/[0.14] hover:bg-white/[0.03] md:p-7"
                        >
                          <div className="mb-3 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">
                            <span>{post.kicker}</span>
                            <span className="h-3 w-px bg-white/15" aria-hidden />
                            <time dateTime={post.datePublished}>
                              {formatDate(post.datePublished)}
                            </time>
                            <span className="h-3 w-px bg-white/15" aria-hidden />
                            <span>{post.readMinutes} min read</span>
                          </div>
                          <h3 className="text-[18px] font-medium leading-[1.25] tracking-[-0.02em] text-white md:text-[20px]">
                            {post.title}
                          </h3>
                          <p className="mt-3 text-[14px] leading-relaxed text-white/55 md:text-[15px]">
                            {post.excerpt}
                          </p>
                          <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] text-white/55 transition-colors group-hover:text-white/85">
                            Read
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                              <path
                                d="M2 6h8M6.5 2.5L10 6l-3.5 3.5"
                                stroke="currentColor"
                                strokeWidth="1.25"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>

          {/* Coming-soon placeholder for empty categories */}
          {BLOG_CATEGORIES.some((c) => (byCategory.get(c.id)?.length ?? 0) === 0) && (
            <section className="mt-20 rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.01] p-8 md:p-10">
              <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-white/35">
                Coming soon
              </p>
              <h3 className="mt-2 text-[18px] font-medium tracking-[-0.02em] text-white md:text-[20px]">
                Workflows and Playbooks
              </h3>
              <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-white/50 md:text-[15px]">
                Deep dives on the specific workflows we build — and the playbooks for
                scoping, deploying, and measuring agentic AI inside your business. Check back
                soon.
              </p>
            </section>
          )}

          {rest.length === 0 && !featured && (
            <p className="text-white/40">No articles yet.</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
