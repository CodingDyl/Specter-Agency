import type { Metadata } from "next";

const DEFAULT_SITE_URL = "https://www.jurivo.co.za";

function getCanonicalSiteUrl() {
  try {
    const configuredUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL);

    configuredUrl.protocol = "https:";
    configuredUrl.pathname = "/";
    configuredUrl.search = "";
    configuredUrl.hash = "";

    // The production apex domain permanently redirects to www. Keep every
    // canonical signal on the final, indexable host even if an older env value
    // still contains the apex domain.
    if (configuredUrl.hostname === "jurivo.co.za") {
      configuredUrl.hostname = "www.jurivo.co.za";
    }

    return configuredUrl.origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const siteConfig = {
  name: "Jurivo",
  url: getCanonicalSiteUrl(),
  locale: "en_ZA",
  language: "en-ZA",
  market: "South Africa",
  description:
    "Law firm websites, SEO, conversion optimisation and enquiry systems for established South African legal practices.",
  socialImage: "/black-label-johannesburg-office.png",
} as const;

export function absoluteUrl(pathname = "/") {
  return new URL(pathname, `${siteConfig.url}/`).toString();
}

type PageMetadataOptions = {
  title: string;
  description: string;
  pathname: string;
  absoluteTitle?: boolean;
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description,
  pathname,
  absoluteTitle = false,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const canonicalUrl = absoluteUrl(pathname);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: noIndex ? undefined : { canonical: pathname },
    openGraph: {
      title,
      description,
      type: "website",
      locale: siteConfig.locale,
      url: canonicalUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.socialImage,
          width: 1672,
          height: 941,
          alt: "Jurivo digital growth services for South African law firms",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.socialImage],
    },
    robots: noIndex
      ? { index: false, follow: false, nocache: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/icon.svg"),
      },
      description: siteConfig.description,
      areaServed: {
        "@type": "Country",
        name: siteConfig.market,
      },
      knowsAbout: [
        "Law firm website strategy",
        "Law firm website design and development",
        "Search engine optimisation for law firms",
        "Local search visibility",
        "Conversion optimisation",
        "Marketing analytics",
        "Enquiry automation",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Digital growth services for South African law firms",
        itemListElement: [
          "Law firm website strategy, design and development",
          "Technical, local and practice-area SEO",
          "Conversion optimisation and analytics",
          "Enquiry tracking and automation",
        ].map((name) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name,
            areaServed: { "@type": "Country", name: siteConfig.market },
            provider: { "@id": `${siteConfig.url}/#organization` },
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,
      inLanguage: siteConfig.language,
      publisher: { "@id": `${siteConfig.url}/#organization` },
    },
  ],
};
