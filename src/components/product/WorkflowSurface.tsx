"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { WorkflowNode } from "@/data/products";

/* ── Shared token styles ── */
const NODE_BASE =
  "relative rounded-xl border border-white/[0.08] bg-[#101014] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]";
const TOOL_LABEL =
  "text-[10px] font-medium uppercase tracking-[0.14em] text-white/40";
const NODE_TITLE =
  "text-[13px] font-medium tracking-[-0.02em] text-white md:text-[14px]";
const NODE_LINE = "text-[12px] leading-relaxed text-white/55";

function ChannelDot({ channel }: { channel: "whatsapp" | "email" | "dm" | "web" }) {
  const map = {
    whatsapp: "WhatsApp",
    email: "Email",
    dm: "Direct message",
    web: "Web form",
  };
  return <span className={TOOL_LABEL}>{map[channel]}</span>;
}

/* ── Node renderers ── */

function Bubble({
  channel,
  from,
  text,
}: {
  channel: "whatsapp" | "email" | "dm" | "web";
  from: string;
  text: string;
}) {
  return (
    <div className={`${NODE_BASE} w-full p-4`}>
      <div className="mb-2 flex items-center justify-between">
        <ChannelDot channel={channel} />
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" aria-hidden />
      </div>
      <div className="mb-1 text-[11px] uppercase tracking-[0.1em] text-white/35">
        {from}
      </div>
      <p className="text-[13px] leading-relaxed tracking-[-0.01em] text-white/85 md:text-[14px]">
        &ldquo;{text}&rdquo;
      </p>
    </div>
  );
}

function AgentNode({ label, sub }: { label: string; sub?: string }) {
  return (
    <div
      className="relative w-full rounded-xl border border-white/15 bg-gradient-to-br from-white/[0.05] to-white/[0.015] p-4"
      role="group"
      aria-label="Agent step"
    >
      <div className="mb-2 flex items-center gap-2">
        <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/20 bg-white/10">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
            <circle cx="5" cy="5" r="1.6" fill="white" />
          </svg>
        </span>
        <span className={TOOL_LABEL}>Agent</span>
      </div>
      <div className={`${NODE_TITLE} mb-0.5`}>{label}</div>
      {sub && <div className={NODE_LINE}>{sub}</div>}
    </div>
  );
}

function SystemCard({
  tool,
  title,
  lines,
  badge,
}: {
  tool: string;
  title: string;
  lines: string[];
  badge?: string;
}) {
  return (
    <div className={`${NODE_BASE} w-full p-4`}>
      <div className="mb-2 flex items-center justify-between">
        <span className={TOOL_LABEL}>{tool}</span>
        {badge && (
          <span className="rounded-full border border-white/15 bg-white/[0.04] px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.1em] text-white/65">
            {badge}
          </span>
        )}
      </div>
      <div className={`${NODE_TITLE} mb-1`}>{title}</div>
      {lines.map((l, i) => (
        <div key={i} className={NODE_LINE}>
          {l}
        </div>
      ))}
    </div>
  );
}

function ListCard({
  tool,
  title,
  items,
}: {
  tool: string;
  title: string;
  items: string[];
}) {
  return (
    <div className={`${NODE_BASE} w-full p-4`}>
      <div className="mb-2 flex items-center justify-between">
        <span className={TOOL_LABEL}>{tool}</span>
      </div>
      <div className={`${NODE_TITLE} mb-2`}>{title}</div>
      <ul className="space-y-1.5">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-2 text-[12px] leading-relaxed text-white/55">
            <span
              className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-white/35"
              aria-hidden
            />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

function DocCard({
  docType,
  title,
  meta,
}: {
  docType: "invoice" | "contract" | "receipt" | "po" | "report";
  title: string;
  meta: string;
}) {
  const label = {
    invoice: "Invoice",
    contract: "Contract",
    receipt: "Receipt",
    po: "Purchase order",
    report: "Report",
  }[docType];
  return (
    <div className={`${NODE_BASE} w-full p-4`}>
      <div className="mb-2 flex items-center justify-between">
        <span className={TOOL_LABEL}>{label}</span>
        <DocIcon />
      </div>
      <div className={`${NODE_TITLE} mb-1`}>{title}</div>
      <div className={NODE_LINE}>{meta}</div>
    </div>
  );
}

function DocIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M3 1.5h5l3 3V12a.5.5 0 0 1-.5.5h-7.5A.5.5 0 0 1 2.5 12V2a.5.5 0 0 1 .5-.5z"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1"
      />
      <path d="M8 1.5v3h3" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
    </svg>
  );
}

/* ── Connector arrows ── */

function HorizontalConnector() {
  return (
    <div className="hidden shrink-0 items-center justify-center md:flex md:w-10 lg:w-14" aria-hidden>
      <svg width="100%" height="12" viewBox="0 0 60 12" preserveAspectRatio="none" fill="none">
        <line
          x1="0"
          y1="6"
          x2="52"
          y2="6"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1"
          strokeDasharray="2 3"
        />
        <path
          d="M52 2l4 4-4 4"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
}

function VerticalConnector() {
  return (
    <div className="flex shrink-0 items-center justify-center py-1 md:hidden" aria-hidden>
      <svg width="12" height="24" viewBox="0 0 12 24" fill="none">
        <line
          x1="6"
          y1="0"
          x2="6"
          y2="18"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1"
          strokeDasharray="2 3"
        />
        <path
          d="M2 16l4 4 4-4"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
}

/* ── Surface composer ── */

function RenderNode({ node }: { node: WorkflowNode }) {
  switch (node.kind) {
    case "bubble":
      return <Bubble channel={node.channel} from={node.from} text={node.text} />;
    case "agent":
      return <AgentNode label={node.label} sub={node.sub} />;
    case "card":
      return (
        <SystemCard tool={node.tool} title={node.title} lines={node.lines} badge={node.badge} />
      );
    case "list":
      return <ListCard tool={node.tool} title={node.title} items={node.items} />;
    case "doc":
      return <DocCard docType={node.docType} title={node.title} meta={node.meta} />;
  }
}

export function WorkflowSurface({ nodes }: { nodes: WorkflowNode[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      className="relative rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.02] to-transparent p-5 md:p-8"
    >
      <div className="flex flex-col items-stretch md:flex-row md:items-center">
        {nodes.map((node, i) => (
          <div key={i} className="contents">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.1 + i * 0.12,
              }}
              className="flex-1"
            >
              <RenderNode node={node} />
            </motion.div>
            {i < nodes.length - 1 && (
              <>
                <HorizontalConnector />
                <VerticalConnector />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
