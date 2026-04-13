"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { marketingProblem, type ProblemCard } from "@/data/marketing-landing";

const EASE = [0.22, 1, 0.36, 1] as const;

function ProblemColumn({
  card,
  index,
  inView,
}: {
  card: ProblemCard;
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.12, ease: EASE }}
      className="glass-card hover-lift flex flex-col items-center rounded-2xl border border-white/[0.06] p-8 text-center md:p-10"
    >
      <span className="mb-5 inline-flex rounded-full bg-gradient-to-r from-red-600/80 via-red-800/80 to-black/70 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.06em] text-white/90 ring-1 ring-white/10">
        {card.pill}
      </span>
      <p className="text-[15px] leading-relaxed tracking-[-0.01em] text-white/45 md:text-[16px]">
        {card.body}
      </p>
    </motion.div>
  );
}

export default function MarketingProblem() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="border-t border-white/[0.06] py-20 md:py-28"
      aria-labelledby="marketing-problem-heading"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-3 text-center text-[12px] font-medium uppercase tracking-[0.14em] text-white/35"
        >
          {marketingProblem.eyebrow}
        </motion.p>
        <motion.h2
          id="marketing-problem-heading"
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
          className="mx-auto mb-14 max-w-[720px] text-center text-[clamp(26px,3.5vw,40px)] font-medium leading-[1.12] tracking-[-0.04em] gradient-text-subtle md:mb-16"
        >
          {marketingProblem.headline}
        </motion.h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-5 lg:gap-6">
          {marketingProblem.cards.map((card, i) => (
            <ProblemColumn
              key={card.pill}
              card={card}
              index={i}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
