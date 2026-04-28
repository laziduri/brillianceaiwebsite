export const PRODUCT_SLUGS = ["sales", "marketing", "operations"] as const;
export type ProductSlug = (typeof PRODUCT_SLUGS)[number];

/* ── Workflow surface node types ── */

export type WorkflowNode =
  | {
      kind: "bubble";
      channel: "whatsapp" | "email" | "dm" | "web";
      from: string;
      text: string;
    }
  | {
      kind: "agent";
      label: string;
      sub?: string;
    }
  | {
      kind: "card";
      tool: string;
      title: string;
      lines: string[];
      badge?: string;
    }
  | {
      kind: "list";
      tool: string;
      title: string;
      items: string[];
    }
  | {
      kind: "doc";
      docType: "invoice" | "contract" | "receipt" | "po" | "report";
      title: string;
      meta: string;
    };

export type Workflow = {
  id: string;
  index: string;
  title: string;
  sub: string;
  steps: string[];
  outcome: string;
  nodes: WorkflowNode[];
};

export type ProcessStep = {
  title: string;
  body: string;
  duration: string;
};

export type FaqItem = { q: string; a: string };

export type ProductPageData = {
  slug: ProductSlug;
  title: string;
  headline: string;
  description: string;
  metaDescription: string;
  videoSrc: string;
  highlights: string[];
  /* new workflow-centric layout (optional — falls back to legacy layout if absent) */
  heroKicker?: string;
  heroHeadline?: string;
  heroSub?: string;
  intro?: { eyebrow: string; heading: string; body: string };
  workflows?: Workflow[];
  process?: ProcessStep[];
  faqs?: FaqItem[];
};

const WHATSAPP_ROBOT_VIDEO = "/character-videos/whatsapp-robot.mp4";
const AI_MARKETING_VIDEO = "/character-videos/ai-marketing.mp4";
const AI_OPERATIONS_VIDEO = "/character-videos/ai-operation.mp4";

/* ── Shared process (same for Sales + Ops) ── */
const BUILD_PROCESS: ProcessStep[] = [
  {
    title: "Scope",
    body:
      "We map the workflow with you — where it starts, where it ends, and the rules a human currently applies.",
    duration: "Week 1",
  },
  {
    title: "Build",
    body:
      "We train the agent on your products, tone, and SOPs. Connect it to the tools it needs, with least-privilege access.",
    duration: "Week 2–3",
  },
  {
    title: "Deploy",
    body:
      "Read-only first — the agent observes and drafts. Once it's right, we move actions from human-approval to auto.",
    duration: "Week 4",
  },
  {
    title: "Iterate",
    body:
      "Monthly review: what it got wrong, what to expand, what to tighten. The system gets sharper every cycle.",
    duration: "Ongoing",
  },
];

/* ──────────────────────────────────────────────────────────────
   SALES
   ────────────────────────────────────────────────────────────── */

const SALES_WORKFLOWS: Workflow[] = [
  {
    id: "lead-to-booking",
    index: "01",
    title: "Every enquiry, answered in seconds. Booked before you wake up.",
    sub: "A new lead lands on any channel. The agent qualifies, quotes, books, and logs the deal — in one unbroken loop.",
    steps: [
      "Detects new enquiries on WhatsApp, web forms, email, and ad DMs",
      "Qualifies with 2–3 questions in your tone of voice",
      "Quotes from your live price list and availability",
      "Books the meeting straight into the calendar",
      "Creates the deal in the CRM with full context",
    ],
    outcome: "First response under 60 seconds. Zero enquiries lost to office hours.",
    nodes: [
      {
        kind: "bubble",
        channel: "whatsapp",
        from: "Rachel — new enquiry",
        text: "Hi, do you cater for 80 pax next Saturday?",
      },
      { kind: "agent", label: "Qualify + quote", sub: "Agent in action" },
      {
        kind: "card",
        tool: "HubSpot",
        title: "New deal created",
        lines: ["Rachel Tan — Catering, 80 pax", "Value: SGD 4,200"],
        badge: "Qualified",
      },
      {
        kind: "card",
        tool: "Google Calendar",
        title: "Consultation booked",
        lines: ["Mon 14 Apr, 3:00pm", "30 min — online"],
      },
    ],
  },
  {
    id: "pipeline-follow-up",
    index: "02",
    title: "The follow-ups your team always drops. Handled.",
    sub: "The agent owns every open deal in the CRM. It knows what went out, when, and what to send next.",
    steps: [
      "Scans every open deal for last-touch date",
      "Drafts context-aware follow-ups — knows if a quote went out, a demo happened, a proposal is pending",
      "Sends on the right channel at the right cadence",
      "Logs replies and updates deal stages",
      "Hands back to a human the moment a deal is ready to close",
    ],
    outcome: "Every deal touched on schedule. Nothing stalls in the pipeline.",
    nodes: [
      {
        kind: "list",
        tool: "CRM",
        title: "12 open deals",
        items: [
          "Jason Lim — quote sent, 5 days quiet",
          "Priya N. — demo done, needs proposal",
          "Marcus Ong — proposal out, awaiting reply",
        ],
      },
      { kind: "agent", label: "Draft + send", sub: "Context-aware" },
      {
        kind: "card",
        tool: "Email",
        title: "Follow-up sent",
        lines: ["3 messages out", "Tone matched per stage"],
        badge: "Delivered",
      },
      {
        kind: "card",
        tool: "HubSpot",
        title: "Pipeline updated",
        lines: ["2 replies received", "1 moved to negotiation"],
      },
    ],
  },
  {
    id: "re-engagement",
    index: "03",
    title: "The list of dormant leads you never have time to work.",
    sub: "The agent wakes up cold records, personalises the outreach, and feeds hot ones back into the pipeline.",
    steps: [
      "Pulls leads and past customers dormant 90+ days",
      "Personalises the message against their last interaction",
      "Sends on their preferred channel — WhatsApp, email, or LinkedIn",
      "Handles replies and re-qualifies",
      "Hot records flow back into sales; cold ones queue for the next cycle",
    ],
    outcome: "Dormant pipeline becomes live pipeline. Every quarter, automatically.",
    nodes: [
      {
        kind: "list",
        tool: "CRM",
        title: "Dormant 90+ days",
        items: [
          "147 leads",
          "Segmented by last intent",
          "Pulled in real time",
        ],
      },
      { kind: "agent", label: "Personalise + send", sub: "By last interaction" },
      {
        kind: "bubble",
        channel: "whatsapp",
        from: "Outbound — revival",
        text: "Hey Priya — last March we scoped a venue for 40 pax. Still planning that one?",
      },
      {
        kind: "card",
        tool: "HubSpot",
        title: "Back in pipeline",
        lines: ["9 replies", "3 booked a call"],
        badge: "Reactivated",
      },
    ],
  },
];

const SALES_FAQS: FaqItem[] = [
  {
    q: "How long before the agent is live?",
    a: "4–8 weeks from kickoff. Week 1 is scoping, weeks 2–3 are build, week 4 is deployment in read-only mode before we enable actions.",
  },
  {
    q: "Does it reply in my tone?",
    a: "Yes. We train the agent on your real WhatsApp and email threads so it sounds like your team, not a bot.",
  },
  {
    q: "What if a lead asks something the agent doesn't know?",
    a: "The agent is built with explicit escalation rules. Anything outside scope — custom pricing, complaints, unusual requests — routes to the right human with full context already summarised.",
  },
  {
    q: "What about PDPA compliance?",
    a: "Every action is logged with the input, the decision, and the output. Data is processed in a jurisdiction you approve. A named human is accountable. Aligned with IMDA's Model AI Governance Framework by default.",
  },
];

/* ──────────────────────────────────────────────────────────────
   OPERATIONS
   ────────────────────────────────────────────────────────────── */

const OPS_WORKFLOWS: Workflow[] = [
  {
    id: "invoice-to-payment",
    index: "01",
    title: "Supplier invoice arrives. Posted to Xero. Payment scheduled.",
    sub: "The full AP loop — extract, match, approve, post, pay — runs continuously, not at month-end.",
    steps: [
      "Detects invoices landing in the shared inbox",
      "Extracts line items, GST, totals, supplier details",
      "Three-way matches against the PO and goods-received note",
      "Auto-approves clean invoices, flags discrepancies",
      "Posts to Xero and schedules payment",
    ],
    outcome: "Days of month-end compressed into a process that never stops running.",
    nodes: [
      {
        kind: "doc",
        docType: "invoice",
        title: "INV-2049 — Acme Supplies",
        meta: "SGD 8,420 · 12 line items",
      },
      { kind: "agent", label: "Extract + match", sub: "3-way check" },
      {
        kind: "card",
        tool: "PO system",
        title: "PO-3310 matched",
        lines: ["Qty and price match", "GRN received 11 Apr"],
        badge: "Clean",
      },
      {
        kind: "card",
        tool: "Xero",
        title: "Posted to ledger",
        lines: ["Payment scheduled", "Due 25 Apr"],
      },
    ],
  },
  {
    id: "document-to-system",
    index: "02",
    title: "Any document in. The right system updated.",
    sub: "Contracts, receipts, POs, forms — the agent reads them, files them, and routes the data where it belongs.",
    steps: [
      "Monitors inbound across email, WhatsApp, and upload folders",
      "Classifies the document type",
      "Extracts the fields that matter for that type",
      "Files the document in the right location",
      "Updates the right downstream system — CRM, HR, inventory, accounting",
    ],
    outcome: "No more re-typing. No more lost paperwork. No more Monday morning filing.",
    nodes: [
      {
        kind: "list",
        tool: "Shared inbox",
        title: "Incoming documents",
        items: ["Contract — 2 pages", "Receipt — SGD 312", "PO — Acme, 4 SKUs"],
      },
      { kind: "agent", label: "Classify + route", sub: "By document type" },
      {
        kind: "doc",
        docType: "contract",
        title: "Contract filed",
        meta: "Legal drive · NDA folder",
      },
      {
        kind: "card",
        tool: "Inventory",
        title: "PO registered",
        lines: ["4 SKUs added", "Expected 18 Apr"],
        badge: "Synced",
      },
    ],
  },
  {
    id: "reporting",
    index: "03",
    title: "Monthly reporting, in your inbox, on the 1st.",
    sub: "The agent pulls from every system, reconciles the numbers, and delivers a report that answers follow-up questions.",
    steps: [
      "Pulls from bank feeds, Xero, CRM, Shopify, inventory",
      "Reconciles entries and flags the gaps",
      "Computes the KPIs that matter to your business",
      "Generates a board-ready PDF",
      "Delivers to you, your accountant, and the relevant team",
    ],
    outcome: "The report you always meant to send, now sent without you.",
    nodes: [
      {
        kind: "list",
        tool: "Data sources",
        title: "Pulled in real time",
        items: ["Bank feed — DBS", "Xero — full ledger", "Shopify — orders + refunds"],
      },
      { kind: "agent", label: "Reconcile + compile", sub: "KPIs + narrative" },
      {
        kind: "doc",
        docType: "report",
        title: "April 2026 report",
        meta: "18 pages · board-ready",
      },
      {
        kind: "card",
        tool: "Email",
        title: "Delivered",
        lines: ["Founder + accountant", "Ops team cc'd"],
        badge: "Sent",
      },
    ],
  },
];

const OPS_FAQS: FaqItem[] = [
  {
    q: "Which accounting systems do you connect to?",
    a: "Xero, QuickBooks, and most mid-market ERPs. If it has an API, we connect to it — and if it doesn't, we can work with the export files.",
  },
  {
    q: "How does the agent handle invoice errors?",
    a: "Clean invoices auto-approve. Anything with a mismatch — wrong quantity, wrong price, missing PO — gets flagged for a human review with the specific line highlighted.",
  },
  {
    q: "Can it process invoices in multiple languages?",
    a: "Yes. English, Chinese, Malay, Tamil, and most Asian languages out of the box. The agent handles mixed-language invoices without configuration.",
  },
  {
    q: "What happens when a document type is new?",
    a: "The agent flags unclassified documents for a human. Once you categorise one, it learns — and the next similar document routes automatically.",
  },
  {
    q: "How is data kept secure and PDPA-compliant?",
    a: "Every action is logged. Data is processed in the jurisdiction you approve. Access is scoped to the minimum the agent needs to do its job. A named human is accountable. Aligned with IMDA's Model AI Governance Framework by default.",
  },
];

/* ──────────────────────────────────────────────────────────────
   PRODUCTS
   ────────────────────────────────────────────────────────────── */

export const PRODUCTS: Record<ProductSlug, ProductPageData> = {
  sales: {
    slug: "sales",
    title: "AI Sales",
    headline: "Every lead, followed up — without you.",
    description:
      "Let AI capture new enquiries from your website, ads, and WhatsApp, respond instantly, follow up consistently, and re-engage old leads and past customers.",
    metaDescription:
      "BrillianceAI AI Sales — the workflow that captures every enquiry, qualifies in seconds, and follows up on its own. Built for Singapore SMEs under IMDA and PDPA.",
    videoSrc: WHATSAPP_ROBOT_VIDEO,
    highlights: [
      "Capture leads from web, ads, and WhatsApp in one flow",
      "Instant first responses and structured follow-ups",
      "Re-engage cold leads and past customers automatically",
      "Built around your tone, offers, and escalation rules",
    ],
    heroKicker: "AI Sales",
    heroHeadline: "Every lead, followed up — without you.",
    heroSub:
      "Enquiries answered in seconds. Pipeline chased on schedule. Dormant leads revived. The sales motion you keep meaning to build, running on its own.",
    intro: {
      eyebrow: "The shift",
      heading: "We don't sell you an AI tool. We build the workflow that replaces the work.",
      body: "Generic AI drafts the reply. We build the system that answers, qualifies, quotes, books, logs, and chases — without a prompt, around the clock, in your tone.",
    },
    workflows: SALES_WORKFLOWS,
    process: BUILD_PROCESS,
    faqs: SALES_FAQS,
  },
  marketing: {
    slug: "marketing",
    title: "AI Marketing",
    headline: "Create, schedule, and stay on top of every channel",
    description:
      "Let AI create, schedule, and publish content across your channels while handling incoming enquiries and follow-ups.",
    metaDescription:
      "BrillianceAI AI Marketing — content creation, scheduling, and publishing with enquiry handling in one system.",
    videoSrc: AI_MARKETING_VIDEO,
    highlights: [
      "Draft and adapt content for each channel",
      "Scheduling and publishing workflows you control",
      "Enquiries and DMs triaged alongside campaigns",
      "Consistent brand voice across touchpoints",
    ],
  },
  operations: {
    slug: "operations",
    title: "AI Operations",
    headline: "Paperwork, gone.",
    description:
      "Let AI automate admin, handle invoices, process documents, and generate reports. Reduce paperwork and free your team from repetitive work.",
    metaDescription:
      "BrillianceAI AI Operations — invoices, documents, and reporting handled automatically. Built for Singapore SMEs under IMDA and PDPA.",
    videoSrc: AI_OPERATIONS_VIDEO,
    highlights: [
      "Document intake, classification, and routing",
      "Invoice and admin workflows with human checkpoints",
      "Reporting generated from your live data",
      "Less manual data entry across tools",
    ],
    heroKicker: "AI Operations",
    heroHeadline: "Paperwork, gone.",
    heroSub:
      "Invoices posted. Documents filed. Reports sent on the 1st. The back office running continuously — not in end-of-month sprints.",
    intro: {
      eyebrow: "The shift",
      heading: "We don't sell you an AI tool. We build the workflow that replaces the work.",
      body: "Generic AI summarises the document. We build the system that reads it, files it, updates the right tool, and closes the loop — without a prompt, around the clock, with every action logged.",
    },
    workflows: OPS_WORKFLOWS,
    process: BUILD_PROCESS,
    faqs: OPS_FAQS,
  },
};

export function isProductSlug(s: string): s is ProductSlug {
  return PRODUCT_SLUGS.includes(s as ProductSlug);
}
