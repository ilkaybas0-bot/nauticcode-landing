"use client";

import { motion } from "framer-motion";
import { ArrowRight, TerminalSquare } from "lucide-react";

const TERMINAL_LINES = [
  { text: "$ nauticcode deploy --agent=dispatch-ai", color: "text-text-secondary" },
  { text: "> resolving node graph...", color: "text-text-secondary" },
  { text: "[<>] api.gateway   ⇄  llm.inference", color: "text-accent-cyan" },
  { text: "[<>] agent.core    ⇄  db.postgres", color: "text-accent-cyan" },
  { text: "[<>] queue.event   ⇄  agent.core", color: "text-accent-cyan" },
  { text: "✓ 4 services linked · 0 conflicts", color: "text-emerald-400" },
  { text: "✓ system online · 99.98% uptime", color: "text-emerald-400" },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.35,
      delayChildren: 0.6,
    },
  },
};

const lineVariants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section
      id="architecture"
      className="relative overflow-hidden pb-24 pt-40 lg:pb-32 lg:pt-48"
    >
      <div className="absolute inset-0 -z-10 bg-grid bg-radial-fade [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-accent-cyan" />
            </span>
            <span className="font-mono text-xs tracking-wide text-text-secondary">
              <span className="text-accent-cyan">[SYSTEMS ONLINE]</span> Next-Gen
              B2B Software Architecture
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="mt-6 font-sans text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Charting Intelligent{" "}
            <span className="text-gradient">Code Flows</span> for Enterprise
            Systems.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-text-secondary"
          >
            We engineer resilient custom software, autonomous AI workflows,
            and cloud infrastructure designed to scale your operational
            velocity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-accent-cyan px-6 py-3 font-mono text-sm font-semibold text-bg shadow-glow-cyan transition-all hover:shadow-glow-cyan-lg"
            >
              Start Your Project
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </a>
            <a
              href="#architecture"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-6 py-3 font-mono text-sm font-medium text-text-primary transition-colors hover:border-accent-cyan/50 hover:text-accent-cyan"
            >
              View Systems Architecture
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute -inset-4 -z-10 rounded-2xl bg-accent-cyan/10 blur-3xl" />

          <div className="glass overflow-hidden rounded-xl shadow-2xl">
            <div className="flex items-center gap-2 border-b border-border bg-black/20 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-500/70" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/70" />
              <span className="ml-3 flex items-center gap-1.5 font-mono text-xs text-text-secondary">
                <TerminalSquare size={12} />
                nauticcode — architecture.sh
              </span>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="min-h-[280px] space-y-2.5 px-5 py-6 font-mono text-[13px] leading-relaxed"
            >
              {TERMINAL_LINES.map((line, i) => (
                <motion.p key={i} variants={lineVariants} className={line.color}>
                  {line.text}
                </motion.p>
              ))}
              <motion.span
                variants={lineVariants}
                className="inline-block h-3.5 w-2 translate-y-0.5 animate-blink bg-accent-cyan"
              />
            </motion.div>
          </div>

          <div className="pointer-events-none absolute -right-6 -top-6 hidden h-24 w-24 rounded-full border border-accent-cyan/20 lg:block" />
          <div className="pointer-events-none absolute -bottom-8 -left-8 hidden h-32 w-32 rounded-full border border-accent-cobalt/20 lg:block" />
        </motion.div>
      </div>
    </section>
  );
}
