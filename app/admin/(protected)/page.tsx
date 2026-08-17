import Link from "next/link";
import { ArrowRight, CalendarClock } from "lucide-react";
import { AdminPageHeader, EmptyState, StatusBadge } from "@/components/admin/AdminUi";
import { requireAdmin } from "@/lib/admin/auth";
import { formatCurrency, formatDate } from "@/lib/admin/format";
import type { OpportunityListItem } from "@/lib/supabase/types";

export default async function AdminDashboardPage() {
  const { supabase, profile } = await requireAdmin();
  const [opportunitiesResult, quotesResult, projectsResult, servicesResult, eventsResult] = await Promise.all([
    supabase
      .from("opportunities")
      .select("id,title,stage,probability,estimated_value,next_action,next_action_at,updated_at,firm_id,contact_id,enquiry_id,firms(name),contacts(full_name,email),enquiries(kind,created_at)")
      .order("updated_at", { ascending: false })
      .limit(8),
    supabase.from("quotes").select("id,status,total,currency"),
    supabase.from("projects").select("id,status"),
    supabase.from("service_subscriptions").select("id,status,amount,billing_interval"),
    supabase.from("journey_events").select("id,summary,stage,occurred_at,firms(name)").order("occurred_at", { ascending: false }).limit(6),
  ]);

  const opportunities = (opportunitiesResult.data || []) as unknown as OpportunityListItem[];
  const openOpportunities = opportunitiesResult.data?.filter((item) => !["won", "lost"].includes(item.stage)) || [];
  const pipelineValue = openOpportunities.reduce((sum, item) => sum + Number(item.estimated_value || 0), 0);
  const activeProjects = projectsResult.data?.filter((item) => ["onboarding", "active", "blocked"].includes(item.status)).length || 0;
  const openQuotes = quotesResult.data?.filter((item) => ["draft", "sent"].includes(item.status)).length || 0;
  const monthlyRecurring = (servicesResult.data || []).filter((item) => item.status === "active").reduce((sum, item) => {
    const amount = Number(item.amount || 0);
    if (item.billing_interval === "annual") return sum + amount / 12;
    if (item.billing_interval === "quarterly") return sum + amount / 3;
    if (item.billing_interval === "monthly") return sum + amount;
    return sum;
  }, 0);

  return (
    <main id="main-content">
      <AdminPageHeader title={`Good to see you, ${profile.display_name || "Dylan"}.`} description="The commercial picture across first contact, decisions, documents, delivery and recurring relationships." />

      <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        <section aria-label="Business overview" className="grid border-y border-[#9f9d96] sm:grid-cols-2 xl:grid-cols-4">
          {[
            ["Open opportunities", String(openOpportunities.length), "Across every active pipeline stage"],
            ["Weighted pipeline", formatCurrency(pipelineValue), "Known opportunity value before probability"],
            ["Quotes in motion", String(openQuotes), "Draft or sent"],
            ["Recurring monthly", formatCurrency(monthlyRecurring), `${activeProjects} active or onboarding projects`],
          ].map(([label, value, note], index) => (
            <div key={label} className={`py-6 sm:p-6 ${index % 2 ? "sm:border-l" : ""} ${index > 1 ? "border-t xl:border-t-0" : ""} xl:border-l xl:first:border-l-0`}>
              <p className="text-xs font-semibold uppercase tracking-[.12em] text-[#686761]">{label}</p>
              <p className="mt-3 text-3xl font-semibold tracking-[-.025em]">{value}</p>
              <p className="mt-2 text-sm leading-6 text-[#686761]">{note}</p>
            </div>
          ))}
        </section>

        <div className="mt-10 grid gap-10 xl:grid-cols-[1.45fr_.55fr]">
          <section>
            <div className="flex items-center justify-between border-b border-[#9f9d96] pb-4">
              <div>
                <h2 className="text-xl font-semibold">Next commercial actions</h2>
                <p className="mt-1 text-sm text-[#686761]">Most recently active opportunities.</p>
              </div>
              <Link href="/admin/pipeline" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#6a3038]">View pipeline <ArrowRight size={15} aria-hidden="true" /></Link>
            </div>
            {opportunities.length ? (
              <div className="divide-y divide-[#cbc6bc]">
                {opportunities.map((opportunity) => (
                  <article key={opportunity.id} className="grid gap-4 py-5 md:grid-cols-[1.15fr_.6fr_1fr] md:items-center">
                    <div>
                      <h3 className="font-semibold">{opportunity.firms?.name || opportunity.title}</h3>
                      <p className="mt-1 text-sm text-[#686761]">{opportunity.contacts?.full_name} · {opportunity.contacts?.email}</p>
                    </div>
                    <StatusBadge value={opportunity.stage} />
                    <div className="md:text-right">
                      <p className="text-sm font-medium">{opportunity.next_action || "Define the next action"}</p>
                      <p className="mt-1 text-xs text-[#77746e]">{opportunity.next_action_at ? formatDate(opportunity.next_action_at) : "No due date"}</p>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState title="No opportunities yet" body="Growth Audit and strategy-call submissions will appear here automatically after the first successful form submission." href="/" action="Open the public site" />
            )}
          </section>

          <aside>
            <div className="border-b border-[#9f9d96] pb-4">
              <h2 className="text-xl font-semibold">Recent journey</h2>
              <p className="mt-1 text-sm text-[#686761]">An append-only record of meaningful customer moments.</p>
            </div>
            {eventsResult.data?.length ? (
              <ol className="divide-y divide-[#cbc6bc]">
                {eventsResult.data.map((event) => (
                  <li key={event.id} className="py-5">
                    <div className="flex items-start gap-3">
                      <CalendarClock className="mt-0.5 text-[#6a3038]" size={16} aria-hidden="true" />
                      <div>
                        <p className="text-sm font-semibold">{event.summary}</p>
                        <p className="mt-1 text-xs leading-5 text-[#686761]">{(event.firms as unknown as { name: string } | null)?.name || "Jurivo lead"} · {formatDate(event.occurred_at)}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <EmptyState title="The journey starts with a lead" body="Every captured enquiry, stage move, document and project milestone will create a timestamped event here." />
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}
