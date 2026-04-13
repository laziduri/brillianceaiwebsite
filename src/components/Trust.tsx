"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const TESTIMONIALS = [
  {
    quote:
      "BrillianceAI transformed our customer support pipeline. What used to take 6 hours now happens automatically in minutes.",
    author: "Sarah Chen",
    role: "COO, TechScale Inc.",
  },
  {
    quote:
      "The team at Brilliance didn't just build a bot — they redesigned how our entire operations flow. The ROI has been incredible.",
    author: "Marcus Williams",
    role: "Founder, GrowthLab",
  },
  {
    quote:
      "We went from drowning in manual tasks to having AI handle 85% of our repetitive work. Game changer for our team.",
    author: "Priya Patel",
    role: "Head of Ops, Nexus AI",
  },
];

export default function Trust() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="section-padding relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[12px] font-medium text-white/25 uppercase tracking-[0.15em] mb-5 block"
          >
            Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[clamp(28px,4vw,48px)] font-medium leading-[1.1] tracking-[-0.04em] gradient-text-subtle"
          >
            Trusted by teams
            <br />
            that move fast.
          </motion.h2>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="relative w-screen max-w-none left-1/2 -translate-x-1/2 testimonial-marquee overflow-hidden pb-1"
      >
        <div className="testimonial-marquee-track">
          {[0, 1].map((dup) => (
            <div
              key={dup}
              className="flex gap-4 md:gap-6 shrink-0 px-3 md:px-4"
              aria-hidden={dup === 1}
            >
              {TESTIMONIALS.map((t) => (
                <article
                  key={`${dup}-${t.author}`}
                  className="glass-card p-8 flex flex-col group min-w-[min(78vw,320px)] md:min-w-[360px] max-w-[420px] flex-shrink-0"
                >
                  <div className="text-[20px] text-white/10 mb-4 select-none">&ldquo;</div>

                  <p className="text-[14px] text-white/30 font-normal leading-relaxed flex-1 mb-6 tracking-[-0.01em]">
                    {t.quote}
                  </p>

                  <div>
                    <div className="divider-gradient mb-4" />
                    <p className="text-[13px] font-medium text-white/50 tracking-[-0.01em]">
                      {t.author}
                    </p>
                    <p className="text-[11px] text-white/20 font-normal mt-0.5">{t.role}</p>
                  </div>
                </article>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
