"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export default function LanguageSwitcher({
  className = "",
}: {
  className?: string;
}) {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className={`flex items-center gap-1.5 font-mono text-sm ${className}`}>
      <Link
        href={pathname}
        locale="en"
        aria-current={locale === "en" ? "true" : undefined}
        className={
          locale === "en"
            ? "text-accent-cyan"
            : "text-text-secondary transition-colors hover:text-accent-cyan"
        }
      >
        EN
      </Link>
      <span aria-hidden className="text-text-secondary/40">
        /
      </span>
      <Link
        href={pathname}
        locale="tr"
        aria-current={locale === "tr" ? "true" : undefined}
        className={
          locale === "tr"
            ? "text-accent-cyan"
            : "text-text-secondary transition-colors hover:text-accent-cyan"
        }
      >
        TR
      </Link>
    </div>
  );
}
