/* ──────────────────────────────────────────────────────────────
   CASE STUDIES
   Anonymised engagement snapshots. Metrics are representative
   of the workflow type and not a guarantee for every engagement.
   ────────────────────────────────────────────────────────────── */

export type CaseStudyMetric = {
  label: string;
  value: string;
  sub?: string;
};

export type CaseStudy = {
  slug: string;
  industry: string;
  industryShort: string;
  workflowCategory: "Sales" | "Operations" | "Marketing";
  customerDescriptor: string;
  oneLineOutcome: string;
  metaTitle: string;
  metaDescription: string;
  heroMetrics: CaseStudyMetric[];
  about: string[];
  challenge: string[];
  solution: { intro: string[]; bullets?: string[] };
  results: { intro: string[]; bullets?: string[] };
  pullQuote?: { text: string; attribution: string };
  whatsNext: string;
  datePublished: string;
};

export const CASE_STUDY_SLUGS = [
  "auto-workshop-sales-agent",
  "interior-design-back-office",
  "fnb-marketing-agent",
] as const;

export type CaseStudySlug = (typeof CASE_STUDY_SLUGS)[number];

export function isCaseStudySlug(s: string): s is CaseStudySlug {
  return (CASE_STUDY_SLUGS as readonly string[]).includes(s);
}

/* ──────────────────────────────────────────────────────────────
   1 — Automotive workshop · Sales agent
   ────────────────────────────────────────────────────────────── */

const CS_AUTO_WORKSHOP: CaseStudy = {
  slug: "auto-workshop-sales-agent",
  industry: "Automotive Services",
  industryShort: "Auto Workshop",
  workflowCategory: "Sales",
  customerDescriptor: "An independent multi-bay auto workshop in Singapore",
  oneLineOutcome:
    "From missed weekend enquiries to a recurring service pipeline — without hiring a service advisor.",
  metaTitle:
    "Case Study: AI Sales Agent for a Singapore Auto Workshop – BrillianceAI",
  metaDescription:
    "How an independent Singapore auto workshop turned missed enquiries and one-off jobs into a recurring service pipeline — using a WhatsApp AI agent and automated 3–6 month service reminders.",
  heroMetrics: [
    { label: "First-response time", value: "<2 min", sub: "from ~4 hours" },
    { label: "Returning-customer rate at 6 months", value: "41%", sub: "from ~12%" },
    { label: "Monthly bookings", value: "+34%", sub: "within 6 months" },
    { label: "Owner hours reclaimed", value: "~14 hrs/wk", sub: "phone + follow-up" },
  ],
  about: [
    "An independent multi-bay auto workshop in Singapore — family-operated for over a decade, with around a dozen technicians handling routine servicing, brakes and tyres, and light accident repair across both Japanese and continental makes.",
    "The business runs on a mix of walk-ins and WhatsApp enquiries. Customer trust is high; the systems behind that trust were not.",
  ],
  challenge: [
    "Most enquiries arrived outside operating hours — evenings, Saturdays, public holidays. The owner was answering WhatsApp from his phone whenever he could, and missing many. By Monday morning, half the weekend leads had gone cold or moved to a competitor.",
    "Servicing is a recurring product by nature, but the workshop had no recurring system. A customer would come in for a major service, leave happy, and quietly drift to another workshop at the six-month mark. There was no reminder, no booking link, no nudge.",
    "\"We assumed they'd come back,\" the owner told us during scoping. \"Most didn't. We just never knew.\"",
  ],
  solution: {
    intro: [
      "We built two tightly scoped agents on top of WhatsApp Business, both connected to the workshop's booking calendar and customer database.",
    ],
    bullets: [
      "**Enquiry agent.** Reads each incoming WhatsApp message, asks for vehicle make, model, year, and service type, quotes from the active price list, checks bay availability, and confirms a booking — all within minutes, day or night.",
      "**Service-reminder agent.** Captures the plate number and last-service date on every job. Fires personalised WhatsApp reminders at 90, 150, and 180 days post-service, each with a one-tap booking link and the customer's last-service summary.",
      "**Escalation rules.** Anything outside scope — insurance claims, complex diagnostics, parts not on the standard list — is passed to the owner with the conversation context attached.",
      "**Tone training.** The agent was trained on three months of the owner's own past WhatsApp threads so customers don't notice the handover.",
    ],
  },
  results: {
    intro: [
      "Within six months of go-live, the workshop's enquiry-to-booking conversion changed materially — and the previously invisible \"forgotten customer\" segment came back into view.",
    ],
    bullets: [
      "First-response time fell from ~4 hours to under 2 minutes, including overnight and weekend windows.",
      "Returning-customer rate at the six-month mark rose from ~12% to ~41% — almost entirely driven by the reminder cadence.",
      "Monthly bookings increased ~34% over the six-month window, weighted toward repeat servicing rather than new acquisition.",
      "The owner reclaimed an estimated 14 hours per week previously spent on phone calls, voice notes, and chasing past customers.",
      "No additional service-advisor headcount was required, despite the increase in throughput.",
    ],
  },
  pullQuote: {
    text:
      "I used to lose customers without knowing why. Now I see exactly when they're due — and most come back without me chasing.",
    attribution: "Workshop owner",
  },
  whatsNext:
    "Phase two adds a parts-availability check against the workshop's two main suppliers, so quotes can confirm parts in real time. A lightweight insurance-claim intake agent is also being scoped.",
  datePublished: "2026-04-04",
};

/* ──────────────────────────────────────────────────────────────
   2 — Interior design firm · Back-office automation
   ────────────────────────────────────────────────────────────── */

const CS_INTERIOR_DESIGN: CaseStudy = {
  slug: "interior-design-back-office",
  industry: "Interior Design",
  industryShort: "ID Firm",
  workflowCategory: "Operations",
  customerDescriptor:
    "A boutique residential interior design firm in Singapore",
  oneLineOutcome:
    "From drowning in quotations and invoices to running 30% more projects — without adding headcount.",
  metaTitle:
    "Case Study: AI for a Singapore Interior Design Firm – BrillianceAI",
  metaDescription:
    "How a boutique Singapore ID firm replaced a planned admin hire with an AI quotation agent, an accounting reconciliation agent, and a personal-assistant agent for designers.",
  heroMetrics: [
    { label: "Quotation turnaround", value: "Same day", sub: "from 2–3 days" },
    { label: "Designer admin time", value: "−11 hrs/wk", sub: "14 → 3 per designer" },
    { label: "Avoided hire", value: "~SGD 3.8k/mo", sub: "full-time admin" },
    { label: "On-time project tasks", value: "89%", sub: "from ~62%" },
  ],
  about: [
    "A boutique residential interior design firm based in Singapore — six designers and a founder, focused on HDB and condominium projects, in business for over six years.",
    "The work is design-led and high-touch. The bottleneck was not creativity. It was paper.",
  ],
  challenge: [
    "Designers were spending close to half their working week on admin: drafting quotations from scratch in spreadsheets, chasing supplier invoices through email, reconciling project costs against initial quotes, and re-typing the same supplier markups across every job.",
    "The founder was within a week of posting a full-time admin role at roughly SGD 3,800 per month base, plus CPF, onboarding, and the management overhead that comes with adding headcount to a six-person studio.",
    "Quotations were taking two to three working days to land with clients. In a market where a competing firm could quote the next morning, the founder believed deals were being lost on speed alone — a hypothesis that became hard to ignore.",
    "Project tasks lived in scattered WhatsApp threads. Site visits were missed, supplier deliveries went unrechecked, and on-time task completion across the studio was hovering around 62%.",
  ],
  solution: {
    intro: [
      "Rather than hire, the founder ran a 6-week pilot with three narrowly scoped agents — each one replacing a category of paperwork rather than a person.",
    ],
    bullets: [
      "**Quotation agent.** Reads the project brief (room count, scope of works, finish tier, key inclusions), drafts a fully itemised quotation against the firm's master price list, applies the correct supplier markup logic, and outputs a designer-ready PDF for review. Designer signs off in 5–10 minutes instead of drafting from scratch.",
      "**Accounting reconciliation agent.** Reads supplier invoices from the shared inbox, categorises each line against the correct project code, flags variance against the original quotation, and posts clean entries to Xero. Disputes get surfaced in a daily exception report.",
      "**Personal-assistant agent.** End-of-day digest pushed to each designer's WhatsApp at 6:30pm with tomorrow's site visits, pending client decisions, overdue tasks, and any supplier deliveries due. The founder gets a parallel digest with cross-designer flags.",
      "**Trust ramp.** All three agents ran in review-only mode for the first 30 days — every output checked by a designer before going out. Autonomy was extended workflow-by-workflow as confidence built.",
    ],
  },
  results: {
    intro: [
      "The admin hire was shelved permanently. The studio's capacity rose without the operating cost or onboarding drag of a new role — and the team reports the work feels calmer, not more automated.",
    ],
    bullets: [
      "Quotation turnaround moved from 2–3 working days to same-day. The founder credits the faster turnaround for at least three deals won within the first quarter that he believed would otherwise have been lost.",
      "Designer admin time dropped from ~14 hours per week to ~3 — review and edge-cases only.",
      "The full-time admin hire was avoided. Direct cost saving of approximately SGD 3,800 per month, before CPF and overhead.",
      "On-time task completion across the studio rose from ~62% to ~89% within three months, driven primarily by the daily designer digest.",
      "The studio took on ~30% more concurrent projects within five months, with the same six-designer team.",
    ],
  },
  pullQuote: {
    text:
      "We were a week away from hiring an admin. Instead I have an AI that does quotations in an hour and reminds my designers what's due tomorrow. The team's calmer, and we're running more projects.",
    attribution: "Founder",
  },
  whatsNext:
    "A client-communications agent is being scoped to handle weekly project updates and milestone summaries — pushing the studio further into design time and out of message-relay time.",
  datePublished: "2026-03-18",
};

/* ──────────────────────────────────────────────────────────────
   3 — F&B brand · Marketing + customer reply agent
   ────────────────────────────────────────────────────────────── */

const CS_FNB_MARKETING: CaseStudy = {
  slug: "fnb-marketing-agent",
  industry: "Food & Beverage",
  industryShort: "F&B Brand",
  workflowCategory: "Marketing",
  customerDescriptor: "A 3-outlet Singapore F&B brand",
  oneLineOutcome:
    "From posting once a week to a daily content rhythm — and 78% of customer DMs handled before the team sees them.",
  metaTitle:
    "Case Study: AI Marketing Agent for a Singapore F&B Brand – BrillianceAI",
  metaDescription:
    "How a 3-outlet Singapore F&B brand quadrupled its posting cadence and auto-handled most customer DMs — without adding a marketing hire.",
  heroMetrics: [
    { label: "Posts per week", value: "8", sub: "from 2" },
    { label: "Engagement per post (avg)", value: "+47%", sub: "vs 90-day baseline" },
    { label: "DMs auto-resolved", value: "78%", sub: "across IG + FB + TikTok" },
    { label: "Owner hours/week on social", value: "1.5 hrs", sub: "from ~10 hrs" },
  ],
  about: [
    "A casual-dining F&B brand with three Singapore outlets, founded in the early 2020s. Owner-operated with a small ops team across the outlets and no dedicated marketing hire.",
    "The food and the regulars were strong. The growth lever — content and customer responsiveness — was the owner's calendar.",
  ],
  challenge: [
    "The owner was running operations, hiring, supplier relations, and the social accounts. Posts on Instagram and TikTok averaged one to two a week, sometimes none. Cadence was the first thing to drop whenever anything else got busy — which was always.",
    "The DM inbox was its own problem. Most messages were simple — \"are you open today?\", \"do you have vegetarian options?\", \"where's the closest outlet to Tampines?\", \"can I make a reservation for 6 tonight?\" — but the owner read every one, often hours after they arrived.",
    "Comments on posts were going unanswered for days. Engagement was plateauing. New-customer acquisition through social — the cheapest channel the brand had — was flat.",
    "Hiring a marketing executive at SGD 3,500–4,500 per month wasn't viable for a three-outlet operation still investing in kitchen capacity.",
  ],
  solution: {
    intro: [
      "The build had two halves: one agent that produces and ships content, one that handles the inbound. Both trained explicitly on the brand's existing voice — close to a hundred past posts and reply threads — so nothing went out reading like a chatbot.",
    ],
    bullets: [
      "**Content agent.** Pulls weekly menu changes, outlet announcements, and seasonal hooks from a simple shared sheet. Drafts 4–6 captions per planned post in the brand's voice, pairs them with recommended visuals, and schedules across Instagram, Facebook, and TikTok. The owner approves the week's content in a single 15-minute Friday review.",
      "**DM and comment triage agent.** Reads every incoming DM and comment across all three platforms. Replies instantly to FAQ-shaped questions — opening hours, location and parking, menu basics, dietary options, simple reservation enquiries. Drafts replies for anything more nuanced and queues them for the owner.",
      "**Reservation handoff.** Reservation enquiries that pass a confidence threshold are routed straight to the booking system; anything ambiguous is flagged with a one-tap approve/reject for the owner.",
      "**Brand-tone guardrails.** Agent flags any reply it's less than 90% confident on. Weekly review session catches edge cases and tightens the tone over time.",
    ],
  },
  results: {
    intro: [
      "The brand moved from sporadic posting and reactive DMs to a steady weekly rhythm — and the owner reports the unexpected outcome was getting weekends back.",
    ],
    bullets: [
      "Posting cadence rose from ~2 posts/week to a sustained 8 posts/week across IG, FB, and TikTok. Maintained for over four months.",
      "Average engagement per post (likes + saves + shares) rose ~47% versus the 90-day pre-pilot baseline.",
      "Around 78% of incoming DMs and comments were resolved by the agent without human intervention. The owner now sees only the ~22% that need judgement.",
      "Owner hours per week on social fell from ~10 to ~1.5 — primarily Friday content review and exception handling.",
      "Reservation enquiries from social channels rose ~60% over the same period — a combination of more content surface area and faster reply times.",
    ],
  },
  pullQuote: {
    text:
      "I went from dreading the DM inbox to barely opening it. The team posts more, replies faster, and I finally got my Sundays back.",
    attribution: "Owner",
  },
  whatsNext:
    "A user-generated-content curation agent is in scoping — surfacing tagged customer posts for one-tap re-share approval, and turning the regulars into the brand's most consistent content engine.",
  datePublished: "2026-02-22",
};

/* ──────────────────────────────────────────────────────────────
   Exports
   ────────────────────────────────────────────────────────────── */

export const CASE_STUDIES: Record<CaseStudySlug, CaseStudy> = {
  "auto-workshop-sales-agent": CS_AUTO_WORKSHOP,
  "interior-design-back-office": CS_INTERIOR_DESIGN,
  "fnb-marketing-agent": CS_FNB_MARKETING,
};

export const CASE_STUDY_INDEX: {
  slug: CaseStudySlug;
  industry: string;
  industryShort: string;
  workflowCategory: CaseStudy["workflowCategory"];
  oneLineOutcome: string;
  customerDescriptor: string;
  topMetrics: CaseStudyMetric[];
  datePublished: string;
}[] = [
  {
    slug: "auto-workshop-sales-agent",
    industry: CS_AUTO_WORKSHOP.industry,
    industryShort: CS_AUTO_WORKSHOP.industryShort,
    workflowCategory: CS_AUTO_WORKSHOP.workflowCategory,
    oneLineOutcome: CS_AUTO_WORKSHOP.oneLineOutcome,
    customerDescriptor: CS_AUTO_WORKSHOP.customerDescriptor,
    topMetrics: CS_AUTO_WORKSHOP.heroMetrics.slice(0, 2),
    datePublished: CS_AUTO_WORKSHOP.datePublished,
  },
  {
    slug: "interior-design-back-office",
    industry: CS_INTERIOR_DESIGN.industry,
    industryShort: CS_INTERIOR_DESIGN.industryShort,
    workflowCategory: CS_INTERIOR_DESIGN.workflowCategory,
    oneLineOutcome: CS_INTERIOR_DESIGN.oneLineOutcome,
    customerDescriptor: CS_INTERIOR_DESIGN.customerDescriptor,
    topMetrics: CS_INTERIOR_DESIGN.heroMetrics.slice(0, 2),
    datePublished: CS_INTERIOR_DESIGN.datePublished,
  },
  {
    slug: "fnb-marketing-agent",
    industry: CS_FNB_MARKETING.industry,
    industryShort: CS_FNB_MARKETING.industryShort,
    workflowCategory: CS_FNB_MARKETING.workflowCategory,
    oneLineOutcome: CS_FNB_MARKETING.oneLineOutcome,
    customerDescriptor: CS_FNB_MARKETING.customerDescriptor,
    topMetrics: CS_FNB_MARKETING.heroMetrics.slice(0, 2),
    datePublished: CS_FNB_MARKETING.datePublished,
  },
];

export const CASE_STUDY_DISCLAIMER =
  "Customer identifying details have been anonymised at client request. Outcome metrics are representative of this workflow type and reflect the engagement described; specific results vary by business, data quality, and scope.";
