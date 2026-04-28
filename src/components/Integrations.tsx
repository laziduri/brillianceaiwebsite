"use client";

import { useCallback, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ── integration logos ──
   Stored locally under `public/integrations/{slug}.svg` to avoid relying on
   third-party CDNs (which can be blocked and render as broken images).
*/
type Integration = { name: string; slug: string; color?: string; domain?: string };

const ROW_1: Integration[] = [
  { name: "Slack", slug: "slack", color: "4A154B", domain: "slack.com" },
  { name: "Zapier", slug: "zapier", color: "FF4A00", domain: "zapier.com" },
  { name: "Make", slug: "make", color: "6D00CC", domain: "make.com" },
  { name: "HubSpot", slug: "hubspot", color: "FF7A59", domain: "hubspot.com" },
  { name: "Notion", slug: "notion", color: "FFFFFF", domain: "notion.so" },
  {
    name: "Google Sheets",
    slug: "googlesheets",
    color: "34A853",
    domain: "google.com",
  },
  { name: "OpenAI", slug: "openai", color: "10A37F", domain: "openai.com" },
  { name: "WhatsApp", slug: "whatsapp", color: "25D366", domain: "whatsapp.com" },
  { name: "Gmail", slug: "gmail", color: "EA4335", domain: "google.com" },
  { name: "Airtable", slug: "airtable", color: "18BFFF", domain: "airtable.com" },
  {
    name: "Salesforce",
    slug: "salesforce",
    color: "00A1E0",
    domain: "salesforce.com",
  },
  { name: "Stripe", slug: "stripe", color: "635BFF", domain: "stripe.com" },
];

const ROW_2: Integration[] = [
  {
    name: "Microsoft Teams",
    slug: "microsoftteams",
    color: "6264A7",
    domain: "microsoft.com",
  },
  {
    name: "Google Drive",
    slug: "googledrive",
    color: "4285F4",
    domain: "google.com",
  },
  { name: "Shopify", slug: "shopify", color: "7AB55C", domain: "shopify.com" },
  {
    name: "Mailchimp",
    slug: "mailchimp",
    color: "FFE01B",
    domain: "mailchimp.com",
  },
  { name: "Twilio", slug: "twilio", color: "F22F46", domain: "twilio.com" },
  { name: "Telegram", slug: "telegram", color: "26A5E4", domain: "telegram.org" },
  {
    name: "Instagram",
    slug: "instagram",
    color: "E4405F",
    domain: "instagram.com",
  },
  { name: "Facebook", slug: "facebook", color: "0866FF", domain: "facebook.com" },
  { name: "TikTok", slug: "tiktok", color: "FFFFFF", domain: "tiktok.com" },
  { name: "LinkedIn", slug: "linkedin", color: "0A66C2", domain: "linkedin.com" },
  {
    name: "Google Analytics",
    slug: "googleanalytics",
    color: "E37400",
    domain: "google.com",
  },
  { name: "Calendly", slug: "calendly", color: "006BFF", domain: "calendly.com" },
];

function logoUrl(slug: string): string {
  return `/integrations/${slug}.svg`;
}

function externalLogoUrl(domain: string): string {
  // Clearbit returns multi-color, brand-official style logos for most domains.
  return `https://logo.clearbit.com/${domain}?size=128`;
}

function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace("#", "");
  if (clean.length !== 6) return `rgba(255,255,255,${alpha})`;
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

/** Single icon tile — fixed 90×90 box with centered 36×36 icon */
function IntegrationIcon({
  item,
  showExternal,
  markExternalBroken,
}: {
  item: Integration;
  showExternal: boolean;
  markExternalBroken: (slug: string) => void;
}) {
  const brandHex = item.color ? `#${item.color}` : "#FFFFFF";

  return (
    <div
      className="group shrink-0"
      style={{ width: 90, height: 90 }}
      title={item.name}
    >
      <div
        style={{
          width: 90,
          height: 90,
          borderRadius: 18,
          border: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(255,255,255,0.04)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "border-color 0.3s, background 0.3s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
          e.currentTarget.style.background = "rgba(255,255,255,0.08)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
          e.currentTarget.style.background = "rgba(255,255,255,0.04)";
        }}
      >
        {showExternal && item.domain ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={externalLogoUrl(item.domain)}
            alt={item.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => markExternalBroken(item.slug)}
            style={{
              width: 40,
              height: 40,
              opacity: 0.95,
              objectFit: "contain",
              filter: "drop-shadow(0 0 10px rgba(0,0,0,0.35))",
            }}
          />
        ) : (
          <span
            aria-hidden
            style={{
              width: 36,
              height: 36,
              backgroundColor: brandHex,
              opacity: 0.92,
              WebkitMaskImage: `url(${logoUrl(item.slug)})`,
              maskImage: `url(${logoUrl(item.slug)})`,
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskPosition: "center",
              maskPosition: "center",
              filter: `drop-shadow(0 0 10px ${hexToRgba(brandHex, 0.18)})`,
            }}
          />
        )}
      </div>
    </div>
  );
}

function MarqueeRow({
  items,
  direction = "left",
  duration = 40,
  showExternal,
  isExternalBroken,
  markExternalBroken,
}: {
  items: Integration[];
  direction?: "left" | "right";
  duration?: number;
  showExternal: boolean;
  isExternalBroken: (slug: string) => boolean;
  markExternalBroken: (slug: string) => void;
}) {
  const doubled = [...items, ...items];

  return (
    <div className="relative w-full overflow-hidden" style={{ height: 100 }}>
      {/* fade edges */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10"
        style={{
          width: 120,
          background:
            "linear-gradient(to right, #050507 0%, transparent 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10"
        style={{
          width: 120,
          background:
            "linear-gradient(to left, #050507 0%, transparent 100%)",
        }}
      />

      <div
        className="integration-marquee-track"
        style={{
          display: "flex",
          gap: 20,
          width: "max-content",
          animation: `marquee-${direction} ${duration}s linear infinite`,
          padding: "5px 0",
        }}
      >
        {doubled.map((item, i) => (
          <IntegrationIcon
            key={`${item.slug}-${i}`}
            item={item}
            showExternal={showExternal && !isExternalBroken(item.slug)}
            markExternalBroken={markExternalBroken}
          />
        ))}
      </div>
    </div>
  );
}

export default function Integrations() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [externalBroken, setExternalBroken] = useState<Record<string, boolean>>(
    {},
  );

  const showExternal = true;
  const isExternalBroken = useCallback(
    (slug: string) => Boolean(externalBroken[slug]),
    [externalBroken],
  );
  const markExternalBroken = useCallback((slug: string) => {
    setExternalBroken((prev) => (prev[slug] ? prev : { ...prev, [slug]: true }));
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      <div className="mx-auto max-w-[1200px] text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-5 block text-[12px] font-medium uppercase tracking-[0.15em] text-white/25"
        >
          Integrations
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto mb-5 text-[clamp(28px,4vw,48px)] font-medium leading-[1.1] tracking-[-0.04em] gradient-text-subtle"
        >
          Built to Fit Your Business
          <br />
          Not Work Around Them
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mb-14 max-w-md text-[14px] font-normal leading-relaxed tracking-[-0.01em] text-white/25 md:mb-16"
        >
          Connect AI to the Tools You Already Use
        </motion.p>

        {/* Logo marquee rows */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ display: "flex", flexDirection: "column", gap: 20 }}
        >
          <MarqueeRow
            items={ROW_1}
            direction="left"
            duration={45}
            showExternal={showExternal}
            isExternalBroken={isExternalBroken}
            markExternalBroken={markExternalBroken}
          />
          <MarqueeRow
            items={ROW_2}
            direction="right"
            duration={50}
            showExternal={showExternal}
            isExternalBroken={isExternalBroken}
            markExternalBroken={markExternalBroken}
          />
        </motion.div>
      </div>
    </section>
  );
}
