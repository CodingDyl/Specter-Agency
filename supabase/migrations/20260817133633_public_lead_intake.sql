create policy lead_submissions_public_insert on public.lead_submissions
for insert to anon
with check (
  submission_type in ('growth_audit', 'strategy_call')
  and char_length(btrim(name)) between 2 and 100
  and char_length(btrim(firm_name)) between 2 and 140
  and char_length(email) between 5 and 160
  and email like '%@%'
  and (website is null or char_length(website) <= 200)
  and (urgency is null or char_length(urgency) <= 1000)
  and pg_column_size(attribution) <= 8192
  and pg_column_size(raw_payload) <= 32768
  and firm_id is null
  and contact_id is null
  and enquiry_id is null
  and opportunity_id is null
  and processed_at is null
);

grant insert on public.lead_submissions to anon;
grant usage, select on sequence public.lead_submissions_id_seq to anon;

comment on policy lead_submissions_public_insert on public.lead_submissions is
  'Allows validated website intake only. Anonymous callers cannot read or mutate customer records.';
