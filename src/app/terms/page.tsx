import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service – BrillianceAI",
  description: "The terms that govern use of BrillianceAI’s website and services.",
  openGraph: {
    title: "Terms of Service – BrillianceAI",
    description: "The terms that govern use of BrillianceAI’s website and services.",
    type: "website",
  },
};

const CONTACT_EMAIL = "info@brilliancetech.ai";

function SectionHeading({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      id={id}
      className="scroll-mt-28 text-[18px] md:text-[20px] font-medium tracking-[-0.03em] text-white"
    >
      {children}
    </h2>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-3 space-y-4 text-[14px] leading-relaxed tracking-[-0.01em] text-white/60">
      {children}
    </div>
  );
}

export default function TermsPage() {
  return (
    <>
      <Header />
      <main
        id="main-content"
        className="min-h-screen bg-[#050507] pt-24 pb-20 md:pt-28"
      >
        <div className="mx-auto max-w-[1100px] px-6 md:px-10">
          <header className="mb-10 md:mb-14">
            <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-white/30">
              Legal
            </p>
            <h1 className="mt-3 text-[clamp(34px,5vw,52px)] font-medium leading-[1.06] tracking-[-0.05em] text-white">
              Terms of Service
            </h1>
            <p className="mt-4 max-w-[70ch] text-[15px] leading-relaxed tracking-[-0.01em] text-white/45">
              These Terms govern your use of our website and any services we
              provide. If you are entering into a separate written agreement
              with BrillianceAI, that agreement will control to the extent of
              any conflict.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-white/25 tracking-[-0.01em]">
              <span>Last updated: 13 April 2026</span>
              <span className="hidden sm:inline">•</span>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-white/40 underline decoration-white/15 underline-offset-2 hover:text-white/65 hover:decoration-white/30"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </header>

          <article className="divide-y divide-white/[0.08]">
            <section className="py-8 first:pt-0">
              <SectionHeading id="use">Use of the website</SectionHeading>
              <Prose>
                <p>
                  You may use our website only in compliance with applicable
                  laws and these Terms. You must not misuse the website, attempt
                  to gain unauthorized access, or interfere with normal
                  operation.
                </p>
              </Prose>
            </section>

            <section className="py-8">
              <SectionHeading id="ip">Intellectual property</SectionHeading>
              <Prose>
                <p>
                  Our website content, branding, and materials are owned by or
                  licensed to BrillianceAI. You may not copy, modify,
                  distribute, or create derivative works except as permitted by
                  law or with our written permission.
                </p>
              </Prose>
            </section>

            <section className="py-8">
              <SectionHeading id="disclaimers">Disclaimers</SectionHeading>
              <Prose>
                <p>
                  The website is provided on an “as is” and “as available”
                  basis. To the fullest extent permitted by law, we disclaim
                  warranties of merchantability, fitness for a particular
                  purpose, and non‑infringement.
                </p>
              </Prose>
            </section>

            <section className="py-8">
              <SectionHeading id="liability">Limitation of liability</SectionHeading>
              <Prose>
                <p>
                  To the fullest extent permitted by law, BrillianceAI will not
                  be liable for any indirect, incidental, special,
                  consequential, or punitive damages, or any loss of profits,
                  revenue, data, or goodwill arising from your use of the
                  website.
                </p>
              </Prose>
            </section>

            <section className="py-8">
              <SectionHeading id="changes">Changes</SectionHeading>
              <Prose>
                <p>
                  We may update these Terms from time to time by posting an
                  updated version on this page. Continued use of the website
                  after changes take effect means you accept the updated Terms.
                </p>
              </Prose>
            </section>

            <section className="py-8 last:pb-0">
              <SectionHeading id="contact">Contact</SectionHeading>
              <Prose>
                <p>
                  Questions about these Terms? Contact us at{" "}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-white/70 underline decoration-white/15 underline-offset-2 hover:text-white hover:decoration-white/30"
                  >
                    {CONTACT_EMAIL}
                  </a>
                  .
                </p>
              </Prose>
            </section>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}

