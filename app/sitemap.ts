import { categories } from "@/lib/categories";
import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://foss.compare";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories
    .filter((category) => category.status === "Active")
    .map((category) => ({
      url: `${baseUrl}/comparison/${category.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  return [...staticRoutes, ...categoryRoutes];
}
