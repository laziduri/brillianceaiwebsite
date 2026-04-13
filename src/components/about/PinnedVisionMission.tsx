"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

type Step = {
  key: "vision" | "mission";
  header: string;
  title: string;
  blocks: Array<{ heading: string; body: string }>;
  bullets: string[];
  closing?: string;
};

const STEPS: readonly Step[] = [
  {
    key: "vision",
    header: "Our Vision",
    title: "To Set the Standard for How Businesses Use AI",
    blocks: [
      {
        heading: "",
        body: "We aim to help businesses move beyond basic tools and build AI systems that improve how work is executed across sales, marketing, and operations.",
      },
      {
        heading: "",
        body: "AI should not sit on the side.\nIt should be part of how a business runs.",
      },
      {
        heading: "To Build AI Workflows That Deliver Real Business Results",
        body: "We design and implement structured AI systems that help businesses:",
      },
    ],
    bullets: [
      "capture more opportunities",
      "reduce manual work",
      "improve consistency",
      "operate more efficiently",
    ],
    closing:
      "Our focus is simple.\nBuild systems that work in real business environments.",
  },
  {
    key: "mission",
    header: "Our Mission",
    title: "To Build Practical AI Systems That Create Real Business Value",
    blocks: [
      {
        heading: "",
        body: "Our mission is to design and implement AI workflows that help businesses:",
      },
    ],
    bullets: [
      "capture more opportunities",
      "reduce manual work",
      "improve consistency",
      "operate more efficiently",
    ],
    closing:
      "We focus on building systems that support real operations, not just generating outputs.\n\nIf it does not improve how the business runs, it does not belong.",
  },
];

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function PinnedVisionMission() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<0 | 1>(0);
  const [progress, setProgress] = useState(0);

  const update = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;

    // Sticky segment: section is ~200vh tall.
    // When rect.top goes from 0 -> -vh, we go from 0 -> 1.
    const raw = (-rect.top) / vh;
    const p = clamp(raw, 0, 1);
    setProgress(p);

    const nextActive: 0 | 1 = p < 0.5 ? 0 : 1;
    setActive(nextActive);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [update]);

  const step = STEPS[active];

  const accent = useMemo(() => {
    // Subtle motion-only: shift a tiny highlight as you scroll.
    const y = 30 + progress * 120;
    return { transform: `translate3d(0, ${y}px, 0)` };
  }, [progress]);

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#050507]"
      aria-label="Vision and mission"
      style={{ height: "200vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 40%, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.012) 55%, transparent 75%)",
          }}
          aria-hidden
        />

        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[60vh] w-[900px] -translate-x-1/2 blur-3xl opacity-[0.08]"
          style={accent}
          aria-hidden
        >
          <div className="h-full w-full rounded-full bg-white" />
        </div>

        <div className="relative z-10 mx-auto flex h-full max-w-[1200px] flex-col justify-center px-6 md:px-10">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12">
            {/* Copy */}
            <div className="md:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step.key}
                  initial={
                    reduceMotion ? false : { opacity: 0, y: 18, filter: "blur(8px)" }
                  }
                  animate={
                    reduceMotion
                      ? { opacity: 1 }
                      : { opacity: 1, y: 0, filter: "blur(0px)" }
                  }
                  exit={
                    reduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: -12, filter: "blur(8px)" }
                  }
                  transition={{ duration: 0.5, ease }}
                >
                  <p className="text-[clamp(34px,6vw,72px)] font-medium leading-[1.02] tracking-[-0.07em] gradient-text">
                    {step.header}
                  </p>

                  <h3 className="mt-4 text-[clamp(22px,3.2vw,36px)] font-medium leading-[1.08] tracking-[-0.05em] text-white/85">
                    {step.title}
                  </h3>

                  <div className="mt-8 space-y-6 max-w-3xl">
                    {step.blocks.map((b, i) => (
                      <div key={i} className="space-y-2">
                        {b.heading ? (
                          <p className="text-[13px] font-medium tracking-[-0.01em] text-white/80">
                            {b.heading}
                          </p>
                        ) : null}
                        <p className="whitespace-pre-line text-[15px] leading-relaxed tracking-[-0.01em] text-white/65">
                          {b.body}
                        </p>
                      </div>
                    ))}

                    <ul className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {step.bullets.map((t) => (
                        <li
                          key={t}
                          className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-[13px] tracking-[-0.01em] text-white/55"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>

                    {step.closing ? (
                      <p className="whitespace-pre-line text-[14px] leading-relaxed tracking-[-0.01em] text-white/55">
                        {step.closing}
                      </p>
                    ) : null}
                  </div>

                  <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right rail + media placeholder */}
            <div className="md:col-span-5 md:pl-6">
              <div className="relative mx-auto w-full max-w-[420px]">
                {/* Rail */}
                <div className="absolute -left-5 top-0 hidden h-full md:block" aria-hidden>
                  <div className="relative h-full w-[2px] rounded-full bg-white/[0.08]">
                    <motion.div
                      className="absolute left-1/2 h-8 w-8 -translate-x-1/2 rounded-full border border-white/[0.12] bg-[#050507]/70 backdrop-blur"
                      style={{ top: `calc(${progress * 100}% - 16px)` }}
                      transition={reduceMotion ? undefined : { duration: 0.12 }}
                    />
                  </div>
                </div>

                {/* Labels */}
                <div className="mb-4 hidden md:flex items-center justify-between">
                  <div
                    className={`text-[12px] font-medium tracking-[-0.01em] transition-colors ${
                      active === 0 ? "text-white/85" : "text-white/60"
                    }`}
                  >
                    Our Vision
                  </div>
                  <div
                    className={`text-[12px] font-medium tracking-[-0.01em] transition-colors ${
                      active === 1 ? "text-white/85" : "text-white/60"
                    }`}
                  >
                    Our Mission
                  </div>
                </div>

                {/* Media placeholder (you can replace with Image later) */}
                <div className="glass-card overflow-hidden rounded-2xl">
                  <div className="relative aspect-[4/5] w-full bg-white/[0.02]">
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(ellipse 90% 70% at 50% 30%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.015) 55%, transparent 72%)",
                      }}
                      aria-hidden
                    />
                    <Image
                      src="/marketing/characters/Gemini_Generated_Image_a76eqpa76eqpa76e.png"
                      alt="BrillianceAI — our vision and mission"
                      fill
                      priority={false}
                      sizes="(max-width: 768px) 100vw, 420px"
                      className="object-cover opacity-90"
                    />
                  </div>
                </div>

                <p className="mt-4 text-[12px] leading-relaxed tracking-[-0.01em] text-white/65">
                  Scroll to move from Vision to Mission.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"
          aria-hidden
        />
      </div>
    </section>
  );
}

