import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Strategy brief received",
  description: "Your Jurivo website strategy brief has been received.",
  robots: { index: false, follow: false },
};

export default function StrategyCallReceivedPage() {
  return (
    <main id="main-content" className="flex min-h-screen items-center bg-[#090a0b] px-5 py-20 font-[family-name:var(--font-instrument)] text-[#efece5] sm:px-8">
      <div className="mx-auto w-full max-w-[1100px] border-y border-[#343638] py-16 sm:py-24">
        <div className="flex size-12 items-center justify-center rounded-full border border-[#6a3038] text-[#c49098]" aria-hidden="true">
          <Check size={20} strokeWidth={1.8} />
        </div>
        <h1 className="balanced mt-9 max-w-4xl font-[family-name:var(--font-bodoni)] text-[clamp(3.8rem,7vw,6rem)] leading-[.92] tracking-[-.035em]">
          Your brief is in the right hands.
        </h1>
        <p className="mt-8 max-w-[64ch] text-base leading-7 text-[#a4a5a3] sm:text-lg">
          Jurivo has received the context for your website strategy call. We’ll use the work email you provided to arrange the conversation and clarify anything needed before it begins.
        </p>
        <div className="mt-10 flex flex-wrap gap-5">
          <Link href="/" className="group inline-flex min-h-12 items-center gap-3 rounded-[2px] bg-[#efece5] px-6 text-sm font-semibold text-[#090a0b] transition-colors duration-200 hover:bg-white">
            Return to Jurivo
            <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" size={16} aria-hidden="true" />
          </Link>
          <Link href="/#approach" className="inline-flex min-h-12 items-center text-sm font-semibold text-[#c1c0bc] transition-colors duration-200 hover:text-white">
            Explore our approach
          </Link>
        </div>
      </div>
    </main>
  );
}
