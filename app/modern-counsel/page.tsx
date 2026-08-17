import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowRight, Check } from "lucide-react";
import { AuditForm } from "@/components/AuditForm";
import { Reveal, ScoreBar } from "@/components/MotionSystem";
import { SiteSwitcher } from "@/components/SiteSwitcher";

export const metadata: Metadata = {
  title: "Modern Counsel",
  description: "A structured, analytical direction for Specter, digital growth consultancy for South African law firms.",
};

const modules = [
  ["01", "Website", "A digital experience designed around your highest-value practice areas.", "More visitors reaching enquiry actions."],
  ["02", "Search", "Technical, local and practice-area SEO built around real legal demand.", "Greater visibility where commercial intent exists."],
  ["03", "Conversion", "Behaviour, messaging and enquiry optimisation across the whole journey.", "More value from existing website traffic."],
  ["04", "Systems", "Tracking, CRM and enquiry automation without unnecessary complexity.", "Fewer qualified opportunities falling through the cracks."],
];

const measures = ["Organic visibility", "Qualified enquiries", "Conversion rate", "Consultation requests", "Practice-area performance", "Source attribution"];

export default function ModernCounselPage() {
  const strategyUrl = process.env.NEXT_PUBLIC_STRATEGY_CALL_URL || "#audit";

  return (
    <div className="concept-shell bg-[#f6f7f5] font-[family-name:var(--font-manrope)] text-[#121a23] [--focus:#274a5d]">
      <header className="sticky top-0 z-40 border-b border-[#dde2e3] bg-[#f6f7f5]/95 backdrop-blur-md">
        <nav aria-label="Primary navigation" className="mx-auto flex min-h-20 max-w-[1240px] items-center justify-between gap-6 px-5 sm:px-8">
          <Link href="/" className="text-[13px] font-bold tracking-[.28em]">SPECTER</Link>
          <div className="hidden items-center gap-7 text-[13px] font-semibold text-[#53606a] lg:flex">
            <a href="#services" className="transition-colors hover:text-[#274a5d]">Services</a>
            <a href="#approach" className="transition-colors hover:text-[#274a5d]">Approach</a>
            <a href="#measure" className="transition-colors hover:text-[#274a5d]">Measurement</a>
            <a href="#audit" className="transition-colors hover:text-[#274a5d]">Contact</a>
          </div>
          <a href="#audit" className="flex min-h-11 items-center rounded-[4px] bg-[#121a23] px-5 text-[13px] font-semibold text-white transition-colors hover:bg-[#274a5d]">Get Your Audit</a>
        </nav>
      </header>

      <main id="main-content">
        <section className="relative overflow-hidden border-b border-[#dde2e3]">
          <div className="mx-auto grid min-h-[720px] max-w-[1240px] items-center gap-14 px-5 py-16 sm:px-8 lg:grid-cols-[1.1fr_.9fr] lg:py-24">
            <div>
              <h1 className="balanced max-w-[760px] font-[family-name:var(--font-dm-serif)] text-[clamp(3.2rem,6vw,5.25rem)] font-normal leading-[.98] tracking-[-.035em]">
                Turn your firm’s digital presence into measurable growth.
              </h1>
              <p className="pretty mt-8 max-w-[62ch] text-base leading-7 text-[#53606a] sm:text-lg">
                Specter combines strategy, websites, SEO, conversion optimisation and automation to help established South African law firms generate more qualified opportunities.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-6">
                <a href="#audit" className="flex min-h-12 items-center gap-3 rounded-[4px] bg-[#121a23] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#274a5d]">
                  Request Your Growth Audit <ArrowRight size={16} aria-hidden="true" />
                </a>
                <a href="#approach" className="flex min-h-11 items-center gap-2 text-sm font-semibold text-[#274a5d]">See How It Works <ArrowDown size={15} aria-hidden="true" /></a>
                <a href={strategyUrl} className="flex min-h-11 items-center text-sm font-semibold text-[#274a5d]">Book a Strategy Call →</a>
              </div>
            </div>

            <Reveal className="relative rounded-lg border border-[#c7d0d2] bg-[#fcfcfa] p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-[#dde2e3] pb-5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#65727a]">Illustrative Specter audit</p>
                  <h2 className="mt-2 font-[family-name:var(--font-dm-serif)] text-3xl">Digital Growth Score</h2>
                </div>
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#9cabad] font-[family-name:var(--font-dm-serif)] text-2xl">54</span>
              </div>
              <div className="mt-8 space-y-6">
                <ScoreBar label="Website experience" score={82} />
                <ScoreBar label="Search visibility" score={46} delay={0.1} />
                <ScoreBar label="Conversion journey" score={58} delay={0.2} />
                <ScoreBar label="Tracking" score={31} delay={0.3} />
              </div>
              <div className="mt-8 flex items-center gap-3 rounded-[6px] bg-[#e7ecec] p-4 text-sm font-semibold text-[#274a5d]">
                <Check size={17} aria-hidden="true" /> 3 priority opportunities identified
              </div>
            </Reveal>
          </div>
        </section>

        <section aria-label="Growth system" className="bg-[#121a23] text-[#f6f7f5]">
          <div className="mx-auto grid max-w-[1240px] md:grid-cols-4">
            {[["Website", "Designed to convert."], ["Search", "Built around demand."], ["Conversion", "Measured continuously."], ["Automation", "Built to reduce leakage."]].map(([title, body], index) => (
              <div key={title} className={`px-5 py-8 sm:px-8 ${index ? "border-t border-[#36424b] md:border-l md:border-t-0" : ""}`}>
                <h2 className="text-sm font-semibold">{title}</h2>
                <p className="mt-2 text-sm text-[#acb5ba]">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="approach" className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-14 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
            <div>
              <h2 className="balanced font-[family-name:var(--font-dm-serif)] text-[clamp(2.8rem,5vw,4.8rem)] leading-[.98] tracking-[-.03em]">Your website isn’t the strategy.</h2>
              <p className="mt-7 max-w-lg leading-7 text-[#53606a]">Specter improves the entire path between someone searching for legal help and choosing to speak with your firm.</p>
            </div>
            <Reveal className="rounded-lg border border-[#c7d0d2] bg-[#fcfcfa] p-6 sm:p-9">
              <ol className="space-y-0">
                {['Search', 'Website', 'Trust', 'Enquiry', 'Consultation'].map((item, index) => (
                  <li key={item} className="relative flex min-h-20 items-center justify-between border-b border-[#dde2e3] last:border-b-0">
                    <span className="text-xs font-semibold text-[#586870]">0{index + 1}</span>
                    <span className="font-[family-name:var(--font-dm-serif)] text-3xl sm:text-4xl">{item}</span>
                    <span className="h-2 w-2 rounded-full bg-[#274a5d]" aria-hidden="true" />
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>

        <section id="services" className="border-y border-[#dde2e3] bg-[#e7ecec]">
          <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 sm:py-28">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <h2 className="max-w-2xl font-[family-name:var(--font-dm-serif)] text-[clamp(2.7rem,5vw,4.5rem)] leading-none tracking-[-.03em]">Four connected levers. One commercial outcome.</h2>
              <p className="max-w-sm leading-7 text-[#53606a]">Every module is designed to strengthen the path to a qualified conversation.</p>
            </div>
            <div className="mt-14 space-y-3">
              {modules.map(([number, title, body, outcome], index) => (
                <Reveal key={title} delay={index * 0.05} className="grid gap-6 rounded-lg border border-[#c7d0d2] bg-[#fcfcfa] p-6 md:grid-cols-[5rem_.45fr_.8fr_.75fr] md:items-center md:p-8">
                  <span className="text-xs font-bold text-[#274a5d]">{number}</span>
                  <h3 className="font-[family-name:var(--font-dm-serif)] text-3xl">{title}</h3>
                  <p className="leading-7 text-[#53606a]">{body}</p>
                  <p className="border-t border-[#dde2e3] pt-5 text-sm leading-6 md:border-l md:border-t-0 md:pl-6 md:pt-0"><strong>Outcome:</strong> {outcome}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="measure" className="mx-auto grid max-w-[1240px] gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <h2 className="balanced font-[family-name:var(--font-dm-serif)] text-[clamp(2.8rem,5vw,4.7rem)] leading-[.98] tracking-[-.03em]">Proof starts with knowing what matters.</h2>
            <p className="mt-7 max-w-md leading-7 text-[#53606a]">No invented growth claims. Specter creates the measurement foundation your firm needs to see what is actually working.</p>
          </div>
          <div className="grid sm:grid-cols-2">
            {measures.map((item, index) => (
              <div key={item} className={`flex min-h-32 items-end border-b border-[#c7d0d2] py-6 sm:px-6 ${index % 2 ? "sm:border-l" : ""}`}>
                <span className="mr-auto font-[family-name:var(--font-dm-serif)] text-2xl">{item}</span>
                <span className="text-xs text-[#274a5d]">0{index + 1}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="audit" className="bg-[#d8e0e1]">
          <div className="mx-auto grid max-w-[1240px] gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <h2 className="balanced font-[family-name:var(--font-dm-serif)] text-[clamp(2.8rem,5vw,4.7rem)] leading-[.98] tracking-[-.03em]">Find the gaps before spending more on marketing.</h2>
              <p className="mt-7 max-w-md leading-7 text-[#53606a]">Give us your current website and a few details about the firm. We’ll identify the areas most likely to restrict your digital growth.</p>
            </div>
            <div className="rounded-lg border border-[#bbc6c8] bg-[#fcfcfa] p-6 sm:p-9">
              <AuditForm variant="modern" concept="Modern Counsel" twoStep />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#121a23] px-5 pb-28 pt-14 text-white sm:px-8">
        <div className="mx-auto flex max-w-[1240px] flex-col justify-between gap-8 border-t border-[#36424b] pt-7 text-sm text-[#acb5ba] sm:flex-row">
          <span className="font-bold tracking-[.28em] text-white">SPECTER</span>
          <span>Growth infrastructure for South African law firms.</span>
          <span>Modern Counsel / 02</span>
        </div>
      </footer>
      <SiteSwitcher active="/modern-counsel" />
    </div>
  );
}
