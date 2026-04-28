"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { MessageSquare, Megaphone, ClipboardList } from "lucide-react";
import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";

const WHATSAPP_ROBOT_VIDEO = "/character-videos/whatsapp-robot.mp4";
const AI_MARKETING_VIDEO = "/character-videos/ai-marketing.mp4";
const AI_OPERATIONS_VIDEO = "/character-videos/ai-operation.mp4";

type ServiceDef = {
  title: string;
  description: string;
  icon: ComponentType<LucideProps>;
  loopVideo?: string;
  productHref: string;
};

const SERVICES: ServiceDef[] = [
  {
    title: "AI Sales",
    description:
      "Let AI capture new enquiries from your website, ads, and WhatsApp, respond instantly, follow up consistently, and re-engage old leads and past customers.",
    icon: MessageSquare,
    loopVideo: WHATSAPP_ROBOT_VIDEO,
    productHref: "/products/sales",
  },
  {
    title: "AI Marketing",
    description:
      "Let AI create, schedule, and publish content across your channels while handling incoming enquiries and follow-ups.",
    icon: Megaphone,
    loopVideo: AI_MARKETING_VIDEO,
    productHref: "/products/marketing",
  },
  {
    title: "AI Operations",
    description:
      "Let AI automate admin, handle invoices, process documents, and generate reports. Reduce paperwork and free your team from repetitive work.",
    icon: ClipboardList,
    loopVideo: AI_OPERATIONS_VIDEO,
    productHref: "/products/operations",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

function ServiceLoopVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    ref.current?.play().catch(() => {});
  }, [src]);
  return (
    <video
      ref={ref}
      className="absolute inset-0 z-[1] h-full w-full object-cover object-center"
      src={src}
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden
    />
  );
}

export default function WhatWeDoServices() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const reduceMotion = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      <div className="mx-auto max-w-[1200px]">
        {/* Header */}
        <div className="mb-8 flex flex-col items-center gap-5 text-center md:mb-14 md:flex-row md:items-start md:justify-between md:gap-6 md:text-left">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: EASE }}
              className="mb-5 block text-[12px] font-medium uppercase tracking-[0.15em] text-white/25"
            >
              Our Services
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
              className="text-[clamp(28px,4vw,48px)] font-medium leading-[1.1] tracking-[-0.04em]"
            >
              <span className="gradient-text-subtle">Services we</span>
              <br />
              <span className="gradient-text">deliver.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
            className="max-w-md text-[14px] font-normal leading-relaxed tracking-[-0.01em] text-white/40 md:max-w-xs md:text-right"
          >
            End-to-end AI solutions designed for businesses that demand the
            highest standard of quality and performance.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mb-10 h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"
        />

        {/* Service cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:items-stretch">
          {SERVICES.map((service, idx) => {
            const Icon = service.icon;
            const showVideo = Boolean(service.loopVideo) && !reduceMotion;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.25 + idx * 0.12,
                  ease: EASE,
                }}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.1] bg-[#101014] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] md:p-8"
              >
                {/* Video / icon area */}
                <div
                  className={`relative mb-5 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl border md:mb-6 md:aspect-auto md:min-h-[160px] md:flex-1 ${
                    showVideo
                      ? "border-white/[0.1] bg-black"
                      : "border-white/[0.1] bg-[#141418]"
                  }`}
                >
                  {showVideo && service.loopVideo ? (
                    <ServiceLoopVideo src={service.loopVideo} />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.08),transparent_65%)]" />
                      <Icon
                        className="relative z-[1] h-9 w-9 text-white/70 transition-colors duration-300"
                        strokeWidth={1.25}
                      />
                    </>
                  )}
                </div>

                {/* Text */}
                <div>
                  <h3 className="mb-2 text-[16px] font-medium tracking-[-0.02em] text-white md:mb-3">
                    {service.title}
                  </h3>
                  <p className="text-[13px] font-normal leading-relaxed tracking-[-0.01em] text-white/60">
                    {service.description}
                  </p>
                  <Link
                    href={service.productHref}
                    className="btn-secondary-sm relative z-[5] mt-4 inline-flex w-fit"
                  >
                    <span>Learn more</span>
                  </Link>
                </div>

                <div className="mt-auto pt-5 md:pt-6">
                  <div className="h-px w-0 bg-gradient-to-r from-white/25 to-transparent transition-all duration-500 group-hover:w-full" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
