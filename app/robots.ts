import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jurivo.co.za";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/executive-editorial", "/modern-counsel"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
