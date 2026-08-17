import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Jurivo — Digital Growth for Law Firms",
    short_name: "Jurivo",
    description: "Law firm websites, SEO and digital growth systems for established South African legal practices.",
    start_url: "/",
    display: "standalone",
    background_color: "#090a0b",
    theme_color: "#090a0b",
  };
}
