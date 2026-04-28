import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy – BrillianceAI",
  description:
    "Learn how BrillianceAI collects, uses, and protects personal data in accordance with Singapore’s PDPA.",
  openGraph: {
    title: "Privacy Policy – BrillianceAI",
    description:
      "How BrillianceAI collects, uses, and protects personal data (Singapore PDPA).",
    type: "website",
  },
};

const CONTACT_EMAIL = "info@brilliancetech.ai";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "data-we-collect", label: "Personal data we collect" },
  { id: "how-we-collect", label: "How we collect personal data" },
  { id: "how-we-use", label: "How we use personal data" },
  { id: "cookies", label: "Cookies & similar technologies" },
  { id: "disclosure", label: "Disclosure of personal data" },
  { id: "transfers", label: "International transfers" },
  { id: "retention", label: "Retention" },
  { id: "security", label: "Security" },
  { id: "your-rights", label: "Your choices & rights (PDPA)" },
  { id: "third-parties", label: "Third‑party links & services" },
  { id: "children", label: "Children" },
  { id: "updates", label: "Updates to this policy" },
  { id: "contact", label: "Contact us" },
] as const;

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

export default function PrivacyPolicyPage() {
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
              Privacy Policy
            </h1>
            <p className="mt-4 max-w-[70ch] text-[15px] leading-relaxed tracking-[-0.01em] text-white/45">
              This Privacy Policy explains how BrillianceAI Tech (“BrillianceAI”,
              “we”, “us”) collects, uses, discloses, and protects personal data
              in connection with our website, products, and communications. It
              is written for Singapore and is intended to align with the
              Personal Data Protection Act 2012 (“PDPA”).
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

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[260px,1fr] lg:gap-16">
            <aside className="lg:self-start">
              <div className="border-l border-white/[0.07] pl-4">
                <p className="pb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-white/25">
                  On this page
                </p>
                <nav aria-label="Privacy policy sections" className="flex flex-col">
                  {SECTIONS.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className="py-2 text-[13px] tracking-[-0.01em] text-white/40 hover:text-white/75 transition-colors"
                    >
                      {s.label}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            <article className="divide-y divide-white/[0.08]">
              <section className="py-8 first:pt-0">
                <SectionHeading id="overview">Overview</SectionHeading>
                <Prose>
                  <p>
                    “Personal data” means data about an individual who can be
                    identified from that data, or from that data and other
                    information we have or are likely to have access to.
                  </p>
                  <p>
                    This Policy covers personal data we handle when you visit
                    our website, contact us, request a demo, subscribe to
                    updates, create an account, make a purchase, or otherwise
                    interact with our services.
                  </p>
                  <p>
                    If you use BrillianceAI through an organization (for
                    example, your employer), that organization may control
                    certain aspects of your use of the services and may have its
                    own policies that also apply.
                  </p>
                </Prose>
              </section>

              <section className="py-8">
                <SectionHeading id="data-we-collect">
                  Personal data we collect
                </SectionHeading>
                <Prose>
                  <p>
                    We may collect the following categories of personal data
                    (depending on how you interact with us):
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <span className="text-white/75">Contact details</span>{" "}
                      such as your name, work email address, phone number, and
                      company.
                    </li>
                    <li>
                      <span className="text-white/75">Account data</span> such
                      as login credentials (or authentication tokens),
                      organization/workspace identifiers, and profile settings.
                    </li>
                    <li>
                      <span className="text-white/75">Communications</span>{" "}
                      such as messages you send, meeting notes, and feedback.
                    </li>
                    <li>
                      <span className="text-white/75">Transaction data</span>{" "}
                      such as plan selection, billing contact details, and
                      payment status.{" "}
                      <span className="text-white/75">
                        We do not store full payment card numbers
                      </span>
                      ; card processing is handled by our payment processor
                      (e.g., Stripe).
                    </li>
                    <li>
                      <span className="text-white/75">Usage data</span> such as
                      pages viewed, referring URLs, approximate location (based
                      on IP), and device/browser information.
                    </li>
                    <li>
                      <span className="text-white/75">Marketing preferences</span>{" "}
                      such as your subscription status and opt‑out choices.
                    </li>
                  </ul>
                  <p>
                    If you provide personal data about others (for example, a
                    teammate), you confirm you have their authorization to do
                    so.
                  </p>
                </Prose>
              </section>

              <section className="py-8">
                <SectionHeading id="how-we-collect">
                  How we collect personal data
                </SectionHeading>
                <Prose>
                  <p>We collect personal data from:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <span className="text-white/75">You</span>, when you fill
                      in forms, subscribe to updates, create an account, or
                      communicate with us.
                    </li>
                    <li>
                      <span className="text-white/75">
                        Your device and browser
                      </span>
                      , when you visit our website or use our services (for
                      example, via cookies, analytics, and server logs).
                    </li>
                    <li>
                      <span className="text-white/75">Third parties</span>, when
                      needed to provide services (for example, payment
                      confirmation from Stripe) or to measure marketing
                      performance (for example, conversion data from advertising
                      platforms such as Google).
                    </li>
                  </ul>
                  <p>
                    Where you choose to connect third‑party services to your
                    account, we may receive information from those services as
                    permitted by your settings and their policies.
                  </p>
                </Prose>
              </section>

              <section className="py-8">
                <SectionHeading id="how-we-use">How we use personal data</SectionHeading>
                <Prose>
                  <p>We may use personal data for purposes including:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <span className="text-white/75">Providing services</span>{" "}
                      and responding to enquiries, demo requests, and support
                      questions.
                    </li>
                    <li>
                      <span className="text-white/75">Operations</span> such as
                      administering accounts, authenticating users, processing
                      payments, improving our website/services, and maintaining
                      security.
                    </li>
                    <li>
                      <span className="text-white/75">Marketing</span> such as
                      sending product updates or event invitations (where
                      permitted). You can opt out at any time.
                    </li>
                    <li>
                      <span className="text-white/75">Analytics</span> such as
                      understanding how visitors use the website and measuring
                      the effectiveness of campaigns (for example, Google Ads
                      conversion tracking).
                    </li>
                    <li>
                      <span className="text-white/75">Compliance</span> with
                      legal obligations, resolving disputes, and enforcing our
                      terms.
                    </li>
                  </ul>
                  <p>
                    Under the PDPA, we generally collect, use, and disclose
                    personal data with your consent (which may be express or
                    deemed in some contexts). Depending on the circumstances,
                    we may also rely on PDPA exceptions that permit collection,
                    use or disclosure without consent, such as where necessary
                    for certain business improvement purposes or to respond to
                    emergencies, subject to PDPA requirements.
                  </p>
                </Prose>
              </section>

              <section className="py-8">
                <SectionHeading id="cookies">
                  Cookies &amp; similar technologies
                </SectionHeading>
                <Prose>
                  <p>
                    We may use cookies and similar technologies to remember
                    preferences, understand website performance, and improve
                    user experience. Cookies are small text files stored on
                    your device.
                  </p>
                  <p>
                    We may also use cookies or similar technologies for{" "}
                    <span className="text-white/75">analytics</span> and{" "}
                    <span className="text-white/75">advertising measurement</span>{" "}
                    (for example, Google Ads conversion tracking) to help us
                    understand whether our marketing leads to signups or
                    purchases. These tools may set or read cookies and may
                    collect device identifiers and event data.
                  </p>
                  <p>
                    You can control cookies through your browser settings. If
                    you disable cookies, parts of the site may not function as
                    intended.
                  </p>
                </Prose>
              </section>

              <section className="py-8">
                <SectionHeading id="disclosure">
                  Disclosure of personal data
                </SectionHeading>
                <Prose>
                  <p>
                    We may disclose personal data to the following types of
                    recipients, where necessary for the purposes described
                    above:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <span className="text-white/75">Service providers</span>{" "}
                      who help us operate our business (for example, hosting,
                      analytics, communications, CRM, security, and payment
                      processing such as Stripe).
                    </li>
                    <li>
                      <span className="text-white/75">
                        Advertising and measurement partners
                      </span>{" "}
                      (for example, Google) where you interact with our ads or
                      where we measure campaign performance.
                    </li>
                    <li>
                      <span className="text-white/75">Professional advisers</span>{" "}
                      such as lawyers, auditors, and consultants.
                    </li>
                    <li>
                      <span className="text-white/75">Authorities</span> where
                      required by law or a lawful request.
                    </li>
                  </ul>
                  <p>
                    When we share personal data with service providers, we take
                    reasonable steps to require them to protect it and use it
                    only for specified purposes.
                  </p>
                  <p>
                    We may also disclose personal data as part of a corporate
                    transaction (for example, a merger, acquisition, or sale of
                    assets). If such a transaction occurs, we will take
                    reasonable steps to ensure continued protection of personal
                    data.
                  </p>
                </Prose>
              </section>

              <section className="py-8">
                <SectionHeading id="transfers">International transfers</SectionHeading>
                <Prose>
                  <p>
                    Some of our service providers may be located outside
                    Singapore. Where we transfer personal data outside
                    Singapore, we will take steps to ensure the recipient
                    provides a standard of protection that is comparable to
                    that under the PDPA (for example, through contractual
                    safeguards and appropriate due diligence).
                  </p>
                  <p>
                    Our services may use global infrastructure (such as content
                    delivery networks). This can involve processing in multiple
                    jurisdictions, even when our primary operations are based
                    in Singapore.
                  </p>
                </Prose>
              </section>

              <section className="py-8">
                <SectionHeading id="retention">Retention</SectionHeading>
                <Prose>
                  <p>
                    We retain personal data for as long as it is reasonably
                    necessary to fulfill the purposes for which it was
                    collected, or as required or permitted by applicable laws.
                    When personal data is no longer needed, we will take
                    reasonable steps to delete it or anonymize it.
                  </p>
                  <p>
                    Retention periods vary depending on the type of data. For
                    example, we may keep billing records for longer where needed
                    for accounting, audit, or tax purposes, and we may retain
                    security logs for a limited period to help detect and
                    prevent fraud or abuse.
                  </p>
                </Prose>
              </section>

              <section className="py-8">
                <SectionHeading id="security">Security</SectionHeading>
                <Prose>
                  <p>
                    We implement reasonable security arrangements to protect
                    personal data in our possession or under our control from
                    unauthorized access, collection, use, disclosure, copying,
                    modification, disposal, or similar risks. However, no
                    method of transmission over the internet or method of
                    storage is completely secure.
                  </p>
                  <p>
                    We restrict access to personal data on a need‑to‑know basis
                    and use appropriate technical and organizational measures
                    (such as encryption in transit where supported, access
                    controls, and monitoring).
                  </p>
                </Prose>
              </section>

              <section className="py-8">
                <SectionHeading id="your-rights">
                  Your choices &amp; rights (PDPA)
                </SectionHeading>
                <Prose>
                  <p>
                    Subject to the PDPA and applicable exceptions, you may have
                    the right to:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <span className="text-white/75">Access</span> personal
                      data we hold about you and information about how it has
                      been used or disclosed.
                    </li>
                    <li>
                      <span className="text-white/75">Correct</span> inaccurate
                      or incomplete personal data.
                    </li>
                    <li>
                      <span className="text-white/75">Withdraw consent</span>{" "}
                      for our collection, use, or disclosure of your personal
                      data (where we rely on consent).
                    </li>
                    <li>
                      <span className="text-white/75">Opt out</span> of
                      marketing communications.
                    </li>
                  </ul>
                  <p>
                    If you withdraw consent, we will inform you of the likely
                    consequences (for example, we may not be able to provide
                    certain services). Withdrawal does not affect our ability
                    to rely on PDPA exceptions or other lawful bases under
                    Singapore law where applicable.
                  </p>
                  <p>
                    To submit a request, contact us at{" "}
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="text-white/70 underline decoration-white/15 underline-offset-2 hover:text-white hover:decoration-white/30"
                    >
                      {CONTACT_EMAIL}
                    </a>
                    . We may need to verify your identity before processing
                    your request.
                  </p>
                </Prose>
              </section>

              <section className="py-8">
                <SectionHeading id="third-parties">
                  Third‑party links &amp; services
                </SectionHeading>
                <Prose>
                  <p>
                    Our website may contain links to third‑party websites or
                    services. We are not responsible for the privacy practices
                    of third parties, and we encourage you to review their
                    privacy policies.
                  </p>
                  <p>
                    If you choose to use third‑party payment, analytics, or
                    advertising tools, your interactions may be governed by
                    those third parties’ terms and privacy policies.
                  </p>
                </Prose>
              </section>

              <section className="py-8">
                <SectionHeading id="children">Children</SectionHeading>
                <Prose>
                  <p>
                    Our website and services are not directed to children, and
                    we do not knowingly collect personal data from children. If
                    you believe a child has provided personal data to us,
                    please contact us so we can take appropriate steps.
                  </p>
                </Prose>
              </section>

              <section className="py-8">
                <SectionHeading id="updates">Updates to this policy</SectionHeading>
                <Prose>
                  <p>
                    We may update this Policy from time to time. The “Last
                    updated” date at the top indicates when the latest changes
                    took effect. Material changes will be posted on this page.
                  </p>
                </Prose>
              </section>

              <section className="py-8 last:pb-0">
                <SectionHeading id="contact">Contact us</SectionHeading>
                <Prose>
                  <p>
                    If you have questions about this Policy or how we handle
                    personal data, contact our Data Protection contact at{" "}
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
        </div>
      </main>
      <Footer />
    </>
  );
}

