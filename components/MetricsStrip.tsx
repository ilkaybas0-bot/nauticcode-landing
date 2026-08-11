"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

const PARTNER_LOGOS = [
  "Meridian Freight",
  "Orbital Systems",
  "Vantage Capital",
  "Northstar Retail",
  "Halcyon Health",
  "Ferrovia Logistics",
];

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
        <p className="text-center font-mono text-xs uppercase tracking-widest text-text-secondary">
          Trusted by engineering-led teams
        </p>

        <div className="relative mt-8 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bg to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg to-transparent" />
          <div className="flex w-max animate-marquee gap-16">
            {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="whitespace-nowrap font-sans text-lg font-semibold tracking-tight text-text-secondary/40 grayscale transition-colors hover:text-text-secondary/70"
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 border-t border-border pt-12 sm:grid-cols-3">
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
