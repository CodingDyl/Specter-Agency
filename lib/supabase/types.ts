export type OpportunityStage =
  | "initial_contact"
  | "discovery"
  | "qualified"
  | "scoping"
  | "quote_sent"
  | "negotiation"
  | "won"
  | "lost"
  | "on_hold";

export type OpportunityListItem = {
  id: number;
  title: string;
  stage: OpportunityStage;
  probability: number;
  estimated_value: number | null;
  next_action: string | null;
  next_action_at: string | null;
  updated_at: string;
  firm_id: number;
  contact_id: number;
  enquiry_id: number | null;
  firms: { name: string } | null;
  contacts: { full_name: string; email: string } | null;
  enquiries: { kind: string; created_at: string } | null;
};

export type FirmOption = { id: number; name: string };
export type ContactOption = { id: number; firm_id: number | null; full_name: string; email: string };

export type QuoteRecord = {
  id: number;
  quote_number: string | null;
  status: string;
  currency: string;
  issue_date: string;
  valid_until: string | null;
  subtotal: number;
  vat_rate: number;
  vat_amount: number;
  total: number;
  introduction: string | null;
  terms: string | null;
  notes: string | null;
  firms: { name: string; website: string | null } | null;
  contacts: { full_name: string; email: string; job_title: string | null } | null;
  quote_items: Array<{ id: number; position: number; description: string; quantity: number; unit_price: number; line_total: number | null }>;
};

export type AgreementRecord = {
  id: number;
  agreement_number: string | null;
  title: string;
  status: string;
  effective_date: string | null;
  client_signatory_name: string | null;
  client_signatory_title: string | null;
  body_markdown: string;
  firms: { name: string } | null;
  contacts: { full_name: string; email: string } | null;
};
