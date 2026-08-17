import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { AuditForm } from "@/components/AuditForm";
import { BlackLabelNavigation } from "@/components/BlackLabelNavigation";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, createPageMetadata, siteConfig } from "@/lib/site-config";

const pathname = "/services/law-firm-seo-south-africa";

export const metadata: Metadata = createPageMetadata({
  title: "Law Firm SEO South Africa",
  description:
    "Technical, local and practice-area SEO for established South African law firms. Build sustainable search visibility around the legal work your firm wants.",
  pathname,
});

const searchFoundations = [
  {
    title: "Technical SEO",
    body: "Crawlability, indexation, site architecture, metadata, structured data, performance and internal linking built into the website rather than added later.",
  },
  {
    title: "Practice-area visibility",
    body: "Useful, focused pages that explain the firm’s priority services clearly and match the questions prospective clients actually need answered.",
  },
  {
    title: "Local search",
    body: "Consistent location and business signals that help search engines understand where the firm operates and which enquiries are geographically relevant.",
  },
  {
    title: "Conversion and measurement",
    body: "Clear enquiry paths, meaningful analytics and lead-source tracking so visibility is evaluated by qualified opportunities, not rankings alone.",
  },
] as const;

const deliverySteps = [
  ["01", "Diagnose demand", "Identify priority practice areas, commercial intent, geographic reach and the current barriers to discovery."],
  ["02", "Build the structure", "Connect service pages, supporting content, local signals and internal links into a coherent search architecture."],
  ["03", "Strengthen every page", "Align titles, headings, copy, schema, media and conversion paths around one clear purpose per URL."],
  ["04", "Measure and improve", "Track organic visibility, qualified enquiries and page-level performance, then improve what the evidence supports."],
] as const;

const frequentlyAskedQuestions = [
  {
    question: "What is SEO for law firms?",
    answer:
      "Law firm SEO is the process of making a legal practice easier to discover and understand in organic search. It combines technical website quality, practice-area content, local business signals, credible entity information, internal linking and measurement around the matters a firm wants to attract.",
  },
  {
    question: "How is South African law firm SEO different from general SEO?",
    answer:
      "The strategy must reflect the firm’s South African market, geographic reach, legal terminology, priority practice areas and reputation. Jurivo also treats trust, accurate claims and a clear route from search to enquiry as essential parts of the work.",
  },
  {
    question: "Does Jurivo guarantee first-place Google rankings?",
    answer:
      "No credible SEO partner can guarantee a particular organic ranking. Jurivo improves the technical, content and conversion foundations the firm controls, measures performance and makes evidence-led improvements without inventing outcomes.",
  },
  {
    question: "How long does law firm SEO take?",
    answer:
      "SEO is a sustained growth channel rather than an instant result. Timing depends on the website’s current condition, competition, authority, content quality and the search demand around each practice area. Jurivo establishes a measurable baseline before recommending priorities.",
  },
  {
    question: "Can SEO be included in a new law firm website?",
    answer:
      "Yes. Building search architecture, technical SEO, content structure and measurement into a new website is more efficient than retrofitting them after launch. Jurivo treats the website and search strategy as one connected system.",
  },
] as const;

const servicePageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${absoluteUrl(pathname)}#service`,
      name: "SEO for South African law firms",
      serviceType: "Law firm search engine optimisation",
      description:
        "Technical, local and practice-area SEO for established South African legal practices.",
      url: absoluteUrl(pathname),
      provider: { "@id": `${siteConfig.url}/#organization` },
      areaServed: { "@type": "Country", name: siteConfig.market },
      audience: {
        "@type": "BusinessAudience",
        audienceType: "Established South African law firms",
      },
    },
    {
      "@type": "WebPage",
      "@id": `${absoluteUrl(pathname)}#webpage`,
      url: absoluteUrl(pathname),
      name: "Law Firm SEO South Africa",
      description:
        "Technical, local and practice-area SEO for established South African law firms.",
      inLanguage: siteConfig.language,
      isPartOf: { "@id": `${siteConfig.url}/#website` },
      about: { "@id": `${absoluteUrl(pathname)}#service` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: "Law Firm SEO South Africa", item: absoluteUrl(pathname) },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${absoluteUrl(pathname)}#frequently-asked-questions`,
      mainEntity: frequentlyAskedQuestions.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ],
};

export default function LawFirmSeoSouthAfricaPage() {
  return (
    <div className="min-h-screen bg-[#090a0b] font-[family-name:var(--font-instrument)] text-[#efece5] [--focus:#efece5]">
      <JsonLd data={servicePageJsonLd} />
      <header className="border-b border-white/20">
        <BlackLabelNavigation />
      </header>

      <main id="main-content">
        <section className="border-b border-[#343638]">
          <div className="mx-auto grid min-h-[680px] max-w-[1320px] items-end gap-12 px-5 pb-20 pt-20 sm:px-8 sm:pb-24 lg:grid-cols-[1.18fr_.82fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.22em] text-[#c49098]">Search visibility / South Africa</p>
              <h1 className="balanced mt-7 max-w-4xl font-[family-name:var(--font-bodoni)] text-[clamp(3.8rem,7vw,6.5rem)] font-normal leading-[.92] tracking-[-.035em]">
                SEO for South African law firms.
              </h1>
              <p className="pretty mt-8 max-w-[65ch] text-base leading-7 text-[#c1c0bc] sm:text-lg">
                Jurivo builds technical, local and practice-area search systems that help established legal practices become easier to find, understand and instruct.
              </p>
              <div className="mt-9 flex flex-wrap gap-5">
                <Link href="/#audit" className="flex min-h-12 items-center gap-3 rounded-[2px] bg-[#efece5] px-6 text-sm font-semibold text-[#090a0b] transition-colors hover:bg-white">
                  Request Your Growth Audit <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link href="/strategy-call" className="flex min-h-12 items-center text-sm font-semibold text-[#efece5] underline decoration-[#6a3038] underline-offset-4">
                  Discuss a new law firm website
                </Link>
              </div>
            </div>

            <aside className="border border-[#4b4d4f] bg-[#181a1c] p-6 sm:p-8" aria-label="Jurivo SEO scope">
              <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#c49098]">One connected search foundation</p>
              <ul className="mt-7 space-y-5">
                {["Technical crawl and index control", "Practice-area search architecture", "South African local relevance", "Qualified-enquiry measurement"].map((item) => (
                  <li key={item} className="flex items-start gap-3 border-b border-[#343638] pb-5 text-sm leading-6 text-[#c1c0bc] last:border-0 last:pb-0">
                    <Check className="mt-1 shrink-0 text-[#c49098]" size={16} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section className="bg-[#f3f0e9] text-[#090a0b]">
          <div className="mx-auto grid max-w-[1320px] gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[.72fr_1.28fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.2em] text-[#6a3038]">What law firm SEO includes</p>
              <h2 className="balanced mt-5 font-[family-name:var(--font-bodoni)] text-[clamp(3rem,5vw,4.8rem)] leading-[.96] tracking-[-.03em]">
                Visibility is useful only when it reaches the right matter.
              </h2>
              <p className="mt-7 max-w-md leading-7 text-[#565650]">
                Rankings are an indicator, not the commercial outcome. Jurivo connects discoverability to trust, enquiry and measurement.
              </p>
            </div>
            <div className="grid gap-px bg-[#cbc6bc] sm:grid-cols-2">
              {searchFoundations.map(({ title, body }) => (
                <article key={title} className="bg-[#f3f0e9] p-6 sm:p-8">
                  <h3 className="font-[family-name:var(--font-bodoni)] text-3xl">{title}</h3>
                  <p className="mt-5 leading-7 text-[#565650]">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#181a1c]">
          <div className="mx-auto max-w-[1320px] px-5 py-20 sm:px-8 sm:py-28">
            <div className="grid gap-14 lg:grid-cols-[.65fr_1.35fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[.2em] text-[#c49098]">The Jurivo approach</p>
                <h2 className="balanced mt-5 font-[family-name:var(--font-bodoni)] text-[clamp(3rem,5vw,4.8rem)] leading-[.96] tracking-[-.03em]">
                  Diagnose before optimising.
                </h2>
              </div>
              <ol className="border-t border-[#4b4d4f]">
                {deliverySteps.map(([number, title, body]) => (
                  <li key={number} className="grid gap-4 border-b border-[#343638] py-7 sm:grid-cols-[54px_190px_1fr] sm:gap-6">
                    <span className="text-xs font-semibold tracking-[.16em] text-[#c49098]">{number}</span>
                    <h3 className="font-[family-name:var(--font-bodoni)] text-2xl leading-none">{title}</h3>
                    <p className="max-w-[58ch] leading-7 text-[#a4a5a3]">{body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="bg-[#f3f0e9] text-[#090a0b]" id="faq">
          <div className="mx-auto grid max-w-[1320px] gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[.72fr_1.28fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.2em] text-[#6a3038]">Frequently asked questions</p>
              <h2 className="balanced mt-5 font-[family-name:var(--font-bodoni)] text-[clamp(3rem,5vw,4.8rem)] leading-[.96] tracking-[-.03em]">
                Law firm SEO without invented promises.
              </h2>
            </div>
            <div className="border-t border-[#9f9d96]">
              {frequentlyAskedQuestions.map(({ question, answer }) => (
                <article key={question} className="border-b border-[#cbc6bc] py-7">
                  <h3 className="font-[family-name:var(--font-bodoni)] text-2xl leading-tight sm:text-3xl">{question}</h3>
                  <p className="mt-4 max-w-[70ch] leading-7 text-[#565650]">{answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#090a0b]" id="audit">
          <div className="mx-auto grid max-w-[1320px] gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[.72fr_1.28fr]">
            <div>
              <h2 className="balanced font-[family-name:var(--font-bodoni)] text-[clamp(3rem,5vw,4.8rem)] leading-[.96] tracking-[-.03em]">
                Find what is limiting your firm’s search visibility.
              </h2>
              <p className="mt-7 max-w-md leading-7 text-[#a4a5a3]">
                Share the firm’s current position and priorities. Jurivo will review the digital journey before recommending the next move.
              </p>
            </div>
            <AuditForm variant="black" concept="Jurivo Website" />
          </div>
        </section>
      </main>

      <footer className="bg-[#090a0b] px-5 pb-12 text-sm text-[#a4a5a3] sm:px-8">
        <div className="mx-auto flex max-w-[1320px] flex-col justify-between gap-5 border-t border-[#343638] pt-7 sm:flex-row">
          <Link href="/" className="tracking-[.3em] text-[#efece5]">JURIVO</Link>
          <span>Law firm SEO across South Africa.</span>
          <Link href="/strategy-call" className="text-[#efece5] underline decoration-[#6a3038] underline-offset-4">Website strategy call</Link>
        </div>
      </footer>
    </div>
  );
}
