create schema if not exists private;
revoke all on schema private from public, anon, authenticated;
grant usage on schema private to authenticated;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  display_name text,
  role text not null default 'viewer' check (role in ('admin', 'viewer')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index profiles_email_unique_idx on public.profiles (lower(email));
create index profiles_role_idx on public.profiles (role);

create table public.firms (
  id bigint generated always as identity primary key,
  name text not null,
  normalized_name text generated always as (lower(btrim(name))) stored,
  website text,
  phone text,
  industry text not null default 'Legal services',
  city text,
  province text,
  country text not null default 'South Africa',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index firms_normalized_name_unique_idx on public.firms (normalized_name);

create table public.contacts (
  id bigint generated always as identity primary key,
  firm_id bigint references public.firms(id) on delete set null,
  full_name text not null,
  email text not null,
  normalized_email text generated always as (lower(btrim(email))) stored,
  phone text,
  job_title text,
  is_primary boolean not null default true,
  marketing_consent boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index contacts_normalized_email_unique_idx on public.contacts (normalized_email);
create index contacts_firm_id_idx on public.contacts (firm_id);

create table public.enquiries (
  id bigint generated always as identity primary key,
  firm_id bigint not null references public.firms(id) on delete restrict,
  contact_id bigint not null references public.contacts(id) on delete restrict,
  kind text not null check (kind in ('growth_audit', 'strategy_call', 'manual', 'referral')),
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'disqualified', 'converted')),
  source text not null default 'website',
  website text,
  practice_area text,
  growth_priority text,
  project_need text,
  desired_start text,
  decision_role text,
  investment_readiness text,
  urgency text,
  attribution jsonb not null default '{}'::jsonb,
  raw_data jsonb not null default '{}'::jsonb,
  disqualification_reason text,
  last_contacted_at timestamptz,
  next_action_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index enquiries_firm_id_idx on public.enquiries (firm_id);
create index enquiries_contact_id_idx on public.enquiries (contact_id);
create index enquiries_status_created_at_idx on public.enquiries (status, created_at desc);
create index enquiries_kind_created_at_idx on public.enquiries (kind, created_at desc);

create table public.opportunities (
  id bigint generated always as identity primary key,
  firm_id bigint not null references public.firms(id) on delete restrict,
  contact_id bigint not null references public.contacts(id) on delete restrict,
  enquiry_id bigint references public.enquiries(id) on delete set null,
  title text not null,
  stage text not null default 'initial_contact' check (stage in ('initial_contact', 'discovery', 'qualified', 'scoping', 'quote_sent', 'negotiation', 'won', 'lost', 'on_hold')),
  estimated_value numeric(14,2) check (estimated_value is null or estimated_value >= 0),
  probability smallint not null default 10 check (probability between 0 and 100),
  expected_close_date date,
  next_action text,
  next_action_at timestamptz,
  lost_reason text,
  owner_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  closed_at timestamptz
);

create index opportunities_firm_id_idx on public.opportunities (firm_id);
create index opportunities_contact_id_idx on public.opportunities (contact_id);
create index opportunities_enquiry_id_idx on public.opportunities (enquiry_id);
create index opportunities_owner_id_idx on public.opportunities (owner_id);
create index opportunities_stage_updated_at_idx on public.opportunities (stage, updated_at desc);

create table public.projects (
  id bigint generated always as identity primary key,
  firm_id bigint not null references public.firms(id) on delete restrict,
  contact_id bigint references public.contacts(id) on delete set null,
  opportunity_id bigint references public.opportunities(id) on delete set null,
  name text not null,
  status text not null default 'onboarding' check (status in ('onboarding', 'active', 'blocked', 'completed', 'cancelled')),
  scope text,
  budget numeric(14,2) check (budget is null or budget >= 0),
  start_date date,
  target_completion_date date,
  completed_at timestamptz,
  project_url text,
  owner_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index projects_firm_id_idx on public.projects (firm_id);
create index projects_contact_id_idx on public.projects (contact_id);
create index projects_opportunity_id_idx on public.projects (opportunity_id);
create index projects_owner_id_idx on public.projects (owner_id);
create index projects_status_updated_at_idx on public.projects (status, updated_at desc);

create table public.journey_events (
  id bigint generated always as identity primary key,
  firm_id bigint not null references public.firms(id) on delete restrict,
  contact_id bigint references public.contacts(id) on delete set null,
  enquiry_id bigint references public.enquiries(id) on delete set null,
  opportunity_id bigint references public.opportunities(id) on delete set null,
  project_id bigint references public.projects(id) on delete set null,
  event_type text not null,
  stage text,
  summary text not null,
  details jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default now(),
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create index journey_events_firm_occurred_at_idx on public.journey_events (firm_id, occurred_at desc);
create index journey_events_contact_id_idx on public.journey_events (contact_id);
create index journey_events_enquiry_id_idx on public.journey_events (enquiry_id);
create index journey_events_opportunity_occurred_at_idx on public.journey_events (opportunity_id, occurred_at desc);
create index journey_events_project_occurred_at_idx on public.journey_events (project_id, occurred_at desc);
create index journey_events_created_by_idx on public.journey_events (created_by);

create table public.tasks (
  id bigint generated always as identity primary key,
  firm_id bigint references public.firms(id) on delete cascade,
  contact_id bigint references public.contacts(id) on delete set null,
  enquiry_id bigint references public.enquiries(id) on delete cascade,
  opportunity_id bigint references public.opportunities(id) on delete cascade,
  project_id bigint references public.projects(id) on delete cascade,
  title text not null,
  description text,
  status text not null default 'open' check (status in ('open', 'in_progress', 'completed', 'cancelled')),
  priority text not null default 'normal' check (priority in ('low', 'normal', 'high', 'urgent')),
  due_at timestamptz,
  completed_at timestamptz,
  owner_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (firm_id is not null or enquiry_id is not null or opportunity_id is not null or project_id is not null)
);

create index tasks_firm_id_idx on public.tasks (firm_id);
create index tasks_contact_id_idx on public.tasks (contact_id);
create index tasks_enquiry_id_idx on public.tasks (enquiry_id);
create index tasks_opportunity_id_idx on public.tasks (opportunity_id);
create index tasks_project_id_idx on public.tasks (project_id);
create index tasks_owner_id_idx on public.tasks (owner_id);
create index tasks_status_due_at_idx on public.tasks (status, due_at);

create table public.quotes (
  id bigint generated always as identity primary key,
  quote_number text unique,
  firm_id bigint not null references public.firms(id) on delete restrict,
  contact_id bigint references public.contacts(id) on delete set null,
  opportunity_id bigint references public.opportunities(id) on delete set null,
  status text not null default 'draft' check (status in ('draft', 'sent', 'accepted', 'declined', 'expired', 'void')),
  currency text not null default 'ZAR' check (currency ~ '^[A-Z]{3}$'),
  issue_date date not null default current_date,
  valid_until date,
  subtotal numeric(14,2) not null default 0 check (subtotal >= 0),
  vat_rate numeric(5,2) not null default 0 check (vat_rate between 0 and 100),
  vat_amount numeric(14,2) not null default 0 check (vat_amount >= 0),
  total numeric(14,2) not null default 0 check (total >= 0),
  introduction text,
  terms text,
  notes text,
  created_by uuid references public.profiles(id) on delete set null,
  sent_at timestamptz,
  accepted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index quotes_firm_id_idx on public.quotes (firm_id);
create index quotes_contact_id_idx on public.quotes (contact_id);
create index quotes_opportunity_id_idx on public.quotes (opportunity_id);
create index quotes_created_by_idx on public.quotes (created_by);
create index quotes_status_issue_date_idx on public.quotes (status, issue_date desc);

create table public.quote_items (
  id bigint generated always as identity primary key,
  quote_id bigint not null references public.quotes(id) on delete cascade,
  position smallint not null default 1 check (position > 0),
  description text not null,
  quantity numeric(12,2) not null default 1 check (quantity > 0),
  unit_price numeric(14,2) not null check (unit_price >= 0),
  line_total numeric(14,2) generated always as (round(quantity * unit_price, 2)) stored,
  created_at timestamptz not null default now()
);

create index quote_items_quote_id_position_idx on public.quote_items (quote_id, position);

create table public.agreements (
  id bigint generated always as identity primary key,
  agreement_number text unique,
  quote_id bigint references public.quotes(id) on delete set null,
  opportunity_id bigint references public.opportunities(id) on delete set null,
  firm_id bigint not null references public.firms(id) on delete restrict,
  contact_id bigint references public.contacts(id) on delete set null,
  title text not null,
  status text not null default 'draft' check (status in ('draft', 'sent', 'signed', 'declined', 'void')),
  effective_date date,
  client_signatory_name text,
  client_signatory_title text,
  body_markdown text not null,
  created_by uuid references public.profiles(id) on delete set null,
  sent_at timestamptz,
  signed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index agreements_quote_id_idx on public.agreements (quote_id);
create index agreements_opportunity_id_idx on public.agreements (opportunity_id);
create index agreements_firm_id_idx on public.agreements (firm_id);
create index agreements_contact_id_idx on public.agreements (contact_id);
create index agreements_created_by_idx on public.agreements (created_by);
create index agreements_status_created_at_idx on public.agreements (status, created_at desc);

create table public.service_subscriptions (
  id bigint generated always as identity primary key,
  firm_id bigint not null references public.firms(id) on delete restrict,
  project_id bigint references public.projects(id) on delete set null,
  service_type text not null check (service_type in ('hosting', 'maintenance', 'seo', 'support', 'other')),
  status text not null default 'proposed' check (status in ('proposed', 'active', 'paused', 'cancelled', 'ended')),
  billing_interval text not null default 'monthly' check (billing_interval in ('monthly', 'quarterly', 'annual', 'once_off')),
  amount numeric(14,2) not null default 0 check (amount >= 0),
  currency text not null default 'ZAR' check (currency ~ '^[A-Z]{3}$'),
  starts_on date,
  renews_on date,
  ends_on date,
  provider text,
  external_reference text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index service_subscriptions_firm_id_idx on public.service_subscriptions (firm_id);
create index service_subscriptions_project_id_idx on public.service_subscriptions (project_id);
create index service_subscriptions_status_renews_on_idx on public.service_subscriptions (status, renews_on);

create table public.lead_submissions (
  id bigint generated always as identity primary key,
  submission_type text not null check (submission_type in ('growth_audit', 'strategy_call')),
  name text not null,
  firm_name text not null,
  email text not null,
  phone text,
  website text,
  practice_area text,
  growth_priority text,
  project_need text,
  desired_start text,
  decision_role text,
  investment_readiness text,
  urgency text,
  attribution jsonb not null default '{}'::jsonb,
  raw_payload jsonb not null default '{}'::jsonb,
  firm_id bigint references public.firms(id) on delete set null,
  contact_id bigint references public.contacts(id) on delete set null,
  enquiry_id bigint references public.enquiries(id) on delete set null,
  opportunity_id bigint references public.opportunities(id) on delete set null,
  processed_at timestamptz,
  created_at timestamptz not null default now()
);

create index lead_submissions_type_created_at_idx on public.lead_submissions (submission_type, created_at desc);
create index lead_submissions_firm_id_idx on public.lead_submissions (firm_id);
create index lead_submissions_contact_id_idx on public.lead_submissions (contact_id);
create index lead_submissions_enquiry_id_idx on public.lead_submissions (enquiry_id);
create index lead_submissions_opportunity_id_idx on public.lead_submissions (opportunity_id);
create index lead_submissions_unprocessed_idx on public.lead_submissions (created_at) where processed_at is null;

create sequence private.quote_number_seq;
create sequence private.agreement_number_seq;

create or replace function private.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles
    where id = (select auth.uid())
      and role = 'admin'
  );
$$;

create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, display_name)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(coalesce(new.email, ''), '@', 1))
  )
  on conflict (id) do update set
    email = excluded.email,
    display_name = coalesce(public.profiles.display_name, excluded.display_name),
    updated_at = now();
  return new;
end;
$$;

create or replace function private.assign_document_number()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if tg_table_name = 'quotes' and new.quote_number is null then
    new.quote_number := format(
      'JRV-Q-%s-%s',
      to_char(current_date, 'YYYY'),
      lpad(nextval('private.quote_number_seq')::text, 5, '0')
    );
  elsif tg_table_name = 'agreements' and new.agreement_number is null then
    new.agreement_number := format(
      'JRV-A-%s-%s',
      to_char(current_date, 'YYYY'),
      lpad(nextval('private.agreement_number_seq')::text, 5, '0')
    );
  end if;
  return new;
end;
$$;

create or replace function private.refresh_quote_totals(target_quote_id bigint)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  calculated_subtotal numeric(14,2);
begin
  select coalesce(sum(line_total), 0)
  into calculated_subtotal
  from public.quote_items
  where quote_id = target_quote_id;

  update public.quotes
  set
    subtotal = calculated_subtotal,
    vat_amount = round(calculated_subtotal * vat_rate / 100, 2),
    total = calculated_subtotal + round(calculated_subtotal * vat_rate / 100, 2),
    updated_at = now()
  where id = target_quote_id;
end;
$$;

create or replace function private.sync_quote_totals()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if tg_op = 'DELETE' then
    perform private.refresh_quote_totals(old.quote_id);
    return old;
  end if;

  perform private.refresh_quote_totals(new.quote_id);
  if tg_op = 'UPDATE' and old.quote_id <> new.quote_id then
    perform private.refresh_quote_totals(old.quote_id);
  end if;
  return new;
end;
$$;

create or replace function private.process_lead_submission()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  resolved_firm_id bigint;
  resolved_contact_id bigint;
  resolved_enquiry_id bigint;
  resolved_opportunity_id bigint;
  lead_title text;
begin
  insert into public.firms (name, website)
  values (new.firm_name, nullif(new.website, ''))
  on conflict (normalized_name) do update set
    website = coalesce(public.firms.website, excluded.website),
    updated_at = now()
  returning id into resolved_firm_id;

  insert into public.contacts (firm_id, full_name, email, phone)
  values (resolved_firm_id, new.name, new.email, nullif(new.phone, ''))
  on conflict (normalized_email) do update set
    firm_id = excluded.firm_id,
    full_name = excluded.full_name,
    phone = coalesce(excluded.phone, public.contacts.phone),
    updated_at = now()
  returning id into resolved_contact_id;

  insert into public.enquiries (
    firm_id,
    contact_id,
    kind,
    website,
    practice_area,
    growth_priority,
    project_need,
    desired_start,
    decision_role,
    investment_readiness,
    urgency,
    attribution,
    raw_data
  )
  values (
    resolved_firm_id,
    resolved_contact_id,
    new.submission_type,
    nullif(new.website, ''),
    nullif(new.practice_area, ''),
    nullif(new.growth_priority, ''),
    nullif(new.project_need, ''),
    nullif(new.desired_start, ''),
    nullif(new.decision_role, ''),
    nullif(new.investment_readiness, ''),
    nullif(new.urgency, ''),
    new.attribution,
    new.raw_payload
  )
  returning id into resolved_enquiry_id;

  lead_title := case
    when new.submission_type = 'strategy_call' then 'Website strategy — ' || new.firm_name
    else 'Growth audit — ' || new.firm_name
  end;

  insert into public.opportunities (
    firm_id,
    contact_id,
    enquiry_id,
    title,
    stage,
    probability,
    next_action
  )
  values (
    resolved_firm_id,
    resolved_contact_id,
    resolved_enquiry_id,
    lead_title,
    'initial_contact',
    case when new.submission_type = 'strategy_call' then 20 else 10 end,
    case when new.submission_type = 'strategy_call' then 'Review brief and confirm strategy call' else 'Review audit request and contact firm' end
  )
  returning id into resolved_opportunity_id;

  insert into public.journey_events (
    firm_id,
    contact_id,
    enquiry_id,
    opportunity_id,
    event_type,
    stage,
    summary,
    details
  )
  values (
    resolved_firm_id,
    resolved_contact_id,
    resolved_enquiry_id,
    resolved_opportunity_id,
    'lead_captured',
    'initial_contact',
    case when new.submission_type = 'strategy_call' then 'Strategy call brief submitted' else 'Growth audit requested' end,
    jsonb_build_object('submission_id', new.id, 'source', 'website')
  );

  update public.lead_submissions
  set
    firm_id = resolved_firm_id,
    contact_id = resolved_contact_id,
    enquiry_id = resolved_enquiry_id,
    opportunity_id = resolved_opportunity_id,
    processed_at = now()
  where id = new.id;

  return new;
end;
$$;

create trigger on_auth_user_created
after insert or update of email on auth.users
for each row execute function private.handle_new_user();

create trigger profiles_set_updated_at before update on public.profiles
for each row execute function private.set_updated_at();
create trigger firms_set_updated_at before update on public.firms
for each row execute function private.set_updated_at();
create trigger contacts_set_updated_at before update on public.contacts
for each row execute function private.set_updated_at();
create trigger enquiries_set_updated_at before update on public.enquiries
for each row execute function private.set_updated_at();
create trigger opportunities_set_updated_at before update on public.opportunities
for each row execute function private.set_updated_at();
create trigger projects_set_updated_at before update on public.projects
for each row execute function private.set_updated_at();
create trigger tasks_set_updated_at before update on public.tasks
for each row execute function private.set_updated_at();
create trigger quotes_set_updated_at before update on public.quotes
for each row execute function private.set_updated_at();
create trigger agreements_set_updated_at before update on public.agreements
for each row execute function private.set_updated_at();
create trigger service_subscriptions_set_updated_at before update on public.service_subscriptions
for each row execute function private.set_updated_at();

create trigger quotes_assign_number before insert on public.quotes
for each row execute function private.assign_document_number();
create trigger agreements_assign_number before insert on public.agreements
for each row execute function private.assign_document_number();
create trigger quote_items_sync_totals after insert or update or delete on public.quote_items
for each row execute function private.sync_quote_totals();
create trigger lead_submissions_process after insert on public.lead_submissions
for each row execute function private.process_lead_submission();

alter table public.profiles enable row level security;
alter table public.firms enable row level security;
alter table public.contacts enable row level security;
alter table public.enquiries enable row level security;
alter table public.opportunities enable row level security;
alter table public.projects enable row level security;
alter table public.journey_events enable row level security;
alter table public.tasks enable row level security;
alter table public.quotes enable row level security;
alter table public.quote_items enable row level security;
alter table public.agreements enable row level security;
alter table public.service_subscriptions enable row level security;
alter table public.lead_submissions enable row level security;

create policy profiles_read_self on public.profiles
for select to authenticated
using (id = (select auth.uid()));

create policy profiles_admin_all on public.profiles
for all to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

create policy firms_admin_all on public.firms for all to authenticated
using ((select private.is_admin())) with check ((select private.is_admin()));
create policy contacts_admin_all on public.contacts for all to authenticated
using ((select private.is_admin())) with check ((select private.is_admin()));
create policy enquiries_admin_all on public.enquiries for all to authenticated
using ((select private.is_admin())) with check ((select private.is_admin()));
create policy opportunities_admin_all on public.opportunities for all to authenticated
using ((select private.is_admin())) with check ((select private.is_admin()));
create policy projects_admin_all on public.projects for all to authenticated
using ((select private.is_admin())) with check ((select private.is_admin()));
create policy journey_events_admin_all on public.journey_events for all to authenticated
using ((select private.is_admin())) with check ((select private.is_admin()));
create policy tasks_admin_all on public.tasks for all to authenticated
using ((select private.is_admin())) with check ((select private.is_admin()));
create policy quotes_admin_all on public.quotes for all to authenticated
using ((select private.is_admin())) with check ((select private.is_admin()));
create policy quote_items_admin_all on public.quote_items for all to authenticated
using ((select private.is_admin())) with check ((select private.is_admin()));
create policy agreements_admin_all on public.agreements for all to authenticated
using ((select private.is_admin())) with check ((select private.is_admin()));
create policy service_subscriptions_admin_all on public.service_subscriptions for all to authenticated
using ((select private.is_admin())) with check ((select private.is_admin()));
create policy lead_submissions_admin_all on public.lead_submissions for all to authenticated
using ((select private.is_admin())) with check ((select private.is_admin()));

revoke all on all tables in schema public from anon;
grant select, insert, update, delete on all tables in schema public to authenticated;
grant usage, select on all sequences in schema public to authenticated;
grant execute on function private.is_admin() to authenticated;

comment on table public.lead_submissions is 'Immutable website intake record; an after-insert trigger normalises each lead into the CRM journey.';
comment on table public.opportunities is 'Commercial pipeline from initial contact through won/lost.';
comment on table public.journey_events is 'Append-only customer journey timeline across enquiry, opportunity and project.';
comment on table public.agreements is 'Editable agreement drafts; generated content requires owner and legal review before issue.';
