import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AdminPageHeader, EmptyState, StatusBadge } from "@/components/admin/AdminUi";
import { requireAdmin } from "@/lib/admin/auth";
import { formatCurrency, formatDate } from "@/lib/admin/format";

export default async function QuotesPage() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("quotes").select("id,quote_number,status,issue_date,valid_until,total,currency,firms(name),contacts(full_name)").order("created_at", { ascending: false });
  return <main id="main-content"><AdminPageHeader title="Quotes" description="Commercial proposals with itemised scope, automatic totals, VAT handling, and a printable client view." actionHref="/admin/quotes/new" actionLabel="New quote" /><div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-10">{data?.length ? <div className="divide-y divide-[#cbc6bc] border-y border-[#9f9d96]">{data.map((quote) => <Link key={quote.id} href={`/admin/quotes/${quote.id}`} className="group grid min-h-20 gap-3 py-5 md:grid-cols-[.8fr_1.2fr_.7fr_.7fr_auto] md:items-center"><strong>{quote.quote_number}</strong><span>{(quote.firms as unknown as { name: string } | null)?.name}</span><StatusBadge value={quote.status} /><span className="text-sm text-[#686761]">{formatDate(quote.issue_date)}</span><span className="flex items-center justify-between gap-3 font-semibold">{formatCurrency(Number(quote.total), quote.currency)}<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></span></Link>)}</div> : <EmptyState title="No quotes drafted" body="Create the first structured quote from a qualified opportunity." href="/admin/quotes/new" action="Create a quote" />}</div></main>;
}
