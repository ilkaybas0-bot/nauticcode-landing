"use client";

import { motion } from "framer-motion";
import { Bot, Boxes, Workflow, Cloud, type LucideIcon } from "lucide-react";
import { useRef, type MouseEvent } from "react";

type Capability = {
  icon: LucideIcon;
  title: string;
  description: string;
  tags: string[];
  span: string;
};

const CAPABILITIES: Capability[] = [
  {
    icon: Bot,
    title: "Custom AI Agents & RAG Pipelines",
    description:
      "Autonomous workflows integrating LLMs into existing databases — retrieval-augmented, context-aware, and built to act on your operational data.",
    tags: ["LLM Orchestration", "Vector DBs", "RAG"],
    span: "lg:col-span-3",
  },
  {
    icon: Boxes,
    title: "Enterprise Software Engineering",
    description:
      "Microservices, Rust/Go backend engines, and low-latency APIs engineered for correctness at scale.",
    tags: ["Rust", "Go", "gRPC"],
    span: "lg:col-span-3",
  },
  {
    icon: Workflow,
    title: "Automated Business Logic",
    description:
      "Complex n8n/Python orchestration eliminating manual overhead across your operational stack.",
    tags: ["n8n", "Python", "Orchestration"],
    span: "lg:col-span-2",
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure & DevOps",
    description:
      "Kubernetes, AWS/GCP serverless setups with zero-downtime CI/CD pipelines built for resilience.",
    tags: ["Kubernetes", "AWS/GCP", "CI/CD"],
    span: "lg:col-span-4",
  },
];

function handleCardMouseMove(e: MouseEvent<HTMLDivElement>) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--x", `${e.clientX - rect.left}px`);
  el.style.setProperty("--y", `${e.clientY - rect.top}px`);
}

export default function Capabilities() {
  return (
    <section id="services" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-widest text-accent-cyan">
            Core Capabilities
          </span>
          <h2 className="mt-4 font-sans text-3xl font-semibold tracking-tight sm:text-4xl">
            Engineering primitives for autonomous enterprise systems.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            Four disciplines, one integrated engineering practice — from
            model-driven agents to the infrastructure that keeps them
            running.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-6">
          {CAPABILITIES.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              whileHover={{ y: -4 }}
              onMouseMove={handleCardMouseMove}
              className={`group relative overflow-hidden rounded-xl border border-border bg-surface/60 p-6 transition-colors duration-300 hover:border-accent-cyan/50 ${cap.span}`}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(400px circle at var(--x, 50%) var(--y, 0%), rgba(0,242,254,0.12), transparent 60%)",
                }}
              />

              <div className="relative flex h-full flex-col">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-bg/60 text-accent-cyan transition-colors duration-300 group-hover:border-accent-cyan/40 group-hover:shadow-glow-cyan">
                  <cap.icon size={20} strokeWidth={1.75} />
                </div>

                <h3 className="mt-5 font-sans text-lg font-semibold text-text-primary">
                  {cap.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
                  {cap.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {cap.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-bg/60 px-2.5 py-1 font-mono text-[11px] text-text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/[0.02]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
