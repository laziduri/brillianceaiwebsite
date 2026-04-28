import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Talk to sales – BrillianceAI",
  description:
    "Contact sales — request a demo, learn which plan is right for your team, or get onboarding help.",
};

export default function ContactSalesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
