"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";

const CONTACT_EMAIL = "nauticcode.contact@gmail.com";

export default function About() {
  const t = useTranslations("about");

  return (
    <section id="about" className="relative scroll-mt-24 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3">
            <span className="font-mono text-xs uppercase tracking-widest text-accent-cyan">
              {t("eyebrow")}
            </span>
            <h2 className="mt-4 font-sans text-3xl font-semibold tracking-tight sm:text-4xl">
              {t("heading")}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-text-secondary">
              {t("paragraph1")}
            </p>
            <p className="mt-4 text-base leading-relaxed text-text-secondary">
              {t("paragraph2")}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="glass flex flex-col justify-between rounded-xl p-8 lg:col-span-2"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-bg/60 text-accent-cyan">
              <Mail size={20} strokeWidth={1.75} />
            </div>
            <div className="mt-6">
              <span className="font-mono text-xs uppercase tracking-widest text-text-secondary">
                {t("contactLabel")}
              </span>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-3 block break-all font-mono text-lg text-text-primary transition-colors hover:text-accent-cyan"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
