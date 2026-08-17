import { AdminPageHeader } from "@/components/admin/AdminUi";
import { AgreementBuilder } from "@/components/admin/WorkspaceForms";
import { requireAdmin } from "@/lib/admin/auth";

export default async function NewAgreementPage() {
  const { supabase } = await requireAdmin();
  const [firms, contacts, opportunities, quotes] = await Promise.all([supabase.from("firms").select("id,name").order("name"), supabase.from("contacts").select("id,firm_id,full_name,email").order("full_name"), supabase.from("opportunities").select("id,firm_id,contact_id,title").order("updated_at", { ascending: false }), supabase.from("quotes").select("id,quote_number").order("created_at", { ascending: false })]);
  return <main id="main-content"><AdminPageHeader title="New agreement" description="Prepare a client-specific starting draft. Replace every bracketed prompt and obtain qualified legal review before issue." /><div className="mx-auto max-w-[1100px] px-5 py-8 sm:px-8 lg:px-10"><AgreementBuilder firms={firms.data || []} contacts={contacts.data || []} opportunities={opportunities.data || []} quotes={quotes.data || []} /></div></main>;
}
