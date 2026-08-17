"use client";

import { useActionState, useMemo, useState } from "react";
import { Plus, Printer, Trash2 } from "lucide-react";
import {
  createAgreement,
  createProject,
  createQuote,
  createService,
  updateOpportunity,
  updateLifecycleStatus,
  type WorkspaceActionState,
} from "@/app/admin/(protected)/workspace-actions";
import { formatCurrency } from "@/lib/admin/format";

const initialState: WorkspaceActionState = { status: "idle", message: "" };
const inputClass = "mt-2 min-h-12 w-full rounded-[2px] border border-[#9f9d96] bg-[#f7f4ed] px-3 text-sm outline-none transition-colors focus:border-[#6a3038] focus:ring-2 focus:ring-[#6a3038]/15";
const labelClass = "text-xs font-semibold uppercase tracking-[.1em] text-[#565650]";
const buttonClass = "inline-flex min-h-12 cursor-pointer items-center justify-center rounded-[2px] bg-[#090a0b] px-5 text-sm font-semibold text-[#efece5] transition-colors hover:bg-[#6a3038] disabled:cursor-wait disabled:opacity-60";

type Firm = { id: number; name: string };
type Contact = { id: number; firm_id: number | null; full_name: string; email: string };
type Opportunity = { id: number; firm_id: number; contact_id: number; title: string };
type Project = { id: number; firm_id: number; name: string };

function ActionMessage({ state }: { state: WorkspaceActionState }) {
  if (!state.message) return null;
  return <p role="status" className={`border-l-2 px-3 py-2 text-sm ${state.status === "error" ? "border-[#6a3038] text-[#6a3038]" : "border-[#476451] text-[#36513f]"}`}>{state.message}</p>;
}

function SubmitButton({ label }: { label: string }) {
  return <button type="submit" className={buttonClass}>{label}</button>;
}

export function OpportunityEditor({ opportunity }: { opportunity: { id: number; firm_id: number; contact_id: number; enquiry_id: number | null; stage: string; estimated_value: number | null; probability: number; next_action: string | null; next_action_at: string | null } }) {
  const [state, action] = useActionState(updateOpportunity, initialState);
  return (
    <form action={action} className="grid gap-4 border-t border-[#cbc6bc] pt-5 lg:grid-cols-5">
      <input type="hidden" name="opportunityId" value={opportunity.id} /><input type="hidden" name="firmId" value={opportunity.firm_id} /><input type="hidden" name="contactId" value={opportunity.contact_id} /><input type="hidden" name="enquiryId" value={opportunity.enquiry_id || ""} />
      <label className={labelClass}>Stage<select name="stage" defaultValue={opportunity.stage} className={inputClass}>{["initial_contact","discovery","qualified","scoping","quote_sent","negotiation","won","lost","on_hold"].map((item) => <option value={item} key={item}>{item.replaceAll("_", " ")}</option>)}</select></label>
      <label className={labelClass}>Estimated value<input name="estimatedValue" type="number" min="0" step="0.01" defaultValue={opportunity.estimated_value ?? ""} className={inputClass} /></label>
      <label className={labelClass}>Probability<input name="probability" type="number" min="0" max="100" defaultValue={opportunity.probability} className={inputClass} /></label>
      <label className={`${labelClass} lg:col-span-2`}>Next action<input name="nextAction" defaultValue={opportunity.next_action || ""} maxLength={240} className={inputClass} /></label>
      <label className={labelClass}>Due date<input name="nextActionAt" type="datetime-local" defaultValue={opportunity.next_action_at?.slice(0, 16) || ""} className={inputClass} /></label>
      <div className="flex items-end"><SubmitButton label="Save opportunity" /></div>
      <div className="lg:col-span-3"><ActionMessage state={state} /></div>
    </form>
  );
}

type QuoteItem = { description: string; quantity: number; unitPrice: number };

export function QuoteBuilder({ firms, contacts, opportunities }: { firms: Firm[]; contacts: Contact[]; opportunities: Opportunity[] }) {
  const [state, action] = useActionState(createQuote, initialState);
  const [items, setItems] = useState<QuoteItem[]>([{ description: "Website strategy, design and development", quantity: 1, unitPrice: 0 }]);
  const [vatRate, setVatRate] = useState(0);
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0), [items]);
  const total = subtotal * (1 + vatRate / 100);
  const updateItem = (index: number, values: Partial<QuoteItem>) => setItems((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, ...values } : item));
  return (
    <form action={action} className="grid gap-8 xl:grid-cols-[1fr_340px]">
      <div className="space-y-8">
        <section className="grid gap-5 border-b border-[#cbc6bc] pb-8 md:grid-cols-2">
          <label className={labelClass}>Firm<select required name="firmId" className={inputClass}><option value="">Select a firm</option>{firms.map((firm) => <option key={firm.id} value={firm.id}>{firm.name}</option>)}</select></label>
          <label className={labelClass}>Contact<select required name="contactId" className={inputClass}><option value="">Select a contact</option>{contacts.map((contact) => <option key={contact.id} value={contact.id}>{contact.full_name} — {contact.email}</option>)}</select></label>
          <label className={labelClass}>Opportunity<select name="opportunityId" className={inputClass}><option value="">No linked opportunity</option>{opportunities.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}</select></label>
          <label className={labelClass}>VAT rate (%)<input name="vatRate" type="number" min="0" max="100" step="0.01" value={vatRate} onChange={(event) => setVatRate(Number(event.target.value))} className={inputClass} /></label>
          <label className={labelClass}>Issue date<input required name="issueDate" type="date" defaultValue={new Date().toISOString().slice(0, 10)} className={inputClass} /></label>
          <label className={labelClass}>Valid until<input name="validUntil" type="date" className={inputClass} /></label>
        </section>
        <section>
          <div className="flex items-end justify-between gap-4"><div><h2 className="text-xl font-semibold">Scope and fees</h2><p className="mt-1 text-sm text-[#686761]">Use clear deliverables a law-firm owner can approve.</p></div><button type="button" onClick={() => setItems((current) => [...current, { description: "", quantity: 1, unitPrice: 0 }])} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#6a3038]"><Plus size={16} /> Add item</button></div>
          <input type="hidden" name="items" value={JSON.stringify(items)} />
          <div className="mt-5 divide-y divide-[#cbc6bc] border-y border-[#9f9d96]">{items.map((item, index) => <div key={index} className="grid gap-3 py-4 md:grid-cols-[1fr_90px_150px_44px] md:items-end"><label className={labelClass}>Description<input required value={item.description} onChange={(event) => updateItem(index, { description: event.target.value })} className={inputClass} /></label><label className={labelClass}>Qty<input required type="number" min="0.01" step="0.01" value={item.quantity} onChange={(event) => updateItem(index, { quantity: Number(event.target.value) })} className={inputClass} /></label><label className={labelClass}>Unit price<input required type="number" min="0" step="0.01" value={item.unitPrice} onChange={(event) => updateItem(index, { unitPrice: Number(event.target.value) })} className={inputClass} /></label><button type="button" aria-label={`Remove item ${index + 1}`} disabled={items.length === 1} onClick={() => setItems((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="flex min-h-12 items-center justify-center text-[#6a3038] disabled:opacity-30"><Trash2 size={17} /></button></div>)}</div>
        </section>
        <section className="grid gap-5"><label className={labelClass}>Introduction<textarea name="introduction" rows={4} className={inputClass} placeholder="Purpose, context and intended outcome." /></label><label className={labelClass}>Commercial terms<textarea name="terms" rows={6} className={inputClass} placeholder="Payment milestones, exclusions, dependencies and validity." /></label><label className={labelClass}>Internal notes<textarea name="notes" rows={3} className={inputClass} /></label></section>
      </div>
      <aside className="h-fit border-t-2 border-[#090a0b] bg-[#f3f0e9] p-6 xl:sticky xl:top-6"><p className="text-xs font-semibold uppercase tracking-[.12em] text-[#686761]">Commercial summary</p><dl className="mt-6 space-y-4 text-sm"><div className="flex justify-between"><dt>Subtotal</dt><dd>{formatCurrency(subtotal)}</dd></div><div className="flex justify-between"><dt>VAT ({vatRate}%)</dt><dd>{formatCurrency(subtotal * vatRate / 100)}</dd></div><div className="flex justify-between border-t border-[#9f9d96] pt-4 text-lg font-semibold"><dt>Total</dt><dd>{formatCurrency(total)}</dd></div></dl><div className="mt-7"><ActionMessage state={state} /></div><div className="mt-5"><SubmitButton label="Create quote" /></div></aside>
    </form>
  );
}

const agreementTemplate = `DRAFT — LEGAL REVIEW REQUIRED

PARTIES
This Letter of Agreement is between Jurivo [insert legal entity details] and [Client legal entity].

1. SERVICES
[Insert the agreed scope, deliverables, and exclusions.]

2. FEES AND PAYMENT
[Insert fees, VAT treatment, deposit, milestones, due dates, and late-payment terms.]

3. CLIENT RESPONSIBILITIES
[Insert content, approvals, access, feedback, and dependency obligations.]

4. CHANGE CONTROL
[Explain how additional scope is estimated and approved in writing.]

5. INTELLECTUAL PROPERTY
[Insert ownership, licensing, portfolio rights, and third-party asset terms.]

6. CONFIDENTIALITY AND DATA PROTECTION
[Insert confidentiality and POPIA responsibilities appropriate to the engagement.]

7. WARRANTIES, LIABILITY, AND TERMINATION
[Insert reviewed provisions and any liability cap.]

8. ACCEPTANCE
[Insert signature blocks for both parties.]`;

export function AgreementBuilder({ firms, contacts, opportunities, quotes }: { firms: Firm[]; contacts: Contact[]; opportunities: Opportunity[]; quotes: Array<{ id: number; quote_number: string | null }> }) {
  const [state, action] = useActionState(createAgreement, initialState);
  return <form action={action} className="grid gap-6"><div className="border-l-2 border-[#6a3038] bg-[#f0e2e2] p-4 text-sm leading-6 text-[#6a3038]"><strong>Drafting aid only.</strong> Review the final wording with a qualified South African attorney before sending or signing.</div><div className="grid gap-5 md:grid-cols-2"><label className={labelClass}>Firm<select required name="firmId" className={inputClass}><option value="">Select a firm</option>{firms.map((firm) => <option key={firm.id} value={firm.id}>{firm.name}</option>)}</select></label><label className={labelClass}>Contact<select required name="contactId" className={inputClass}><option value="">Select a contact</option>{contacts.map((contact) => <option key={contact.id} value={contact.id}>{contact.full_name} — {contact.email}</option>)}</select></label><label className={labelClass}>Linked quote<select name="quoteId" className={inputClass}><option value="">No linked quote</option>{quotes.map((quote) => <option key={quote.id} value={quote.id}>{quote.quote_number}</option>)}</select></label><label className={labelClass}>Opportunity<select name="opportunityId" className={inputClass}><option value="">No linked opportunity</option>{opportunities.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}</select></label><label className={labelClass}>Agreement title<input required name="title" defaultValue="Website Design and Development Agreement" className={inputClass} /></label><label className={labelClass}>Effective date<input name="effectiveDate" type="date" className={inputClass} /></label><label className={labelClass}>Client signatory<input name="signatoryName" className={inputClass} /></label><label className={labelClass}>Signatory title<input name="signatoryTitle" className={inputClass} /></label></div><label className={labelClass}>Agreement draft<textarea required name="body" rows={28} defaultValue={agreementTemplate} className={`${inputClass} font-mono text-[13px] leading-6 normal-case tracking-normal`} /></label><ActionMessage state={state} /><SubmitButton label="Create draft agreement" /></form>;
}

export function ProjectAndServiceForms({ firms, contacts, opportunities, projects }: { firms: Firm[]; contacts: Contact[]; opportunities: Opportunity[]; projects: Project[] }) {
  const [projectState, projectAction] = useActionState(createProject, initialState);
  const [serviceState, serviceAction] = useActionState(createService, initialState);
  return <div className="grid gap-8 xl:grid-cols-2"><form action={projectAction} className="border-t-2 border-[#090a0b] bg-[#f3f0e9] p-6"><h2 className="text-xl font-semibold">Open a project</h2><p className="mt-2 text-sm text-[#686761]">Converts a won engagement into tracked delivery.</p><div className="mt-6 grid gap-4 sm:grid-cols-2"><label className={labelClass}>Firm<select required name="firmId" className={inputClass}><option value="">Select</option>{firms.map((firm) => <option key={firm.id} value={firm.id}>{firm.name}</option>)}</select></label><label className={labelClass}>Contact<select name="contactId" className={inputClass}><option value="">Select</option>{contacts.map((contact) => <option key={contact.id} value={contact.id}>{contact.full_name}</option>)}</select></label><label className={labelClass}>Opportunity<select name="opportunityId" className={inputClass}><option value="">Select</option>{opportunities.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}</select></label><label className={labelClass}>Project name<input required name="name" className={inputClass} /></label><label className={labelClass}>Budget<input name="budget" type="number" min="0" step="0.01" className={inputClass} /></label><label className={labelClass}>Project URL<input name="projectUrl" type="url" className={inputClass} /></label><label className={labelClass}>Start date<input name="startDate" type="date" className={inputClass} /></label><label className={labelClass}>Target completion<input name="targetDate" type="date" className={inputClass} /></label><label className={`${labelClass} sm:col-span-2`}>Scope<textarea name="scope" rows={5} className={inputClass} /></label></div><div className="mt-5"><ActionMessage state={projectState} /></div><div className="mt-5"><SubmitButton label="Create project" /></div></form><form id="services" action={serviceAction} className="border-t-2 border-[#6a3038] bg-[#f3f0e9] p-6"><h2 className="text-xl font-semibold">Add recurring service</h2><p className="mt-2 text-sm text-[#686761]">Tracks hosting, maintenance, SEO and support revenue.</p><div className="mt-6 grid gap-4 sm:grid-cols-2"><label className={labelClass}>Firm<select required name="firmId" className={inputClass}><option value="">Select</option>{firms.map((firm) => <option key={firm.id} value={firm.id}>{firm.name}</option>)}</select></label><label className={labelClass}>Project<select name="projectId" className={inputClass}><option value="">No linked project</option>{projects.map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}</select></label><label className={labelClass}>Service<select name="serviceType" className={inputClass}>{["hosting","maintenance","seo","support","other"].map((value) => <option key={value}>{value}</option>)}</select></label><label className={labelClass}>Billing<select name="billingInterval" className={inputClass}>{["monthly","quarterly","annual","once_off"].map((value) => <option key={value} value={value}>{value.replace("_", " ")}</option>)}</select></label><label className={labelClass}>Amount<input required name="amount" type="number" min="0" step="0.01" className={inputClass} /></label><label className={labelClass}>Provider<input name="provider" className={inputClass} /></label><label className={labelClass}>Starts<input name="startsOn" type="date" className={inputClass} /></label><label className={labelClass}>Renews<input name="renewsOn" type="date" className={inputClass} /></label><label className={`${labelClass} sm:col-span-2`}>Notes<textarea name="notes" rows={5} className={inputClass} /></label></div><div className="mt-5"><ActionMessage state={serviceState} /></div><div className="mt-5"><SubmitButton label="Add service" /></div></form></div>;
}

export function PrintButton() {
  return <button type="button" onClick={() => window.print()} className={`${buttonClass} print:hidden`}><Printer className="mr-2" size={16} /> Print / save PDF</button>;
}

export function LifecycleStatusForm({ entity, id, value, options }: { entity: "quote" | "agreement" | "project" | "service"; id: number; value: string; options: string[] }) {
  const [state, action] = useActionState(updateLifecycleStatus, initialState);
  return <form action={action} className="flex flex-wrap items-end gap-3 print:hidden"><input type="hidden" name="entity" value={entity} /><input type="hidden" name="id" value={id} /><label className={labelClass}>Status<select name="status" defaultValue={value} className={`${inputClass} min-w-40`}>{options.map((option) => <option key={option} value={option}>{option.replaceAll("_", " ")}</option>)}</select></label><button type="submit" className="min-h-12 rounded-[2px] border border-[#090a0b] px-4 text-sm font-semibold transition-colors hover:bg-[#090a0b] hover:text-[#efece5]">Update</button><ActionMessage state={state} /></form>;
}
