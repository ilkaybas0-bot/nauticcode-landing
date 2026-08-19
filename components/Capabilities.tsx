"use client";

import { motion } from "framer-motion";
import { Bot, Boxes, Workflow, Cloud, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

type Capability = {
  icon: LucideIcon;
  titleKey: "card1Title" | "card2Title" | "card3Title" | "card4Title";
  descriptionKey:
    | "card1Description"
    | "card2Description"
    | "card3Description"
    | "card4Description";
  tags: string[];
};

const CAPABILITIES: Capability[] = [
  {
    icon: Bot,
    titleKey: "card1Title",
    descriptionKey: "card1Description",
    tags: ["LLM Orchestration", "Vector DBs", "RAG"],
  },
  {
    icon: Boxes,
    titleKey: "card2Title",
    descriptionKey: "card2Description",
    tags: ["Rust", "Go", "gRPC"],
  },
  {
    icon: Workflow,
    titleKey: "card3Title",
    descriptionKey: "card3Description",
    tags: ["n8n", "Python", "Orchestration"],
  },
  {
    icon: Cloud,
    titleKey: "card4Title",
    descriptionKey: "card4Description",
    tags: ["Kubernetes", "AWS/GCP", "CI/CD"],
  },
];

export default function Capabilities() {
  const t = useTranslations("capabilities");

  return (
    <section id="services" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-accent-cyan" />
            <span className="font-mono text-xs uppercase tracking-widest text-text-secondary">
              {t("eyebrow")}
            </span>
          </div>
          <h2 className="mt-5 font-sans text-3xl font-semibold tracking-tight sm:text-4xl">
            {t("heading")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            {t("description")}
          </p>
        </div>

        <div className="mt-16 border-t border-border">
          {CAPABILITIES.map((cap, i) => (
            <motion.div
              key={cap.titleKey}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
              className="group grid grid-cols-1 items-start gap-4 border-b border-border py-10 lg:grid-cols-12 lg:gap-8"
            >
              <div className="flex items-center gap-5 lg:col-span-3">
                <span className="font-mono text-sm text-text-secondary/50 transition-colors group-hover:text-accent-cyan">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border text-accent-cyan transition-colors duration-300 group-hover:border-accent-cyan/50 group-hover:shadow-glow-cyan">
                  <cap.icon size={20} strokeWidth={1.75} />
                </div>
              </div>

              <div className="lg:col-span-6">
                <h3 className="font-sans text-lg font-semibold text-text-primary">
                  {t(cap.titleKey)}
                </h3>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-text-secondary">
                  {t(cap.descriptionKey)}
                </p>
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-2 lg:col-span-3 lg:justify-end lg:text-right">
                {cap.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs text-text-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
