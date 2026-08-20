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
  hero?: boolean;
};

const CAPABILITIES: Capability[] = [
  {
    icon: Bot,
    titleKey: "card1Title",
    descriptionKey: "card1Description",
    tags: ["LLM Orchestration", "Vector DBs", "RAG"],
    span: "sm:col-span-2 lg:col-span-4 lg:row-span-2",
    hero: true,
  },
  {
    icon: Boxes,
    titleKey: "card2Title",
    descriptionKey: "card2Description",
    tags: ["Rust", "Go", "gRPC"],
    span: "lg:col-span-2",
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
    span: "sm:col-span-2 lg:col-span-4",
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
          <div className="flex items-center gap-3">
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

        <div className="mt-14 grid grid-flow-dense grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {CAPABILITIES.map((cap, i) => (
            <motion.div
              key={cap.titleKey}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
              onMouseMove={handleCardMouseMove}
              className={`glass-card group flex flex-col justify-between p-6 lg:p-8 ${cap.span} ${
                cap.hero ? "min-h-[320px]" : "min-h-[200px]"
              }`}
            >
              {/* Mouse-follow neon glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(360px circle at var(--x, 50%) var(--y, 0%), rgba(139,92,246,0.16), transparent 65%)",
                }}
              />
              {/* Subtle scanline texture, most visible on the hero cell */}
              <div className="scanline pointer-events-none absolute inset-0 opacity-[0.4]" />

              {cap.hero && (
                <div className="relative mb-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-text-secondary">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-emerald-400" />
                  </span>
                  core.module — online
                </div>
              )}

              <div className="relative">
                <div
                  className={`flex items-center justify-center rounded-xl border border-white/10 bg-bg/60 text-accent-cyan shadow-glow-cyan transition-transform duration-500 group-hover:scale-110 ${
                    cap.hero ? "h-14 w-14" : "h-11 w-11"
                  }`}
                >
                  <cap.icon size={cap.hero ? 26 : 20} strokeWidth={1.5} />
                </div>

                <h3
                  className={`mt-6 font-sans font-semibold text-text-primary ${
                    cap.hero ? "text-2xl" : "text-lg"
                  }`}
                >
                  {t(cap.titleKey)}
                </h3>
                <p
                  className={`mt-3 leading-relaxed text-text-secondary ${
                    cap.hero ? "max-w-md text-sm" : "text-sm"
                  }`}
                >
                  {t(cap.descriptionKey)}
                </p>
              </div>

              <div className="relative mt-6 flex flex-wrap gap-2">
                {cap.tags.map((tag) => (
                  <span
                    key={tag}
                    className="neon-text rounded-full border border-accent-cyan/25 bg-accent-cyan/[0.06] px-2.5 py-1 font-mono text-[11px] text-accent-cyan shadow-[0_0_10px_-2px_rgba(139,92,246,0.35)]"
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
