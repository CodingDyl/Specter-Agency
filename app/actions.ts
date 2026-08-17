"use server";

import { Resend } from "resend";
import { z } from "zod";
import { redirect } from "next/navigation";
import { storeLeadSubmission } from "@/lib/leads/store-lead-submission";

export type AuditFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

const auditSchema = z.object({
  concept: z.enum(["Executive Editorial", "Modern Counsel", "Black Label", "Jurivo Website"]),
  website: z
    .string()
    .trim()
    .max(200, "Website addresses must be 200 characters or fewer.")
    .refine(
      (value) => value.length === 0 || (/^https?:\/\//i.test(value) && URL.canParse(value)),
      "Enter a complete website address, including https://, or leave this field blank.",
    ),
  name: z.string().trim().min(2, "Enter your name.").max(100),
  firm: z.string().trim().min(2, "Enter your law firm.").max(140),
  email: z.string().trim().email("Enter a valid work email.").max(160),
  practiceArea: z.string().trim().min(2, "Enter your primary practice area.").max(140),
  priority: z.string().trim().min(2, "Select a growth priority.").max(180),
  company: z.string().max(0),
});

function getField(formData: FormData, name: string) {
  return String(formData.get(name) ?? "");
}

function getAttribution(formData: FormData) {
  return {
    landing_page: getField(formData, "landingPage"),
    referrer: getField(formData, "referrer"),
    utm_source: getField(formData, "utmSource"),
    utm_medium: getField(formData, "utmMedium"),
    utm_campaign: getField(formData, "utmCampaign"),
    utm_content: getField(formData, "utmContent"),
    utm_term: getField(formData, "utmTerm"),
  };
}

export async function submitAudit(
  _previousState: AuditFormState,
  formData: FormData,
): Promise<AuditFormState> {
  const parsed = auditSchema.safeParse({
    concept: getField(formData, "concept"),
    website: getField(formData, "website"),
    name: getField(formData, "name"),
    firm: getField(formData, "firm"),
    email: getField(formData, "email"),
    practiceArea: getField(formData, "practiceArea"),
    priority: getField(formData, "priority"),
    company: getField(formData, "company"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Check the form and try again.",
    };
  }

  const { data } = parsed;

  try {
    await storeLeadSubmission({
      submissionType: "growth_audit",
      name: data.name,
      firmName: data.firm,
      email: data.email,
      website: data.website,
      practiceArea: data.practiceArea,
      growthPriority: data.priority,
      attribution: getAttribution(formData),
      rawPayload: { concept: data.concept },
    });
  } catch {
    return {
      status: "error",
      message: "We could not securely save your request. Please try again.",
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.AUDIT_TO_EMAIL;
  const text = [
    `Concept: ${data.concept}`,
    `Name: ${data.name}`,
    `Firm: ${data.firm}`,
    `Email: ${data.email}`,
    `Website: ${data.website || "No existing website"}`,
    `Practice area: ${data.practiceArea}`,
    `Growth priority: ${data.priority}`,
  ].join("\n");

  if (apiKey && from && to) {
    try {
      const resend = new Resend(apiKey);
      const response = await resend.emails.send({
        from,
        to,
        replyTo: data.email,
        subject: `Growth audit request — ${data.firm}`,
        text,
      });

      if (response.error) console.error("Audit notification delivery failed.");
    } catch {
      console.error("Audit notification delivery failed.");
    }
  }

  redirect("/thank-you");
}
