import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SalesContactForm } from "./SalesContactForm";

const SALES_EMAIL = "info@brilliancetech.ai";
const WHATSAPP_NUMBER_DISPLAY = "+65 8038 7071";
const WHATSAPP_NUMBER_RAW = "6580387071";
const WHATSAPP_PRESET =
  "Hi BrillianceAI, I'd like a free consultation about agentic AI for my business.";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER_RAW}?text=${encodeURIComponent(
  WHATSAPP_PRESET,
)}`;

const MAIL = {
  demo: `mailto:${SALES_EMAIL}?subject=${encodeURIComponent("Demo request")}`,
  plan: `mailto:${SALES_EMAIL}?subject=${encodeURIComponent("Plan question")}`,
  onboarding: `mailto:${SALES_EMAIL}?subject=${encodeURIComponent("Onboarding help")}`,
  support: `mailto:${SALES_EMAIL}?subject=${encodeURIComponent("Support")}`,
} as const;

function SalesRow({ href, title }: { href: string; title: string }) {
  return (
    <a
      href={href}
      className="group flex items-center justify-between gap-4 border-b border-white/[0.06] py-5 first:pt-0 transition-colors hover:border-white/[0.1]"
    >
      <span className="text-[15px] font-normal text-white/80 tracking-[-0.02em] group-hover:text-white">
        {title}
      </span>
      <ChevronRight
        className="h-4 w-4 shrink-0 text-white/25 transition-transform group-hover:translate-x-0.5 group-hover:text-white/45"
        aria-hidden
      />
    </a>
  );
}

export default function ContactSalesPage() {
  return (
    <>
      <Header />
      <main
        id="main-content"
        className="min-h-screen bg-[#050507] pt-24 pb-20 md:pt-28"
      >
        <div className="mx-auto max-w-[1100px] px-6 md:px-10">
          <div className="mb-12 md:mb-16">
            <h1 className="text-[clamp(32px,5vw,48px)] font-medium leading-[1.08] tracking-[-0.04em] text-white">
              Contact sales
            </h1>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/55 tracking-[-0.01em] md:text-[16px]">
              Tell us about the workflow you want to automate. We&apos;ll reply
              within one business day — or chat with us on WhatsApp now for an
              instant response.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              {/* WhatsApp — fastest path */}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-xl border border-white/[0.08] bg-gradient-to-br from-emerald-400/[0.04] to-white/[0.005] p-5 transition-colors hover:border-[var(--gold-line)] md:p-6"
              >
                <div className="flex items-start gap-4">
                  <span
                    className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white"
                    aria-hidden
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="currentColor"
                    >
                      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.057zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-white/40">
                      WhatsApp · fastest
                    </p>
                    <p className="mt-1.5 text-[15px] font-medium tracking-[-0.02em] text-white">
                      {WHATSAPP_NUMBER_DISPLAY}
                    </p>
                    <p className="mt-1 text-[13px] leading-relaxed text-white/45">
                      Tap to start a chat — typical reply within minutes during
                      Singapore business hours.
                    </p>
                  </div>
                  <ChevronRight
                    className="h-4 w-4 shrink-0 text-white/25 transition-transform group-hover:translate-x-0.5 group-hover:text-white/60"
                    aria-hidden
                  />
                </div>
              </a>

              <nav aria-label="Sales options" className="mt-8 flex flex-col">
                <SalesRow href={MAIL.demo} title="Request a demo" />
                <SalesRow
                  href={MAIL.plan}
                  title="Learn which plan is right for your team"
                />
                <SalesRow href={MAIL.onboarding} title="Get onboarding help" />
              </nav>
              <p className="mt-8 text-[14px] leading-relaxed text-white/35 tracking-[-0.01em]">
                Technical issues or product questions?{" "}
                <a
                  href={MAIL.support}
                  className="text-white/60 underline decoration-white/20 underline-offset-2 hover:text-white/85 hover:decoration-white/35"
                >
                  Contact support
                </a>
              </p>
              <p className="mt-6 text-[13px] text-white/25 tracking-[-0.01em]">
                <a
                  href={`mailto:${SALES_EMAIL}`}
                  className="text-white/45 hover:text-white/65"
                >
                  {SALES_EMAIL}
                </a>
              </p>
            </div>

            <div className="lg:pt-1">
              <SalesContactForm />
            </div>
          </div>

          <p className="mt-20 text-center text-[13px] text-white/25 tracking-[-0.01em]">
            <Link
              href="/"
              className="text-white/40 hover:text-white/60 transition-colors"
            >
              ← Back to home
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
