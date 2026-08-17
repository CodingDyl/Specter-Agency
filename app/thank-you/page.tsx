import type { Metadata } from "next";
import { getImageProps } from "next/image";
import Link from "next/link";
import { ArrowRight, Check, CornerDownLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Your Jurivo Growth Audit request has been received.",
  robots: { index: false, follow: false },
};

const nextSteps = [
  {
    title: "Review",
    body: "We’ll examine the information you shared and, when available, your firm’s current website.",
  },
  {
    title: "Context",
    body: "If we need anything else, we’ll reply directly to the work email you provided.",
  },
  {
    title: "Conversation",
    body: "We’ll contact you to discuss the strongest opportunities and an appropriate next step.",
  },
];

export default function ThankYouPage() {
  const configuredStrategyUrl = process.env.NEXT_PUBLIC_STRATEGY_CALL_URL;
  const strategyUrl = configuredStrategyUrl || "/#approach";
  const strategyLabel = configuredStrategyUrl ? "Book a Strategy Call" : "Explore Our Approach";
  const strategyBody = configuredStrategyUrl
    ? "If timing matters, you can reserve a focused strategy conversation while we review your request."
    : "While we review your request, see how Jurivo connects positioning, visibility and conversion into one growth system.";
  const { props: desktopHeroImage } = getImageProps({
    src: "/black-label-johannesburg-office.png",
    alt: "",
    width: 1672,
    height: 941,
    sizes: "100vw",
    fetchPriority: "high",
  });
  const { props: mobileHeroImage } = getImageProps({
    src: "/black-label-johannesburg-office-mobile.png",
    alt: "",
    width: 1024,
    height: 1536,
    sizes: "100vw",
    fetchPriority: "high",
  });

  return (
    <main id="main-content" className="min-h-screen bg-[#090a0b] font-[family-name:var(--font-instrument)] text-[#efece5] [--focus:#efece5]">
      <header className="relative z-20 border-b border-white/20">
        <div className="mx-auto flex min-h-20 max-w-[1320px] items-center justify-between gap-6 px-5 sm:px-8">
          <Link href="/" className="flex min-h-11 items-center text-[13px] font-semibold tracking-[.3em]">
            JURIVO
          </Link>
          <Link href="/" className="group flex min-h-11 items-center gap-2 text-sm font-semibold text-[#c1c0bc] transition-colors duration-200 hover:text-[#efece5]">
            <CornerDownLeft size={16} aria-hidden="true" />
            Return home
          </Link>
        </div>
      </header>

      <section className="relative isolate overflow-hidden border-b border-[#343638]">
        <picture className="absolute inset-0 -z-20">
          <source media="(max-width: 767px)" srcSet={mobileHeroImage.srcSet} />
          <img
            {...desktopHeroImage}
            alt=""
            className="h-full w-full object-cover object-center md:object-[70%_center]"
          />
        </picture>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(9,10,11,.62)_0%,rgba(9,10,11,.84)_58%,rgba(9,10,11,.94)_100%)] md:bg-[linear-gradient(90deg,#090a0b_0%,#090a0b_48%,rgba(9,10,11,.88)_67%,rgba(9,10,11,.3)_100%)]" />

        <div className="mx-auto grid min-h-[620px] max-w-[1320px] items-center px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[1.08fr_.92fr]">
          <div className="max-w-3xl lg:pr-16">
            <div className="flex size-12 items-center justify-center rounded-full border border-[#6a3038] text-[#c49098]" aria-hidden="true">
              <Check size={20} strokeWidth={1.8} />
            </div>
            <h1 className="balanced mt-9 font-[family-name:var(--font-bodoni)] text-[clamp(3.8rem,7vw,6rem)] font-normal leading-[.92] tracking-[-.035em]">
              Thank you. We’ll take it from here.
            </h1>
            <p className="pretty mt-8 max-w-[64ch] text-base leading-7 text-[#c1c0bc] sm:text-lg">
              Your Growth Audit request has reached Jurivo. We’ll review what you shared before we contact you, so the first conversation can start with something useful.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#f3f0e9] text-[#090a0b]">
        <div className="mx-auto grid max-w-[1320px] gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[.72fr_1.28fr]">
          <div>
            <h2 className="balanced font-[family-name:var(--font-bodoni)] text-[clamp(2.9rem,5vw,4.8rem)] leading-[.96] tracking-[-.03em]">
              What happens next.
            </h2>
            <p className="mt-7 max-w-md leading-7 text-[#565650]">
              No automated score and no generic sales sequence. A real review comes before any recommendation.
            </p>
          </div>

          <ol className="border-t border-[#9f9d96]">
            {nextSteps.map((step, index) => (
              <li key={step.title} className="grid gap-4 border-b border-[#cbc6bc] py-7 sm:grid-cols-[48px_180px_1fr] sm:items-start sm:gap-6">
                <span className="text-xs font-semibold tracking-[.16em] text-[#6a3038]">0{index + 1}</span>
                <h3 className="font-[family-name:var(--font-bodoni)] text-2xl leading-none">{step.title}</h3>
                <p className="max-w-[54ch] leading-7 text-[#565650]">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[#181a1c] text-[#efece5]">
        <div className="mx-auto grid max-w-[1320px] gap-10 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h2 className="balanced max-w-3xl font-[family-name:var(--font-bodoni)] text-[clamp(2.8rem,5vw,4.6rem)] leading-[.96] tracking-[-.03em]">
              Prefer to move sooner?
            </h2>
            <p className="mt-6 max-w-xl leading-7 text-[#a4a5a3]">
              {strategyBody}
            </p>
          </div>
          <Link
            href={strategyUrl}
            className="group inline-flex min-h-12 w-fit items-center gap-3 rounded-[2px] bg-[#efece5] px-6 py-3 text-sm font-semibold text-[#090a0b] transition-colors duration-200 hover:bg-white"
          >
            {strategyLabel}
            <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <footer className="bg-[#090a0b] px-5 pb-12 pt-8 text-sm text-[#a4a5a3] sm:px-8">
        <div className="mx-auto flex max-w-[1320px] flex-col justify-between gap-5 border-t border-[#343638] pt-7 sm:flex-row">
          <span className="tracking-[.3em] text-[#efece5]">JURIVO</span>
          <span>Digital growth for South African law firms.</span>
          <span>South Africa</span>
        </div>
      </footer>
    </main>
  );
}
