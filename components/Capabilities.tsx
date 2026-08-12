"use client";

import { motion } from "framer-motion";
import { Bot, Boxes, Workflow, Cloud, type LucideIcon } from "lucide-react";
import { useRef, type MouseEvent } from "react";
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
  span: string;
};

const CAPABILITIES: Capability[] = [
  {
    icon: Bot,
    titleKey: "card1Title",
    descriptionKey: "card1Description",
    tags: ["LLM Orchestration", "Vector DBs", "RAG"],
    span: "lg:col-span-3",
  },
  {
    icon: Boxes,
    titleKey: "card2Title",
    descriptionKey: "card2Description",
    tags: ["Rust", "Go", "gRPC"],
    span: "lg:col-span-3",
  },
  {
    icon: Workflow,
    titleKey: "card3Title",
    descriptionKey: "card3Description",
    tags: ["n8n", "Python", "Orchestration"],
    span: "lg:col-span-2",
  },
  {
    icon: Cloud,
    titleKey: "card4Title",
    descriptionKey: "card4Description",
    tags: ["Kubernetes", "AWS/GCP", "CI/CD"],
    span: "lg:col-span-4",
  },
];

function handleCardMouseMove(e: MouseEvent<HTMLDivElement>) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--x", `${e.clientX - rect.left}px`);
  el.style.setProperty("--y", `${e.clientY - rect.top}px`);
}

export default function Capabilities() {
  const t = useTranslations("capabilities");

  return (
    <section id="services" className="relative py-24 lg:py-32">
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

        <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-6">
          {CAPABILITIES.map((cap, i) => (
            <motion.div
              key={cap.titleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              whileHover={{ y: -4 }}
              onMouseMove={handleCardMouseMove}
              className={`group relative overflow-hidden rounded-xl border border-border bg-surface/60 p-6 transition-colors duration-300 hover:border-accent-cyan/50 ${cap.span}`}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(400px circle at var(--x, 50%) var(--y, 0%), rgba(0,242,254,0.12), transparent 60%)",
                }}
              />

              <div className="relative flex h-full flex-col">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-bg/60 text-accent-cyan transition-colors duration-300 group-hover:border-accent-cyan/40 group-hover:shadow-glow-cyan">
                  <cap.icon size={20} strokeWidth={1.75} />
                </div>

                <h3 className="mt-5 font-sans text-lg font-semibold text-text-primary">
                  {t(cap.titleKey)}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
                  {t(cap.descriptionKey)}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {cap.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-bg/60 px-2.5 py-1 font-mono text-[11px] text-text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/[0.02]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
