drop trigger if exists quotes_assign_number on public.quotes;
drop trigger if exists agreements_assign_number on public.agreements;
drop function if exists private.assign_document_number();

create or replace function private.assign_quote_number()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.quote_number is null then
    new.quote_number := format(
      'JRV-Q-%s-%s',
      to_char(current_date, 'YYYY'),
      lpad(nextval('private.quote_number_seq')::text, 5, '0')
    );
  end if;
  return new;
end;
$$;

create or replace function private.assign_agreement_number()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.agreement_number is null then
    new.agreement_number := format(
      'JRV-A-%s-%s',
      to_char(current_date, 'YYYY'),
      lpad(nextval('private.agreement_number_seq')::text, 5, '0')
    );
  end if;
  return new;
end;
$$;

create trigger quotes_assign_number before insert on public.quotes
for each row execute function private.assign_quote_number();

create trigger agreements_assign_number before insert on public.agreements
for each row execute function private.assign_agreement_number();
