-- 0012_atomic_admin_bootstrap.sql
-- Transactionally grants the initial owner roles after the Auth user is created.
-- The function is callable only with the service_role API role and must be
-- removed or kept execute-revoked after the one-time bootstrap.
begin;

create or replace function public.bootstrap_initial_admin(
  p_user_id uuid,
  p_expected_email text
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_email text;
  v_super_admin_count integer;
begin
  if p_expected_email is null
     or btrim(p_expected_email) = ''
     or char_length(btrim(p_expected_email)) > 254
     or btrim(p_expected_email) !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' then
    raise exception 'invalid_bootstrap_email' using errcode = '22023';
  end if;

  select lower(u.email) into v_email
  from auth.users u
  where u.id = p_user_id;

  if v_email is null then
    raise exception 'bootstrap_user_not_found' using errcode = 'P0002';
  end if;

  if v_email <> lower(btrim(p_expected_email)) then
    raise exception 'bootstrap_user_email_mismatch' using errcode = '42501';
  end if;

  -- Serialize every valid bootstrap attempt before checking the singleton
  -- condition. A transaction-scoped lock is released automatically on commit
  -- or rollback, including when the second caller receives the duplicate error.
  perform pg_catalog.pg_advisory_xact_lock(
    pg_catalog.hashtextextended('vwayaj.bootstrap_initial_admin', 20260723)
  );

  select count(*)::integer into v_super_admin_count
  from public.user_roles
  where role = 'super_admin';

  if v_super_admin_count > 0 then
    raise exception 'super_admin_already_exists' using errcode = '23505';
  end if;

  update public.profiles
  set force_password_change = true,
      account_status = 'active',
      preferred_locale = 'ht',
      updated_at = now()
  where id = p_user_id;

  if not found then
    raise exception 'bootstrap_profile_not_found' using errcode = 'P0002';
  end if;

  insert into public.user_roles(user_id, role, granted_by, reason)
  values
    (p_user_id, 'user', null, 'bootstrap'),
    (p_user_id, 'admin', null, 'initial owner bootstrap'),
    (p_user_id, 'super_admin', null, 'initial owner bootstrap')
  on conflict (user_id, role) do nothing;

  insert into public.audit_log(
    actor_id,
    actor_role,
    action,
    target_table,
    target_id,
    reason,
    risk_level,
    metadata
  ) values (
    null,
    null,
    'system.initial_admin_bootstrapped',
    'user_roles',
    p_user_id::text,
    'One-time owner bootstrap',
    'critical',
    jsonb_build_object('method', 'atomic_rpc')
  );
end;
$$;

revoke all on function public.bootstrap_initial_admin(uuid, text) from public;
revoke all on function public.bootstrap_initial_admin(uuid, text) from anon;
revoke all on function public.bootstrap_initial_admin(uuid, text) from authenticated;
grant execute on function public.bootstrap_initial_admin(uuid, text) to service_role;

comment on function public.bootstrap_initial_admin(uuid, text) is
  'One-time initial owner bootstrap. Execute only with service_role, then revoke service_role execute after use.';

commit;
