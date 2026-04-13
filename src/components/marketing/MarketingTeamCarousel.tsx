"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useInView,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  marketingTeamRoles,
  type MarketingTeamRole,
} from "@/data/marketing-landing";

/* ── constants ── */
const N = marketingTeamRoles.length; // 5
const RING_HALF = Math.floor(N / 2);
const SWIPE_THRESHOLD_PX = 52;
const MD_MIN_WIDTH = 768;
const EASE = [0.22, 1, 0.36, 1] as const;

/* ── discrete slot config ── */
type SlotConfig = {
  x: number;
  y: number;
  scale: number;
  opacity: number;
  z: number;
};

function getSlotConfig(offset: number, containerW: number): SlotConfig {
  const abs = Math.abs(offset);
  const sign = Math.sign(offset) || 1;

  if (abs === 0) {
    return { x: 0, y: 0, scale: 1.0, opacity: 1, z: 20 };
  }
  if (abs === 1) {
    return {
      x: sign * containerW * 0.32,
      y: -containerW * 0.06,
      scale: 0.52,
      opacity: 0.6,
      z: 12,
    };
  }
  // abs === 2
  return {
    x: sign * containerW * 0.5,
    y: -containerW * 0.12,
    scale: 0.38,
    opacity: 0.3,
    z: 8,
  };
}

/* ── responsive container width ── */
function useContainerWidth(): number {
  const [w, setW] = useState(440);

  useEffect(() => {
    const update = () => {
      const wide = window.innerWidth >= MD_MIN_WIDTH;
      setW(
        wide
          ? Math.min(580, Math.max(400, window.innerWidth * 0.36))
          : Math.min(340, window.innerWidth * 0.85),
      );
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return w;
}

/* ── media-query hook ── */
function subscribeMdMq(cb: () => void) {
  const mq = window.matchMedia(`(min-width: ${MD_MIN_WIDTH}px)`);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
function getMdMqSnapshot() {
  return window.matchMedia(`(min-width: ${MD_MIN_WIDTH}px)`).matches;
}

/* ── character image ── */
function RoleImage({
  role,
  failed,
  onError,
}: {
  role: MarketingTeamRole;
  failed: boolean;
  onError: () => void;
}) {
  if (failed) {
    return (
      <div
        className="flex h-full w-full flex-col items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03]"
        aria-hidden
      >
        <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-white/35 md:text-[12px]">
          {role.shortLabel.replace(/^AI\s+/i, "").slice(0, 2)}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={role.imageSrc}
      alt=""
      width={420}
      height={540}
      className="h-full w-full object-contain object-bottom drop-shadow-2xl"
      onError={onError}
      priority
    />
  );
}

/* ── main carousel ── */
export default function MarketingTeamCarousel() {
  const reduceMotion = useReducedMotion();
  const containerW = useContainerWidth();
  const isDesktop = useSyncExternalStore(
    subscribeMdMq,
    getMdMqSnapshot,
    () => false,
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [broken, setBroken] = useState<Record<string, boolean>>({});
  const sectionRef = useRef<HTMLElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const active = marketingTeamRoles[activeIndex]!;

  /* slot size — active character takes this full size, others scale down */
  const slotSize = isDesktop
    ? Math.min(360, Math.max(260, containerW * 0.7))
    : Math.min(260, containerW * 0.7);

  const markBroken = useCallback((id: string) => {
    setBroken((b) => ({ ...b, [id]: true }));
  }, []);

  const go = useCallback((dir: -1 | 1) => {
    setActiveIndex((i) => (i + dir + N) % N);
  }, []);

  const onCharacterClick = useCallback(
    (i: number) => {
      setActiveIndex(i);
    },
    [],
  );

  /* keyboard nav */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (!el.contains(document.activeElement as Node)) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  /* touch swiping */
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const t = e.touches[0];
    if (!t) return;
    touchStart.current = { x: t.clientX, y: t.clientY };
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const start = touchStart.current;
      const t = e.changedTouches[0];
      touchStart.current = null;
      if (!start || !t) return;
      const dx = t.clientX - start.x;
      const dy = t.clientY - start.y;
      if (Math.abs(dy) >= Math.abs(dx)) return;
      if (Math.abs(dx) < SWIPE_THRESHOLD_PX) return;
      if (dx < 0) go(1);
      else go(-1);
    },
    [go],
  );

  const transition = reduceMotion
    ? { duration: 0 }
    : { type: "tween" as const, duration: 0.55, ease: EASE };

  return (
    <section
      ref={sectionRef}
      id="marketing-team"
      className="scroll-mt-28 border-t border-white/[0.06] py-20 md:scroll-mt-32 md:py-28"
      aria-labelledby="marketing-team-heading"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        {/* heading */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-3 text-center text-[12px] font-medium uppercase tracking-[0.14em] text-white/35"
        >
          Your AI team
        </motion.p>
        <motion.h2
          id="marketing-team-heading"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
          className="mx-auto mb-14 max-w-[820px] text-center text-[clamp(22px,3vw,34px)] font-medium leading-[1.12] tracking-[-0.03em] gradient-text-subtle md:mb-18"
        >
          Five specialists. One workflow.
        </motion.h2>

        {/* two-column layout */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          {/* LEFT — description panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
            className="glass-card rounded-2xl border border-white/[0.06] p-8 md:p-10"
            aria-live="polite"
            aria-atomic="true"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <p className="mb-2 text-[12px] font-medium uppercase tracking-[0.12em] text-white/35">
                  {active.title}
                </p>
                <h3 className="text-[clamp(20px,2.4vw,28px)] font-medium leading-snug tracking-[-0.03em] text-white/90">
                  {active.sectionHeadline}
                </h3>
                <ul className="mt-6 space-y-4 border-t border-white/[0.06] pt-6">
                  {active.bullets.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-[15px] leading-relaxed tracking-[-0.01em] text-white/75 md:text-[16px]"
                    >
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/50"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* RIGHT — carousel stage */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            className="flex w-full flex-col items-center"
          >
            {/* character stage */}
            <div
              className="relative mx-auto w-full overflow-visible"
              style={{
                maxWidth: containerW + slotSize * 0.4,
                height: isDesktop
                  ? Math.max(420, slotSize * 1.25)
                  : Math.max(320, slotSize * 1.15),
              }}
            >
              <div
                className="relative h-full w-full touch-pan-y overflow-visible outline-none focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050507]"
                role="group"
                aria-label="Marketing AI characters"
                tabIndex={0}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
              >
                {marketingTeamRoles.map((role, i) => {
                  const offset =
                    ((i - activeIndex + N + RING_HALF) % N) - RING_HALF;
                  const isActive = offset === 0;
                  const slot = getSlotConfig(offset, containerW);

                  return (
                    <motion.button
                      key={role.id}
                      type="button"
                      aria-label={`Show ${role.shortLabel}`}
                      aria-current={isActive ? "true" : undefined}
                      className="absolute cursor-pointer appearance-none overflow-visible border-none bg-transparent p-0 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/40"
                      style={{
                        left: `calc(50% - ${slotSize / 2}px)`,
                        bottom: "0%",
                        width: slotSize,
                        height: slotSize * 1.28,
                      }}
                      initial={false}
                      animate={{
                        x: slot.x,
                        y: slot.y,
                        scale: slot.scale,
                        opacity: slot.opacity,
                        zIndex: slot.z,
                      }}
                      transition={transition}
                      onClick={() => onCharacterClick(i)}
                    >
                      {/* glow under active character */}
                      <motion.div
                        className="pointer-events-none absolute -inset-6 -z-10 rounded-full"
                        style={{
                          background:
                            "radial-gradient(ellipse at 50% 80%, rgba(255,255,255,0.12) 0%, transparent 70%)",
                          filter: "blur(24px)",
                        }}
                        initial={false}
                        animate={{ opacity: isActive ? 1 : 0 }}
                        transition={{
                          duration: 0.5,
                          ease: EASE,
                        }}
                      />
                      <div className="pointer-events-none h-full w-full select-none">
                        <RoleImage
                          role={role}
                          failed={Boolean(broken[role.id])}
                          onError={() => markBroken(role.id)}
                        />
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* helper text */}
            <p className="mt-4 text-center text-[13px] text-white/25 md:hidden">
              Swipe to change specialist
            </p>
            <p className="mt-4 hidden text-center text-[13px] text-white/25 md:block">
              Click a character to explore
            </p>

            {/* arrows */}
            <div className="mt-4 flex justify-center gap-2 md:mt-5">
              <button
                type="button"
                onClick={() => go(-1)}
                className="rounded-lg border border-white/[0.08] bg-white/[0.04] p-2.5 text-white/50 transition-colors hover:border-white/[0.12] hover:text-white/80"
                aria-label="Previous team member"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={1.75} />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="rounded-lg border border-white/[0.08] bg-white/[0.04] p-2.5 text-white/50 transition-colors hover:border-white/[0.12] hover:text-white/80"
                aria-label="Next team member"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={1.75} />
              </button>
            </div>

            {/* pills */}
            <div className="mt-6 flex flex-wrap justify-center gap-2 md:mt-8">
              {marketingTeamRoles.map((role, i) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className={`rounded-full border px-3.5 py-1.5 text-[11px] font-medium tracking-[-0.01em] transition-all duration-300 ${
                    i === activeIndex
                      ? "border-white/20 bg-white/[0.1] text-white/90 shadow-[0_0_12px_rgba(255,255,255,0.06)]"
                      : "border-white/[0.06] bg-transparent text-white/35 hover:border-white/12 hover:text-white/60"
                  }`}
                >
                  {role.shortLabel}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
