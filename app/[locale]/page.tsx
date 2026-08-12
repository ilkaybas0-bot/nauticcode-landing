import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MetricsStrip from "@/components/MetricsStrip";
import Capabilities from "@/components/Capabilities";
import TechStack from "@/components/TechStack";
import CaseStudy from "@/components/CaseStudy";
import About from "@/components/About";
import FooterCTA from "@/components/FooterCTA";
import Footer from "@/components/Footer";

const LOCALIZED_METADATA = {
  en: {
    title: "NauticCode — B2B Software Development",
    description:
      "We engineer resilient custom software, autonomous AI workflows, and cloud infrastructure designed to scale your operational velocity.",
  },
  tr: {
    title: "NauticCode — B2B Yazılım Geliştirme",
    description:
      "Operasyonel hızınızı ölçeklendirmek için dayanıklı özel yazılımlar, otonom yapay zekâ iş akışları ve bulut altyapısı geliştiriyoruz.",
  },
} as const;

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  const copy =
    params.locale === "tr" ? LOCALIZED_METADATA.tr : LOCALIZED_METADATA.en;

  return {
    title: { absolute: copy.title },
    description: copy.description,
    alternates: {
      canonical: params.locale === "tr" ? "/tr" : "/",
      languages: {
        en: "/",
        tr: "/tr",
      },
    },
  };
}

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
        <About />
        <FooterCTA />
      </main>
      <Footer />
    </>
  );
}
