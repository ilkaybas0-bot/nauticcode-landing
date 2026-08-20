"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle, Linkedin } from "lucide-react";
import { useTranslations } from "next-intl";

const CONTACT_EMAIL = "contact@mogenssoftware.com";
const WHATSAPP_NUMBER = "905384519785";
const WHATSAPP_DISPLAY = "+90 538 451 97 85";
const LINKEDIN_URL = "https://www.linkedin.com/in/mogens-software-04650442b/";

export default function About() {
  const t = useTranslations("about");

  return (
    <section id="about" className="relative scroll-mt-24 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-accent-cyan" />
              <span className="font-mono text-xs uppercase tracking-widest text-text-secondary">
                {t("eyebrow")}
              </span>
            </div>
            <h2 className="mt-5 font-sans text-3xl font-semibold tracking-tight sm:text-4xl">
              {t("heading")}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-text-secondary">
              {t("paragraph1")}
            </p>
            <p className="mt-4 text-base leading-relaxed text-text-secondary">
              {t("paragraph2")}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-accent-cyan" />
              </span>
              <span className="font-mono text-xs text-text-secondary">
                {t("availability")}
              </span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="glass-card relative flex flex-col gap-6 p-8 lg:col-span-2"
          >
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-bg/60 text-accent-cyan">
                <Mail size={20} strokeWidth={1.75} />
              </div>
              <span className="mt-4 block font-mono text-xs uppercase tracking-widest text-text-secondary">
                {t("contactLabel")}
              </span>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-2 block break-all font-mono text-lg text-text-primary transition-colors hover:text-accent-cyan"
              >
                {CONTACT_EMAIL}
              </a>
            </div>

            <div className="border-t border-border pt-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-bg/60 text-emerald-400">
                <MessageCircle size={20} strokeWidth={1.75} />
              </div>
              <span className="mt-4 block font-mono text-xs uppercase tracking-widest text-text-secondary">
                {t("whatsappLabel")}
              </span>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block font-mono text-lg text-text-primary transition-colors hover:text-emerald-400"
              >
                {WHATSAPP_DISPLAY}
              </a>
            </div>

            <div className="border-t border-border pt-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-bg/60 text-accent-cyan">
                <Linkedin size={20} strokeWidth={1.75} />
              </div>
              <span className="mt-4 block font-mono text-xs uppercase tracking-widest text-text-secondary">
                {t("linkedinLabel")}
              </span>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block font-mono text-lg text-text-primary transition-colors hover:text-accent-cyan"
              >
                LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
