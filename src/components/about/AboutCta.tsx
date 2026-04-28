"use client";

import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

export default function AboutCta() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });
  const reduceMotion = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="mx-auto max-w-[900px] px-6 md:px-10 text-center">
        <motion.div
          ref={ref}
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
          className="glass-card rounded-2xl p-10 md:p-14 relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <p className="text-[12px] font-medium uppercase tracking-[0.15em] text-white/70">
            Next step
          </p>
          <h2 className="mt-3 text-[clamp(24px,3.8vw,44px)] font-medium leading-[1.08] tracking-[-0.05em] gradient-text-subtle">
            Want to see what we build?
          </h2>
          <p className="mt-4 mx-auto max-w-xl text-[14px] leading-relaxed tracking-[-0.01em] text-white/65">
            Explore how we design and implement agentic workflows across sales,
            marketing, and operations — structured systems that run reliably in
            real business environments.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/what-we-do" className="btn-primary inline-flex items-center justify-center gap-2">
              <span>What we do</span>
              <ArrowRight className="w-4 h-4 relative z-10" />
            </Link>
            <Link href="/contact/sales" className="btn-secondary">
              <span>Book a call</span>
            </Link>
          </div>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[180px] h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}

