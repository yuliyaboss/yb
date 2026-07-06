import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { GOALS } from "@/lib/data/goals";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.url}/builder`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteConfig.url}/polityka-prywatnosci`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteConfig.url}/regulamin`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteConfig.url}/cookies`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const goalRoutes: MetadataRoute.Sitemap = GOALS.map((goal) => ({
    url: `${siteConfig.url}/cele/${goal.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...goalRoutes];
}
