import type { Metadata } from "next";
import { getImageProps } from "next/image";
import Link from "next/link";
import { ArrowRight, CornerDownLeft } from "lucide-react";
import { StrategyCallForm } from "@/components/StrategyCallForm";

export const metadata: Metadata = {
  title: "Website Strategy Call for Law Firms",
  description:
    "A focused strategy call for South African law firms ready to move on a new website, redesign or digital growth system.",
  alternates: { canonical: "/strategy-call" },
};

const ownerOutcomes = [
  {
    title: "Understand the firm before recommending the website",
    body: "The conversation should start with the matters you want more of, the reputation you need to protect and the commercial reason the project matters now.",
  },
  {
    title: "Name what the current experience is costing us",
    body: "I would want a direct view of where the firm is difficult to understand, discover or instruct — without turning the call into a generic sales presentation.",
  },
  {
    title: "See the shape of a credible first plan",
    body: "Positioning, site architecture, priority content, search foundations and enquiry paths should connect as one plan rather than five unrelated services.",
  },
  {
    title: "Leave knowing whether there is a fit",
    body: "The call should end with a clear decision: what Jurivo would need next, who needs to be involved and whether a scoped engagement makes sense.",
  },
];

const agenda = [
  ["01", "Commercial context", "What the firm is building toward, which work matters most and why the current website has become a priority."],
  ["02", "Digital direction", "The strongest positioning, experience and visibility opportunities worth carrying into the new website."],
  ["03", "Delivery reality", "Decision-makers, existing assets, scope dependencies, investment readiness and the constraints that should shape the project."],
  ["04", "Next decision", "A candid fit assessment and the information required to prepare an appropriate next step."],
] as const;

const readySignals = [
  "A new website or strategic redesign is already a firm priority.",
  "A decision-maker or partner can join the conversation.",
  "The firm can explain what needs to change, even if the solution is not defined.",
  "You are ready to discuss scope and investment, not collect generic ideas.",
];

const preparation = [
  "The matters or practice areas the new website must support.",
  "The commercial event or constraint creating urgency.",
  "Who will approve the work and who will contribute content.",
  "Any current brand, website, copy or photography worth retaining.",
];

export default function StrategyCallPage() {
  const heroAlt = "";
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

  return (
    <div className="min-h-screen bg-[#090a0b] font-[family-name:var(--font-instrument)] text-[#efece5] [--focus:#efece5]">
      <main id="main-content">
        <section className="relative isolate min-h-[780px] overflow-hidden">
          <picture className="absolute inset-0 -z-20">
            <source media="(max-width: 767px)" srcSet={mobileHero.srcSet} />
            <img
              {...desktopHero}
              alt={heroAlt}
              className="h-full w-full object-cover object-center md:object-[64%_center]"
            />
          </picture>
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(9,10,11,.58)_0%,rgba(9,10,11,.82)_52%,rgba(9,10,11,.96)_100%)] md:bg-[linear-gradient(90deg,rgba(9,10,11,.96)_0%,rgba(9,10,11,.82)_48%,rgba(9,10,11,.28)_100%)]" />

          <header className="border-b border-white/20">
            <nav aria-label="Strategy call navigation" className="mx-auto flex min-h-20 max-w-[1320px] items-center justify-between gap-5 px-5 sm:px-8">
              <Link href="/" className="flex min-h-11 items-center text-[13px] font-semibold tracking-[.34em]">
                JURIVO
              </Link>
              <div className="flex items-center gap-5 sm:gap-7">
                <Link href="/#audit" className="hidden min-h-11 items-center text-sm font-medium text-[#c1c0bc] transition-colors duration-200 hover:text-white sm:flex">
                  Growth Audit
                </Link>
                <Link href="/" className="group flex min-h-11 items-center gap-2 text-sm font-semibold text-[#efece5]">
                  <CornerDownLeft size={16} aria-hidden="true" />
                  Return home
                </Link>
              </div>
            </nav>
          </header>

          <div className="mx-auto flex min-h-[700px] max-w-[1320px] items-end px-5 pb-20 pt-16 sm:px-8 sm:pb-24">
            <div className="max-w-[920px]">
              <h1 className="balanced font-[family-name:var(--font-bodoni)] text-[clamp(3.8rem,7vw,6rem)] font-normal leading-[.92] tracking-[-.035em]">
                When the website cannot wait.
              </h1>
              <div className="mt-9 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                <div>
                  <p className="pretty max-w-[64ch] text-base leading-7 text-[#c1c0bc] sm:text-lg">
                    A focused working session for law firms that have decided to move — and need the right website, direction and delivery plan around that decision.
                  </p>
                  <p className="mt-5 max-w-[64ch] text-sm leading-6 text-[#a4a5a3]">
                    If you are still diagnosing the opportunity, the <Link href="/#audit" className="inline-flex min-h-11 items-center text-[#efece5] underline underline-offset-4">Growth Audit</Link> is the better place to start.
                  </p>
                </div>
                <a href="#book" className="group flex min-h-12 w-fit items-center gap-3 rounded-[2px] bg-[#efece5] px-6 text-sm font-semibold text-[#090a0b] transition-colors duration-200 hover:bg-white">
                  Start the Strategy Brief
                  <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f3f0e9] text-[#090a0b]">
          <div className="mx-auto grid max-w-[1320px] gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[.78fr_1.22fr]">
            <div>
              <h2 className="balanced font-[family-name:var(--font-bodoni)] text-[clamp(2.9rem,5vw,4.8rem)] leading-[.96] tracking-[-.03em]">
                What I would need from this call.
              </h2>
              <p className="mt-7 max-w-md leading-7 text-[#565650]">
                From a law-firm owner’s seat, the conversation is only useful if it respects the firm’s reputation and moves a real decision forward.
              </p>
            </div>

            <div className="border-t border-[#9f9d96]">
              {ownerOutcomes.map((outcome) => (
                <article key={outcome.title} className="grid gap-4 border-b border-[#cbc6bc] py-7 sm:grid-cols-[.85fr_1.15fr] sm:gap-8">
                  <h3 className="font-[family-name:var(--font-bodoni)] text-2xl leading-[1.05]">{outcome.title}</h3>
                  <p className="max-w-[58ch] leading-7 text-[#565650]">{outcome.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#181a1c] text-[#efece5]">
          <div className="mx-auto max-w-[1320px] px-5 py-20 sm:px-8 sm:py-28">
            <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr]">
              <div>
                <h2 className="balanced font-[family-name:var(--font-bodoni)] text-[clamp(2.9rem,5vw,4.8rem)] leading-[.96] tracking-[-.03em]">
                  The conversation has a job to do.
                </h2>
                <p className="mt-7 max-w-md leading-7 text-[#a4a5a3]">
                  This is not a speculative brainstorm. It is a structured first decision about the website your firm needs next.
                </p>
              </div>
              <ol className="border-t border-[#4b4d4f]">
                {agenda.map(([number, title, body]) => (
                  <li key={title} className="grid gap-4 border-b border-[#343638] py-7 sm:grid-cols-[54px_190px_1fr] sm:gap-6">
                    <span className="text-xs font-semibold tracking-[.16em] text-[#c49098]">{number}</span>
                    <h3 className="font-[family-name:var(--font-bodoni)] text-2xl leading-none">{title}</h3>
                    <p className="max-w-[54ch] leading-7 text-[#a4a5a3]">{body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="bg-[#f3f0e9] text-[#090a0b]">
          <div className="mx-auto grid max-w-[1320px] gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="balanced font-[family-name:var(--font-bodoni)] text-[clamp(2.8rem,5vw,4.5rem)] leading-[.96] tracking-[-.03em]">
                This route is built for readiness.
              </h2>
              <ul className="mt-10 border-t border-[#9f9d96]">
                {readySignals.map((signal) => (
                  <li key={signal} className="border-b border-[#cbc6bc] py-5 leading-7 text-[#565650]">{signal}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="balanced font-[family-name:var(--font-bodoni)] text-[clamp(2.8rem,5vw,4.5rem)] leading-[.96] tracking-[-.03em]">
                Bring the decision, not a perfect brief.
              </h2>
              <ul className="mt-10 border-t border-[#9f9d96]">
                {preparation.map((item) => (
                  <li key={item} className="border-b border-[#cbc6bc] py-5 leading-7 text-[#565650]">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="book" className="scroll-mt-6 bg-[#090a0b] text-[#efece5]">
          <div className="mx-auto grid max-w-[1320px] gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[.62fr_1.38fr]">
            <div>
              <h2 className="balanced font-[family-name:var(--font-bodoni)] text-[clamp(3rem,5vw,4.8rem)] leading-[.96] tracking-[-.03em]">
                Give the call something real to work with.
              </h2>
              <p className="mt-7 max-w-md leading-7 text-[#a4a5a3]">
                Share the commercial context first. Jurivo will use it to make the strategy conversation specific to your firm rather than repeating a standard agency pitch.
              </p>
            </div>
            <StrategyCallForm />
          </div>
        </section>
      </main>

      <footer className="bg-[#090a0b] px-5 pb-12 text-sm text-[#a4a5a3] sm:px-8">
        <div className="mx-auto flex max-w-[1320px] flex-col justify-between gap-5 border-t border-[#343638] pt-7 sm:flex-row">
          <span className="tracking-[.3em] text-[#efece5]">JURIVO</span>
          <span>Digital growth for South African law firms.</span>
          <span>South Africa</span>
        </div>
      </footer>
    </div>
  );
}
