import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  BLOG_POSTS,
  BLOG_SLUGS,
  isBlogSlug,
  type BlogPost,
} from "@/data/blog";
import {
  FAQList,
  SectionRenderer,
  TableOfContents,
} from "@/components/blog/BlogRenderer";
import { ORG_LOGO, ORG_NAME, SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return BLOG_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isBlogSlug(slug)) return { title: "Post – BrillianceAI" };
  const post = BLOG_POSTS[slug];
  const url = `${SITE_URL}/blog/${slug}`;
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    alternates: { canonical: url },
    openGraph: {
      title: post.ogTitle,
      description: post.ogDescription,
      url,
      type: "article",
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.ogTitle,
      description: post.ogDescription,
    },
  };
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-SG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function buildJsonLd(post: BlogPost) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: post.title,
    description: post.metaDescription,
    inLanguage: "en-SG",
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: ORG_NAME,
      logo: { "@type": "ImageObject", url: ORG_LOGO },
    },
    keywords: post.keywords.join(", "),
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };
  return [article, faq, breadcrumbs];
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  if (!isBlogSlug(slug)) notFound();
  const post = BLOG_POSTS[slug];
  const jsonLd = buildJsonLd(post);

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <Header />
      <main
        id="main-content"
        className="min-h-screen bg-[#050507] pt-24 pb-20 md:pt-28"
      >
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <nav
            className="mb-8 text-[13px] text-white/35 tracking-[-0.01em]"
            aria-label="Breadcrumb"
          >
            <Link
              href="/blog"
              className="text-white/45 transition-colors hover:text-white/70"
            >
              Blog
            </Link>
            <span className="mx-2 text-white/20" aria-hidden>
              /
            </span>
            <span className="text-white/55">{post.title}</span>
          </nav>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-14">
            <article>
              <header className="mb-10 md:mb-12">
                <div className="mb-3 flex flex-wrap items-center gap-3 text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">
                  <span>{post.heroKicker}</span>
                  <span className="h-3 w-px bg-white/15" aria-hidden />
                  <time dateTime={post.datePublished}>
                    {formatDate(post.datePublished)}
                  </time>
                  <span className="h-3 w-px bg-white/15" aria-hidden />
                  <span>{post.readMinutes} min read</span>
                </div>
                <h1 className="text-[clamp(30px,4.6vw,46px)] font-medium leading-[1.08] tracking-[-0.035em] text-white">
                  {post.title}
                </h1>
                <p className="mt-5 max-w-2xl text-[16px] font-normal leading-relaxed tracking-[-0.02em] text-white/55 md:text-[17px]">
                  {post.heroSubtitle}
                </p>
                <div className="mt-6 flex items-center gap-3 text-[13px] text-white/45">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[12px] font-medium text-white/75"
                    aria-hidden
                  >
                    {post.author.slice(0, 1)}
                  </span>
                  <span>By {post.author}</span>
                </div>
              </header>

              <div className="prose-body">
                {post.sections.map((section, i) => (
                  <SectionRenderer key={i} section={section} />
                ))}
                <FAQList faqs={post.faqs} />
              </div>

              {post.related.length > 0 && (
                <section aria-labelledby="related-heading" className="mt-16">
                  <h2
                    id="related-heading"
                    className="mb-5 text-[18px] font-medium tracking-[-0.02em] text-white md:text-[20px]"
                  >
                    Keep reading
                  </h2>
                  <ul className="grid grid-cols-1 gap-4">
                    {post.related.map((r) => (
                      <li key={r.slug}>
                        <Link
                          href={`/blog/${r.slug}`}
                          className="group flex items-center justify-between gap-5 rounded-2xl border border-white/[0.06] bg-white/[0.015] p-5 transition-colors hover:border-white/[0.14] hover:bg-white/[0.03] md:p-6"
                        >
                          <div>
                            <div className="text-[15px] font-medium tracking-[-0.02em] text-white md:text-[16px]">
                              {r.title}
                            </div>
                            <div className="mt-1 text-[13px] text-white/55 md:text-[14px]">
                              {r.blurb}
                            </div>
                          </div>
                          <span className="shrink-0 text-white/40 transition-colors group-hover:text-white/80">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                              <path
                                d="M2 7h10M8 3l4 4-4 4"
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
              )}

              <div className="mt-16 flex flex-col gap-4 border-t border-white/[0.08] pt-10 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[14px] text-white/45 tracking-[-0.01em]">
                  Want this running in your business? Let's scope it.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/contact/sales" className="btn-primary-sm">
                    <span>Book a 30-min consultation</span>
                  </Link>
                  <Link href="/blog" className="btn-secondary-sm">
                    <span>All posts</span>
                  </Link>
                </div>
              </div>
            </article>

            <aside className="hidden lg:block">
              <TableOfContents items={post.tocIds} />
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
