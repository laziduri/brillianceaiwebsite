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
    title: "To Set the Standard for How Businesses Use Agentic AI",
    blocks: [
      {
        heading: "",
        body: "We believe agentic AI will become a core part of how businesses operate.",
      },
      {
        heading: "",
        body: "Our vision is to help businesses adopt structured AI workflows that improve execution, reduce manual work, and support long-term growth.",
      },
    ],
    bullets: [],
  },
  {
    key: "mission",
    header: "Our Mission",
    title: "To Replace Manual Work with Agentic AI Workflows",
    blocks: [
      {
        heading: "",
        body: "We build systems that handle operations, follow-ups, and processes automatically, allowing businesses to operate faster, more efficiently, and with less reliance on manual effort.",
      },
    ],
    bullets: [],
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

        <div className="relative z-10 mx-auto flex h-full w-full max-w-[1100px] flex-col justify-center px-6 md:px-10">
          <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-12 md:items-center">
            {/* Copy */}
            <div className="md:col-span-7 md:pr-4">
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
                  <p className="text-[clamp(28px,4.5vw,52px)] font-medium leading-[1.05] tracking-[-0.05em] text-white">
                    {step.header}
                  </p>

                  <h3 className="mt-4 max-w-2xl text-[clamp(20px,2.6vw,30px)] font-medium leading-snug tracking-[-0.04em] text-white">
                    {step.title}
                  </h3>

                  <div className="mt-8 max-w-2xl space-y-5">
                    {step.blocks.map((b, i) => (
                      <div key={i} className="space-y-2">
                        {b.heading ? (
                          <p className="text-[13px] font-medium tracking-[-0.01em] text-white">
                            {b.heading}
                          </p>
                        ) : null}
                        <p className="whitespace-pre-line text-[15px] font-normal leading-relaxed tracking-[-0.02em] text-white md:text-[16px]">
                          {b.body}
                        </p>
                      </div>
                    ))}

                    {step.bullets.length > 0 ? (
                      <ul className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {step.bullets.map((t) => (
                          <li
                            key={t}
                            className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-[13px] tracking-[-0.01em] text-white"
                          >
                            {t}
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {step.closing ? (
                      <p className="whitespace-pre-line text-[15px] font-normal leading-relaxed tracking-[-0.02em] text-white">
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
                <div className="mb-4 hidden md:flex items-center justify-between gap-4">
                  <div
                    className={`text-[12px] font-medium tracking-[-0.01em] transition-colors ${
                      active === 0 ? "text-white" : "text-white/50"
                    }`}
                  >
                    Our Vision
                  </div>
                  <div
                    className={`text-[12px] font-medium tracking-[-0.01em] transition-colors ${
                      active === 1 ? "text-white" : "text-white/50"
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

                <p className="mt-4 text-[12px] leading-relaxed tracking-[-0.01em] text-white/80">
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

