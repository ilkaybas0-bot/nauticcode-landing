"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const t = useTranslations("header");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: t("navServices"), href: "#services" },
    { label: t("navArchitecture"), href: "#architecture" },
    { label: t("navStack"), href: "#stack" },
    { label: t("navCaseStudies"), href: "#case-studies" },
    { label: t("navAbout"), href: "#about" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-bg/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <a href="#" className="flex items-center gap-2">
          <Image
            src="/logo-mark.png"
            alt=""
            width={259}
            height={159}
            priority
            className="h-8 w-auto"
          />
          <span className="font-sans text-base font-semibold tracking-tight text-text-primary">
            Nautic<span className="text-accent-cyan">Code</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-sm text-text-secondary transition-colors hover:text-accent-cyan"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-5 md:flex">
          <LanguageSwitcher />
          <a
            href="#contact"
            className="inline-flex items-center rounded-md border border-accent-cyan/40 bg-accent-cyan/10 px-4 py-2 font-mono text-sm font-medium text-accent-cyan shadow-glow-cyan transition-all hover:bg-accent-cyan/20 hover:shadow-glow-cyan-lg"
          >
            {t("cta")}
          </a>
        </div>

        <button
          type="button"
          aria-label={t("toggleMenu")}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-text-secondary md:hidden"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-b border-border bg-bg/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-2 py-2.5 font-mono text-sm text-text-secondary transition-colors hover:bg-surface hover:text-accent-cyan"
                >
                  {link.label}
                </a>
              ))}
              <LanguageSwitcher className="px-2 py-2.5" />
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-flex items-center justify-center rounded-md border border-accent-cyan/40 bg-accent-cyan/10 px-4 py-2.5 font-mono text-sm font-medium text-accent-cyan"
              >
                {t("cta")}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
