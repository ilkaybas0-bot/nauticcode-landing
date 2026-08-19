"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { WorldMap } from "@/components/ui/world-map";

// Hub-and-spoke from Istanbul (where we work from) to major AWS/GCP region
// clusters, illustrating real multi-region deployment reach — not claimed
// office locations.
const ISTANBUL = { lat: 41.0082, lng: 28.9784 };

const DOTS = [
  { start: ISTANBUL, end: { lat: 50.1109, lng: 8.6821 } }, // Frankfurt (eu-central-1)
  { start: ISTANBUL, end: { lat: 39.0438, lng: -77.4874 } }, // N. Virginia (us-east-1)
  { start: ISTANBUL, end: { lat: 1.3521, lng: 103.8198 } }, // Singapore (ap-southeast-1)
  { start: ISTANBUL, end: { lat: -23.5505, lng: -46.6333 } }, // São Paulo (sa-east-1)
];

export default function GlobalReach() {
  const t = useTranslations("globalReach");

  return (
    <section className="relative py-24 lg:py-32">
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

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="glass-card relative mt-12 p-4 sm:p-8"
        >
          <WorldMap dots={DOTS} lineColor="#8B5CF6" />
        </motion.div>
      </div>
    </section>
  );
}
