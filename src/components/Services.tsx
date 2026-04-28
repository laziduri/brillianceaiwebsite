"use client";

import { useRef, useEffect, type ComponentType, type ReactNode } from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";

import type { LucideProps } from "lucide-react";
import { MessageSquare, Megaphone, ClipboardList } from "lucide-react";
import { BrandIntroContent } from "@/components/BrandIntro";

const WHATSAPP_ROBOT_VIDEO = "/character-videos/whatsapp-robot.mp4";
const AI_MARKETING_VIDEO = "/character-videos/ai-marketing.mp4";
const AI_OPERATIONS_VIDEO = "/character-videos/ai-operation.mp4";

type ServiceDef = {
  title: string;
  anchorId: string;
  description: string;
  icon: ComponentType<LucideProps>;
  loopVideo?: string;
  productHref: string;
};

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

const SERVICES: ServiceDef[] = [
  {
    title: "AI Sales",
    anchorId: "ai-sales",
    description:
      "Let AI capture new enquiries from your website, ads, and WhatsApp, respond instantly, follow up consistently, and re-engage old leads and past customers.",
    icon: MessageSquare,
    loopVideo: WHATSAPP_ROBOT_VIDEO,
    productHref: "/products/sales",
  },
  {
    title: "AI Marketing",
    anchorId: "ai-marketing",
    description:
      "Let AI create, schedule, and publish content across your channels while handling incoming enquiries and follow-ups.",
    icon: Megaphone,
    loopVideo: AI_MARKETING_VIDEO,
    productHref: "/products/marketing",
  },
  {
    title: "AI Operations",
    anchorId: "ai-operations",
    description:
      "Let AI automate admin, handle invoices, process documents, and generate reports. Reduce paperwork and free your team from repetitive work.",
    icon: ClipboardList,
    loopVideo: AI_OPERATIONS_VIDEO,
    productHref: "/products/operations",
  },
];

export function ServicesSection() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="services" className="relative w-full bg-[#08090a] text-white selection:bg-white/10">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255,255,255,0.03) 0%, transparent 70%)",
        }}
      />
      <div className="relative z-[1] section-padding">
        <div className="mx-auto w-full max-w-[1200px]">
          <div className="mb-8 flex flex-col items-center gap-5 text-center md:mb-14 md:flex-row md:items-start md:justify-between md:gap-6 md:text-left">
            <div className="w-full md:w-auto">
              <h2 className="text-[clamp(28px,4vw,48px)] font-medium leading-[1.1] tracking-[-0.04em]">
                <span className="gradient-text-subtle">Services we</span>
                <br />
                <span className="gradient-text">deliver.</span>
              </h2>
            </div>
            <p className="max-w-md text-[14px] font-normal leading-relaxed tracking-[-0.01em] text-white/40 md:max-w-xs md:text-right">
              End-to-end AI solutions designed for businesses that demand the
              highest standard of quality and performance.
            </p>
          </div>

          <div className="mx-auto mb-6 h-px w-full max-w-md bg-gradient-to-r from-transparent via-white/[0.06] to-transparent md:mx-0 md:mb-10 md:max-w-none" />

          <div
            id="service-cards"
            className="grid grid-cols-1 gap-4 md:grid-cols-3 md:items-stretch"
          >
            {SERVICES.map((service) => {
              const Icon = service.icon;
              const showVideo = Boolean(service.loopVideo) && !reduceMotion;
              return (
                <div
                  key={service.title}
                  id={service.anchorId}
                  className="group relative flex h-full min-h-0 scroll-mt-[calc(5rem+env(safe-area-inset-top))] flex-col overflow-hidden rounded-2xl border border-white/[0.1] bg-[#101014] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] md:scroll-mt-28 md:p-8"
                >
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
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Services({ children }: { children?: ReactNode }) {
  return (
    <>
      <section id="about" className="w-full bg-[#050507] section-padding overflow-hidden">
        <BrandIntroContent />
      </section>

      <ServicesSection />

      {children && (
        <div className="relative z-[2] bg-[#08090a]">
          {children}
        </div>
      )}
    </>
  );
}

