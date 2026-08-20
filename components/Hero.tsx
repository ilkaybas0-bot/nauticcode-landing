"use client";

import { motion } from "framer-motion";
import { ArrowRight, TerminalSquare } from "lucide-react";
import { useTranslations } from "next-intl";

const ease = [0.16, 1, 0.3, 1] as const;

// Illustrative — a styled log stream, not a real deploy or a claim about
// this visitor's own infrastructure. Kept as literal code strings (not
// translated) the same way a code comment wouldn't be.
const LOG_LINES = [
  { text: "[INFO] Initializing Rust core engine...", color: "text-text-secondary" },
  { text: "[INFO] Loading vector index (RAG)...", color: "text-text-secondary" },
  { text: "[<>] api.gateway ⇄ llm.inference", color: "text-accent-cyan" },
  { text: "[<>] agent.core ⇄ db.postgres", color: "text-accent-cyan" },
  { text: "[SUCCESS] AI agent pipeline deployed via gRPC", color: "text-emerald-400" },
  { text: "[SUCCESS] 4 services linked · 0 conflicts", color: "text-emerald-400" },
  { text: "[SUCCESS] cluster status: healthy", color: "text-emerald-400" },
];

const STATUS_ITEMS = [
  { label: "API Latency", value: "12ms", dot: "bg-emerald-400" },
  { label: "Cluster", value: "Healthy", dot: "bg-emerald-400" },
  { label: "RAG Pipelines", value: "4 active", dot: "bg-accent-cyan" },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.3, delayChildren: 1.1 } },
};

const lineVariants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden py-32">
      {/* Full-bleed background video. The cursor-reactive particle field is
          a separate, site-wide layer (see app/[locale]/layout.tsx) that
          shows through on top of this everywhere, hero included. */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease }}
        className="absolute inset-0 -z-20"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        >
          <source src="/video/hero-mogens.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Scrim: keeps content legible and ties the footage into the brand palette */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-bg via-bg/80 to-bg/50" />
      <div className="absolute inset-0 -z-10 bg-radial-fade" />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-accent-cyan" />
            </span>
            <span className="font-mono text-xs tracking-wide text-text-secondary">
              <span className="text-accent-cyan">{t("badgeStatus")}</span>{" "}
              {t("badgeText")}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease }}
            className="mt-6 font-sans font-light leading-[1.05] tracking-tight text-text-primary"
            style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)" }}
          >
            {t.rich("headline", {
              highlight: (chunks) => (
                <span className="text-gradient font-semibold">{chunks}</span>
              ),
            })}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-text-secondary"
          >
            {t("subheadline")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease }}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent-cyan px-6 py-3 font-mono text-sm font-semibold text-bg shadow-glow-cyan transition-all hover:shadow-glow-cyan-lg"
            >
              {t("ctaPrimary")}
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-bg/40 px-6 py-3 font-mono text-sm font-medium text-text-primary backdrop-blur transition-colors hover:border-accent-cyan/50 hover:text-accent-cyan"
            >
              {t("ctaSecondary")}
            </a>
          </motion.div>
        </div>

        {/* Right column: live-styled engineering terminal */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease }}
          className="glass relative rounded-lg shadow-2xl"
        >
          <div className="flex items-center gap-2 border-b border-zinc-800 bg-black/30 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-red-500/70" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/70" />
            <span className="ml-3 flex items-center gap-1.5 font-mono text-xs text-text-secondary">
              <TerminalSquare size={12} />
              mogens — deploy.sh
            </span>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="min-h-[220px] space-y-2 px-5 py-6 font-mono text-[13px] leading-relaxed"
          >
            {LOG_LINES.map((line, i) => (
              <motion.p key={i} variants={lineVariants} className={line.color}>
                <span className="mr-3 select-none text-text-secondary/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {line.text}
              </motion.p>
            ))}
            <motion.span
              variants={lineVariants}
              className="ml-8 inline-block h-3.5 w-2 translate-y-0.5 animate-blink bg-accent-cyan"
            />
          </motion.div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-zinc-800 bg-black/20 px-5 py-3">
            {STATUS_ITEMS.map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span className={`h-1.5 w-1.5 rounded-full ${item.dot}`} />
                <span className="font-mono text-[11px] text-text-secondary">
                  {item.label}
                </span>
                <span className="font-mono text-[11px] font-medium text-text-primary">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
