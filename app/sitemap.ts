import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      lastModified: "2026-08-17",
      changeFrequency: "monthly",
      priority: 1,
      images: [absoluteUrl("/black-label-johannesburg-office.png")],
    },
    {
      url: absoluteUrl("/services/law-firm-seo-south-africa"),
      lastModified: "2026-08-17",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/strategy-call"),
      lastModified: "2026-08-17",
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
