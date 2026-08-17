import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AuditForm } from "@/components/AuditForm";
import { Reveal } from "@/components/MotionSystem";
import { SiteSwitcher } from "@/components/SiteSwitcher";

export const metadata: Metadata = {
  title: "Executive Editorial",
  description: "A restrained editorial direction for Jurivo, digital growth consultancy for South African law firms.",
};

const observations = [
  ["Visibility", "Potential clients cannot instruct a firm they cannot find."],
  ["Positioning", "Generic legal websites give prospective clients no reason to choose one firm over another."],
  ["Conversion", "Traffic has little commercial value when visitors never become consultations."],
];

const services = [
  ["01", "Website", "High-converting digital experiences designed around your firm’s strongest practice areas."],
  ["02", "Search", "SEO and local visibility designed to put your firm in front of active demand."],
  ["03", "Conversion", "Improve the journey between search, trust, enquiry and consultation."],
  ["04", "Automation", "Tracking, follow-up and workflows that prevent valuable enquiries from disappearing."],
];

const processSteps = [
  ["Analyse", "Understand the firm’s market, website and growth opportunities."],
  ["Position", "Clarify why prospective clients should choose the firm."],
  ["Build", "Create the website, search infrastructure and conversion journey."],
  ["Improve", "Measure behaviour and continuously improve performance."],
];

export default function ExecutiveEditorialPage() {
  const strategyUrl = process.env.NEXT_PUBLIC_STRATEGY_CALL_URL || "#audit";

  return (
    <div className="concept-shell bg-[#f4f1ea] font-[family-name:var(--font-instrument)] text-[#101112] [--focus:#692b35]">
      <header className="border-b border-[#d8d3c9]">
        <nav aria-label="Primary navigation" className="mx-auto flex min-h-20 max-w-[1200px] items-center justify-between gap-6 px-5 sm:px-8">
          <Link href="/" className="text-[13px] font-semibold tracking-[.32em]">JURIVO</Link>
          <div className="hidden items-center gap-7 text-[13px] font-medium lg:flex">
            <a href="#services" className="transition-colors hover:text-[#692b35]">How We Help</a>
            <a href="#approach" className="transition-colors hover:text-[#692b35]">Our Approach</a>
            <a href="#investigate" className="transition-colors hover:text-[#692b35]">The Audit</a>
            <a href="#about" className="transition-colors hover:text-[#692b35]">The Digital Gap</a>
          </div>
          <a href="#audit" className="flex min-h-11 items-center bg-[#101112] px-5 text-[13px] font-semibold text-[#f4f1ea] transition-colors hover:bg-[#692b35]">
            Request Your Audit
          </a>
        </nav>
      </header>

      <main id="main-content">
        <section className="mx-auto grid max-w-[1200px] gap-14 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.36fr_.94fr] lg:gap-20 lg:py-28">
          <div className="flex flex-col justify-center">
            <h1 className="balanced max-w-[780px] font-[family-name:var(--font-cormorant)] text-[clamp(3rem,6.2vw,5.5rem)] font-normal leading-[.94] tracking-[-.035em]">
              Your reputation is established. Your digital presence should prove it.
            </h1>
            <p className="pretty mt-8 max-w-[62ch] text-base leading-7 text-[#494945] sm:text-lg">
              Jurivo helps ambitious law firms generate more qualified enquiries through high-converting websites, search visibility and smarter digital systems.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a href="#audit" className="flex min-h-12 items-center gap-3 bg-[#101112] px-6 text-sm font-semibold text-[#f4f1ea] transition-colors hover:bg-[#692b35]">
                Request Your Growth Audit <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a href={strategyUrl} className="group flex min-h-11 items-center text-sm font-semibold">
                Book a Strategy Call <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
            <p className="mt-5 text-sm text-[#686761]">No obligation. We review your current digital presence before we speak.</p>
          </div>

          <Reveal className="self-center border border-[#bdb8ae] bg-[#e9e5dc] p-6 sm:p-8">
            <div className="mb-12 flex items-center justify-between border-b border-[#cbc5ba] pb-4 text-[10px] uppercase tracking-[.18em] text-[#692b35]">
              <span>Jurivo / Initial review</span>
              <span>01</span>
            </div>
            <h2 className="max-w-xs font-[family-name:var(--font-cormorant)] text-4xl leading-none tracking-[-.025em]">Start with your website.</h2>
            <form action="#audit" className="mt-10">
              <label htmlFor="editorial-website" className="mb-2 block text-sm font-semibold">Current website</label>
              <input id="editorial-website" type="url" inputMode="url" placeholder="https://yourfirm.co.za" className="min-h-13 w-full rounded-[4px] border border-[#77746e] bg-[#f4f1ea] px-4 text-base placeholder:text-[#64625d] focus:border-[#692b35] focus:outline-none" />
              <button className="mt-4 flex min-h-12 w-full items-center justify-center gap-3 bg-[#101112] px-5 text-sm font-semibold text-[#f4f1ea] transition-colors hover:bg-[#692b35]">
                Analyse My Firm <ArrowRight aria-hidden="true" size={16} />
              </button>
            </form>
            <p className="mt-5 max-w-sm text-sm leading-6 text-[#5d5b56]">We’ll review your website, search visibility and client enquiry journey.</p>
          </Reveal>
        </section>

        <section aria-label="Practice areas" className="border-y border-[#d8d3c9]">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-5 py-8 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
            <p className="font-[family-name:var(--font-cormorant)] text-2xl">Built for established South African legal practices.</p>
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-[10px] font-semibold tracking-[.16em] text-[#696660]">
              {['Corporate', 'Litigation', 'Property', 'Family law', 'Employment', 'Estates'].map((item) => <span key={item}>{item.toUpperCase()}</span>)}
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-28">
          <div>
            <div>
              <Reveal>
                <h2 className="balanced max-w-[850px] font-[family-name:var(--font-cormorant)] text-[clamp(2.6rem,5vw,4.7rem)] leading-[.97] tracking-[-.03em]">A strong reputation cannot compensate for a weak first impression.</h2>
              </Reveal>
              <div className="mt-16 grid border-t border-[#bdb8ae] md:grid-cols-3">
                {observations.map(([title, body], index) => (
                  <article key={title} className={`py-7 md:px-7 ${index > 0 ? "border-t border-[#bdb8ae] md:border-l md:border-t-0" : ""}`}>
                    <h3 className="font-[family-name:var(--font-cormorant)] text-3xl">{title}</h3>
                    <p className="mt-4 text-base leading-7 text-[#5d5b56]">{body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="bg-[#e9e5dc]">
          <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-28">
            <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(2.7rem,5vw,4.5rem)] leading-none tracking-[-.03em]">One system. Four points of leverage.</h2>
            <div className="mt-14 grid border-t border-[#bdb8ae] md:grid-cols-2 lg:grid-cols-4">
              {services.map(([number, title, body], index) => (
                <Reveal key={title} delay={index * 0.06} className={`min-h-64 py-7 md:px-6 ${index ? "border-t border-[#bdb8ae] md:border-l md:border-t-0" : ""}`}>
                  <p className="text-xs tracking-[.16em] text-[#692b35]">{number}</p>
                  <h3 className="mt-12 text-sm font-semibold uppercase tracking-[.14em]">{title}</h3>
                  <p className="mt-4 leading-7 text-[#56544f]">{body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="investigate" className="bg-[#101112] text-[#f4f1ea]">
          <div className="mx-auto grid max-w-[1200px] gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <h2 className="balanced font-[family-name:var(--font-cormorant)] text-[clamp(2.8rem,5vw,4.8rem)] leading-[.96] tracking-[-.03em]">Before we recommend anything, we investigate.</h2>
              <a href="#audit" className="group mt-10 inline-flex min-h-12 items-center gap-3 border-b border-[#f4f1ea] text-sm font-semibold">
                Request My Firm’s Audit <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
            <Reveal className="border border-[#424345] p-5 sm:p-7">
              <div className="flex justify-between border-b border-[#424345] pb-5 text-[10px] uppercase tracking-[.16em] text-[#aaa9a3]">
                <span>Illustrative diagnostic scope</span><span>Confidential</span>
              </div>
              <div className="mt-3">
                {['Website performance', 'Search visibility', 'Practice-area coverage', 'Conversion paths', 'Local visibility', 'Enquiry tracking'].map((item, index) => (
                  <div key={item} className="grid grid-cols-[2rem_1fr_auto] items-center gap-4 border-b border-[#343638] py-4">
                    <span className="text-xs text-[#8f8f8b]">0{index + 1}</span>
                    <span className="text-sm sm:text-base">{item}</span>
                    <span className="text-[10px] uppercase tracking-[.14em] text-[#bf9299]">Review</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="approach" className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-28">
          <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(2.7rem,5vw,4.5rem)] leading-none tracking-[-.03em]">How Jurivo works.</h2>
          <div className="mt-14 grid border-t border-[#bdb8ae] sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map(([title, body], index) => (
              <article key={title} className={`py-7 sm:px-6 ${index ? "border-t border-[#bdb8ae] sm:border-l sm:border-t-0" : ""}`}>
                <p className="text-xs text-[#692b35]">0{index + 1}</p>
                <h3 className="mt-10 font-[family-name:var(--font-cormorant)] text-3xl">{title}</h3>
                <p className="mt-4 leading-7 text-[#5d5b56]">{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="audit" className="border-t border-[#d8d3c9] bg-[#e9e5dc]">
          <div className="mx-auto grid max-w-[1200px] gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <h2 className="balanced font-[family-name:var(--font-cormorant)] text-[clamp(2.8rem,5vw,4.7rem)] leading-[.96] tracking-[-.03em]">Let’s see where your firm is losing opportunities.</h2>
              <p className="mt-7 max-w-md leading-7 text-[#5d5b56]">No obligation. We review your current digital presence before we speak.</p>
            </div>
            <AuditForm variant="editorial" concept="Executive Editorial" />
          </div>
        </section>
      </main>

      <footer className="bg-[#101112] px-5 pb-28 pt-14 text-[#f4f1ea] sm:px-8">
        <div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-8 border-t border-[#343638] pt-7 text-sm text-[#aaa9a3] sm:flex-row">
          <span className="tracking-[.28em] text-[#f4f1ea]">JURIVO</span>
          <span>Digital growth for South African law firms.</span>
          <span>Executive Editorial / 01</span>
        </div>
      </footer>
      <SiteSwitcher active="/executive-editorial" />
    </div>
  );
}
