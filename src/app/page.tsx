import Header from "@/components/Header";
import Hero from "@/components/Hero";
import RevealStatement from "@/components/RevealStatement";
import Services from "@/components/Services";
import Integrations from "@/components/Integrations";
import Trust from "@/components/Trust";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative z-0 w-full bg-[#050507]">
        <Hero />
        <RevealStatement />
        <Services>
          <Integrations />
          <Trust />
          <CallToAction />
        </Services>
      </main>
      <Footer />
    </>
  );
}
