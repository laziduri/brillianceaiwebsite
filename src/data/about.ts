/** Copy for the `/about` page. */

export const aboutHero = {
  eyebrow: "About Us",
  headline: "Building AI Systems That Actually Work",
  subline:
    "We design and implement agentic AI workflows that fit how each business operates — structured, reliable, and built for real use.",
} as const;

/* ── Vision & Mission (scroll-pinned panels) ── */

export type VisionMissionPanel = {
  label: "Vision" | "Mission";
  headline: string;
  body: string;
  bullets?: readonly string[];
  closing?: string;
};

export const visionMissionPanels: readonly VisionMissionPanel[] = [
  {
    label: "Vision",
    headline: "To Set the Standard for How Businesses Use AI",
    body: "We aim to help businesses move beyond basic tools and build AI systems that improve how work is executed across sales, marketing, and operations.",
    closing:
      "AI should not sit on the side. It should be part of how a business runs.",
  },
  {
    label: "Vision",
    headline: "To Build AI Workflows That Deliver Real Business Results",
    body: "We design and implement structured AI systems that help businesses:",
    bullets: [
      "Capture more opportunities",
      "Reduce manual work",
      "Improve consistency",
      "Operate more efficiently",
    ],
    closing:
      "Our focus is simple. Build systems that work in real business environments.",
  },
  {
    label: "Mission",
    headline: "To Build Practical AI Systems That Create Real Business Value",
    body: "Our mission is to design and implement AI workflows that help businesses:",
    bullets: [
      "Capture more opportunities",
      "Reduce manual work",
      "Improve consistency",
      "Operate more efficiently",
    ],
    closing:
      "We focus on building systems that support real operations, not just generating outputs. If it does not improve how the business runs, it does not belong.",
  },
] as const;

/* ── Values (accordion) ── */

export type ValueItem = {
  title: string;
  body: string;
};

export const aboutValues: readonly ValueItem[] = [
  {
    title: "Built on Quality",
    body: "We do not build off-the-shelf systems. Every workflow is designed around your business, your processes, and how your team actually operates. We take the time to understand your flow before building anything, ensuring the system fits naturally into your operations and delivers consistent results.",
  },
  {
    title: "Driven by Clarity",
    body: "AI should not feel confusing. We guide you through the entire process, from understanding your workflow to building systems that fit how your business operates. Every step is explained clearly, so you know exactly what is being built, how it works, and where it creates value. No unnecessary complexity. No hidden processes. Just clear systems designed to work.",
  },
  {
    title: "We Approach Things Differently",
    body: "As AI evolves, the way systems are built is changing. Delivery is faster, more efficient, and should not follow outdated pricing models. We believe businesses should benefit from that. Our pricing reflects real value, clear scope, and what is actually being delivered. No inflated costs, no unnecessary complexity. What we promise is what we deliver.",
  },
  {
    title: "Results Through Execution",
    body: "Ideas do not create results. Execution does. We build workflows that improve how work is actually done across sales, marketing, and operations. Everything we deliver is designed to create measurable impact.",
  },
  {
    title: "Systems That Last",
    body: "AI is evolving quickly, and most systems are not built to keep up. We approach it differently. Our workflows are designed to adapt as technology improves and as your business grows. We do not leave you with a static system that becomes outdated. We provide ongoing support to refine, improve, and keep your workflows relevant over time. In a fast-changing environment, longevity matters.",
  },
] as const;

/* ── Team ── */

export const aboutTeam = {
  eyebrow: "Our Team",
  headline: "Singapore-Based. AI-Focused.",
  body: "Brilliance AI is a Singapore-based team with a dedicated development team also based in Singapore, focused on building agentic AI workflows for businesses. We design and implement agentic AI systems that fit how each business operates, ensuring every workflow is structured, reliable, and built for real use. Our goal is to help businesses across Singapore adopt agentic AI in a clear, practical, and effective way.",
} as const;

/* ── CTA ── */

export const aboutCta = {
  headline: "See what we build.",
  line: "Explore the AI systems we design for sales, marketing, and operations.",
  ctaPrimary: { label: "What we do", href: "/what-we-do" },
  ctaSecondary: { label: "Talk to us", href: "/contact/sales" },
} as const;
