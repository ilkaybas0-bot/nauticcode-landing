import { defineRouting } from "next-intl/routing";

export const locales = ["en", "tr", "es", "it", "ar", "zh"] as const;

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  localePrefix: "as-needed",
});
