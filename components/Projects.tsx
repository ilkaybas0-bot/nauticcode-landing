"use client";

import { motion } from "framer-motion";
import { Calendar, QrCode, Bot, Trophy, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { CoverflowCarousel } from "@/components/ui/coverflow-carousel";

type ProjectEntry = {
  icon: typeof Calendar;
  categoryKey: string;
  nameKey: string;
  descriptionKey: string;
  ctaKey: string | null;
  badgeKey: string | null;
  href: string | null;
  accent: string;
  border: string;
  image: string;
};

const PROJECTS: ProjectEntry[] = [
  {
    icon: Calendar,
    categoryKey: "project1Category",
    nameKey: "project1Name",
    descriptionKey: "project1Description",
    ctaKey: "project1Cta",
    badgeKey: null,
    href: "https://slotly-jet.vercel.app/",
    accent: "text-accent-cyan",
    border: "border-accent-cyan/20",
    image: "/projects/slotly.png",
  },
  {
    icon: QrCode,
    categoryKey: "project2Category",
    nameKey: "project2Name",
    descriptionKey: "project2Description",
    ctaKey: "project2Cta",
    badgeKey: null,
    href: "https://qr-menugit.streamlit.app/",
    accent: "text-emerald-400",
    border: "border-emerald-400/20",
    image: "/projects/qr-menu.png",
  },
  {
    icon: Bot,
    categoryKey: "project3Category",
    nameKey: "project3Name",
    descriptionKey: "project3Description",
    ctaKey: null,
    badgeKey: "project3Badge",
    href: null,
    accent: "text-accent-cobalt",
    border: "border-accent-cobalt/20",
    image: "/projects/mogens-ai.png",
  },
  {
    icon: Trophy,
    categoryKey: "project4Category",
    nameKey: "project4Name",
    descriptionKey: "project4Description",
    ctaKey: null,
    badgeKey: "project4Badge",
    href: null,
    accent: "text-amber-400",
    border: "border-amber-400/20",
    image: "/projects/nss-score.png",
  },
];

export default function Projects() {
  const t = useTranslations("projects");

  const slides = PROJECTS.map((project) => ({
    src: project.image,
    alt: t(project.nameKey),
    title: t(project.nameKey),
    subtitle: t(project.categoryKey),
  }));

  return (
    <section id="projects" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-accent-cyan" />
            <span className="font-mono text-xs uppercase tracking-widest text-text-secondary">
              {t("eyebrow")}
            </span>
            <span className="h-px w-8 bg-accent-cyan" />
          </div>
          <h2 className="mt-5 font-sans text-2xl font-semibold tracking-tight sm:text-3xl">
            {t("heading")}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-text-secondary">
            {t("description")}
          </p>
        </div>

        <CoverflowCarousel
          slides={slides}
          showCaption
          showPagination
          showNavigation
          label={t("heading")}
          className="mt-12"
        />

        <div className="mt-16 border-t border-border">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.nameKey}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
              className="group grid grid-cols-1 items-center gap-4 border-b border-border py-8 lg:grid-cols-12 lg:gap-8"
            >
              <div className="flex items-center gap-5 lg:col-span-5">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border bg-bg/60 ${project.border} ${project.accent}`}
                >
                  <project.icon size={18} strokeWidth={1.75} />
                </div>
                <div>
                  <span
                    className={`block font-mono text-xs uppercase tracking-widest ${project.accent}`}
                  >
                    {t(project.categoryKey)}
                  </span>
                  <h3 className="mt-1 font-sans text-base font-semibold text-text-primary">
                    {t(project.nameKey)}
                  </h3>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-text-secondary lg:col-span-5">
                {t(project.descriptionKey)}
              </p>

              <div className="lg:col-span-2 lg:text-right">
                {project.href ? (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 font-mono text-xs font-medium ${project.accent} transition-opacity hover:opacity-80`}
                  >
                    {t(project.ctaKey!)}
                    <ArrowUpRight size={13} />
                  </a>
                ) : (
                  <span className="inline-flex w-fit items-center rounded-md border border-border px-2.5 py-1 font-mono text-xs text-text-secondary">
                    {t(project.badgeKey!)}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
