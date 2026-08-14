"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLocale } from "next-intl";
import GB from "country-flag-icons/react/3x2/GB";
import TR from "country-flag-icons/react/3x2/TR";
import ES from "country-flag-icons/react/3x2/ES";
import IT from "country-flag-icons/react/3x2/IT";
import SA from "country-flag-icons/react/3x2/SA";
import CN from "country-flag-icons/react/3x2/CN";
import { Link, usePathname } from "@/i18n/navigation";

// Emoji flags render as plain "GB"/"TR" text on Windows (Segoe UI Emoji has
// no flag glyphs), so we use real SVG flag icons instead.
const LOCALES = [
  { code: "en", Flag: GB, name: "English" },
  { code: "tr", Flag: TR, name: "Türkçe" },
  { code: "es", Flag: ES, name: "Español" },
  { code: "it", Flag: IT, name: "Italiano" },
  { code: "ar", Flag: SA, name: "العربية" },
  { code: "zh", Flag: CN, name: "中文" },
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
        <current.Flag aria-hidden className="h-3 w-4 rounded-[2px]" />
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
                <l.Flag aria-hidden className="h-3.5 w-5 flex-shrink-0 rounded-[2px]" />
                <span>{l.name}</span>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
