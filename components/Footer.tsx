"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-center font-mono text-xs text-text-secondary sm:flex-row sm:text-left lg:px-8">
        <p>{t("copyright", { year })}</p>
        <div className="flex items-center gap-4">
          <Link href="/terms" className="transition-colors hover:text-accent-cyan">
            {t("termsOfService")}
          </Link>
          <Link href="/privacy" className="transition-colors hover:text-accent-cyan">
            {t("privacyPolicy")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
