"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

type Stat = {
  label: string;
  prefix?: string;
  suffix?: string;
  value: number;
  decimals?: number;
};

const STATS: Stat[] = [
  { label: "System Uptime Architecture", value: 99.98, suffix: "%", decimals: 2 },
  { label: "Operational Velocity Boost", value: 4.2, suffix: "x", decimals: 1 },
  { label: "Infrastructure Costs Saved", prefix: "$", value: 12, suffix: "M+" },
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
  return (
    <section className="relative border-y border-border bg-surface/30 py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className="text-center sm:text-left"
            >
              <div className="text-4xl font-semibold text-gradient sm:text-5xl">
                <StatCounter stat={stat} />
              </div>
              <p className="mt-2 text-sm text-text-secondary">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
