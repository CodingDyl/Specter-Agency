import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Cormorant_Garamond, DM_Serif_Display, Instrument_Sans, Manrope } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { organizationJsonLd, siteConfig } from "@/lib/site-config";
import "./globals.css";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-cormorant", display: "swap" });
const instrument = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument", display: "swap" });
const dmSerif = DM_Serif_Display({ subsets: ["latin"], weight: "400", variable: "--font-dm-serif", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const bodoni = Bodoni_Moda({ subsets: ["latin"], variable: "--font-bodoni", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "Law Firm Websites & SEO South Africa | Jurivo", template: "%s | Jurivo" },
  description: siteConfig.description,
  applicationName: "Jurivo",
  creator: "Jurivo",
  publisher: "Jurivo",
  category: "Professional services",
  referrer: "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    apple: [{ url: "/logo.png", type: "image/png" }],
  },
  openGraph: {
    title: "Law Firm Websites & SEO South Africa | Jurivo",
    description: siteConfig.description,
    type: "website",
    locale: "en_ZA",
    url: "/",
    siteName: "Jurivo",
    images: [{ url: siteConfig.socialImage, width: siteConfig.socialImageWidth, height: siteConfig.socialImageHeight, alt: "Jurivo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Law Firm Websites & SEO South Africa | Jurivo",
    description: siteConfig.description,
    images: [siteConfig.socialImage],
  },
  robots: {
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
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
      : undefined,
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#090a0b" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-ZA" className={`${cormorant.variable} ${instrument.variable} ${dmSerif.variable} ${manrope.variable} ${bodoni.variable}`}>
      <body>
        <JsonLd data={organizationJsonLd} />
        <span className="hidden" aria-hidden="true" dangerouslySetInnerHTML={{ __html: "<!-- THESIS: Cinematic professional authority makes Jurivo unmistakable without luxury or legal cliché. OWN-WORLD: carbon, warm paper, bone, restrained wine, Bodoni scale, thin rules, and decisive architectural imagery. STORY: reputation earns consideration; a connected digital system earns the enquiry; a calm confirmation makes the handoff credible. FIRST VIEWPORT: the homepage anchors one commanding promise in Johannesburg at blue hour; successful audit requests resolve into one decisive thank-you and a transparent next-step sequence. FORM: user-selected Black Label direction; seed key 6bd845cb. FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md -->" }} />
        <a className="skip-link" href="#main-content">Skip to main content</a>
        {children}
      </body>
    </html>
  );
}
