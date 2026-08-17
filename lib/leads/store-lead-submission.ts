import "server-only";
import { createLeadIngestClient } from "@/lib/supabase/ingest";

export type LeadSubmissionInput = {
  submissionType: "growth_audit" | "strategy_call";
  name: string;
  firmName: string;
  email: string;
  phone?: string;
  website?: string;
  practiceArea?: string;
  growthPriority?: string;
  projectNeed?: string;
  desiredStart?: string;
  decisionRole?: string;
  investmentReadiness?: string;
  urgency?: string;
  attribution?: Record<string, string>;
  rawPayload?: Record<string, string>;
};

export async function storeLeadSubmission(input: LeadSubmissionInput) {
  const supabase = createLeadIngestClient();
  const { error } = await supabase.from("lead_submissions").insert({
    submission_type: input.submissionType,
    name: input.name,
    firm_name: input.firmName,
    email: input.email,
    phone: input.phone || null,
    website: input.website || null,
    practice_area: input.practiceArea || null,
    growth_priority: input.growthPriority || null,
    project_need: input.projectNeed || null,
    desired_start: input.desiredStart || null,
    decision_role: input.decisionRole || null,
    investment_readiness: input.investmentReadiness || null,
    urgency: input.urgency || null,
    attribution: input.attribution || {},
    raw_payload: input.rawPayload || {},
  });

  if (error) {
    throw new Error(`Lead storage failed: ${error.code}`);
  }
}
