"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

export function DiagnosticDisclosure({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const panelId = `diagnostic-${number}`;

  return (
    <div className="border-b border-[#9f9d96]">
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={() => setExpanded((value) => !value)}
        className="grid min-h-24 w-full grid-cols-[3rem_1fr_auto] items-center gap-4 py-5 text-left"
      >
        <span className="text-xs text-[#6a3038]">{number}</span>
        <span className="font-[family-name:var(--font-bodoni)] text-3xl sm:text-4xl">{title}</span>
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#9f9d96] transition-colors hover:bg-[#090a0b] hover:text-white">
          <Plus className={`transition-transform duration-300 ${expanded ? "rotate-45" : ""}`} size={16} aria-hidden="true" />
        </span>
      </button>
      <div id={panelId} hidden={!expanded} className="pb-6 pl-12 pr-14 text-sm leading-6 text-[#565650]">
        {children}
      </div>
    </div>
  );
}
