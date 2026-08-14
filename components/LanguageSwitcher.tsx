"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

const LOCALES = [
  { code: "en", flag: "🇬🇧", name: "English" },
  { code: "tr", flag: "🇹🇷", name: "Türkçe" },
  { code: "es", flag: "🇪🇸", name: "Español" },
  { code: "it", flag: "🇮🇹", name: "Italiano" },
  { code: "ar", flag: "🇸🇦", name: "العربية" },
  { code: "zh", flag: "🇨🇳", name: "中文" },
] as const;

export default function LanguageSwitcher({
  className = "",
}: {
  className?: string;
}) {
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  useEffect(() => {
    if (!open) return;

    function onPointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 font-mono text-xs text-text-secondary transition-colors hover:border-accent-cyan/40 hover:text-accent-cyan"
      >
        <span aria-hidden>{current.flag}</span>
        <span>{current.code.toUpperCase()}</span>
        <ChevronDown
          size={12}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            role="listbox"
            className="glass absolute right-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-md py-1 shadow-2xl"
          >
            {LOCALES.map((l) => (
              <Link
                key={l.code}
                href={pathname}
                locale={l.code}
                role="option"
                aria-selected={l.code === locale}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 font-mono text-sm transition-colors ${
                  l.code === locale
                    ? "text-accent-cyan"
                    : "text-text-secondary hover:bg-surface hover:text-text-primary"
                }`}
              >
                <span aria-hidden>{l.flag}</span>
                <span>{l.name}</span>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
