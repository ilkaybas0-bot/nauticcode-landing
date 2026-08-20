"use client";

import { motion } from "framer-motion";
import { Search, Code2, FlaskConical, LifeBuoy, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

type Step = {
  icon: LucideIcon;
  number: string;
  titleKey: "step1Title" | "step2Title" | "step3Title" | "step4Title";
  descriptionKey:
    | "step1Description"
    | "step2Description"
    | "step3Description"
    | "step4Description";
};

const STEPS: Step[] = [
  { icon: Search, number: "01", titleKey: "step1Title", descriptionKey: "step1Description" },
  { icon: Code2, number: "02", titleKey: "step2Title", descriptionKey: "step2Description" },
  {
    icon: FlaskConical,
    number: "03",
    titleKey: "step3Title",
    descriptionKey: "step3Description",
  },
  { icon: LifeBuoy, number: "04", titleKey: "step4Title", descriptionKey: "step4Description" },
];

export default function Process() {
  const t = useTranslations("process");

  return (
    <section id="process" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="font-mono text-xs text-text-secondary/40">
            // process/workflow.md
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
          {STEPS.map((step, i) => (
            <motion.div
              key={step.titleKey}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
              className="glass-card group flex min-h-[220px] flex-col justify-between p-6"
            >
              <div className="flex items-start justify-between">
                <span className="neon-text font-mono text-3xl font-semibold text-accent-cyan/50">
                  {step.number}
                </span>
                <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-bg/60 text-accent-cyan transition-transform duration-500 group-hover:scale-110">
                  <step.icon size={18} strokeWidth={1.75} />
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-sans text-lg font-semibold text-text-primary">
                  {t(step.titleKey)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {t(step.descriptionKey)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
