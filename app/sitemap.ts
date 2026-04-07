import type { MetadataRoute } from "next";
import { BRANCHEN_SLUGS } from "@/lib/branchen-templates";
import { STAEDTE } from "@/lib/seo-data";

const BASE_URL = "https://aigrowthsystem.de";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/branche`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/impressum`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/datenschutz`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/agb`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  // /branche/[slug] — 7 Branchen
  const brancheRoutes: MetadataRoute.Sitemap = BRANCHEN_SLUGS.map((slug) => ({
    url: `${BASE_URL}/branche/${slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // /branche/[slug]/[stadt] — 7 × 50 = 350 Kombinationen
  const stadtRoutes: MetadataRoute.Sitemap = BRANCHEN_SLUGS.flatMap((slug) =>
    STAEDTE.map((stadt) => ({
      url: `${BASE_URL}/branche/${slug}/${stadt.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  );

  return [...staticRoutes, ...brancheRoutes, ...stadtRoutes];
}
