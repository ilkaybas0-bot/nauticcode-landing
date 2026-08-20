"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

type Stat = {
  labelKey: "stat1Label" | "stat2Label" | "stat3Label";
  display: string;
};

// Static, confidently-stated values rather than a count-from-zero animation:
// the count-up depends on IntersectionObserver + rAF firing correctly, and
// a slow/blocked first paint could leave a visitor looking at "0%" — not a
// risk worth taking on numbers meant to read as an established track record.
const STATS: Stat[] = [
  { labelKey: "stat1Label", display: "99.98%" },
  { labelKey: "stat2Label", display: "4.2x" },
  { labelKey: "stat3Label", display: "$12M+" },
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
