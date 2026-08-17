import type { Metadata } from "next";
import { getImageProps } from "next/image";
import { ArrowRight, Plus } from "lucide-react";
import { AuditForm } from "@/components/AuditForm";
import { BlackLabelNavigation } from "@/components/BlackLabelNavigation";
import { DiagnosticDisclosure } from "@/components/DiagnosticDisclosure";
import { BlackLabelMotion, Reveal } from "@/components/MotionSystem";

export const metadata: Metadata = {
  title: { absolute: "Jurivo — Digital Growth for South African Law Firms" },
  description: "Jurivo helps established South African law firms generate more qualified enquiries through high-converting websites, search visibility and smarter digital systems.",
  alternates: { canonical: "/" },
};

const diagnostics = [
  ["01", "Visibility", "Be present where active legal demand already exists."],
  ["02", "Positioning", "Make the firm’s difference clear before the first conversation."],
  ["03", "Conversion", "Remove friction between confidence and a qualified enquiry."],
  ["04", "Follow-up", "Keep valuable opportunities from disappearing after contact."],
];

const expertise = [
  ["Web experience", "A decisive digital expression of the firm’s strongest expertise, built around action rather than decoration."],
  ["Search visibility", "Technical, local and practice-area search systems that meet prospects at the moment of need."],
  ["Conversion", "Sharper messages, clearer pathways and fewer reasons for the right client to leave."],
  ["Automation", "Measured handoffs and follow-up systems that protect every qualified opportunity."],
];

export default function BlackLabelPage() {
  const strategyUrl = process.env.NEXT_PUBLIC_STRATEGY_CALL_URL || "#audit";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jurivo.co.za";
  const heroAlt = "A dark, glass-walled executive office overlooking a city at blue hour";
  const { props: desktopHero } = getImageProps({
    src: "/black-label-johannesburg-office.png",
    alt: heroAlt,
    width: 1672,
    height: 941,
    sizes: "100vw",
    fetchPriority: "high",
  });
  const { props: mobileHero } = getImageProps({
    src: "/black-label-johannesburg-office-mobile.png",
    alt: heroAlt,
    width: 1024,
    height: 1536,
    sizes: "100vw",
    fetchPriority: "high",
  });
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Jurivo",
    url: siteUrl,
    description: "Digital growth consultancy for established South African law firms.",
    areaServed: { "@type": "Country", name: "South Africa" },
    serviceType: ["Web experience", "Search visibility", "Conversion optimisation", "Enquiry automation"],
  };

  return (
    <BlackLabelMotion>
      <div className="concept-shell bg-[#090a0b] font-[family-name:var(--font-instrument)] text-[#efece5] [--focus:#efece5]">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <main id="main-content">
        <section className="black-hero relative isolate min-h-[850px] overflow-hidden">
          <div className="black-hero-media absolute inset-0 -z-20 overflow-hidden">
            <picture className="absolute inset-0">
              <source media="(max-width: 767px)" srcSet={mobileHero.srcSet} />
              <img
                src={desktopHero.src}
                srcSet={desktopHero.srcSet}
                sizes={desktopHero.sizes}
                width={desktopHero.width}
                height={desktopHero.height}
                fetchPriority="high"
                alt={heroAlt}
                className="h-full w-full object-cover"
              />
            </picture>
            <video
              className="absolute inset-0 hidden h-full w-full object-cover will-change-transform md:block"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="/black-label-johannesburg-office.png"
              disablePictureInPicture
              aria-hidden="true"
            >
              <source src="/jurivo-office-loop.webm" type="video/webm" media="(min-width: 768px)" />
              <source src="/jurivo-office-loop.mp4" type="video/mp4" media="(min-width: 768px)" />
            </video>
          </div>
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(9,10,11,.90)_0%,rgba(9,10,11,.6)_48%,rgba(9,10,11,.18)_100%)]" />
          <header className="border-b border-white/20">
            <BlackLabelNavigation />
          </header>

          <div className="mx-auto flex min-h-[770px] max-w-[1320px] items-end px-5 pb-20 sm:px-8 sm:pb-24">
            <div className="max-w-[940px]">
              <h1 className="black-hero-title balanced font-[family-name:var(--font-bodoni)] text-[clamp(3.6rem,7vw,6rem)] font-normal leading-[.92] tracking-[-.035em]">
                Your firm didn’t build its reputation by looking like everyone else.
              </h1>
              <div className="mt-9 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
                <p className="black-hero-intro pretty max-w-[62ch] text-base leading-7 text-[#c1c0bc] sm:text-lg">Jurivo helps established South African law firms turn their reputation into a stronger digital presence, greater search visibility and more qualified enquiries.</p>
                <div className="black-hero-actions flex shrink-0 flex-wrap gap-5">
                  <a href="#audit" className="flex min-h-12 items-center gap-3 rounded-[2px] bg-[#efece5] px-6 text-sm font-semibold text-[#090a0b] transition-colors hover:bg-white">
                    Request Your Growth Audit <ArrowRight size={16} aria-hidden="true" />
                  </a>
                  <a href={strategyUrl} className="group flex min-h-12 items-center text-sm font-semibold">Book a Strategy Call <span className="ml-2 transition-transform group-hover:translate-x-1">→</span></a>
                </div>
              </div>
            </div>
          </div>
        </section>

          <section className="bg-[#f3f0e9] text-[#090a0b]">
            <div className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8 sm:py-36">
              <Reveal>
                <p className="font-[family-name:var(--font-bodoni)] text-[clamp(3.3rem,7vw,6rem)] leading-[.95] tracking-[-.035em]">Reputation gets you considered.</p>
                <p className="mt-4 font-[family-name:var(--font-bodoni)] text-[clamp(3.3rem,7vw,6rem)] leading-[.95] tracking-[-.035em] text-[#6a3038]">Positioning gets you chosen.</p>
              </Reveal>
            </div>
          </section>

          <section id="approach" className="bg-[#f3f0e9] text-[#090a0b]">
            <div className="mx-auto grid max-w-[1320px] gap-14 border-t border-[#cbc6bc] px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[.8fr_1.2fr]">
              <div>
                <h2 className="balanced font-[family-name:var(--font-bodoni)] text-[clamp(2.9rem,5vw,4.8rem)] leading-[.96] tracking-[-.03em]">The firms winning online are not necessarily the largest.</h2>
                <p className="mt-7 max-w-lg leading-7 text-[#565650]">They are the firms that make it easier for the right client to discover them, understand their expertise and take the next step.</p>
              </div>
              <div className="border-t border-[#9f9d96]">
                {diagnostics.map(([number, title, body]) => (
                  <DiagnosticDisclosure key={title} number={number} title={title}>{body}</DiagnosticDisclosure>
                ))}
              </div>
            </div>
          </section>

          <section id="expertise" className="bg-[#090a0b] text-[#efece5]">
            <div className="mx-auto max-w-[1320px] px-5 py-20 sm:px-8 sm:py-28">
              <h2 className="balanced max-w-4xl font-[family-name:var(--font-bodoni)] text-[clamp(3rem,6vw,5.6rem)] leading-[.94] tracking-[-.035em]">Jurivo builds the system behind the enquiry.</h2>
              <div className="mt-16 border-t border-[#343638]">
                {expertise.map(([title, body], index) => (
                  <details key={title} className="group border-b border-[#343638] py-2">
                    <summary className="flex min-h-24 list-none cursor-pointer items-center justify-between gap-5 py-5 [&::-webkit-details-marker]:hidden">
                      <span className="text-xs text-[#8d8e8b]">0{index + 1}</span>
                      <h3 className="mr-auto font-[family-name:var(--font-bodoni)] text-[clamp(2rem,5vw,4.4rem)] uppercase leading-none tracking-[-.025em] transition-colors group-open:text-[#c49098]">{title}</h3>
                      <Plus className="transition-transform duration-300 group-open:rotate-45" size={22} aria-hidden="true" />
                    </summary>
                    <p className="mb-8 ml-auto max-w-xl text-base leading-7 text-[#b7b7b3]">{body}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section id="journey" className="journey-track bg-[#181a1c] text-[#efece5]">
            <div className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8 sm:py-36">
              <div className="grid items-center justify-items-center gap-4 md:grid-cols-[auto_1fr_auto_1fr_auto_1fr_auto_1fr_auto] md:justify-items-stretch">
                {['Search', 'Your firm', 'Trust', 'Enquiry', 'Consultation'].map((item, index) => (
                  <div key={item} className="contents">
                    <span className="font-[family-name:var(--font-bodoni)] text-3xl tracking-[-.02em] md:text-2xl lg:text-4xl">{item}</span>
                    {index < 4 ? (
                      <>
                        <span className="journey-line-mobile h-10 w-px origin-top bg-[#6a3038] md:hidden" aria-hidden="true" />
                        <span className="journey-line hidden h-px origin-left bg-[#6a3038] md:block" aria-hidden="true" />
                      </>
                    ) : null}
                  </div>
                ))}
              </div>
              <p className="mx-auto mt-16 max-w-2xl text-center leading-7 text-[#a4a5a3]">Each connection is designed, measured and strengthened as part of one system.</p>
            </div>
          </section>

          <section className="bg-[#f3f0e9] text-[#090a0b]">
            <div className="mx-auto grid max-w-[1320px] gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[.8fr_1.2fr]">
              <div>
                <h2 className="balanced font-[family-name:var(--font-bodoni)] text-[clamp(3rem,5vw,4.8rem)] leading-[.96] tracking-[-.03em]">We start by finding what others overlook.</h2>
                <p className="mt-7 max-w-lg leading-7 text-[#565650]">Before recommending a redesign, campaign or SEO strategy, Jurivo examines the full digital journey surrounding your firm.</p>
                <a href="#audit" className="mt-9 inline-flex min-h-12 items-center gap-3 rounded-[2px] bg-[#090a0b] px-6 text-sm font-semibold text-[#efece5] transition-colors hover:bg-[#6a3038]">Audit My Firm <ArrowRight size={16} aria-hidden="true" /></a>
              </div>
              <div className="grid sm:grid-cols-2">
                {['Market positioning', 'Website experience', 'Practice-area visibility', 'Search presence', 'Conversion paths', 'Analytics', 'Enquiry handling'].map((item, index) => (
                  <div key={item} className={`flex min-h-28 items-end border-b border-[#cbc6bc] py-5 sm:px-5 ${index % 2 ? "sm:border-l" : ""}`}>
                    <span className="mr-auto font-[family-name:var(--font-bodoni)] text-xl">{item}</span>
                    <span className="text-xs text-[#6a3038]">0{index + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="audit" className="bg-[#090a0b] text-[#efece5]">
            <div className="mx-auto grid max-w-[1320px] gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[.75fr_1.25fr]">
              <div>
                <h2 className="balanced font-[family-name:var(--font-bodoni)] text-[clamp(3rem,5vw,4.8rem)] leading-[.96] tracking-[-.03em]">Show us where you are today.</h2>
                <p className="mt-7 max-w-md leading-7 text-[#a4a5a3]">No obligation. No generic sales presentation.</p>
              </div>
              <AuditForm variant="black" concept="Jurivo Website" />
            </div>
          </section>

          <section className="border-t border-[#343638] bg-[#090a0b] px-5 pb-36 pt-24 text-center sm:px-8 sm:py-36">
            <Reveal>
              <h2 className="balanced mx-auto max-w-5xl font-[family-name:var(--font-bodoni)] text-[clamp(3.5rem,7vw,6rem)] leading-[.93] tracking-[-.035em]">Your next client is already looking.</h2>
              <p className="mt-7 text-lg text-[#a4a5a3]">Make sure your firm is the one worth choosing.</p>
              <a href="#audit" className="group mt-10 inline-flex min-h-12 items-center gap-3 border-b border-[#efece5] text-sm font-semibold">Request Your Growth Audit <span className="transition-transform group-hover:translate-x-1">→</span></a>
            </Reveal>
          </section>
        </main>

        <footer className="bg-[#090a0b] px-5 pb-28 text-[#a4a5a3] sm:px-8">
          <div className="mx-auto flex max-w-[1320px] flex-col justify-between gap-8 border-t border-[#343638] pt-7 text-sm sm:flex-row">
            <span className="tracking-[.3em] text-[#efece5]">JURIVO</span>
            <span>Digital growth for South African law firms.</span>
            <span>South Africa</span>
          </div>
        </footer>
      </div>
    </BlackLabelMotion>
  );
}
