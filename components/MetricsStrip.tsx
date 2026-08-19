"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { useTranslations } from "next-intl";

type Stat = {
  labelKey: "stat1Label" | "stat2Label" | "stat3Label";
  prefix?: string;
  suffix?: string;
  value: number;
  decimals?: number;
};

const STATS: Stat[] = [
  { labelKey: "stat1Label", value: 99.98, suffix: "%", decimals: 2 },
  { labelKey: "stat2Label", value: 4.2, suffix: "x", decimals: 1 },
  { labelKey: "stat3Label", prefix: "$", value: 12, suffix: "M+" },
];

function StatCounter({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, stat.value, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(v.toFixed(stat.decimals ?? 0)),
    });
    return () => controls.stop();
  }, [inView, stat.value, stat.decimals]);

  return (
    <span ref={ref} className="font-mono tabular-nums">
      {stat.prefix}
      {display}
      {stat.suffix}
    </span>
  );
}

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
              <div className="relative text-4xl font-semibold text-gradient neon-text sm:text-5xl">
                <StatCounter stat={stat} />
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
