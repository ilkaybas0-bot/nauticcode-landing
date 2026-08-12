import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MetricsStrip from "@/components/MetricsStrip";
import Capabilities from "@/components/Capabilities";
import CaseStudy from "@/components/CaseStudy";
import FooterCTA from "@/components/FooterCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <MetricsStrip />
      <Capabilities />
      <CaseStudy />
      <FooterCTA />
      <Footer />
    </main>
  );
}
