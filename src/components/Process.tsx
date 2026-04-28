"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Search, PenTool, Rocket, LifeBuoy } from "lucide-react";

const STEPS = [
  { step: "01", title: "Discovery", description: "We audit your current workflows, identify bottlenecks, and map out exactly where AI can create the most impact.", icon: Search },
  { step: "02", title: "Design", description: "We architect a custom AI workflow tailored to your business logic, tools, and team structure.", icon: PenTool },
  { step: "03", title: "Deploy", description: "We build, test, and launch your AI system — integrating it seamlessly into your existing stack.", icon: Rocket },
  { step: "04", title: "Support", description: "Ongoing monitoring, optimization, and support to ensure your AI workflows keep delivering results.", icon: LifeBuoy },
];

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} id="process" className="section-padding relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[12px] font-medium text-white/25 uppercase tracking-[0.15em] mb-5 block"
          >
            Our Process
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[clamp(28px,4vw,48px)] font-medium leading-[1.1] tracking-[-0.04em] gradient-text-subtle mx-auto"
          >
            How we work.
          </motion.h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                className="glass-card p-7 relative group hover-lift"
              >
                {/* Step number watermark */}
                <span className="text-[48px] font-medium text-white/[0.03] absolute top-3 right-5 leading-none select-none tracking-[-0.04em]">
                  {step.step}
                </span>

                {/* Icon */}
                <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-5 group-hover:border-white/[0.12] transition-colors duration-300">
                  <Icon className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors duration-300" />
                </div>

                {/* Step label */}
                <span className="text-[11px] font-medium text-white/15 uppercase tracking-[0.12em] mb-2 block">
                  Step {step.step}
                </span>

                <h3 className="text-[15px] font-medium text-white/60 mb-2 tracking-[-0.02em] group-hover:text-white/80 transition-colors">
                  {step.title}
                </h3>

                <p className="text-[12px] text-white/18 font-normal leading-relaxed tracking-[-0.01em]">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
