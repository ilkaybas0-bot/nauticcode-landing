"use client";

import { motion } from "framer-motion";

type Category = {
  label: string;
  items: string[];
};

const CATEGORIES: Category[] = [
  {
    label: "Languages & Runtimes",
    items: ["Rust", "Go", "Python", "TypeScript"],
  },
  {
    label: "AI & Data",
    items: ["LLM Orchestration", "Vector Databases", "RAG Pipelines", "PostgreSQL"],
  },
  {
    label: "Infrastructure",
    items: ["Kubernetes", "Docker", "AWS", "GCP"],
  },
  {
    label: "Automation & Delivery",
    items: ["n8n", "GitHub Actions", "Terraform", "CI/CD"],
  },
];

export default function TechStack() {
  return (
    <section id="stack" className="relative scroll-mt-24 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-widest text-accent-cyan">
            Stack
          </span>
          <h2 className="mt-4 font-sans text-3xl font-semibold tracking-tight sm:text-4xl">
            The tools behind the engineering.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            No framework worship — we pick what&apos;s correct for the
            problem and durable for your team to maintain.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((category, i) => (
            <motion.div
              key={category.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              className="rounded-xl border border-border bg-surface/60 p-6"
            >
              <h3 className="font-mono text-xs uppercase tracking-widest text-text-secondary">
                {category.label}
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
