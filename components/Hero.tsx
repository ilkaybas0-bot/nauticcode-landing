"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative flex min-h-screen flex-col justify-end overflow-hidden pb-16 pt-32 lg:pb-24">
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

      {/* Scrim: keeps the headline legible and ties the footage into the brand palette */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-bg via-bg/75 to-bg/35" />
      <div className="absolute inset-0 -z-10 bg-radial-fade" />

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease }}
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
          transition={{ duration: 0.8, delay: 0.8, ease }}
          className="mt-6 max-w-4xl font-sans font-light leading-[1.05] tracking-tight text-text-primary"
          style={{ fontSize: "clamp(2.25rem, 6vw, 4.5rem)" }}
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
          transition={{ duration: 0.8, delay: 0.9, ease }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-text-secondary"
        >
          {t("subheadline")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease }}
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
    </section>
  );
}
