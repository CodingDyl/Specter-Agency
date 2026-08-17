import { AdminPageHeader } from "@/components/admin/AdminUi";
import { QuoteBuilder } from "@/components/admin/WorkspaceForms";
import { requireAdmin } from "@/lib/admin/auth";

export default async function NewQuotePage() {
  const { supabase } = await requireAdmin();
  const [firms, contacts, opportunities] = await Promise.all([supabase.from("firms").select("id,name").order("name"), supabase.from("contacts").select("id,firm_id,full_name,email").order("full_name"), supabase.from("opportunities").select("id,firm_id,contact_id,title").not("stage", "in", "(lost)").order("updated_at", { ascending: false })]);
  return <main id="main-content"><AdminPageHeader title="New quote" description="Build a precise commercial scope. Totals recalculate in the interface and are independently recalculated by the database." /><div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-10"><QuoteBuilder firms={firms.data || []} contacts={contacts.data || []} opportunities={opportunities.data || []} /></div></main>;
}
