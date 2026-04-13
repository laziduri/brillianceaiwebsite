export const PRODUCT_SLUGS = ["sales", "marketing", "operations"] as const;
export type ProductSlug = (typeof PRODUCT_SLUGS)[number];

export type ProductPageData = {
  slug: ProductSlug;
  title: string;
  headline: string;
  description: string;
  metaDescription: string;
  videoSrc: string;
  highlights: string[];
};

const WHATSAPP_ROBOT_VIDEO = "/character-videos/whatsapp-robot.mp4";
const AI_MARKETING_VIDEO = "/character-videos/ai-marketing.mp4";
const AI_OPERATIONS_VIDEO = "/character-videos/ai-operation.mp4";

export const PRODUCTS: Record<ProductSlug, ProductPageData> = {
  sales: {
    slug: "sales",
    title: "AI Sales",
    headline: "Turn every channel into a pipeline that never sleeps",
    description:
      "Let AI capture new enquiries from your website, ads, and WhatsApp, respond instantly, follow up consistently, and re-engage old leads and past customers.",
    metaDescription:
      "BrillianceAI AI Sales — capture enquiries from web, ads, and WhatsApp with instant responses and consistent follow-up.",
    videoSrc: WHATSAPP_ROBOT_VIDEO,
    highlights: [
      "Capture leads from web, ads, and WhatsApp in one flow",
      "Instant first responses and structured follow-ups",
      "Re-engage cold leads and past customers automatically",
      "Built around your tone, offers, and escalation rules",
    ],
  },
  marketing: {
    slug: "marketing",
    title: "AI Marketing",
    headline: "Create, schedule, and stay on top of every channel",
    description:
      "Let AI create, schedule, and publish content across your channels while handling incoming enquiries and follow-ups.",
    metaDescription:
      "BrillianceAI AI Marketing — content creation, scheduling, and publishing with enquiry handling in one system.",
    videoSrc: AI_MARKETING_VIDEO,
    highlights: [
      "Draft and adapt content for each channel",
      "Scheduling and publishing workflows you control",
      "Enquiries and DMs triaged alongside campaigns",
      "Consistent brand voice across touchpoints",
    ],
  },
  operations: {
    slug: "operations",
    title: "AI Operations",
    headline: "Automate admin so your team can focus on real work",
    description:
      "Let AI automate admin, handle invoices, process documents, and generate reports. Reduce paperwork and free your team from repetitive work.",
    metaDescription:
      "BrillianceAI AI Operations — invoices, documents, reporting, and admin automation tailored to your business.",
    videoSrc: AI_OPERATIONS_VIDEO,
    highlights: [
      "Document intake, classification, and routing",
      "Invoice and admin workflows with human checkpoints",
      "Reporting generated from your live data",
      "Less manual data entry across tools",
    ],
  },
};

export function isProductSlug(s: string): s is ProductSlug {
  return PRODUCT_SLUGS.includes(s as ProductSlug);
}
