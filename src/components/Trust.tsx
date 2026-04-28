"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const TESTIMONIALS = [
  {
    quote:
      "Honestly I was sceptical at first because we tried two other vendors before and both wasted our time. The Brilliance team came down to the workshop, sat with us for half a day, and actually understood how we run before saying anything about AI. Within three weeks we had something live on WhatsApp and they kept tuning it for us. What I appreciated most was that they didn't disappear after delivery. They were on it for weeks after.",
    author: "Wei Jian",
    role: "Workshop owner",
  },
  {
    quote:
      "Pricing was the cleanest I've seen in this space. No surprises, no hidden retainers, everything mapped to what we agreed at the start.",
    author: "Aisha Rahman",
    role: "Director",
  },
  {
    quote:
      "Quick, no fuss, knew their stuff. Live in under a month.",
    author: "Joanne Lim",
    role: "Clinic owner",
  },
  {
    quote:
      "What sold me was the first call. No buzzwords, no slide deck, just a real conversation about where we were losing time and money. They priced it fair, delivered faster than I expected, and walked us through every part of the rollout step by step. My ops team picked it up in days because the handover was that thorough. We're already scoping the next workflow with them.",
    author: "Faizal",
    role: "Managing Director",
  },
  {
    quote:
      "They went above and beyond for us. Helpful in a way that didn't feel transactional.",
    author: "Priya",
    role: "Operations Lead",
  },
  {
    quote:
      "The whole engagement was clear from day one. I knew exactly what was happening each week and what they needed from us. We're a small studio so I cannot afford to babysit a vendor and they made it easy.",
    author: "Daryl Tan",
    role: "Studio founder",
  },
  {
    quote:
      "Brilliance treated this like their own business, not a project. Every decision they explained the trade off, the cost, the time, and let us choose. Most agencies just push you toward whatever is most expensive. These guys didn't.",
    author: "Rajesh",
    role: "Co-founder",
  },
  {
    quote:
      "Always responsive, always patient with our questions, never made us feel small for asking.",
    author: "Mei Ling",
    role: "Owner",
  },
  {
    quote:
      "Their process is transparent. I knew the price, the timeline, the deliverables, and what could go wrong before we signed. That kind of upfront honesty is rare in tech vendors.",
    author: "Adam Ong",
    role: "Managing partner",
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

                  <p className="text-[14px] text-white/90 font-normal leading-relaxed flex-1 mb-6 tracking-[-0.01em]">
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
