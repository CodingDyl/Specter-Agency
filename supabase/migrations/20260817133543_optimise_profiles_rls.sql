drop policy if exists profiles_read_self on public.profiles;
drop policy if exists profiles_admin_all on public.profiles;

create policy profiles_select on public.profiles
for select to authenticated
using (id = (select auth.uid()) or (select private.is_admin()));

create policy profiles_admin_insert on public.profiles
for insert to authenticated
with check ((select private.is_admin()));

create policy profiles_admin_update on public.profiles
for update to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

create policy profiles_admin_delete on public.profiles
for delete to authenticated
using ((select private.is_admin()));
