"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navigationItems = [
  ["Expertise", "/#expertise"],
  ["Approach", "/#approach"],
  ["Law Firm SEO", "/services/law-firm-seo-south-africa"],
  ["Contact", "/#audit"],
] as const;

export function BlackLabelNavigation() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <nav aria-label="Primary navigation" className="relative mx-auto flex min-h-20 max-w-[1320px] items-center justify-between gap-6 px-5 sm:px-8">
      <Link href="/" className="text-[13px] font-semibold tracking-[.34em]" onClick={() => setOpen(false)}>
        JURIVO
      </Link>

      <div className="hidden items-center gap-7 text-[13px] font-medium text-[#d0cdc7] lg:flex">
        {navigationItems.map(([label, href]) => (
          <Link key={href} href={href} className="transition-colors duration-200 hover:text-white">{label}</Link>
        ))}
      </div>

      <Link href="/#audit" className="hidden min-h-11 items-center rounded-[2px] bg-[#efece5] px-5 text-[13px] font-semibold text-[#090a0b] transition-colors duration-200 hover:bg-white sm:flex">
        Request an Audit
      </Link>

      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen((value) => !value)}
        className="flex h-11 w-11 items-center justify-center border border-white/30 text-[#efece5] transition-colors duration-200 hover:border-white lg:hidden"
      >
        {open ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
      </button>

      <div
        id="mobile-navigation"
        hidden={!open}
        className="absolute left-0 right-0 top-full z-50 border-y border-[#343638] bg-[#090a0b] px-5 py-5 shadow-[0_20px_45px_rgba(0,0,0,.32)] sm:px-8 lg:hidden"
      >
        <div className="mx-auto flex max-w-[1320px] flex-col">
          {navigationItems.map(([label, href]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)} className="flex min-h-14 items-center border-b border-[#343638] text-base text-[#efece5] transition-colors duration-200 hover:text-white">
              {label}
            </Link>
          ))}
          <Link href="/#audit" onClick={() => setOpen(false)} className="mt-5 flex min-h-12 items-center justify-center rounded-[2px] bg-[#efece5] px-6 text-sm font-semibold text-[#090a0b] transition-colors duration-200 hover:bg-white">
            Request Your Growth Audit
          </Link>
        </div>
      </div>
    </nav>
  );
}
