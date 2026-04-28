import type { ReactNode } from "react";

function Figure({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <figure className="my-10 md:my-12">
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6 md:p-8">
        {children}
      </div>
      <figcaption className="mt-3 text-center text-[12px] tracking-[-0.01em] text-white/35">
        {caption}
      </figcaption>
    </figure>
  );
}

/* 4 pillars — Perceive → Reason → Act → Remember */
export function PillarsDiagram() {
  const pillars = [
    {
      label: "Perceive",
      body: "Monitors inboxes, WhatsApp, forms, CRM, dashboards.",
    },
    {
      label: "Reason",
      body: "Decides what action the goal requires right now.",
    },
    {
      label: "Act",
      body: "Calls real tools — CRM, email, APIs, databases.",
    },
    {
      label: "Remember",
      body: "Carries your products, SOPs, and tone across sessions.",
    },
  ];
  return (
    <Figure caption="The four pillars of an agentic AI system.">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((p, i) => (
          <div
            key={p.label}
            className="relative rounded-xl border border-white/[0.08] bg-white/[0.02] p-5"
          >
            <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">
              Pillar 0{i + 1}
            </div>
            <div className="mb-2 text-[16px] font-medium tracking-[-0.02em] text-white">
              {p.label}
            </div>
            <p className="text-[13px] leading-relaxed text-white/55">{p.body}</p>
          </div>
        ))}
      </div>
    </Figure>
  );
}

/* Workflow — Enquiry → Triage → Respond → Log → Follow-up */
export function WorkflowDiagram() {
  const steps = [
    { label: "Enquiry", note: "WhatsApp, web, email" },
    { label: "Triage", note: "Qualify and route" },
    { label: "Respond", note: "Instant reply" },
    { label: "Log", note: "Update CRM" },
    { label: "Follow-up", note: "Chase if quiet" },
  ];
  return (
    <Figure caption="A single agent runs the full path — no human needed between steps.">
      <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center md:gap-2">
        {steps.map((s, i) => (
          <div key={s.label} className="flex items-center gap-2 md:flex-1">
            <div className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3">
              <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">
                Step 0{i + 1}
              </div>
              <div className="mt-1 text-[14px] font-medium tracking-[-0.02em] text-white">
                {s.label}
              </div>
              <div className="mt-0.5 text-[12px] text-white/45">{s.note}</div>
            </div>
            {i < steps.length - 1 && (
              <div className="hidden md:flex items-center text-white/25" aria-hidden>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M2 7h10M8 3l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
            {i < steps.length - 1 && (
              <div className="md:hidden flex items-center justify-center text-white/25 py-1" aria-hidden>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M7 2v10M3 8l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </Figure>
  );
}

/* Timeline — Rules → ML → Generative → Agentic */
export function TimelineDiagram() {
  const eras = [
    {
      label: "Rules-based",
      period: "1960s–2010",
      body: "If-this-then-that. Breaks on novelty.",
    },
    {
      label: "Machine Learning",
      period: "2010–2020",
      body: "Predicts from structured data. No conversation.",
    },
    {
      label: "Generative AI",
      period: "2020–2024",
      body: "Produces content on demand. Still needs prompting.",
    },
    {
      label: "Agentic AI",
      period: "2024 →",
      body: "Takes a goal. Uses tools. Finishes work.",
      active: true,
    },
  ];
  return (
    <Figure caption="Four generations of AI — each absorbs the last.">
      <div className="relative">
        <div className="absolute left-0 right-0 top-[26px] hidden h-px bg-gradient-to-r from-white/0 via-white/15 to-white/40 md:block" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {eras.map((e) => (
            <div key={e.label} className="relative">
              <div
                className={`mx-auto mb-3 hidden h-[13px] w-[13px] rounded-full border md:block ${
                  e.active
                    ? "border-white bg-white"
                    : "border-white/25 bg-[#08090a]"
                }`}
                aria-hidden
              />
              <div
                className={`rounded-xl border px-4 py-4 ${
                  e.active
                    ? "border-white/15 bg-white/[0.04]"
                    : "border-white/[0.06] bg-white/[0.015]"
                }`}
              >
                <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">
                  {e.period}
                </div>
                <div className="mt-1 text-[14px] font-medium tracking-[-0.02em] text-white">
                  {e.label}
                </div>
                <div className="mt-1 text-[12px] leading-relaxed text-white/55">
                  {e.body}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Figure>
  );
}

/* Decision — when to use each */
export function DecisionDiagram() {
  const generic = [
    "One-off drafting — a single email, a brainstorm, a summary.",
    "Research and synthesis you will read once.",
    "Coding help and personal productivity.",
    "Exploration where you don't know what you want yet.",
  ];
  const agentic = [
    "A workflow that repeats every day or week.",
    "Tasks that need tool access — CRM, email, WhatsApp.",
    "Work that needs memory of your customers and SOPs.",
    "Operations that must run 24/7 without waiting for a human.",
    "Anything that needs an audit trail under PDPA.",
  ];
  return (
    <Figure caption="A quick decision matrix — generic for one-offs, agentic for workflows.">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-5">
          <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">
            Use generic AI
          </div>
          <ul className="space-y-2.5">
            {generic.map((g) => (
              <li
                key={g}
                className="flex gap-2.5 text-[13px] leading-relaxed text-white/60"
              >
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-white/30" aria-hidden />
                {g}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-white/15 bg-white/[0.04] p-5">
          <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-white/70">
            Use agentic AI
          </div>
          <ul className="space-y-2.5">
            {agentic.map((a) => (
              <li
                key={a}
                className="flex gap-2.5 text-[13px] leading-relaxed text-white/80"
              >
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-white/60" aria-hidden />
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Figure>
  );
}

export function Diagram({ variant }: { variant: "pillars" | "workflow" | "timeline" | "decision" }) {
  if (variant === "pillars") return <PillarsDiagram />;
  if (variant === "workflow") return <WorkflowDiagram />;
  if (variant === "timeline") return <TimelineDiagram />;
  return <DecisionDiagram />;
}
