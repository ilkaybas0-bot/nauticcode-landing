"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

type Stat = {
  labelKey: "stat1Label" | "stat2Label" | "stat3Label";
  display: string;
};

// Real, verifiable facts rather than invented benchmark numbers — each one
// is something a visitor can check elsewhere on this site (the Projects
// section, the language switcher in the header, the contact form copy).
const STATS: Stat[] = [
  { labelKey: "stat1Label", display: "3" },
  { labelKey: "stat2Label", display: "6" },
  { labelKey: "stat3Label", display: "1" },
];

export default function MetricsStrip() {
  const t = useTranslations("metrics");

  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.labelKey}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className="glass-card p-6 text-center sm:text-left"
            >
              <div className="relative font-mono text-4xl font-semibold tabular-nums text-gradient neon-text sm:text-5xl">
                {stat.display}
              </div>
              <p className="relative mt-2 text-sm text-text-secondary">
                {t(stat.labelKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
