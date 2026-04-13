import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SalesContactForm } from "./SalesContactForm";

const SALES_EMAIL = "sales@brilliancetech.ai";

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
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:text-[#08090a]"
      >
        Skip to content →
      </a>
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
          </div>

          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <nav aria-label="Sales options" className="flex flex-col">
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
