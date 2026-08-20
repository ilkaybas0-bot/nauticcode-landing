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
          <p className="font-mono text-xs text-text-secondary/40">
            // stack/tech-manifest.json
          </p>
          <div className="mt-2 flex items-center gap-3">
            <span className="h-px w-8 bg-accent-cyan shadow-glow-cyan" />
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

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((category, i) => (
            <motion.div
              key={category.labelKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              className="glass-card flex min-h-[220px] flex-col"
            >
              <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-4 py-3">
                <span className="h-2 w-2 rounded-full bg-red-500/60" />
                <span className="h-2 w-2 rounded-full bg-yellow-500/60" />
                <span className="h-2 w-2 rounded-full bg-emerald-500/60" />
              </div>

              <div className="flex flex-1 flex-col justify-between p-5">
                <h3 className="neon-text font-mono text-xs uppercase tracking-widest text-accent-cyan">
                  {t(category.labelKey)}
                </h3>
                <div className="mt-4 flex flex-col gap-2.5">
                  {category.items.map((item) => (
                    <span
                      key={item}
                      className="font-mono text-sm text-text-primary"
                    >
                      <span className="mr-2 text-text-secondary/50">›</span>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
