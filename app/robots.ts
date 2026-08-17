import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/executive-editorial", "/modern-counsel"],
    },
    sitemap: "https://specter.co.za/sitemap.xml",
    host: "https://specter.co.za",
  };
}
