import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Cormorant_Garamond, DM_Serif_Display, Instrument_Sans, Manrope } from "next/font/google";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jurivo.co.za";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-cormorant", display: "swap" });
const instrument = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument", display: "swap" });
const dmSerif = DM_Serif_Display({ subsets: ["latin"], weight: "400", variable: "--font-dm-serif", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const bodoni = Bodoni_Moda({ subsets: ["latin"], variable: "--font-bodoni", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Jurivo — Digital Growth for Law Firms", template: "%s | Jurivo" },
  description: "Websites, search visibility, conversion optimisation and smarter digital systems for established South African law firms.",
  applicationName: "Jurivo",
  category: "Professional services",
  openGraph: {
    title: "Jurivo — Digital Growth for Law Firms",
    description: "Digital growth for established South African law firms.",
    type: "website",
    locale: "en_ZA",
    url: "/",
    siteName: "Jurivo",
    images: [{ url: "/black-label-johannesburg-office.png", width: 1672, height: 941, alt: "Jurivo — digital growth for South African law firms" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jurivo — Digital Growth for Law Firms",
    description: "Digital growth for established South African law firms.",
    images: ["/black-label-johannesburg-office.png"],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#090a0b" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-ZA" className={`${cormorant.variable} ${instrument.variable} ${dmSerif.variable} ${manrope.variable} ${bodoni.variable}`}>
      <body>
        <span className="hidden" aria-hidden="true" dangerouslySetInnerHTML={{ __html: "<!-- THESIS: Cinematic professional authority makes Jurivo unmistakable without luxury or legal cliché. OWN-WORLD: carbon, warm paper, bone, restrained wine, Bodoni scale, thin rules, and decisive architectural imagery. STORY: reputation earns consideration; a connected digital system earns the enquiry; a calm confirmation makes the handoff credible. FIRST VIEWPORT: the homepage anchors one commanding promise in Johannesburg at blue hour; successful audit requests resolve into one decisive thank-you and a transparent next-step sequence. FORM: user-selected Black Label direction; seed key 6bd845cb. FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md -->" }} />
        <a className="skip-link" href="#main-content">Skip to main content</a>
        {children}
      </body>
    </html>
  );
}
