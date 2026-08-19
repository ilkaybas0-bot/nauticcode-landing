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
  variant = "dropdown",
}: {
  className?: string;
  /** "inline" avoids absolute positioning entirely — needed anywhere the
   * switcher sits inside an `overflow-hidden` animated container (like the
   * mobile menu panel), which would otherwise clip a floating dropdown. */
  variant?: "dropdown" | "inline";
}) {
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menuPos, setMenuPos] = useState<{ top: number; right: number } | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  // Positions the dropdown by real, on-screen pixel coordinates (measured
  // from the toggle button) rather than CSS `top-full` relative to an
  // ancestor. `top-full` depends on the nearest positioned ancestor being
  // exactly where you expect, which broke under the header's own entrance
  // animation — fixed-position + measured coordinates can't drift like that.
  function updatePosition() {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMenuPos({ top: rect.bottom + 8, right: window.innerWidth - rect.right });
  }

  useEffect(() => {
    if (!open || variant !== "dropdown") return;

    updatePosition();

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
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, variant]);

  if (variant === "inline") {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`} role="listbox">
        {LOCALES.map((l) => (
          <Link
            key={l.code}
            href={pathname}
            locale={l.code}
            role="option"
            aria-selected={l.code === locale}
            className={`flex items-center gap-2 rounded-md border px-2.5 py-1.5 font-mono text-xs transition-colors ${
              l.code === locale
                ? "border-accent-cyan/40 text-accent-cyan"
                : "border-border text-text-secondary hover:border-accent-cyan/40 hover:text-accent-cyan"
            }`}
          >
            <l.Flag aria-hidden className="h-3 w-4 flex-shrink-0 rounded-[2px]" />
            <span>{l.code.toUpperCase()}</span>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        ref={buttonRef}
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
        {open && menuPos && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            role="listbox"
            style={{ top: menuPos.top, right: menuPos.right }}
            className="glass fixed z-50 w-40 rounded-md py-1 shadow-2xl"
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
