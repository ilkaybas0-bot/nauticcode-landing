import type { MetadataRoute } from "next";

const SITE_URL = "https://nauticcode.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          en: SITE_URL,
          tr: `${SITE_URL}/tr`,
        },
      },
    },
    {
      url: `${SITE_URL}/tr`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          en: SITE_URL,
          tr: `${SITE_URL}/tr`,
        },
      },
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
