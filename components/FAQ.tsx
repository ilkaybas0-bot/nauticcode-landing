"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

const QUESTION_KEYS = [
  { q: "q1Question", a: "q1Answer" },
  { q: "q2Question", a: "q2Answer" },
  { q: "q3Question", a: "q3Answer" },
  { q: "q4Question", a: "q4Answer" },
  { q: "q5Question", a: "q5Answer" },
  { q: "q6Question", a: "q6Answer" },
] as const;

export default function FAQ() {
  const t = useTranslations("faq");

  return (
    <section id="faq" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="font-mono text-xs text-text-secondary/40">// faq/support.md</p>
          <div className="mt-2 flex items-center gap-3">
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

        <div className="mt-12 flex flex-col gap-3">
          {QUESTION_KEYS.map((item, i) => (
            <motion.details
              key={item.q}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
              className="glass-card group relative open:pb-2"
            >
              <summary className="relative flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-sans text-base font-medium text-text-primary marker:content-none">
                {t(item.q)}
                <ChevronDown
                  size={18}
                  strokeWidth={1.75}
                  className="shrink-0 text-text-secondary transition-transform duration-300 group-open:rotate-180"
                />
              </summary>
              <p className="relative px-5 pb-5 text-sm leading-relaxed text-text-secondary">
                {t(item.a)}
              </p>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  );
}
