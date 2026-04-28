export type FaqCategory = {
  id: string;
  label: string;
  description: string;
  faqs: { q: string; a: string }[];
};

export const EDG_LINK =
  "https://www.enterprisesg.gov.sg/financial-support/enterprise-development-grant";

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: "getting-started",
    label: "Getting Started",
    description: "How to begin, what to expect, and whether agentic AI is right for your business.",
    faqs: [
      {
        q: "What does BrillianceAI actually do?",
        a: "We build custom **agentic AI workflows** for Singapore businesses. Instead of giving you a chatbot, we deliver an AI agent that *takes action* — answering enquiries on WhatsApp, qualifying leads, processing invoices, sending follow-ups, updating your CRM. The work finishes itself; your team stops doing copy-paste.",
      },
      {
        q: "Is my business big enough for agentic AI?",
        a: "If you have at least one repetitive workflow that costs your team hours per week — lead response, invoicing, scheduling, customer support — you're big enough. We've shipped to 5-person SMEs and to 200-person mid-markets. The question is *workflow volume*, not headcount.",
      },
      {
        q: "How do I know which workflow to start with?",
        a: "Book a free 30-minute scope session — we walk through your operations, find the highest-leverage workflow (usually one that bleeds 10+ hours per week), and tell you honestly whether agentic AI is the right tool. If it isn't, we'll say so.",
      },
      {
        q: "Do I need to be technical to use this?",
        a: "No. We build, deploy, and maintain it. You and your team interact with it the same way you'd interact with any teammate — through the channels you already use (WhatsApp, email, your CRM, dashboards).",
      },
      {
        q: "Will it replace my staff?",
        a: "In every deployment we've shipped, agentic AI replaces *tasks*, not people. Your team stops doing copy-paste work and moves up to judgement, relationships, and exception handling. Headcount usually stays flat while output grows — which is the real win in Singapore's labour-constrained market.",
      },
    ],
  },

  {
    id: "pricing-grants",
    label: "Pricing & Grants",
    description: "How we price, what's included, and which government grants you can claim.",
    faqs: [
      {
        q: "How much does it cost?",
        a: "Pricing is always **scope-based — we quote after the consultation**. Every business has a different starting point: existing tools, data quality, workflow complexity, integrations needed. We won't put a generic price up because it would either over-promise or under-deliver. The free 30-minute scope session gives you a real number, not a guess.",
      },
      {
        q: "Can I use government grants to pay for this?",
        a: `Yes. Most of our SME clients claim the **Enterprise Development Grant (EDG)** through Enterprise Singapore, which can cover **up to 50% of qualifying project costs**. We help you scope the project to align with EDG's *Innovation & Productivity* pillar. [Learn more about EDG on Enterprise SG's official page](${EDG_LINK}).`,
      },
      {
        q: "What other Singapore grants apply?",
        a: "Depending on the workflow and your sector, you may also qualify for the **Productivity Solutions Grant (PSG)** for pre-approved AI solutions, the **Enterprise Innovation Scheme (EIS)** offering 400% tax deductions on qualifying AI expenditure for YA2027 and YA2028, and the **National AI Impact Programme** which funds production AI deployments. We'll flag every grant you qualify for during scoping.",
      },
      {
        q: "What's included in the price?",
        a: "Everything you need to go from kickoff to live production: discovery and scoping, agent design and build, integrations to your existing tools, testing, deployment, training your team, and the first month of monitoring. Ongoing support is a separate monthly retainer — kept transparent.",
      },
      {
        q: "Are there ongoing costs after build?",
        a: "Two: a small monthly compute cost for the LLM (typically SGD 200–800 depending on volume) and an optional support retainer for monitoring, tuning, and adding new capabilities. Both are quoted upfront with no surprises.",
      },
      {
        q: "Do you offer payment plans?",
        a: "Yes — most builds are split across milestones (kickoff, mid-build, deployment) so cashflow stays manageable. We can also align payments with grant disbursement timelines if you're using EDG.",
      },
    ],
  },

  {
    id: "how-we-build",
    label: "How We Build",
    description: "Our process, timelines, and what you can expect during the engagement.",
    faqs: [
      {
        q: "How long does it take to deploy?",
        a: "For a single, well-scoped workflow — lead response, invoice processing, first-line support — **4 to 8 weeks** from kickoff to production. Multi-workflow builds run 8 to 16 weeks. The biggest variable is how clean your existing processes and data are, not the AI.",
      },
      {
        q: "What does your build process look like?",
        a: "Four phases: **Scope** (we shadow your team to find the real problem, not the assumed one), **Build** (we design, train, and integrate the agent against your tools and data), **Deploy** (read-only first, then human-approval, then full autonomy as trust is earned), and **Iterate** (monthly reviews, refinement, scope expansion).",
      },
      {
        q: "Will I see progress along the way?",
        a: "Yes. Weekly demos during the build phase. You see exactly what's being built, give feedback, course-correct. No big-bang reveals — there's no surprise at delivery.",
      },
      {
        q: "Who owns the system you build?",
        a: "You do. The agent is built around *your* business, deployed in *your* infrastructure (or one you approve), and runs on credentials you control. We're the builder, not the gatekeeper.",
      },
      {
        q: "What if the project doesn't deliver?",
        a: "We tie milestones to defined outcomes — if a phase doesn't hit its KPI, you don't pay for the next phase until we make it right. We also do a small paid pilot with measurable goals before any big build, so you can validate ROI before committing.",
      },
    ],
  },

  {
    id: "technology",
    label: "Technology & Integrations",
    description: "Which models we use, what we connect to, and how custom the build is.",
    faqs: [
      {
        q: "Which AI models do you use?",
        a: "We're model-agnostic — we pick the right LLM for the workflow. Most builds use Claude (Anthropic), GPT (OpenAI), or Gemini (Google), often combining models for different steps. We optimise for cost, latency, and accuracy on a per-workflow basis.",
      },
      {
        q: "Will it work with my existing tools?",
        a: "Almost certainly yes. We routinely integrate with HubSpot, Salesforce, Pipedrive, Xero, QuickBooks, Shopify, WhatsApp Business, Gmail, Outlook, Google Sheets, Notion, Slack, custom databases, and any tool with an API. If your tool doesn't have an API, we'll tell you upfront.",
      },
      {
        q: "Can the agent learn my brand's tone of voice?",
        a: "Yes — that's a core part of every build. We train the agent on real examples of your past emails, WhatsApp replies, and customer interactions so it sounds like *you*, not like a generic chatbot. Most clients can't tell the agent's replies from their own after a week.",
      },
      {
        q: "Is this built on no-code platforms like Make or n8n?",
        a: "We use the right tool for the job. Simple workflows can run on no-code platforms; complex agents with memory, scoped permissions, and audit logs require purpose-built code. Either way, you get full transparency on the architecture.",
      },
      {
        q: "Can I add more workflows later?",
        a: "Yes — and clients almost always do. We design the foundation so the second and third workflows ship faster than the first. Most clients start with one workflow, prove ROI in 60 days, then expand.",
      },
    ],
  },

  {
    id: "security-compliance",
    label: "Security, PDPA & IMDA",
    description: "How we handle your data and align with Singapore's compliance frameworks.",
    faqs: [
      {
        q: "Is this PDPA compliant?",
        a: "Every system we ship is built to **PDPA standards by default** — consent flows, purpose limitation, retention controls, audit logs on every customer-data interaction, data residency you can point to, and a named human accountable for the agent's behaviour. Compliance is a default, not an add-on.",
      },
      {
        q: "Are you aligned with IMDA's Agentic AI Framework?",
        a: "Yes. We map every build to **IMDA's Model AI Governance Framework for Agentic AI** (released January 2026) — covering accountability, human oversight, scoped permissions, observability, and incident reporting. Your governance documentation is delivered as part of the project.",
      },
      {
        q: "Where is my data processed?",
        a: "Wherever you require. We support deployments in Singapore (SG-region cloud), in your own infrastructure, or in a hybrid setup. Data residency is part of scoping — you tell us the constraint, we work within it.",
      },
      {
        q: "What about MAS FEAT principles?",
        a: "If you're in financial services, we layer the **MAS FEAT** principles (Fairness, Ethics, Accountability, Transparency) on top of PDPA and IMDA. We've built for clients with MAS-regulated workflows and understand the obligations.",
      },
      {
        q: "Can I audit the agent's decisions?",
        a: "Yes. Every agent we build has a full audit log: input received, decision made, action taken, outcome. You can review any interaction, replay any decision, and answer any PDPA enquiry from the data we capture.",
      },
      {
        q: "What happens if the agent makes a mistake?",
        a: "Three layers protect you. **Guardrails** prevent out-of-scope actions before they happen. **Human-in-the-loop** approval kicks in for high-risk decisions until trust is established. **Kill switch** lets a named owner stop the agent immediately. Errors are logged, root-caused, and the rules are updated — same as you'd handle a junior employee's mistake.",
      },
    ],
  },

  {
    id: "support-ownership",
    label: "Support & Ownership",
    description: "What happens after launch — maintenance, training, and changes.",
    faqs: [
      {
        q: "What support do you offer after launch?",
        a: "We offer monthly support retainers covering monitoring, performance tuning, scope expansion, and rapid response when something needs fixing. Tier depends on your volume and criticality — quoted transparently.",
      },
      {
        q: "Will my team get trained on how to work with the agent?",
        a: "Yes. Training is included in every build. Your team learns how to review the agent's work, when to step in, how to update its rules, and how to flag changes. We document everything in plain English.",
      },
      {
        q: "Can I make changes to the agent myself?",
        a: "For configuration changes (tone tweaks, response templates, new edge cases), yes — we ship every build with a control panel non-technical staff can use. For deeper logic changes, we handle them as part of the support retainer or a small change request.",
      },
      {
        q: "What if I want to change vendors later?",
        a: "You own the code, the data, and the credentials. We document everything to a standard another team could pick up. We don't lock you in — and frankly, clients who can leave easily are the ones who stay.",
      },
    ],
  },

  {
    id: "outcomes-roi",
    label: "Outcomes & ROI",
    description: "What results to expect and how we measure success.",
    faqs: [
      {
        q: "What ROI should I expect?",
        a: "It varies by workflow. Most clients **recover build cost inside the first year** in reclaimed labour hours and recovered revenue (e.g. leads that no longer fall through the cracks). We define the target ROI with you during scoping and report against it monthly.",
      },
      {
        q: "How do you measure success?",
        a: "Every workflow ships with a defined KPI — first-response time, conversion rate, hours reclaimed, error rate, customer satisfaction. We track it from day one and review with you monthly. No vanity metrics.",
      },
      {
        q: "What's a realistic example of impact?",
        a: "A typical Singapore SME running a sales agent recovers **20–30 hours per month** of staff time, sees **first-response times drop from hours to under 60 seconds**, and converts **15–25% more inbound enquiries** simply because none get lost to office hours. An ops agent doing invoice reconciliation typically saves a full day per month at month-end.",
      },
      {
        q: "When will I see results?",
        a: "Within the first 30 days of go-live for narrow workflows. Some metrics (first-response time, hours reclaimed) move immediately; others (conversion lift, customer retention) take a quarter to fully reflect.",
      },
      {
        q: "What if the ROI isn't there?",
        a: "Our scoping is honest — we'll tell you upfront if a workflow won't return the build cost in 12 months. If we both agree it should, and it doesn't, we work to make it right. We've never had a client unable to justify the investment, but the safeguard is in place.",
      },
    ],
  },
];

export const ALL_FAQS_FLAT = FAQ_CATEGORIES.flatMap((c) =>
  c.faqs.map((f) => ({ ...f, category: c.label })),
);
