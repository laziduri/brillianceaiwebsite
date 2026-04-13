import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "BrillianceAI — Build a Business That Runs Without You",
  description:
    "We turn your operations into intelligent AI workflows that work 24/7. Book a free consultation today.",
  keywords: ["AI workflows", "automation", "business intelligence", "AI consulting"],
  openGraph: {
    title: "BrillianceAI — Build a Business That Runs Without You",
    description: "We turn your operations into intelligent AI workflows that work 24/7.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} noise-overlay`}>
        {children}
      </body>
    </html>
  );
}
