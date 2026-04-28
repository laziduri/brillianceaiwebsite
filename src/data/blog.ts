export const BLOG_SLUGS = [
  "what-is-agentic-ai",
  "generic-ai-vs-agentic-ai",
  "ai-you-bought-isnt-finishing-the-job",
] as const;

export type BlogSlug = (typeof BLOG_SLUGS)[number];

export const BLOG_CATEGORIES = [
  {
    id: "fundamentals",
    label: "Fundamentals",
    description: "What agentic AI is, how it works, and why it matters.",
  },
  {
    id: "singapore-market",
    label: "Singapore Market",
    description: "Local context — regulations, grants, and what's really moving here.",
  },
  {
    id: "workflows",
    label: "Workflows",
    description: "The specific use-cases we build — sales, ops, marketing.",
  },
  {
    id: "playbooks",
    label: "Playbooks",
    description: "How to scope, deploy, and measure agentic AI in your business.",
  },
] as const;

export type BlogCategoryId = (typeof BLOG_CATEGORIES)[number]["id"];

export type BlogSection =
  | { type: "tldr"; content: string }
  | { type: "heading"; level: 2 | 3; text: string; id: string }
  | { type: "paragraph"; content: string }
  | { type: "bullets"; items: string[] }
  | { type: "numbered"; items: string[] }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "callout"; title: string; body: string }
  | { type: "comparison2"; caption?: string; headers: [string, string]; rows: [string, string][] }
  | { type: "comparison3"; caption?: string; headers: [string, string, string]; rows: [string, string, string][] }
  | { type: "diagram"; variant: "pillars" | "workflow" | "timeline" | "decision" };

export type FaqItem = { q: string; a: string };

export type BlogPost = {
  slug: BlogSlug;
  category: BlogCategoryId;
  title: string;
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  heroKicker: string;
  heroSubtitle: string;
  author: string;
  datePublished: string;
  dateModified: string;
  readMinutes: number;
  keywords: string[];
  tocIds: { id: string; label: string }[];
  sections: BlogSection[];
  faqs: FaqItem[];
  related: { slug: BlogSlug; title: string; blurb: string }[];
};

export function isBlogSlug(s: string): s is BlogSlug {
  return (BLOG_SLUGS as readonly string[]).includes(s);
}

/* ──────────────────────────────────────────────────────────────
   POST 1 — What is Agentic AI?
   ────────────────────────────────────────────────────────────── */

const POST_WHAT_IS_AGENTIC_AI: BlogPost = {
  slug: "what-is-agentic-ai",
  category: "fundamentals",
  title: "What Is Agentic AI? A 2026 Guide for Singapore Businesses",
  metaTitle: "What Is Agentic AI? A 2026 Guide for Singapore Businesses",
  metaDescription:
    "Agentic AI is AI that takes action — not just drafts content. Learn how it works, real Singapore use cases, IMDA/PDPA compliance, costs, and how to deploy.",
  ogTitle: "What Is Agentic AI? The 2026 Guide for Singapore Businesses",
  ogDescription:
    "Agentic AI takes a goal and executes the workflow end-to-end. Definition, examples, IMDA/PDPA compliance, and how to get started.",
  heroKicker: "Guide",
  heroSubtitle:
    "Generative AI drafts the email. Agentic AI sends it, updates the CRM, and books the meeting. Here is what that shift means for Singapore businesses in 2026.",
  author: "Daniel",
  datePublished: "2026-03-22",
  dateModified: "2026-04-14",
  readMinutes: 11,
  keywords: [
    "agentic ai",
    "what is agentic ai",
    "ai agents",
    "autonomous ai",
    "agentic ai singapore",
    "imda model ai governance",
    "pdpa ai",
    "ai agents for business",
    "agentic ai vs generative ai",
  ],
  tocIds: [
    { id: "definition", label: "What is Agentic AI?" },
    { id: "how-it-works", label: "How Agentic AI Works" },
    { id: "vs-others", label: "Traditional vs Generative vs Agentic" },
    { id: "examples", label: "Singapore Use Cases" },
    { id: "benefits", label: "Benefits for SMEs" },
    { id: "risks", label: "Limitations and Risks" },
    { id: "governance", label: "IMDA, PDPA & Governance" },
    { id: "get-started", label: "How to Get Started" },
    { id: "faq", label: "Frequently Asked Questions" },
  ],
  sections: [
    {
      type: "tldr",
      content:
        "Agentic AI is artificial intelligence that doesn't just respond — it acts. Unlike ChatGPT or Gemini, which draft a reply and stop, an agentic system takes a goal, plans the steps, uses real tools (email, CRM, WhatsApp, databases), and executes end-to-end workflows autonomously. For a Singapore SME, that means an enquiry on WhatsApp at 2am gets qualified, quoted, and logged in your CRM before you open your laptop.",
    },

    { type: "heading", level: 2, text: "What is Agentic AI?", id: "definition" },
    {
      type: "paragraph",
      content:
        "**Agentic AI** refers to artificial intelligence systems built around autonomous agents — software that perceives its environment, reasons about goals, plans multi-step actions, executes those actions using real tools, and adapts based on outcomes. The term *agentic* distinguishes it from *generative* AI, which produces content in response to a prompt but does not act on the world.",
    },
    {
      type: "paragraph",
      content:
        "In plain English: agentic AI is AI that does the job. Generative AI drafts an email. Agentic AI sends it, updates your CRM, and books the meeting. The unit of work shifts from *output* to *outcome*.",
    },
    {
      type: "callout",
      title: "The one-line definition",
      body: "Agentic AI is AI you give a goal to — not a prompt. It plans, uses tools, and finishes the work.",
    },

    { type: "heading", level: 2, text: "How Agentic AI Works — The 4 Pillars", id: "how-it-works" },
    {
      type: "paragraph",
      content:
        "Every agentic system is built on four capabilities working together. Remove any one and the system collapses back into either a chatbot or a rigid script.",
    },
    { type: "diagram", variant: "pillars" },
    {
      type: "numbered",
      items: [
        "**Perception.** The agent monitors inputs that matter to the business — inboxes, WhatsApp Business, web forms, CRM records, supplier feeds, dashboards. It does not wait to be asked.",
        "**Reasoning.** Given a goal and its current context, it decides what to do next. A large language model (typically Claude, GPT-4, or Gemini) handles the reasoning; rules and guardrails constrain it.",
        "**Action.** The agent calls real tools — a CRM API, a WhatsApp message, a database write, a calendar booking. This is the line between *drafting* and *doing*.",
        "**Memory.** It remembers your products, SOPs, customer history, tone of voice, and past decisions across sessions. Without memory, every conversation starts from zero.",
      ],
    },

    { type: "heading", level: 2, text: "Traditional AI vs Generative AI vs Agentic AI", id: "vs-others" },
    {
      type: "paragraph",
      content:
        "Most business leaders have lived through three distinct eras of AI in the last decade. Understanding where agentic AI sits in that lineage is the fastest way to grasp what it can — and cannot — do.",
    },
    {
      type: "comparison3",
      caption: "Three generations of AI, compared by how they interact with your business.",
      headers: ["Traditional / Classical AI", "Generative AI", "Agentic AI"],
      rows: [
        ["Predicts from fixed inputs", "Produces content on demand", "Takes a goal and executes"],
        ["Needs structured data", "Needs a prompt", "Needs a business objective"],
        ["No memory across runs", "No memory across sessions", "Persistent memory of your business"],
        ["No tool use", "Cannot act on the world", "Uses CRM, email, WhatsApp, APIs"],
        ["Example: spam filter", "Example: ChatGPT, Gemini", "Example: an AI that runs your sales ops"],
      ],
    },

    { type: "heading", level: 2, text: "Agentic AI in Singapore — Five Real Use Cases", id: "examples" },
    {
      type: "paragraph",
      content:
        "Abstract definitions only take you so far. Here is what an agentic system actually does inside a Singapore business on an average Tuesday.",
    },

    { type: "heading", level: 3, text: "1. Sales — F&B chain capturing WhatsApp enquiries", id: "example-sales" },
    {
      type: "paragraph",
      content:
        "A customer WhatsApps a catering enquiry at 11pm. The agent replies in seconds with availability for the requested date, quotes from the active price list, asks the qualifying questions a human sales rep would ask, logs the lead in HubSpot, and schedules a follow-up if the customer goes quiet for 24 hours. Nothing waits for office hours.",
    },

    { type: "heading", level: 3, text: "2. Operations — Logistics firm processing invoices", id: "example-ops" },
    {
      type: "paragraph",
      content:
        "Supplier invoice arrives in the shared inbox. The agent extracts the line items, matches them against the purchase order and goods-received note (three-way match), flags discrepancies for a human, and on clean invoices posts directly into Xero. A month-end task that used to burn a full day now runs continuously.",
    },

    { type: "heading", level: 3, text: "3. Support — E-commerce refund handling", id: "example-support" },
    {
      type: "paragraph",
      content:
        "A complaint comes in through Shopify's inbox. The agent reads the order history, applies the refund policy, drafts a PDPA-compliant response, processes the refund if it is within policy, escalates to a human if it is not, and closes the ticket. Every step is logged for audit.",
    },

    { type: "heading", level: 3, text: "4. Marketing — Agency managing client content", id: "example-marketing" },
    {
      type: "paragraph",
      content:
        "For each client, the agent drafts channel-specific content from a campaign brief, schedules posts, monitors engagement, and flags hot inbound DMs for the human team. The agency runs three times the client load without tripling headcount.",
    },

    { type: "heading", level: 3, text: "5. Finance — SME monthly reporting", id: "example-finance" },
    {
      type: "paragraph",
      content:
        "The agent pulls bank feeds, categorises expenses, extracts GST from receipts, reconciles against Xero, and delivers a board-ready monthly report to the founder and their accountant. What used to be a weekend of Excel work becomes an email that lands on the first of every month.",
    },

    { type: "diagram", variant: "workflow" },

    { type: "heading", level: 2, text: "Benefits of Agentic AI for Singapore SMEs", id: "benefits" },
    {
      type: "bullets",
      items: [
        "**24/7 operation across time zones.** US leads arrive overnight, AU clients arrive early morning. An agent covers both without a night shift.",
        "**Consistency through festive periods.** CNY, Hari Raya, Deepavali, and the December shutdown no longer create backlogs.",
        "**Leverage a small team.** Singapore's labour-constrained market means headcount is expensive and slow to hire. Agents close the gap.",
        "**Predictable cost.** A typical production agent runs on SGD 200–800 per month in compute — less than the CPF contributions on one junior hire.",
        "**Audit trail by default.** Every decision is logged, which matters under PDPA and IMDA's governance framework.",
      ],
    },

    { type: "heading", level: 2, text: "Limitations and Risks", id: "risks" },
    {
      type: "paragraph",
      content:
        "Anyone selling you agentic AI without talking about its limits is selling you a demo, not a system. Here is the honest list.",
    },
    {
      type: "bullets",
      items: [
        "**Hallucination at the edges.** LLMs can invent details. Guardrails, retrieval-grounded answers, and human-in-the-loop on high-stakes actions are non-negotiable.",
        "**Permission sprawl.** An agent with write access to your CRM, your inbox, and your database is powerful — and dangerous if unscoped. Least-privilege access is the rule.",
        "**Audit gaps.** Without a proper logging layer, you cannot answer a PDPA enquiry about what the agent did with a customer's data.",
        "**Over-automation.** Some tasks — firing a client, resolving a legal complaint, approving a large refund — should stay human. A good implementation knows the line.",
      ],
    },

    { type: "heading", level: 2, text: "Agentic AI, IMDA and PDPA — What Compliance Looks Like", id: "governance" },
    {
      type: "paragraph",
      content:
        "Singapore has moved faster than most jurisdictions on AI governance. For any agentic system touching customer data, three frameworks apply.",
    },
    {
      type: "bullets",
      items: [
        "**IMDA's Model AI Governance Framework for Generative AI** — nine dimensions including accountability, data quality, testing, incident reporting, and human oversight. Any agent you deploy should map to these.",
        "**PDPA (Personal Data Protection Act).** Consent, purpose limitation, retention, and access rights apply to every customer record an agent touches. Data residency matters: know where the LLM is hosted.",
        "**MAS FEAT principles** — if you operate in financial services, Fairness, Ethics, Accountability and Transparency apply on top of the above.",
      ],
    },
    {
      type: "callout",
      title: "What a compliant agent looks like in practice",
      body: "Every decision logged with inputs and outputs. Human approval on any action above a defined risk threshold. Data processed in a known jurisdiction. A named human accountable. Periodic review of agent behaviour. None of this is optional in Singapore — and none of it is hard to build in from day one.",
    },

    { type: "heading", level: 2, text: "How to Get Started With Agentic AI", id: "get-started" },
    {
      type: "numbered",
      items: [
        "**Pick one workflow, not everything.** The highest-leverage starts are the tasks that eat the most hours: lead response, invoice processing, first-line support.",
        "**Deploy read-only first.** Let the agent observe and draft for a week. You learn how it behaves before it can do damage.",
        "**Add actions behind human approval.** Every outbound email, every CRM write, every refund runs through a quick human check.",
        "**Remove approvals once trust is earned.** After a few hundred clean decisions in a category, auto-approve that category and free up the human.",
        "**Review monthly.** Look at what the agent got wrong, update the guardrails, expand scope.",
      ],
    },

    { type: "heading", level: 2, text: "Frequently Asked Questions", id: "faq" },
  ],
  faqs: [
    {
      q: "What is the difference between agentic AI and ChatGPT?",
      a: "ChatGPT is generative AI — it drafts a response to a prompt and stops. Agentic AI is a system built around an LLM (which can be GPT, Claude, or Gemini) that can perceive inputs without being prompted, plan multi-step actions, use tools like CRMs and email, and execute work end-to-end. In short: ChatGPT writes the email; an agentic system sends it and logs the result.",
    },
    {
      q: "Is agentic AI the same as an AI agent?",
      a: "They overlap but are not identical. An *AI agent* is a single autonomous unit that perceives, decides, and acts. *Agentic AI* is the broader category that includes single agents, multi-agent systems where several agents coordinate, and the supporting infrastructure — memory, tools, guardrails, and audit layers.",
    },
    {
      q: "How is agentic AI different from RPA or workflow automation?",
      a: "RPA follows fixed rules — if X, do Y. It breaks when the form changes, the sender re-words the email, or the workflow hits an edge case. Agentic AI reasons about what to do, which means it handles novelty and ambiguity that would halt a traditional automation. The trade-off is that agents need guardrails that rule-based systems do not.",
    },
    {
      q: "Will agentic AI replace my employees?",
      a: "In most Singapore SMEs we work with, agentic AI replaces tasks, not roles. The human team stops doing copy-paste work and moves up to judgement, relationships, and exception handling. Headcount usually stays flat while output grows — which is the real win in a labour-constrained market.",
    },
    {
      q: "Is agentic AI safe to use on customer data under PDPA?",
      a: "Yes, provided you design for it. That means knowing where the LLM processes data (residency), logging every decision, scoping access to the minimum required, getting consent for AI-assisted handling where relevant, and having a named human accountable. Every system we ship at BrillianceAI is built against IMDA's Model AI Governance Framework and PDPA obligations as defaults, not afterthoughts.",
    },
    {
      q: "How much does an agentic AI system cost in Singapore?",
      a: "A production agent typically runs at SGD 200–800 per month in compute, depending on volume and which model it uses. Build cost for a focused, single-workflow agent is usually SGD 10,000–40,000 delivered in 4–8 weeks. Broader multi-agent systems cost more. Most of our clients recover the build cost inside the first year in recovered labour hours.",
    },
    {
      q: "How long does it take to deploy an agentic AI system?",
      a: "For a single, well-scoped workflow — lead response, invoice processing, first-line support — 4 to 8 weeks from kickoff to production. Broader deployments scale from there. The biggest variable is how clean the existing processes and data are, not the AI itself.",
    },
    {
      q: "What is the difference between agentic AI and AI automation?",
      a: "\"AI automation\" is a marketing umbrella that covers everything from a ChatGPT plugin to a full agent. Agentic AI is the specific subset where the system is autonomous — it takes a goal, not a step-by-step recipe. All agentic AI is automation; not all AI automation is agentic.",
    },
  ],
  related: [
    {
      slug: "generic-ai-vs-agentic-ai",
      title: "Generic AI vs Agentic AI",
      blurb:
        "Generic AI drafts. Agentic AI acts. A side-by-side breakdown of what each does — and when to use which.",
    },
  ],
};

/* ──────────────────────────────────────────────────────────────
   POST 2 — Generic AI vs Agentic AI
   ────────────────────────────────────────────────────────────── */

const POST_GENERIC_VS_AGENTIC: BlogPost = {
  slug: "generic-ai-vs-agentic-ai",
  category: "fundamentals",
  title: "Generic AI vs Agentic AI: The Real Difference (2026)",
  metaTitle: "Generic AI vs Agentic AI — The Real Difference (2026)",
  metaDescription:
    "Generic AI drafts. Agentic AI acts. A clear 2026 comparison of ChatGPT-style AI vs agentic systems — with a decision table, Singapore examples, and FAQs.",
  ogTitle: "Generic AI vs Agentic AI — The Real Difference",
  ogDescription:
    "ChatGPT drafts the email; agentic AI sends it. The definitive comparison — with a decision table and Singapore use cases.",
  heroKicker: "Comparison",
  heroSubtitle:
    "Most businesses use ChatGPT and Gemini as productivity tools — and leave the real work unfinished. Agentic AI closes that loop. Here is what changes, and when each one is the right choice.",
  author: "Daniel",
  datePublished: "2026-03-08",
  dateModified: "2026-04-02",
  readMinutes: 9,
  keywords: [
    "generic ai vs agentic ai",
    "generative ai vs agentic ai",
    "chatgpt vs agentic ai",
    "ai agents vs llm",
    "difference between generative and agentic ai",
    "agentic ai singapore",
    "ai automation singapore",
  ],
  tocIds: [
    { id: "core-difference", label: "The Core Difference" },
    { id: "generic-ai", label: "What Generic AI Does" },
    { id: "agentic-ai", label: "What Agentic AI Does Differently" },
    { id: "comparison", label: "Side-by-Side Comparison" },
    { id: "when-to-use", label: "When to Use Each" },
    { id: "built-for-you", label: "Why Off-the-Shelf Agents Aren't Enough" },
    { id: "governance", label: "Compliance Built In" },
    { id: "faq", label: "Frequently Asked Questions" },
  ],
  sections: [
    {
      type: "tldr",
      content:
        "Generic AI (ChatGPT, Gemini) waits for a prompt, drafts an output, and stops. Agentic AI takes a goal and executes the whole workflow — it sends the email, updates the CRM, and closes the ticket. Generic AI gives you a tool. Agentic AI gives you an outcome.",
    },

    { type: "heading", level: 2, text: "The Core Difference in One Sentence", id: "core-difference" },
    {
      type: "quote",
      text: "Generic AI gives you a tool. Agentic AI gives you an outcome.",
    },
    {
      type: "paragraph",
      content:
        "That line is the whole article. Everything below is detail — where each model fits, when to use which, and what changes when you move from one to the other.",
    },
    { type: "diagram", variant: "timeline" },

    { type: "heading", level: 2, text: "What Generic AI Does", id: "generic-ai" },
    {
      type: "paragraph",
      content:
        "Most businesses today rely on generic AI — tools like ChatGPT and Gemini that wait for a prompt, draft a reply, and stop there. The work is still yours to finish. Your team still sends the email, updates the CRM, and chases the follow-up.",
    },
    {
      type: "paragraph",
      content: "There are three hard limits baked into that model:",
    },
    {
      type: "bullets",
      items: [
        "**It forgets between sessions.** Every conversation starts from zero. You re-explain your products, your tone, and your customers every single time.",
        "**It does not act on the world.** It can draft the email. It cannot send it. It cannot update your CRM. It cannot close the ticket.",
        "**It is trained on everyone.** The same model serves your competitor. Nothing about it is shaped around your business.",
      ],
    },

    { type: "heading", level: 2, text: "What Agentic AI Does Differently", id: "agentic-ai" },
    {
      type: "paragraph",
      content:
        "Agentic AI doesn't wait for instructions. You give it a goal, and it works out the steps to get there — autonomously.",
    },
    {
      type: "numbered",
      items: [
        "**It remembers your business.** Products, customers, SOPs, tone of voice — carried across every interaction, not reset every session.",
        "**It takes action, not just notes.** Sends the email. Updates the database. Closes the ticket. Logs the result.",
        "**It runs end-to-end workflows.** From the moment an enquiry lands to the moment the follow-up is logged — handled in one continuous process.",
        "**It adapts in real time.** A supplier delay, a customer complaint, a changed order — the agent replans rather than freezes.",
        "**It works while you sleep.** Monitors your inbox, orders, and dashboards, and acts the moment something needs action.",
      ],
    },

    { type: "heading", level: 2, text: "Side-by-Side Comparison", id: "comparison" },
    {
      type: "paragraph",
      content:
        "Most debates about AI collapse when you put the two side by side. Here is the comparison in the terms that actually matter to a business owner.",
    },
    {
      type: "comparison2",
      caption: "Generic AI vs Agentic AI — the practical differences for an SME.",
      headers: ["Generic AI (ChatGPT, Gemini)", "Agentic AI"],
      rows: [
        ["Needs a prompt for every task", "Takes a goal and executes the steps"],
        ["Forgets between sessions", "Remembers your products, SOPs, customers"],
        ["Drafts the email", "Sends the email and updates the CRM"],
        ["One task, one output", "Runs end-to-end workflows"],
        ["Same tool as your competitor", "Built around your business"],
        ["Available when you prompt it", "Runs 24/7 without asking"],
        ["No integrations", "Connected to CRM, email, WhatsApp, databases"],
        ["Compliance is your problem", "Audit trail and guardrails built in"],
      ],
    },

    { type: "heading", level: 2, text: "When to Use Each", id: "when-to-use" },
    {
      type: "paragraph",
      content:
        "Generic AI is still the right answer for a large slice of work. The mistake is using it for the slice where it quietly fails.",
    },
    { type: "diagram", variant: "decision" },
    {
      type: "paragraph",
      content:
        "If the task happens once, generic AI is faster to reach for. If the task happens every day, generic AI leaves value on the table.",
    },

    { type: "heading", level: 2, text: "Built For Your Business, Not The Masses", id: "built-for-you" },
    {
      type: "paragraph",
      content:
        "Off-the-shelf agents are trained on generic data. The ones we build are trained on yours — your products, your customers, your workflows, your rules. That's the difference between hiring AI and actually employing it.",
    },
    {
      type: "bullets",
      items: [
        "Your product catalogue, pricing rules, and promotions — loaded in.",
        "Your tone of voice — learned from your real emails and WhatsApp messages.",
        "Your SOPs — encoded as the agent's decision logic, not buried in a wiki no one reads.",
        "Your escalation rules — so the agent knows exactly when to hand off to a human.",
      ],
    },

    { type: "heading", level: 2, text: "Compliance Built In — IMDA and PDPA by Default", id: "governance" },
    {
      type: "paragraph",
      content:
        "Every system we deliver is aligned with IMDA's Model AI Governance Framework for Generative AI and built to PDPA standards. That means audit logs on every action, data residency you can point to, human-in-the-loop on high-risk calls, and a named accountable owner. Deployed in weeks, not months.",
    },
    {
      type: "callout",
      title: "Generic AI gives you a tool. Agentic AI gives you an outcome.",
      body: "If you want a thinking assistant, ChatGPT is brilliant. If you want work to finish itself overnight — that is what we build.",
    },

    { type: "heading", level: 2, text: "Frequently Asked Questions", id: "faq" },
  ],
  faqs: [
    {
      q: "Is ChatGPT agentic AI?",
      a: "ChatGPT by default is generative AI — it drafts a response to a prompt. OpenAI has added agentic features (tool use, memory, operator mode) on top, and those move it partway toward agentic. For a specific business workflow — your CRM, your tone, your escalation rules — a purpose-built agent still outperforms a general-purpose assistant.",
    },
    {
      q: "Can I make ChatGPT agentic by connecting it to my tools?",
      a: "You can, and for a one-person workflow that is sometimes enough. For a business system that needs audit logs, memory that persists across users, scoped permissions, guardrails against hallucination, and PDPA-grade compliance — you quickly outgrow a single ChatGPT account and need a proper agent architecture.",
    },
    {
      q: "What is the ROI of moving from generic to agentic AI?",
      a: "The clearest ROI is recovered hours. A Singapore SME that processes 200 invoices a month typically reclaims 20–30 hours. A lead response agent closes more of the inbound you are already paying to generate. Most of our clients recover build cost inside the first year.",
    },
    {
      q: "Does agentic AI still use LLMs like GPT-4 or Claude?",
      a: "Yes. The LLM is the reasoning engine inside the agent. The agent adds the pieces around it — memory, tools, guardrails, monitoring, and the business logic that turns a general-purpose model into something shaped around your operations.",
    },
    {
      q: "What do I need to move from generic AI to agentic AI?",
      a: "A well-defined workflow, the tools the agent will touch (CRM, email, WhatsApp, databases), example data so it learns your tone and rules, and a human owner. The rest we build.",
    },
    {
      q: "Is agentic AI more expensive than generic AI?",
      a: "Per-month compute is higher because an agent runs more inferences than a one-off ChatGPT query. But that is not the right comparison — the real comparison is against the labour hours the agent replaces. In every deployment we have shipped, the labour maths beats the compute maths by a wide margin.",
    },
  ],
  related: [
    {
      slug: "what-is-agentic-ai",
      title: "What Is Agentic AI?",
      blurb:
        "The full definition, the four pillars, Singapore use cases, and what IMDA/PDPA compliance looks like in practice.",
    },
  ],
};

/* ──────────────────────────────────────────────────────────────
   POST 3 — The AI You Bought Isn't Finishing The Job
   ────────────────────────────────────────────────────────────── */

const POST_AI_ISNT_FINISHING: BlogPost = {
  slug: "ai-you-bought-isnt-finishing-the-job",
  category: "singapore-market",
  title:
    "The AI You Bought Isn't Finishing The Job: Why Singapore Businesses Are Quietly Moving From ChatGPT To Agentic AI",
  metaTitle:
    "Why Singapore Businesses Are Moving From ChatGPT To Agentic AI (2026)",
  metaDescription:
    "Singapore SMEs bought ChatGPT and the work still isn't finishing. Here's why agentic AI is the quiet shift — with IMDA's 2026 framework, Deloitte data, and what it means for your business.",
  ogTitle:
    "The AI You Bought Isn't Finishing The Job — Singapore's Shift To Agentic AI",
  ogDescription:
    "Why Singapore's most forward-looking companies are moving from ChatGPT to agentic AI in 2026 — and the execution risk most miss.",
  heroKicker: "Singapore Market",
  heroSubtitle:
    "A year ago every Singapore SME bolted ChatGPT onto their workflow. Today the same owners are asking a harder question — why hasn't any of it actually stuck?",
  author: "Daniel",
  datePublished: "2026-04-12",
  dateModified: "2026-04-21",
  readMinutes: 7,
  keywords: [
    "agentic ai singapore",
    "chatgpt vs agentic ai singapore",
    "imda agentic ai framework",
    "singapore ai adoption",
    "enterprise innovation scheme ai",
    "national ai impact programme",
    "pdpa ai",
    "generative ai vs agentic ai",
    "ai for sme singapore",
  ],
  tocIds: [
    { id: "the-shift", label: "From Generative AI To Agentic AI" },
    { id: "why-now", label: "Why The Shift Is Happening Now" },
    { id: "the-ceiling", label: "Why Generic AI Hits A Ceiling" },
    { id: "execution-risk", label: "The Execution Risk Most Miss" },
    { id: "next-12", label: "What This Means In The Next 12 Months" },
    { id: "faq", label: "Frequently Asked Questions" },
  ],
  sections: [
    {
      type: "tldr",
      content:
        "Singapore SMEs rushed to bolt ChatGPT onto their workflows — and the productivity gains never arrived. The shift now under way is from *generative* AI that drafts to *agentic* AI that finishes the job. Deloitte's 2026 report says 72% of Singapore businesses plan agentic deployments within two years. IMDA has the world's first agentic AI framework. The grants are here. The bottleneck is execution.",
    },

    {
      type: "paragraph",
      content:
        "A year ago, every Singapore SME owner was rushing to bolt ChatGPT onto their workflow. Today, the same owners are asking a harder question: why hasn't any of it actually stuck?",
    },
    {
      type: "paragraph",
      content:
        "The productivity gains most businesses expected from generative AI have not materialised at scale. Teams still copy and paste replies into email. Staff still reconcile spreadsheets by hand. Customer follow-ups still slip through the cracks. The tool has changed. The work has not. And Singapore's most forward-looking companies are quietly concluding that the problem is not with AI at all — it is with the *kind* of AI they have been using.",
    },

    { type: "heading", level: 2, text: "From Generative AI To Agentic AI", id: "the-shift" },
    {
      type: "paragraph",
      content:
        "The AI landscape has split into two distinct branches, and the distinction matters more than most business leaders realise.",
    },
    {
      type: "paragraph",
      content:
        "**Generative AI** — the category that includes ChatGPT, Gemini, and Copilot — is *reactive*. It produces content in response to a prompt. A user types a request, the system generates an output, and the interaction ends. It is, in effect, a highly capable typewriter.",
    },
    {
      type: "paragraph",
      content:
        "**Agentic AI** operates on an entirely different principle. Rather than wait for instructions, an agentic system is given a goal. It then breaks that goal into steps, executes them, monitors the results, and adapts when conditions change. It remembers context across sessions, connects to real business systems, and takes action — sending the email, updating the database, closing the ticket — rather than simply describing how the action should be done.",
    },
    {
      type: "callout",
      title: "Gartner, 2026",
      body: "40% of enterprise applications will embed task-specific AI agents by the end of 2026, up from less than 5% a year earlier. The shift is not theoretical.",
    },

    { type: "heading", level: 2, text: "Why The Shift Is Happening Now In Singapore", id: "why-now" },
    {
      type: "paragraph",
      content:
        "Singapore sits at the front of this curve. Deloitte's 2026 *State of AI in the Enterprise* report found that **72% of Singapore businesses plan to deploy agentic AI across multiple operational areas within two years**, up from 15% today. Thoughtworks has ranked Singapore the second most aggressive adopter of agentic AI globally, behind only India.",
    },
    {
      type: "paragraph",
      content:
        "The regulatory infrastructure has moved in parallel. The Infocomm Media Development Authority released the world's first **Model AI Governance Framework for Agentic AI** in January 2026, giving Singaporean enterprises a compliance backbone their counterparts in other jurisdictions do not yet have. The government has also expanded the **Enterprise Innovation Scheme** to permit 400% tax deductions on qualifying AI expenditure for 2027 and 2028, and launched the **National AI Impact Programme** with a mandate to bring 10,000 local enterprises into production AI adoption.",
    },
    {
      type: "paragraph",
      content:
        "The message is clear. The infrastructure, the grants, and the regulatory clarity are in place. The bottleneck is no longer willingness. It is execution.",
    },

    { type: "heading", level: 2, text: "Why Generic AI Hits A Ceiling", id: "the-ceiling" },
    {
      type: "paragraph",
      content:
        "Businesses that attempt to close this gap with off-the-shelf tools tend to run into the same three walls.",
    },
    {
      type: "numbered",
      items: [
        "**Memory.** Generic AI forgets between sessions. Every conversation begins from zero, which means the business context — the product catalogue, the standard operating procedures, the tone of the brand — has to be re-entered constantly.",
        "**Action.** A generative model can draft an invoice reminder, but it cannot send it, log it, or follow up. A human still sits in the middle of the workflow, closing the loop manually.",
        "**Differentiation.** A company using the same public model as its competitors has no proprietary advantage; the AI is a commodity.",
      ],
    },
    {
      type: "paragraph",
      content:
        "Custom agentic systems address each of these limitations directly. They are trained on the specific business. They connect to the specific tools. They take action within defined boundaries. And they are governed by audit trails and human-in-the-loop oversight aligned with IMDA's framework.",
    },

    { type: "heading", level: 2, text: "The Execution Risk That Most Companies Miss", id: "execution-risk" },
    {
      type: "paragraph",
      content:
        "None of this means agentic AI is a guaranteed win. **Gartner has forecast that more than 40% of agentic AI projects are at risk of cancellation by 2027**, citing weak governance, inadequate observability, and unclear return on investment as the primary failure modes. WRITER's 2026 *Enterprise AI Adoption* report found that 35% of executives globally could not immediately shut down a rogue AI agent if one malfunctioned.",
    },
    {
      type: "paragraph",
      content:
        "The lesson for Singapore businesses is not that agentic AI is risky. It is that agentic AI is *unforgiving of unclear scopes, weak pilots, and vendors who promise to \"do anything.\"* The companies getting returns are the ones deploying agents into narrow, measurable workflows — customer support triage, sales pipeline management, supply chain exceptions — and expanding only after a pilot has proven its value against a defined KPI.",
    },

    { type: "heading", level: 2, text: "What This Means For Singapore Businesses In The Next 12 Months", id: "next-12" },
    {
      type: "paragraph",
      content:
        "The window for competitive advantage from agentic AI is narrower than most owners assume. Within twelve months, the businesses that have built custom agents tailored to their own data, tone, and workflows will be running faster than those still prompting a generic chatbot. The grants will still be there. The framework will still be there. The question is whether the first-mover advantage will still be there.",
    },
    {
      type: "paragraph",
      content:
        "For Singaporean SMEs, the decision is no longer whether to adopt AI. It is whether to adopt AI that merely *assists* — or AI that actually does the work.",
    },
    {
      type: "callout",
      title: "BrillianceAI builds custom agentic AI systems for Singapore businesses",
      body: "Aligned with PDPA and IMDA's Agentic AI Framework. To explore whether an agent could remove a friction point in your business, book a free consultation today.",
    },

    { type: "heading", level: 2, text: "Frequently Asked Questions", id: "faq" },
  ],
  faqs: [
    {
      q: "Is ChatGPT enough for a Singapore SME, or do I need agentic AI?",
      a: "ChatGPT is excellent for one-off tasks: drafting a proposal, summarising a document, brainstorming. It stops being enough the moment you want the work to *finish itself* — enquiries answered at 2am, invoices reconciled without copy-paste, follow-ups that actually go out. That's the line where generic AI becomes an expensive assistant and agentic AI becomes cheaper than headcount.",
    },
    {
      q: "What is IMDA's Model AI Governance Framework for Agentic AI?",
      a: "Released in January 2026, it's the world's first governance framework specifically for agentic systems. It sets expectations around accountability, human oversight, audit trails, scoped permissions, and incident reporting. For Singapore SMEs, it means any agentic AI you deploy has a clear compliance template to map against — something businesses in most other jurisdictions don't yet have.",
    },
    {
      q: "Can Singapore SMEs claim grants for agentic AI projects?",
      a: "Yes. The Enterprise Innovation Scheme allows 400% tax deductions on qualifying AI expenditure for YA2027 and YA2028. The National AI Impact Programme is actively funding production AI deployments. PSG (Productivity Solutions Grant) may also apply depending on the solution. Most of our clients offset a material portion of build cost through these schemes.",
    },
    {
      q: "How long before the first-mover advantage closes?",
      a: "Based on Deloitte's adoption curve — 15% today, 72% within two years — the window is roughly 12–18 months. After that, agentic AI stops being a differentiator and becomes table stakes. The SMEs moving now are the ones buying 2–3 years of operational leverage their competitors will spend the rest of the decade catching up to.",
    },
    {
      q: "Why do 40% of agentic AI projects fail?",
      a: "Gartner's three failure modes are weak governance, poor observability, and unclear ROI. In practice that means: vague scopes (\"make us AI-first\"), no audit trail when something goes wrong, and no defined KPI to prove value. The projects that succeed are narrow — one workflow, one metric, one accountable owner — and expand only after the pilot earns the right to.",
    },
    {
      q: "What does a compliant agentic AI deployment look like under PDPA?",
      a: "Data residency you can point to, audit logs on every decision, least-privilege access to customer data, a human-in-the-loop for high-risk actions, explicit consent where the agent handles personal data, and a named human accountable for the agent's behaviour. At BrillianceAI we build each of these in by default — not as add-ons.",
    },
  ],
  related: [
    {
      slug: "what-is-agentic-ai",
      title: "What Is Agentic AI?",
      blurb: "The full definition, the four pillars, and what IMDA/PDPA compliance looks like in practice.",
    },
    {
      slug: "generic-ai-vs-agentic-ai",
      title: "Generic AI vs Agentic AI",
      blurb: "ChatGPT drafts the email; agentic AI sends it. The side-by-side breakdown.",
    },
  ],
};

export const BLOG_POSTS: Record<BlogSlug, BlogPost> = {
  "what-is-agentic-ai": POST_WHAT_IS_AGENTIC_AI,
  "generic-ai-vs-agentic-ai": POST_GENERIC_VS_AGENTIC,
  "ai-you-bought-isnt-finishing-the-job": POST_AI_ISNT_FINISHING,
};

export const BLOG_INDEX: {
  slug: BlogSlug;
  category: BlogCategoryId;
  title: string;
  excerpt: string;
  readMinutes: number;
  datePublished: string;
  kicker: string;
}[] = [
  {
    slug: "ai-you-bought-isnt-finishing-the-job",
    category: "singapore-market",
    title: "The AI You Bought Isn't Finishing The Job",
    excerpt:
      "Why Singapore SMEs are quietly moving from ChatGPT to agentic AI — and the 12-month window most owners are missing.",
    readMinutes: POST_AI_ISNT_FINISHING.readMinutes,
    datePublished: POST_AI_ISNT_FINISHING.datePublished,
    kicker: "Singapore Market",
  },
  {
    slug: "what-is-agentic-ai",
    category: "fundamentals",
    title: "What Is Agentic AI? A 2026 Guide for Singapore Businesses",
    excerpt:
      "The definition, the four pillars, five Singapore use cases, and how to deploy under IMDA and PDPA.",
    readMinutes: POST_WHAT_IS_AGENTIC_AI.readMinutes,
    datePublished: POST_WHAT_IS_AGENTIC_AI.datePublished,
    kicker: "Guide",
  },
  {
    slug: "generic-ai-vs-agentic-ai",
    category: "fundamentals",
    title: "Generic AI vs Agentic AI: The Real Difference",
    excerpt:
      "ChatGPT drafts the email; agentic AI sends it. A side-by-side breakdown — with a decision table for when to use each.",
    readMinutes: POST_GENERIC_VS_AGENTIC.readMinutes,
    datePublished: POST_GENERIC_VS_AGENTIC.datePublished,
    kicker: "Comparison",
  },
];
