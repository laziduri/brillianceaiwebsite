/** Copy and structure for `/products/marketing` (dark landing + team carousel). */

export const MARKETING_LANDING_META = {
  title: "Your All In One Marketing AI Team – BrillianceAI",
  description:
    "Social media is essential but exhausting. Meet your all-in-one marketing AI team—design, copy, insights, planning, and auto posting in one place.",
} as const;

export const marketingHero = {
  headline: "Your All In One Marketing AI Team",
  subline:
    "Let AI create, schedule, and publish content across your channels while you stay focused on running your business.",
  ctaPrimary: { label: "Book a call", href: "/contact/sales" },
  ctaSecondary: { label: "See how it works", href: "#marketing-team" },
} as const;

export type ProblemCard = {
  pill: string;
  body: string;
  imageSrc?: string;
};

export const marketingProblem = {
  eyebrow: "The Problem",
  headline: "Social media is essential but exhausting.",
  cards: [
    {
      pill: "Time-Draining",
      body: "Business owners are already juggling operations, hiring, and clients. Creating content becomes an afterthought.",
    },
    {
      pill: "Expensive Marketing Retainers",
      body: "Agencies charge thousands monthly yet results often feel unclear or slow.",
    },
    {
      pill: "Inconsistent Visibility",
      body: "Skipping posts means losing reach, brand recall, and potential leads.",
    },
  ] satisfies ProblemCard[],
} as const;

export const marketingSolution = {
  headline: "Meet Your All-In-One Marketing AI Team",
  line: "One system that plans, writes, analyses, and posts—so you stay visible without burning out.",
  pillars: [
    {
      title: "AI-Powered Creation",
      description:
        "Design and copy generated in minutes, not days. Every piece tailored to your brand voice.",
    },
    {
      title: "Data-Driven Strategy",
      description:
        "Every decision backed by real performance insights. Know what works before you post.",
    },
    {
      title: "Hands-Off Publishing",
      description:
        "Scheduled and posted automatically across all channels at peak engagement hours.",
    },
  ],
} as const;

export type MarketingTeamRole = {
  id: string;
  shortLabel: string;
  /** PNG under `public/marketing/characters/` */
  imageSrc: string;
  sectionHeadline: string;
  title: string;
  bullets: readonly string[];
};

/** Order = carousel index 0–4. Drop matching PNGs in `public/marketing/characters/`. */
export const marketingTeamRoles: readonly MarketingTeamRole[] = [
  {
    id: "designer",
    shortLabel: "AI Designer",
    imageSrc: "/marketing/characters/designer.png",
    sectionHeadline: "High Converting AD Creatives Monthly",
    title: "AI Designer",
    bullets: [
      "Every post feels like it came from a top design studio.",
      "Makes your social media look like a luxury brand.",
      "Brings consistency and creativity together in every design.",
    ],
  },
  {
    id: "copywriter",
    shortLabel: "AI Copywriter",
    imageSrc: "/marketing/characters/copywriter.png",
    sectionHeadline:
      "Well Thought Captions That Make People Stop, Read, And React",
    title: "AI Copywriter",
    bullets: [
      "Uses trending hashtags and strong call-to-actions.",
      "Captures attention and converts readers into customers.",
      "Creates content that sounds like you, not a robot.",
    ],
  },
  {
    id: "analyst",
    shortLabel: "AI Performance Analyst",
    imageSrc: "/marketing/characters/analyst.png",
    sectionHeadline: "Be Ahead Of The Market With AI Insights",
    title: "AI Performance Analyst",
    bullets: [
      "Identifies top-performing patterns that humans might miss.",
      "Analyse trends what will perform best before you even post it.",
      "Turns complex data into clear, actionable steps for growth.",
    ],
  },
  {
    id: "strategist",
    shortLabel: "AI Content Strategist",
    imageSrc: "/marketing/characters/strategist.png",
    sectionHeadline: "Stay Consistent with Smarter Planning",
    title: "AI Content Strategist",
    bullets: [
      "Plans your monthly calendar based on trending topics, campaigns, and your business goals.",
      "Keeps your brand relevant by planning content ahead of every trends.",
      "Helps you stay 5 steps ahead of competitors who still post randomly.",
    ],
  },
  {
    id: "auto-poster",
    shortLabel: "AI Auto Poster",
    imageSrc: "/marketing/characters/auto-poster.png",
    sectionHeadline: "Never Post Manually Again..",
    title: "AI Auto Poster",
    bullets: [
      "Automatically posts your content to Instagram, Facebook, and TikTok",
      "Posts at peak engagement hours for maximum reach and visibility",
      "no clicking, no logging in needed",
      "Keeps your brand Consistent, even when you're offline or on a holiday",
    ],
  },
] as const;

/* ── How It Works ── */
export const marketingHowItWorks = {
  eyebrow: "How It Works",
  headline: "From setup to autopilot in days.",
  steps: [
    {
      step: "01",
      title: "Connect",
      description:
        "Link your social accounts and brand assets. We handle the setup.",
      icon: "Link2",
    },
    {
      step: "02",
      title: "Plan",
      description:
        "AI maps out your content calendar based on your goals and trends.",
      icon: "CalendarDays",
    },
    {
      step: "03",
      title: "Create",
      description:
        "Design, copy, and strategy—generated and refined by your AI team.",
      icon: "Sparkles",
    },
    {
      step: "04",
      title: "Publish",
      description:
        "Content goes live automatically at peak engagement times.",
      icon: "Send",
    },
  ],
} as const;

/* ── Stats ── */
export const marketingStats = [
  {
    number: "5x",
    label: "Faster Content",
    sublabel: "From brief to published",
  },
  {
    number: "90%",
    label: "Less Manual Work",
    sublabel: "Automated content pipeline",
  },
  {
    number: "24/7",
    label: "Always Posting",
    sublabel: "Even while you sleep",
  },
] as const;

/* ── Reveal Statement ── */
export const marketingRevealStatement =
  "What if your marketing ran itself?";

/* ── Closing CTA ── */
export const marketingClosingCta = {
  headline: "Ready to put marketing on autopilot?",
  line: "Tell us about your channels and goals—we'll show you what the AI team can do.",
  ctaPrimary: { label: "Talk to us", href: "/contact/sales" },
  ctaSecondary: { label: "Back to all services", href: "/#services" },
} as const;
