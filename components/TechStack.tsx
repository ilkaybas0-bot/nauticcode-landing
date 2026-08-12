"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

type Category = {
  labelKey: "cat1Label" | "cat2Label" | "cat3Label" | "cat4Label";
  items: string[];
};

const CATEGORIES: Category[] = [
  {
    labelKey: "cat1Label",
    items: ["Rust", "Go", "Python", "TypeScript"],
  },
  {
    labelKey: "cat2Label",
    items: ["LLM Orchestration", "Vector Databases", "RAG Pipelines", "PostgreSQL"],
  },
  {
    labelKey: "cat3Label",
    items: ["Kubernetes", "Docker", "AWS", "GCP"],
  },
  {
    labelKey: "cat4Label",
    items: ["n8n", "GitHub Actions", "Terraform", "CI/CD"],
  },
];

export default function TechStack() {
  const t = useTranslations("techStack");

  return (
    <section id="stack" className="relative scroll-mt-24 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-widest text-accent-cyan">
            {t("eyebrow")}
          </span>
          <h2 className="mt-4 font-sans text-3xl font-semibold tracking-tight sm:text-4xl">
            {t("heading")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            {t("description")}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((category, i) => (
            <motion.div
              key={category.labelKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              className="rounded-xl border border-border bg-surface/60 p-6"
            >
              <h3 className="font-mono text-xs uppercase tracking-widest text-text-secondary">
                {t(category.labelKey)}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border bg-bg/60 px-2.5 py-1 font-mono text-[11px] text-text-primary"
                  >
                    {item}
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
