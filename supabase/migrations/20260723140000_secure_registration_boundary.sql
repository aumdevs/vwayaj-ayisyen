-- Require a short-lived server attestation before Supabase Auth creates a user.
-- The HMAC secret lives in Supabase Vault and is never exposed through the Data API.
begin;

create or replace function private.registration_signature_matches(
  p_payload text,
  p_signature text
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_expected text;
  v_secret text;
begin
  select decrypted_secret
    into v_secret
  from vault.decrypted_secrets
  where name = 'vwayaj_registration_gate_hmac'
  order by updated_at desc, created_at desc
  limit 1;

  if v_secret is null or char_length(v_secret) < 32
    or p_signature !~ '^[0-9a-f]{64}$'
  then
    return false;
  end if;

  v_expected := encode(extensions.hmac(p_payload, v_secret, 'sha256'), 'hex');

  -- Hash both hex strings before comparison so timing cannot reveal a useful
  -- prefix of the expected HMAC.
  return extensions.digest(p_signature, 'sha256')
    = extensions.digest(v_expected, 'sha256');
exception
  when others then
    return false;
end;
$$;

create or replace function private.registration_attestation_is_valid(
  p_email text,
  p_metadata jsonb
)
returns boolean
language plpgsql
set search_path = ''
as $$
declare
  v_accepted_at timestamptz;
  v_accepted_at_text text;
  v_email text;
  v_nonce text;
  v_payload text;
  v_signature text;
  v_terms_version text;
begin
  v_email := lower(btrim(coalesce(p_email, '')));
  v_accepted_at_text := coalesce(p_metadata ->> 'terms_accepted_at', '');
  v_nonce := coalesce(p_metadata ->> 'registration_nonce', '');
  v_signature := coalesce(p_metadata ->> 'registration_signature', '');
  v_terms_version := coalesce(p_metadata ->> 'terms_version', '');

  if v_email = '' or char_length(v_email) > 254
    or v_terms_version !~ '^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$'
    or v_accepted_at_text !~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{3}Z$'
    or v_nonce !~ '^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
  then
    return false;
  end if;

  begin
    v_accepted_at := v_accepted_at_text::timestamptz;
  exception
    when others then
      return false;
  end;

  if v_accepted_at < clock_timestamp() - interval '10 minutes'
    or v_accepted_at > clock_timestamp() + interval '1 minute'
  then
    return false;
  end if;

  v_payload := concat_ws(
    E'\n',
    v_email,
    v_terms_version,
    v_accepted_at_text,
    v_nonce
  );

  return private.registration_signature_matches(v_payload, v_signature);
exception
  when others then
    return false;
end;
$$;

create or replace function private.before_user_created(event jsonb)
returns jsonb
language plpgsql
set search_path = ''
as $$
declare
  v_rejection constant jsonb := jsonb_build_object(
    'error',
    jsonb_build_object(
      'http_code', 400,
      'message', 'Registration request could not be verified.'
    )
  );
begin
  if private.registration_attestation_is_valid(
    event -> 'user' ->> 'email',
    coalesce(event -> 'user' -> 'user_metadata', '{}'::jsonb)
  ) then
    return '{}'::jsonb;
  end if;

  return v_rejection;
exception
  when others then
    return v_rejection;
end;
$$;

create or replace function private.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_attestation_valid boolean;
begin
  v_attestation_valid := private.registration_attestation_is_valid(
    new.email,
    coalesce(new.raw_user_meta_data, '{}'::jsonb)
  );

  insert into public.profiles(
    id,
    display_name,
    preferred_locale,
    account_status,
    terms_version,
    terms_accepted_at
  )
  values (
    new.id,
    nullif(left(coalesce(new.raw_user_meta_data ->> 'display_name', ''), 120), ''),
    case
      when coalesce(new.raw_user_meta_data ->> 'preferred_locale', '') in ('ht','fr','es','pt','en')
        then (new.raw_user_meta_data ->> 'preferred_locale')::public.app_locale
      else 'ht'::public.app_locale
    end,
    'active',
    case
      when v_attestation_valid then new.raw_user_meta_data ->> 'terms_version'
      else null
    end,
    case
      when v_attestation_valid
        then (new.raw_user_meta_data ->> 'terms_accepted_at')::timestamptz
      else null
    end
  )
  on conflict (id) do nothing;

  insert into public.user_roles(user_id, role, reason)
  values (new.id, 'user', 'automatic signup role')
  on conflict (user_id, role) do nothing;

  return new;
end;
$$;

grant usage on schema private to supabase_auth_admin;

revoke all on function private.registration_signature_matches(text, text)
  from public, anon, authenticated, service_role;
revoke all on function private.registration_attestation_is_valid(text, jsonb)
  from public, anon, authenticated, service_role;
revoke all on function private.before_user_created(jsonb)
  from public, anon, authenticated, service_role;

grant execute on function private.registration_signature_matches(text, text)
  to supabase_auth_admin;
grant execute on function private.registration_attestation_is_valid(text, jsonb)
  to supabase_auth_admin;
grant execute on function private.before_user_created(jsonb)
  to supabase_auth_admin;

commit;
