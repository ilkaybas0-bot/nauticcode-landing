"use client";

import { motion } from "framer-motion";
import { Languages, QrCode, Bot, CalendarClock, MessagesSquare, Stamp, TrendingDown, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { CoverflowCarousel } from "@/components/ui/coverflow-carousel";

type ProjectEntry = {
  icon: typeof Languages;
  categoryKey: string;
  nameKey: string;
  descriptionKey: string;
  ctaKey: string | null;
  badgeKey: string | null;
  href: string | null;
  accent: string;
  border: string;
  image: string | null;
};

const PROJECTS: ProjectEntry[] = [
  {
    icon: Languages,
    categoryKey: "project1Category",
    nameKey: "project1Name",
    descriptionKey: "project1Description",
    ctaKey: null,
    badgeKey: "project1Badge",
    href: null,
    accent: "text-accent-cobalt",
    border: "border-accent-cobalt/20",
    image: null,
  },
  {
    icon: Bot,
    categoryKey: "project2Category",
    nameKey: "project2Name",
    descriptionKey: "project2Description",
    ctaKey: null,
    badgeKey: "project2Badge",
    href: null,
    accent: "text-accent-cyan",
    border: "border-accent-cyan/20",
    image: "/projects/mogens-ai.png",
  },
  {
    icon: QrCode,
    categoryKey: "project3Category",
    nameKey: "project3Name",
    descriptionKey: "project3Description",
    ctaKey: "project3Cta",
    badgeKey: null,
    href: "https://qr-menugit.streamlit.app/",
    accent: "text-emerald-400",
    border: "border-emerald-400/20",
    image: "/projects/qr-menu.png",
  },
  {
    icon: CalendarClock,
    categoryKey: "project4Category",
    nameKey: "project4Name",
    descriptionKey: "project4Description",
    ctaKey: "project4Cta",
    badgeKey: null,
    href: "https://rezervasyon.mogenssoftware.com",
    accent: "text-amber-400",
    border: "border-amber-400/20",
    image: "/projects/slotly.png",
  },
  {
    icon: MessagesSquare,
    categoryKey: "project5Category",
    nameKey: "project5Name",
    descriptionKey: "project5Description",
    ctaKey: "project5Cta",
    badgeKey: null,
    href: "https://asistan.mogenssoftware.com",
    accent: "text-fuchsia-400",
    border: "border-fuchsia-400/20",
    image: "/projects/rag-assistant.png",
  },
  {
    icon: Stamp,
    categoryKey: "project6Category",
    nameKey: "project6Name",
    descriptionKey: "project6Description",
    ctaKey: "project6Cta",
    badgeKey: null,
    href: "https://sadakat.mogenssoftware.com",
    accent: "text-rose-400",
    border: "border-rose-400/20",
    image: "/projects/loyalty-saas.png",
  },
  {
    icon: TrendingDown,
    categoryKey: "project7Category",
    nameKey: "project7Name",
    descriptionKey: "project7Description",
    ctaKey: null,
    badgeKey: "project7Badge",
    href: null,
    accent: "text-lime-400",
    border: "border-lime-400/20",
    image: "/projects/fiyat-takip.png",
  },
];

export default function Projects() {
  const t = useTranslations("projects");

  const slides = PROJECTS.filter((project) => project.image).map((project) => ({
    src: project.image as string,
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

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.nameKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
              className="glass-card group min-h-[280px]"
            >
              {project.image && (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt=""
                    className="absolute inset-0 h-full w-full scale-105 object-cover opacity-25 blur-[1px] transition-all duration-700 group-hover:scale-110 group-hover:opacity-35"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/85 to-bg/40" />
                </>
              )}

              <div className="relative flex h-full flex-col justify-between p-6">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-lg border bg-bg/60 backdrop-blur ${project.border} ${project.accent}`}
                >
                  <project.icon size={18} strokeWidth={1.75} />
                </div>

                <div>
                  <span
                    className={`block font-mono text-xs uppercase tracking-widest ${project.accent}`}
                  >
                    {t(project.categoryKey)}
                  </span>
                  <h3 className="mt-1 font-sans text-lg font-semibold text-text-primary">
                    {t(project.nameKey)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {t(project.descriptionKey)}
                  </p>

                  <div className="mt-4">
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
                      <span className="inline-flex w-fit items-center rounded-md border border-white/10 bg-bg/60 px-2.5 py-1 font-mono text-xs text-text-secondary backdrop-blur">
                        {t(project.badgeKey!)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
