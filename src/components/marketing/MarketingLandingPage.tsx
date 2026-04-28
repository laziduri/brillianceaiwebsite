import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MarketingHero from "@/components/marketing/MarketingHero";
import MarketingTeamCarousel from "@/components/marketing/MarketingTeamCarousel";
import MarketingHowItWorks from "@/components/marketing/MarketingHowItWorks";
import MarketingProblem from "@/components/marketing/MarketingProblem";
import MarketingRevealStatement from "@/components/marketing/MarketingRevealStatement";
import MarketingSolution from "@/components/marketing/MarketingSolution";
import MarketingStats from "@/components/marketing/MarketingStats";
import MarketingClosingCta from "@/components/marketing/MarketingClosingCta";

export default function MarketingLandingPage() {
  return (
    <>
      <Header />
      <main
        id="main-content"
        className="relative min-h-screen w-full bg-[#050507] pb-12 pt-24 md:pt-28"
      >
        <MarketingHero />
        <MarketingTeamCarousel />
        <MarketingHowItWorks />
        <MarketingProblem />
        <MarketingRevealStatement />
        <MarketingSolution />
        <MarketingStats />
        <MarketingClosingCta />
      </main>
      <Footer />
    </>
  );
}
