"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Cpu, TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";

const BREAKDOWN = [
  {
    icon: AlertTriangle,
    labelKey: "challengeLabel",
    titleKey: "challengeTitle",
    descriptionKey: "challengeDescription",
    accent: "text-amber-400",
    border: "border-amber-400/20",
  },
  {
    icon: Cpu,
    labelKey: "solutionLabel",
    titleKey: "solutionTitle",
    descriptionKey: "solutionDescription",
    accent: "text-accent-cyan",
    border: "border-accent-cyan/20",
  },
  {
    icon: TrendingUp,
    labelKey: "impactLabel",
    titleKey: "impactTitle",
    descriptionKey: "impactDescription",
    accent: "text-emerald-400",
    border: "border-emerald-400/20",
  },
] as const;

export default function CaseStudy() {
  const t = useTranslations("caseStudy");

  return (
    <section id="case-studies" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-border bg-surface/50">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            <div className="relative flex flex-col justify-between border-b border-border bg-gradient-to-br from-accent-cobalt/10 via-transparent to-transparent p-8 lg:col-span-2 lg:border-b-0 lg:border-r lg:p-10">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-accent-cyan">
                  {t("eyebrow")}
                </span>
                <h2 className="mt-4 font-sans text-2xl font-semibold tracking-tight sm:text-3xl">
                  {t("heading")}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                  {t("description")}
                </p>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-6">
                <div>
                  <div className="font-mono text-3xl font-semibold text-gradient">
                    68%
                  </div>
                  <p className="mt-1 text-xs text-text-secondary">
                    {t("statLabel1")}
                  </p>
                </div>
                <div>
                  <div className="font-mono text-3xl font-semibold text-gradient">
                    $1.8M
                  </div>
                  <p className="mt-1 text-xs text-text-secondary">
                    {t("statLabel2")}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:col-span-3">
              {BREAKDOWN.map((item, i) => (
                <motion.div
                  key={item.labelKey}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
                  className="p-8 lg:p-10"
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg border bg-bg/60 ${item.border} ${item.accent}`}
                  >
                    <item.icon size={18} strokeWidth={1.75} />
                  </div>
                  <span
                    className={`mt-5 block font-mono text-xs uppercase tracking-widest ${item.accent}`}
                  >
                    {t(item.labelKey)}
                  </span>
                  <h3 className="mt-2 font-sans text-base font-semibold text-text-primary">
                    {t(item.titleKey)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                    {t(item.descriptionKey)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
