import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin", "/executive-editorial", "/modern-counsel"] },
      {
        userAgent: ["OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot"],
        allow: "/",
        disallow: ["/admin", "/executive-editorial", "/modern-counsel"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
