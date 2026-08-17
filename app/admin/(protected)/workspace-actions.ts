"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin/auth";

const optionalMoney = z.preprocess(
  (value) => (value === "" || value == null ? null : Number(value)),
  z.number().min(0).max(100_000_000).nullable(),
);

const optionalDate = z.preprocess(
  (value) => (value === "" || value == null ? null : String(value)),
  z.string().date().nullable(),
);

const idSchema = z.coerce.number().int().positive();

export type WorkspaceActionState = { status: "idle" | "error"; message: string };

function field(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

async function recordJourney(input: {
  firmId: number;
  contactId?: number | null;
  enquiryId?: number | null;
  opportunityId?: number | null;
  projectId?: number | null;
  eventType: string;
  stage?: string | null;
  summary: string;
  details?: Record<string, unknown>;
}) {
  const { supabase, userId } = await requireAdmin();
  const { error } = await supabase.from("journey_events").insert({
    firm_id: input.firmId,
    contact_id: input.contactId || null,
    enquiry_id: input.enquiryId || null,
    opportunity_id: input.opportunityId || null,
    project_id: input.projectId || null,
    event_type: input.eventType,
    stage: input.stage || null,
    summary: input.summary,
    details: input.details || {},
    created_by: userId,
  });
  if (error) throw new Error(error.message);
}

const opportunitySchema = z.object({
  opportunityId: idSchema,
  firmId: idSchema,
  contactId: idSchema,
  enquiryId: z.preprocess((value) => (value ? Number(value) : null), z.number().int().positive().nullable()),
  stage: z.enum(["initial_contact", "discovery", "qualified", "scoping", "quote_sent", "negotiation", "won", "lost", "on_hold"]),
  estimatedValue: optionalMoney,
  probability: z.coerce.number().int().min(0).max(100),
  nextAction: z.string().max(240),
  nextActionAt: z.preprocess((value) => (value ? new Date(String(value)).toISOString() : null), z.string().datetime().nullable()),
});

export async function updateOpportunity(_state: WorkspaceActionState, formData: FormData): Promise<WorkspaceActionState> {
  const parsed = opportunitySchema.safeParse({
    opportunityId: field(formData, "opportunityId"),
    firmId: field(formData, "firmId"),
    contactId: field(formData, "contactId"),
    enquiryId: field(formData, "enquiryId"),
    stage: field(formData, "stage"),
    estimatedValue: field(formData, "estimatedValue"),
    probability: field(formData, "probability"),
    nextAction: field(formData, "nextAction"),
    nextActionAt: field(formData, "nextActionAt"),
  });
  if (!parsed.success) return { status: "error", message: parsed.error.issues[0]?.message || "Check the opportunity details." };

  const { supabase } = await requireAdmin();
  const item = parsed.data;
  const { data: previous, error: readError } = await supabase.from("opportunities").select("stage,firm_id,contact_id,enquiry_id").eq("id", item.opportunityId).single();
  if (readError || !previous) return { status: "error", message: "The opportunity could not be found." };

  const closedAt = ["won", "lost"].includes(item.stage) ? new Date().toISOString() : null;
  const { error } = await supabase.from("opportunities").update({
    stage: item.stage,
    estimated_value: item.estimatedValue,
    probability: item.probability,
    next_action: item.nextAction || null,
    next_action_at: item.nextActionAt,
    closed_at: closedAt,
  }).eq("id", item.opportunityId);
  if (error) return { status: "error", message: "The opportunity could not be updated." };

  await recordJourney({
    firmId: previous.firm_id,
    contactId: previous.contact_id,
    enquiryId: previous.enquiry_id,
    opportunityId: item.opportunityId,
    eventType: previous.stage === item.stage ? "opportunity_updated" : "stage_changed",
    stage: item.stage,
    summary: previous.stage === item.stage ? "Commercial next steps updated" : `Opportunity moved to ${item.stage.replaceAll("_", " ")}`,
    details: { previous_stage: previous.stage, probability: item.probability, estimated_value: item.estimatedValue },
  });
  revalidatePath("/admin");
  revalidatePath("/admin/pipeline");
  return { status: "idle", message: "Opportunity updated." };
}

const quoteSchema = z.object({
  firmId: idSchema,
  contactId: idSchema,
  opportunityId: z.preprocess((value) => (value ? Number(value) : null), z.number().int().positive().nullable()),
  issueDate: z.string().date(),
  validUntil: optionalDate,
  vatRate: z.coerce.number().min(0).max(100),
  introduction: z.string().max(2000),
  terms: z.string().max(5000),
  notes: z.string().max(2000),
  items: z.array(z.object({ description: z.string().trim().min(2).max(500), quantity: z.number().positive().max(10000), unitPrice: z.number().min(0).max(100_000_000) })).min(1).max(30),
});

export async function createQuote(_state: WorkspaceActionState, formData: FormData): Promise<WorkspaceActionState> {
  let items: unknown = [];
  try { items = JSON.parse(field(formData, "items")); } catch { return { status: "error", message: "Add at least one valid quote item." }; }
  const parsed = quoteSchema.safeParse({
    firmId: field(formData, "firmId"), contactId: field(formData, "contactId"), opportunityId: field(formData, "opportunityId"),
    issueDate: field(formData, "issueDate"), validUntil: field(formData, "validUntil"), vatRate: field(formData, "vatRate"),
    introduction: field(formData, "introduction"), terms: field(formData, "terms"), notes: field(formData, "notes"), items,
  });
  if (!parsed.success) return { status: "error", message: parsed.error.issues[0]?.message || "Check the quote details." };

  const { supabase, userId } = await requireAdmin();
  const value = parsed.data;
  const { data: quote, error } = await supabase.from("quotes").insert({
    firm_id: value.firmId, contact_id: value.contactId, opportunity_id: value.opportunityId,
    issue_date: value.issueDate, valid_until: value.validUntil, vat_rate: value.vatRate,
    introduction: value.introduction || null, terms: value.terms || null, notes: value.notes || null, created_by: userId,
  }).select("id,quote_number").single();
  if (error || !quote) return { status: "error", message: "The quote could not be created." };

  const { error: itemsError } = await supabase.from("quote_items").insert(value.items.map((item, index) => ({
    quote_id: quote.id, position: index + 1, description: item.description, quantity: item.quantity, unit_price: item.unitPrice,
  })));
  if (itemsError) {
    await supabase.from("quotes").delete().eq("id", quote.id);
    return { status: "error", message: "The quote items could not be saved." };
  }
  await recordJourney({ firmId: value.firmId, contactId: value.contactId, opportunityId: value.opportunityId, eventType: "quote_created", stage: "scoping", summary: `Quote ${quote.quote_number} drafted` });
  if (value.opportunityId) await supabase.from("opportunities").update({ stage: "scoping" }).eq("id", value.opportunityId);
  revalidatePath("/admin");
  redirect(`/admin/quotes/${quote.id}`);
}

const agreementSchema = z.object({
  firmId: idSchema,
  contactId: idSchema,
  quoteId: z.preprocess((value) => (value ? Number(value) : null), z.number().int().positive().nullable()),
  opportunityId: z.preprocess((value) => (value ? Number(value) : null), z.number().int().positive().nullable()),
  title: z.string().trim().min(4).max(180),
  effectiveDate: optionalDate,
  signatoryName: z.string().max(180),
  signatoryTitle: z.string().max(180),
  body: z.string().trim().min(100, "The agreement draft needs more detail.").max(30000),
});

export async function createAgreement(_state: WorkspaceActionState, formData: FormData): Promise<WorkspaceActionState> {
  const parsed = agreementSchema.safeParse({
    firmId: field(formData, "firmId"), contactId: field(formData, "contactId"), quoteId: field(formData, "quoteId"), opportunityId: field(formData, "opportunityId"),
    title: field(formData, "title"), effectiveDate: field(formData, "effectiveDate"), signatoryName: field(formData, "signatoryName"), signatoryTitle: field(formData, "signatoryTitle"), body: field(formData, "body"),
  });
  if (!parsed.success) return { status: "error", message: parsed.error.issues[0]?.message || "Check the agreement draft." };
  const { supabase, userId } = await requireAdmin();
  const value = parsed.data;
  const { data: agreement, error } = await supabase.from("agreements").insert({
    firm_id: value.firmId, contact_id: value.contactId, quote_id: value.quoteId, opportunity_id: value.opportunityId,
    title: value.title, effective_date: value.effectiveDate, client_signatory_name: value.signatoryName || null,
    client_signatory_title: value.signatoryTitle || null, body_markdown: value.body, created_by: userId,
  }).select("id,agreement_number").single();
  if (error || !agreement) return { status: "error", message: "The agreement could not be created." };
  await recordJourney({ firmId: value.firmId, contactId: value.contactId, opportunityId: value.opportunityId, eventType: "agreement_created", summary: `Agreement ${agreement.agreement_number} drafted` });
  revalidatePath("/admin");
  redirect(`/admin/agreements/${agreement.id}`);
}

const projectSchema = z.object({
  firmId: idSchema,
  contactId: z.preprocess((value) => (value ? Number(value) : null), z.number().int().positive().nullable()),
  opportunityId: z.preprocess((value) => (value ? Number(value) : null), z.number().int().positive().nullable()),
  name: z.string().trim().min(3).max(180), scope: z.string().max(5000), budget: optionalMoney,
  startDate: optionalDate, targetDate: optionalDate, projectUrl: z.union([z.literal(""), z.string().url()]),
});

export async function createProject(_state: WorkspaceActionState, formData: FormData): Promise<WorkspaceActionState> {
  const parsed = projectSchema.safeParse({ firmId: field(formData, "firmId"), contactId: field(formData, "contactId"), opportunityId: field(formData, "opportunityId"), name: field(formData, "name"), scope: field(formData, "scope"), budget: field(formData, "budget"), startDate: field(formData, "startDate"), targetDate: field(formData, "targetDate"), projectUrl: field(formData, "projectUrl") });
  if (!parsed.success) return { status: "error", message: parsed.error.issues[0]?.message || "Check the project details." };
  const { supabase, userId } = await requireAdmin();
  const value = parsed.data;
  const { data: project, error } = await supabase.from("projects").insert({ firm_id: value.firmId, contact_id: value.contactId, opportunity_id: value.opportunityId, name: value.name, scope: value.scope || null, budget: value.budget, start_date: value.startDate, target_completion_date: value.targetDate, project_url: value.projectUrl || null, owner_id: userId }).select("id").single();
  if (error || !project) return { status: "error", message: "The project could not be created." };
  if (value.opportunityId) await supabase.from("opportunities").update({ stage: "won", probability: 100, closed_at: new Date().toISOString() }).eq("id", value.opportunityId);
  await recordJourney({ firmId: value.firmId, contactId: value.contactId, opportunityId: value.opportunityId, projectId: project.id, eventType: "project_created", stage: "onboarding", summary: `Project opened: ${value.name}` });
  revalidatePath("/admin"); revalidatePath("/admin/projects");
  return { status: "idle", message: "Project created." };
}

const serviceSchema = z.object({
  firmId: idSchema, projectId: z.preprocess((value) => (value ? Number(value) : null), z.number().int().positive().nullable()),
  serviceType: z.enum(["hosting", "maintenance", "seo", "support", "other"]), billingInterval: z.enum(["monthly", "quarterly", "annual", "once_off"]),
  amount: z.coerce.number().min(0).max(100_000_000), startsOn: optionalDate, renewsOn: optionalDate, provider: z.string().max(180), notes: z.string().max(2000),
});

export async function createService(_state: WorkspaceActionState, formData: FormData): Promise<WorkspaceActionState> {
  const parsed = serviceSchema.safeParse({ firmId: field(formData, "firmId"), projectId: field(formData, "projectId"), serviceType: field(formData, "serviceType"), billingInterval: field(formData, "billingInterval"), amount: field(formData, "amount"), startsOn: field(formData, "startsOn"), renewsOn: field(formData, "renewsOn"), provider: field(formData, "provider"), notes: field(formData, "notes") });
  if (!parsed.success) return { status: "error", message: parsed.error.issues[0]?.message || "Check the service details." };
  const { supabase } = await requireAdmin();
  const value = parsed.data;
  const { error } = await supabase.from("service_subscriptions").insert({ firm_id: value.firmId, project_id: value.projectId, service_type: value.serviceType, status: "active", billing_interval: value.billingInterval, amount: value.amount, starts_on: value.startsOn, renews_on: value.renewsOn, provider: value.provider || null, notes: value.notes || null });
  if (error) return { status: "error", message: "The recurring service could not be saved." };
  await recordJourney({ firmId: value.firmId, projectId: value.projectId, eventType: "service_started", stage: "active", summary: `${value.serviceType.replaceAll("_", " ")} service started`, details: { billing_interval: value.billingInterval, amount: value.amount } });
  revalidatePath("/admin"); revalidatePath("/admin/projects");
  return { status: "idle", message: "Service added." };
}

const lifecycleSchema = z.discriminatedUnion("entity", [
  z.object({ entity: z.literal("quote"), id: idSchema, status: z.enum(["draft", "sent", "accepted", "declined", "expired", "void"]) }),
  z.object({ entity: z.literal("agreement"), id: idSchema, status: z.enum(["draft", "sent", "signed", "declined", "void"]) }),
  z.object({ entity: z.literal("project"), id: idSchema, status: z.enum(["onboarding", "active", "blocked", "completed", "cancelled"]) }),
  z.object({ entity: z.literal("service"), id: idSchema, status: z.enum(["proposed", "active", "paused", "cancelled", "ended"]) }),
]);

export async function updateLifecycleStatus(_state: WorkspaceActionState, formData: FormData): Promise<WorkspaceActionState> {
  const parsed = lifecycleSchema.safeParse({ entity: field(formData, "entity"), id: field(formData, "id"), status: field(formData, "status") });
  if (!parsed.success) return { status: "error", message: "Select a valid status." };
  const { supabase } = await requireAdmin();
  const value = parsed.data;

  if (value.entity === "quote") {
    const { data: record } = await supabase.from("quotes").select("firm_id,contact_id,opportunity_id,quote_number").eq("id", value.id).single();
    if (!record) return { status: "error", message: "Quote not found." };
    const timestamps = { sent_at: value.status === "sent" ? new Date().toISOString() : undefined, accepted_at: value.status === "accepted" ? new Date().toISOString() : undefined };
    const { error } = await supabase.from("quotes").update({ status: value.status, ...timestamps }).eq("id", value.id);
    if (error) return { status: "error", message: "Quote status could not be updated." };
    await recordJourney({ firmId: record.firm_id, contactId: record.contact_id, opportunityId: record.opportunity_id, eventType: "quote_status_changed", stage: value.status, summary: `${record.quote_number} marked ${value.status}` });
    if (record.opportunity_id && value.status === "sent") await supabase.from("opportunities").update({ stage: "quote_sent" }).eq("id", record.opportunity_id);
  } else if (value.entity === "agreement") {
    const { data: record } = await supabase.from("agreements").select("firm_id,contact_id,opportunity_id,agreement_number").eq("id", value.id).single();
    if (!record) return { status: "error", message: "Agreement not found." };
    const timestamps = { sent_at: value.status === "sent" ? new Date().toISOString() : undefined, signed_at: value.status === "signed" ? new Date().toISOString() : undefined };
    const { error } = await supabase.from("agreements").update({ status: value.status, ...timestamps }).eq("id", value.id);
    if (error) return { status: "error", message: "Agreement status could not be updated." };
    await recordJourney({ firmId: record.firm_id, contactId: record.contact_id, opportunityId: record.opportunity_id, eventType: "agreement_status_changed", stage: value.status, summary: `${record.agreement_number} marked ${value.status}` });
  } else if (value.entity === "project") {
    const { data: record } = await supabase.from("projects").select("firm_id,contact_id,opportunity_id,name").eq("id", value.id).single();
    if (!record) return { status: "error", message: "Project not found." };
    const { error } = await supabase.from("projects").update({ status: value.status, completed_at: value.status === "completed" ? new Date().toISOString() : null }).eq("id", value.id);
    if (error) return { status: "error", message: "Project status could not be updated." };
    await recordJourney({ firmId: record.firm_id, contactId: record.contact_id, opportunityId: record.opportunity_id, projectId: value.id, eventType: "project_status_changed", stage: value.status, summary: `${record.name} marked ${value.status}` });
  } else {
    const { data: record } = await supabase.from("service_subscriptions").select("firm_id,project_id,service_type").eq("id", value.id).single();
    if (!record) return { status: "error", message: "Service not found." };
    const { error } = await supabase.from("service_subscriptions").update({ status: value.status, ends_on: ["cancelled", "ended"].includes(value.status) ? new Date().toISOString().slice(0, 10) : null }).eq("id", value.id);
    if (error) return { status: "error", message: "Service status could not be updated." };
    await recordJourney({ firmId: record.firm_id, projectId: record.project_id, eventType: "service_status_changed", stage: value.status, summary: `${record.service_type.replaceAll("_", " ")} service marked ${value.status}` });
  }
  revalidatePath("/admin"); revalidatePath("/admin/quotes"); revalidatePath("/admin/agreements"); revalidatePath("/admin/projects");
  return { status: "idle", message: "Status updated." };
}
