import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AdminPageHeader, EmptyState, StatusBadge } from "@/components/admin/AdminUi";
import { requireAdmin } from "@/lib/admin/auth";
import { formatDate } from "@/lib/admin/format";

export default async function AgreementsPage() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("agreements").select("id,agreement_number,title,status,created_at,firms(name),contacts(full_name)").order("created_at", { ascending: false });
  return <main id="main-content"><AdminPageHeader title="Agreements" description="Editable letter-of-agreement drafts linked to the client journey. Every document remains a draft until it has been legally reviewed and deliberately issued." actionHref="/admin/agreements/new" actionLabel="New agreement" /><div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-10">{data?.length ? <div className="divide-y divide-[#cbc6bc] border-y border-[#9f9d96]">{data.map((agreement) => <Link key={agreement.id} href={`/admin/agreements/${agreement.id}`} className="group grid gap-3 py-5 md:grid-cols-[.8fr_1.4fr_.7fr_.7fr_auto] md:items-center"><strong>{agreement.agreement_number}</strong><span>{agreement.title}<small className="mt-1 block text-[#686761]">{(agreement.firms as unknown as { name: string } | null)?.name}</small></span><StatusBadge value={agreement.status} /><span className="text-sm text-[#686761]">{formatDate(agreement.created_at)}</span><ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></Link>)}</div> : <EmptyState title="No agreements drafted" body="Create an editable commercial agreement from an approved scope. Legal review remains a required human step." href="/admin/agreements/new" action="Create a draft" />}</div></main>;
}
