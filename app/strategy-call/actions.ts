"use server";

import { redirect } from "next/navigation";
import { Resend } from "resend";
import { z } from "zod";
import { storeLeadSubmission } from "@/lib/leads/store-lead-submission";

export type StrategyCallFormState = {
  status: "idle" | "error";
  message: string;
  fieldErrors?: Record<string, string[] | undefined>;
};

const optionalWebsite = z
  .string()
  .trim()
  .max(200, "Website addresses must be 200 characters or fewer.")
  .refine(
    (value) => value.length === 0 || (/^https?:\/\//i.test(value) && URL.canParse(value)),
    "Enter a complete website address, including https://, or leave this field blank.",
  );

const strategyCallSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(100),
  firm: z.string().trim().min(2, "Enter your law firm.").max(140),
  email: z.string().trim().email("Enter a valid work email.").max(160),
  phone: z.string().trim().max(40, "Phone numbers must be 40 characters or fewer."),
  website: optionalWebsite,
  practiceArea: z.string().trim().min(2, "Enter the practice area this project must support.").max(180),
  projectNeed: z.enum([
    "A new law-firm website",
    "A strategic website redesign",
    "A new practice-area launch",
    "A website and visibility system",
  ]),
  desiredStart: z.enum([
    "As soon as responsibly possible",
    "Within 1–2 months",
    "Within 3 months",
    "Timing needs discussion",
  ]),
  decisionRole: z.enum([
    "I can approve this project",
    "I am part of the decision",
    "I am preparing options for the partners",
  ]),
  investmentReadiness: z.enum([
    "Investment is allocated",
    "We need a scoped proposal",
    "We need guidance on the right scope",
  ]),
  urgency: z
    .string()
    .trim()
    .min(20, "Tell us briefly what is driving the urgency.")
    .max(1000, "Keep the project context to 1,000 characters or fewer."),
  company: z.string().max(0),
});

function getField(formData: FormData, name: string) {
  return String(formData.get(name) ?? "");
}

function getSafeCalendarUrl() {
  const value = process.env.NEXT_PUBLIC_STRATEGY_CALL_URL?.trim();
  if (!value || !/^https?:\/\//i.test(value) || !URL.canParse(value)) return null;
  return value;
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

export async function submitStrategyCall(
  _previousState: StrategyCallFormState,
  formData: FormData,
): Promise<StrategyCallFormState> {
  const parsed = strategyCallSchema.safeParse({
    name: getField(formData, "name"),
    firm: getField(formData, "firm"),
    email: getField(formData, "email"),
    phone: getField(formData, "phone"),
    website: getField(formData, "website"),
    practiceArea: getField(formData, "practiceArea"),
    projectNeed: getField(formData, "projectNeed"),
    desiredStart: getField(formData, "desiredStart"),
    decisionRole: getField(formData, "decisionRole"),
    investmentReadiness: getField(formData, "investmentReadiness"),
    urgency: getField(formData, "urgency"),
    company: getField(formData, "company"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Check the brief and try again.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const { data } = parsed;

  try {
    await storeLeadSubmission({
      submissionType: "strategy_call",
      name: data.name,
      firmName: data.firm,
      email: data.email,
      phone: data.phone,
      website: data.website,
      practiceArea: data.practiceArea,
      projectNeed: data.projectNeed,
      desiredStart: data.desiredStart,
      decisionRole: data.decisionRole,
      investmentReadiness: data.investmentReadiness,
      urgency: data.urgency,
      attribution: getAttribution(formData),
    });
  } catch {
    return {
      status: "error",
      message: "We could not securely save your brief. Please try again.",
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.STRATEGY_TO_EMAIL || process.env.AUDIT_TO_EMAIL;
  const text = [
    "High-intent website strategy call",
    `Name: ${data.name}`,
    `Firm: ${data.firm}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "Not supplied"}`,
    `Website: ${data.website || "No existing website"}`,
    `Priority practice area: ${data.practiceArea}`,
    `Project need: ${data.projectNeed}`,
    `Desired start: ${data.desiredStart}`,
    `Decision role: ${data.decisionRole}`,
    `Investment readiness: ${data.investmentReadiness}`,
    "",
    "What is driving the urgency:",
    data.urgency,
  ].join("\n");

  if (apiKey && from && to) {
    try {
      const resend = new Resend(apiKey);
      const response = await resend.emails.send({
        from,
        to,
        replyTo: data.email,
        subject: `Strategy call brief — ${data.firm}`,
        text,
      });

      if (response.error) console.error("Strategy brief notification delivery failed.");
    } catch {
      console.error("Strategy brief notification delivery failed.");
    }
  }

  redirect(getSafeCalendarUrl() || "/strategy-call/received");
}
