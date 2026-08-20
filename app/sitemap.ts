import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const SITE_URL = "https://mogenssoftware.com";

function localePath(locale: string) {
  return locale === routing.defaultLocale ? "" : `/${locale}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const languages = Object.fromEntries(
    routing.locales.map((locale) => [locale, `${SITE_URL}${localePath(locale)}`])
  );

  const homeEntries: MetadataRoute.Sitemap = routing.locales.map((locale) => ({
    url: `${SITE_URL}${localePath(locale)}`,
    lastModified,
    changeFrequency: "monthly",
    priority: locale === routing.defaultLocale ? 1 : 0.9,
    alternates: { languages },
  }));

  function legalEntries(path: string): MetadataRoute.Sitemap {
    const pathLanguages = Object.fromEntries(
      routing.locales.map((locale) => [locale, `${SITE_URL}${localePath(locale)}${path}`])
    );
    return routing.locales.map((locale) => ({
      url: `${SITE_URL}${localePath(locale)}${path}`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: { languages: pathLanguages },
    }));
  }

  return [...homeEntries, ...legalEntries("/privacy"), ...legalEntries("/terms")];
}
