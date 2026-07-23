-- Remove the private owner identity from public configuration. Bootstrap
-- remains one-time and signed, but the owner email is supplied only through
-- the protected execution environment.
begin;

insert into public.site_settings(key, value, is_public, description)
values
  (
    'brand',
    '{"status":"approved","name":"Vwayaj Ayisyen","logo_path":"/icon.svg"}'::jsonb,
    true,
    'Public Vwayaj Ayisyen brand configuration'
  ),
  (
    'support',
    '{"email":"support@vwayajayisyen.com","legal_email":"legal@vwayajayisyen.com","marketing_email":"promo@vwayajayisyen.com","whatsapp_e164":null,"hours":null}'::jsonb,
    true,
    'Public official contact configuration'
  ),
  (
    'legal_entity',
    '{"status":"partial","legal_name":"Vwayaj ayisyen","entity_type":"Ltda.","country":"Brasil","public_address":"São Paulo, Brasil","missing":["cnpj","full_commercial_address"]}'::jsonb,
    false,
    'Private legal entity configuration; commerce remains disabled until complete'
  )
on conflict (key) do update set
  value = excluded.value,
  is_public = excluded.is_public,
  description = excluded.description,
  updated_at = now();

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

revoke all on function public.bootstrap_initial_admin(uuid, text)
  from public, anon, authenticated;

comment on function public.bootstrap_initial_admin(uuid, text) is
  'One-time initial owner bootstrap. Owner email is supplied through a protected environment and is never public configuration.';

commit;
