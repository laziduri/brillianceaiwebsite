import Link from "next/link";

const PILLARS = [
  {
    eyebrow: "01",
    title: "Start with your workflow",
    body: "We map your real process end-to-end — where leads come from, what decisions get made, and where work slows down.",
  },
  {
    eyebrow: "02",
    title: "Design clear guardrails",
    body: "We define what the AI can do, when it should ask for approval, and how it should handle edge cases so outcomes stay consistent.",
  },
  {
    eyebrow: "03",
    title: "Connect the tools you already use",
    body: "We integrate with your CRM, inbox, WhatsApp, calendars, docs, and internal systems so the workflow runs inside your existing stack.",
  },
  {
    eyebrow: "04",
    title: "Deploy, measure, improve",
    body: "We launch with visibility and tracking, then refine based on real usage — improving accuracy, speed, and business outcomes over time.",
  },
];

export default function OurApproach() {
  return (
    <section className="section-padding relative overflow-hidden bg-[#08090a]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 60% at 50% 30%, rgba(255,255,255,0.035) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-[1200px]">
        <div className="mb-14 md:mb-20">
          <span className="text-[12px] font-medium text-white/25 uppercase tracking-[0.15em] mb-5 block">
            Our Approach
          </span>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="text-[clamp(28px,4vw,48px)] font-medium leading-[1.1] tracking-[-0.04em]">
              <span className="gradient-text-subtle">Systems that work</span>
              <br />
              <span className="gradient-text">in real operations.</span>
            </h2>
            <p className="max-w-xl text-[14px] md:text-[15px] font-normal leading-relaxed tracking-[-0.01em] text-white/40">
              We don’t ship “AI features.” We build structured workflows that
              handle work end-to-end — with guardrails, tool access, and clear
              outcomes you can measure.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p) => (
            <div key={p.title} className="glass-card p-7 hover-lift">
              <span className="text-[11px] font-medium text-white/15 uppercase tracking-[0.14em]">
                {p.eyebrow}
              </span>
              <h3 className="mt-3 text-[15px] font-medium tracking-[-0.02em] text-white/70">
                {p.title}
              </h3>
              <p className="mt-2 text-[12px] leading-relaxed tracking-[-0.01em] text-white/25">
                {p.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/[0.08] pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[14px] text-white/45 tracking-[-0.01em]">
            Want to scope this for your business?
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact/sales" className="btn-primary-sm">
              <span>Book a call</span>
            </Link>
            <a href="#process" className="btn-secondary-sm">
              <span>See how we work</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

