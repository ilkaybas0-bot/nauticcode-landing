import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MetricsStrip from "@/components/MetricsStrip";
import Capabilities from "@/components/Capabilities";
import TechStack from "@/components/TechStack";
import CaseStudy from "@/components/CaseStudy";
import FooterCTA from "@/components/FooterCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <MetricsStrip />
        <Capabilities />
        <TechStack />
        <CaseStudy />
        <FooterCTA />
      </main>
      <Footer />
    </>
  );
}
