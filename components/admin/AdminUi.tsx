import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatStage } from "@/lib/admin/format";

const statusTone: Record<string, string> = {
  initial_contact: "border-[#9f9d96] text-[#565650]",
  discovery: "border-[#7c766e] text-[#4d4943]",
  qualified: "border-[#6a3038] bg-[#f0e2e2] text-[#6a3038]",
  scoping: "border-[#6a3038] text-[#6a3038]",
  quote_sent: "border-[#445e68] bg-[#e3eaeb] text-[#334b54]",
  negotiation: "border-[#7a6235] bg-[#eee7d8] text-[#664f27]",
  won: "border-[#476451] bg-[#e2ebe5] text-[#36513f]",
  lost: "border-[#80605f] bg-[#eee2e1] text-[#6b4746]",
  on_hold: "border-[#8c8981] text-[#686761]",
  active: "border-[#476451] bg-[#e2ebe5] text-[#36513f]",
  draft: "border-[#9f9d96] text-[#565650]",
  sent: "border-[#445e68] bg-[#e3eaeb] text-[#334b54]",
  accepted: "border-[#476451] bg-[#e2ebe5] text-[#36513f]",
  signed: "border-[#476451] bg-[#e2ebe5] text-[#36513f]",
};

export function StatusBadge({ value }: { value: string }) {
  return <span className={`inline-flex min-h-7 items-center rounded-[2px] border px-2.5 text-xs font-semibold ${statusTone[value] || "border-[#9f9d96] text-[#565650]"}`}>{formatStage(value)}</span>;
}

export function AdminPageHeader({
  title,
  description,
  actionHref,
  actionLabel,
}: {
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <header className="border-b border-[#cbc6bc] bg-[#f3f0e9] px-5 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-[-.025em] sm:text-4xl">{title}</h1>
          <p className="mt-3 max-w-[68ch] text-sm leading-6 text-[#565650]">{description}</p>
        </div>
        {actionHref && actionLabel ? (
          <Link href={actionHref} className="group inline-flex min-h-11 w-fit items-center gap-3 rounded-[2px] bg-[#090a0b] px-5 text-sm font-semibold text-[#efece5] transition-colors duration-200 hover:bg-[#6a3038]">
            {actionLabel}<ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" size={16} aria-hidden="true" />
          </Link>
        ) : null}
      </div>
    </header>
  );
}

export function EmptyState({ title, body, href, action }: { title: string; body: string; href?: string; action?: string }) {
  return (
    <div className="border-y border-[#cbc6bc] py-12">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 max-w-[64ch] text-sm leading-6 text-[#686761]">{body}</p>
      {href && action ? <Link href={href} className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-[#6a3038] underline underline-offset-4">{action}</Link> : null}
    </div>
  );
}
