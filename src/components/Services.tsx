"use client";

import { useRef, useEffect, useState, type ComponentType, type ReactNode } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValueEvent,
} from "framer-motion";
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

function fadeOpacity(
  progress: number,
  sheetEnd: number,
  range: readonly [number, number],
): number {
  if (progress >= sheetEnd) return 1;
  const [a, b] = range;
  if (progress <= a) return 0;
  if (progress >= b) return 1;
  return (progress - a) / (b - a);
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

/**
 * SHEET_VH: scroll distance for the sheet slide-up
 * CONTENT_VH: scroll distance while pinned (cards animate in). Keep tight — no dead scroll.
 */
const SHEET_VH = 95;
const CONTENT_VH = 110;

export default function Services({ children }: { children?: ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [sheetPinned, setSheetPinned] = useState(false);

  const totalVh = reduceMotion ? CONTENT_VH : SHEET_VH + CONTENT_VH;
  const sheetEnd = reduceMotion
    ? 0.0001
    : SHEET_VH / (SHEET_VH + CONTENT_VH);
  const span = 1 - sheetEnd;

  const { scrollYProgress: scrollPin } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollPin, "change", (p) => {
    setSheetPinned((prev) => {
      const next = p >= sheetEnd;
      return prev === next ? prev : next;
    });
  });

  useEffect(() => {
    setSheetPinned(scrollPin.get() >= sheetEnd);
  }, [scrollPin, sheetEnd]);

  const sheetY = useTransform(
    scrollPin,
    reduceMotion ? [0, 1] : [0, sheetEnd],
    reduceMotion ? ["0%", "0%"] : ["100%", "0%"],
  );

  const titleEaseEnd = reduceMotion ? 0.05 : Math.min(0.22, sheetEnd + 0.06);
  const headerOpacity = useTransform(scrollPin, (p) => {
    if (p >= sheetEnd) return 1;
    const x1 = titleEaseEnd * 0.45;
    const x2 = titleEaseEnd;
    if (p <= 0) return 0.94;
    if (p < x1) return 0.94 + (0.99 - 0.94) * (p / x1);
    if (p < x2) return 0.99 + (1 - 0.99) * ((p - x1) / (x2 - x1));
    return 1;
  });
  const headerY = useTransform(scrollPin, [0, titleEaseEnd], [10, 0]);

  const subtitleOpacity = useTransform(scrollPin, (p) => {
    if (p >= sheetEnd) return 1;
    const x1 = titleEaseEnd * 0.5;
    const x2 = titleEaseEnd;
    if (p <= 0) return 0.88;
    if (p < x1) return 0.88 + (0.96 - 0.88) * (p / x1);
    if (p < x2) return 0.96 + (1 - 0.96) * ((p - x1) / (x2 - x1));
    return 1;
  });
  const subtitleY = useTransform(scrollPin, [0, titleEaseEnd], [8, 0]);

  const subtitleColor = useTransform(scrollPin, (p) =>
    p >= sheetEnd ? "rgb(255, 255, 255)" : "rgba(255, 255, 255, 0.4)",
  );

  const div0 = reduceMotion ? 0.01 : 0.02;
  const div1 = reduceMotion ? 0.04 : Math.min(0.18, sheetEnd + 0.12);
  const dividerOpacity = useTransform(scrollPin, (p) => {
    if (p >= sheetEnd) return 1;
    if (p <= div0) return 0.5;
    if (p >= div1) return 1;
    return 0.5 + (0.5 * (p - div0)) / (div1 - div0);
  });

  /* Card animation ranges — tight so they finish right when the section ends */
  const card1: [number, number] = reduceMotion
    ? [0.02, 0.08]
    : [sheetEnd, sheetEnd + span * 0.55];
  const card2: [number, number] = reduceMotion
    ? [0.04, 0.11]
    : [sheetEnd + span * 0.08, sheetEnd + span * 0.65];
  const card3: [number, number] = reduceMotion
    ? [0.06, 0.14]
    : [sheetEnd + span * 0.16, sheetEnd + span * 0.75];

  const icon1: [number, number] = reduceMotion
    ? [0.025, 0.075]
    : [sheetEnd + span * 0.02, sheetEnd + span * 0.5];
  const icon2: [number, number] = reduceMotion
    ? [0.045, 0.1]
    : [sheetEnd + span * 0.1, sheetEnd + span * 0.6];
  const icon3: [number, number] = reduceMotion
    ? [0.065, 0.125]
    : [sheetEnd + span * 0.18, sheetEnd + span * 0.7];

  const text1: [number, number] = reduceMotion
    ? [0.03, 0.09]
    : [sheetEnd + span * 0.05, sheetEnd + span * 0.55];
  const text2: [number, number] = reduceMotion
    ? [0.05, 0.12]
    : [sheetEnd + span * 0.13, sheetEnd + span * 0.65];
  const text3: [number, number] = reduceMotion
    ? [0.07, 0.15]
    : [sheetEnd + span * 0.21, sheetEnd + span * 0.75];

  const cardTravel = reduceMotion ? 40 : 20;

  const card1Opacity = useTransform(scrollPin, (p) => fadeOpacity(p, sheetEnd, card1));
  const card1Y = useTransform(scrollPin, (p) => {
    if (p >= sheetEnd) return 0;
    const [a, b] = card1;
    if (p <= a) return cardTravel;
    if (p >= b) return 0;
    return cardTravel * (1 - (p - a) / (b - a));
  });
  const card2Opacity = useTransform(scrollPin, (p) => fadeOpacity(p, sheetEnd, card2));
  const card2Y = useTransform(scrollPin, (p) => {
    if (p >= sheetEnd) return 0;
    const [a, b] = card2;
    if (p <= a) return cardTravel;
    if (p >= b) return 0;
    return cardTravel * (1 - (p - a) / (b - a));
  });
  const card3Opacity = useTransform(scrollPin, (p) => fadeOpacity(p, sheetEnd, card3));
  const card3Y = useTransform(scrollPin, (p) => {
    if (p >= sheetEnd) return 0;
    const [a, b] = card3;
    if (p <= a) return cardTravel;
    if (p >= b) return 0;
    return cardTravel * (1 - (p - a) / (b - a));
  });

  const cardOpacities = [card1Opacity, card2Opacity, card3Opacity];
  const cardYs = [card1Y, card2Y, card3Y];

  const icon1Opacity = useTransform(scrollPin, (p) => fadeOpacity(p, sheetEnd, icon1));
  const icon1Scale = useTransform(scrollPin, (p) => {
    if (p >= sheetEnd) return 1;
    const [a, b] = icon1;
    if (p <= a) return 0.9;
    if (p >= b) return 1;
    return 0.9 + 0.1 * ((p - a) / (b - a));
  });
  const icon2Opacity = useTransform(scrollPin, (p) => fadeOpacity(p, sheetEnd, icon2));
  const icon2Scale = useTransform(scrollPin, (p) => {
    if (p >= sheetEnd) return 1;
    const [a, b] = icon2;
    if (p <= a) return 0.9;
    if (p >= b) return 1;
    return 0.9 + 0.1 * ((p - a) / (b - a));
  });
  const icon3Opacity = useTransform(scrollPin, (p) => fadeOpacity(p, sheetEnd, icon3));
  const icon3Scale = useTransform(scrollPin, (p) => {
    if (p >= sheetEnd) return 1;
    const [a, b] = icon3;
    if (p <= a) return 0.9;
    if (p >= b) return 1;
    return 0.9 + 0.1 * ((p - a) / (b - a));
  });

  const iconOpacities = [icon1Opacity, icon2Opacity, icon3Opacity];
  const iconScales = [icon1Scale, icon2Scale, icon3Scale];

  const text1Opacity = useTransform(scrollPin, (p) => fadeOpacity(p, sheetEnd, text1));
  const text1Y = useTransform(scrollPin, (p) => {
    if (p >= sheetEnd) return 0;
    const [a, b] = text1;
    if (p <= a) return 10;
    if (p >= b) return 0;
    return 10 * (1 - (p - a) / (b - a));
  });
  const text2Opacity = useTransform(scrollPin, (p) => fadeOpacity(p, sheetEnd, text2));
  const text2Y = useTransform(scrollPin, (p) => {
    if (p >= sheetEnd) return 0;
    const [a, b] = text2;
    if (p <= a) return 10;
    if (p >= b) return 0;
    return 10 * (1 - (p - a) / (b - a));
  });
  const text3Opacity = useTransform(scrollPin, (p) => fadeOpacity(p, sheetEnd, text3));
  const text3Y = useTransform(scrollPin, (p) => {
    if (p >= sheetEnd) return 0;
    const [a, b] = text3;
    if (p <= a) return 10;
    if (p >= b) return 0;
    return 10 * (1 - (p - a) / (b - a));
  });

  const cardBodyColor = useTransform(scrollPin, (p) =>
    p >= sheetEnd ? "rgb(255, 255, 255)" : "rgba(255, 255, 255, 0.58)",
  );
  const iconStrokeColor = useTransform(scrollPin, (p) =>
    p >= sheetEnd ? "rgb(255, 255, 255)" : "rgba(255, 255, 255, 0.7)",
  );

  const textOpacities = [text1Opacity, text2Opacity, text3Opacity];
  const textYs = [text1Y, text2Y, text3Y];

  return (
    <>
      <section
        ref={sectionRef}
        className="relative w-full"
        style={{ height: `${totalVh}vh` }}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* BrandIntro behind the sheet */}
          <div
            id="about"
            className="absolute inset-0 z-0 flex items-center bg-[#050507] section-padding overflow-hidden"
          >
            <BrandIntroContent />
          </div>

          {/* The sheet */}
          <motion.div
            id="services"
            style={{ y: sheetY }}
            className="absolute bottom-0 left-0 right-0 top-[calc(3.75rem+env(safe-area-inset-top,0px))] z-[1] flex flex-col overflow-hidden rounded-t-2xl bg-[#08090a] text-white shadow-[0_-28px_90px_rgba(0,0,0,0.5)] selection:bg-white/10 md:top-0"
          >
            <div
              className="pointer-events-none absolute inset-0 z-0"
              style={{
                background:
                  "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255,255,255,0.03) 0%, transparent 70%)",
              }}
            />
            <div className="absolute top-0 left-0 right-0 z-30 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

            {/* Service cards inside the sheet */}
            <div className="absolute inset-0 z-20 flex min-h-0 items-start justify-center overflow-y-auto px-5 pb-16 pt-10 md:items-center md:px-10 md:pb-12 md:pt-24">
              <div className="w-full max-w-[1200px] md:mx-auto">
                <div className="mb-8 flex flex-col items-center gap-5 text-center md:mb-14 md:flex-row md:items-start md:justify-between md:gap-6 md:text-left">
                  <div className="w-full md:w-auto">
                    <motion.h2
                      style={{ opacity: headerOpacity, y: headerY }}
                      className="text-[clamp(28px,4vw,48px)] font-medium leading-[1.1] tracking-[-0.04em]"
                    >
                      <span className={sheetPinned ? "text-white" : "gradient-text-subtle"}>
                        Services we
                      </span>
                      <br />
                      <span className={sheetPinned ? "text-white" : "gradient-text"}>
                        deliver.
                      </span>
                    </motion.h2>
                  </div>
                  <motion.p
                    style={{ opacity: subtitleOpacity, y: subtitleY, color: subtitleColor }}
                    className="max-w-md text-[14px] font-normal leading-relaxed tracking-[-0.01em] md:max-w-xs md:text-right"
                  >
                    End-to-end AI solutions designed for businesses that demand the
                    highest standard of quality and performance.
                  </motion.p>
                </div>

                <motion.div
                  className="mx-auto mb-6 h-px w-full max-w-md bg-gradient-to-r from-transparent via-white/[0.06] to-transparent md:mx-0 md:mb-10 md:max-w-none"
                  style={{ opacity: dividerOpacity }}
                />

                <div
                  id="service-cards"
                  className="grid grid-cols-1 gap-4 md:grid-cols-3 md:items-stretch"
                >
                  {SERVICES.map((service, idx) => {
                    const Icon = service.icon;
                    const showVideo = Boolean(service.loopVideo) && !reduceMotion;
                    return (
                      <motion.div
                        key={service.title}
                        id={service.anchorId}
                        className="group relative flex h-full min-h-0 scroll-mt-[calc(5rem+env(safe-area-inset-top))] flex-col overflow-hidden rounded-2xl border border-white/[0.1] bg-[#101014] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] md:scroll-mt-28 md:p-8"
                        style={{
                          opacity: cardOpacities[idx],
                          y: cardYs[idx],
                        }}
                      >
                        <motion.div
                          className={`relative mb-5 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl border md:mb-6 md:aspect-auto md:min-h-[160px] md:flex-1 ${
                            showVideo
                              ? "border-white/[0.1] bg-black"
                              : "border-white/[0.1] bg-[#141418]"
                          }`}
                          style={{
                            opacity: iconOpacities[idx],
                            scale: iconScales[idx],
                          }}
                        >
                          {showVideo && service.loopVideo ? (
                            <ServiceLoopVideo src={service.loopVideo} />
                          ) : (
                            <>
                              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.08),transparent_65%)]" />
                              <motion.div
                                className="relative z-[1] text-current"
                                style={{ color: iconStrokeColor }}
                              >
                                <Icon
                                  className="h-9 w-9 transition-colors duration-300"
                                  strokeWidth={1.25}
                                />
                              </motion.div>
                            </>
                          )}
                        </motion.div>

                        <motion.div
                          style={{
                            opacity: textOpacities[idx],
                            y: textYs[idx],
                          }}
                        >
                          <h3 className="mb-2 text-[16px] font-medium tracking-[-0.02em] text-white md:mb-3">
                            {service.title}
                          </h3>
                          <motion.p
                            className="text-[13px] font-normal leading-relaxed tracking-[-0.01em]"
                            style={{ color: cardBodyColor }}
                          >
                            {service.description}
                          </motion.p>
                          <Link
                            href={service.productHref}
                            className="btn-secondary-sm relative z-[5] mt-4 inline-flex w-fit"
                          >
                            <span>Learn more</span>
                          </Link>
                        </motion.div>

                        <div className="mt-auto pt-5 md:pt-6">
                          <div className="h-px w-0 bg-gradient-to-r from-white/25 to-transparent transition-all duration-500 group-hover:w-full" />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Children flow seamlessly after on the same dark surface */}
      {children && (
        <div className="relative z-[2] bg-[#08090a]">
          {children}
        </div>
      )}
    </>
  );
}
