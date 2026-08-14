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

const LOCALIZED_METADATA: Record<string, { title: string; description: string }> = {
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
  es: {
    title: "NauticCode — Desarrollo de Software B2B",
    description:
      "Diseñamos software personalizado resiliente, flujos de trabajo autónomos de IA e infraestructura en la nube pensados para escalar tu velocidad operativa.",
  },
  it: {
    title: "NauticCode — Sviluppo Software B2B",
    description:
      "Progettiamo software personalizzato resiliente, flussi di lavoro AI autonomi e infrastrutture cloud pensate per scalare la tua velocità operativa.",
  },
  ar: {
    title: "NauticCode — تطوير برمجيات B2B",
    description:
      "نصمم برمجيات مخصصة متينة، وسير عمل ذكاء اصطناعي مستقل، وبنية سحابية مصممة لتوسيع سرعة عملياتك.",
  },
  zh: {
    title: "NauticCode — B2B 软件开发",
    description:
      "我们打造稳健的定制软件、自主 AI 工作流和云基础设施，助力提升您的运营效率。",
  },
};

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  const copy = LOCALIZED_METADATA[params.locale] ?? LOCALIZED_METADATA.en;
  const path = params.locale === "en" ? "/" : `/${params.locale}`;

  return {
    title: { absolute: copy.title },
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        en: "/",
        tr: "/tr",
        es: "/es",
        it: "/it",
        ar: "/ar",
        zh: "/zh",
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
