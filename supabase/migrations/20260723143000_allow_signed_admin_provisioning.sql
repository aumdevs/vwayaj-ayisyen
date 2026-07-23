-- Keep the one-time administrator bootstrap compatible with the Auth hook
-- without trusting client-controlled metadata or bypassing signature checks.
begin;

create or replace function private.admin_provisioning_attestation_is_valid(
  p_email text,
  p_app_metadata jsonb,
  p_user_metadata jsonb
)
returns boolean
language plpgsql
set search_path = ''
as $$
declare
  v_email text;
  v_issued_at timestamptz;
  v_issued_at_text text;
  v_nonce text;
  v_payload text;
  v_signature text;
begin
  v_email := lower(btrim(coalesce(p_email, '')));
  v_issued_at_text := coalesce(p_user_metadata ->> 'provisioning_issued_at', '');
  v_nonce := coalesce(p_user_metadata ->> 'provisioning_nonce', '');
  v_signature := coalesce(p_user_metadata ->> 'provisioning_signature', '');

  if coalesce(p_app_metadata ->> 'bootstrap_source', '') <> 'one-time-script'
    or coalesce(p_user_metadata ->> 'provisioning_purpose', '') <> 'admin-bootstrap'
    or v_email = ''
    or char_length(v_email) > 254
    or v_issued_at_text !~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{3}Z$'
    or v_nonce !~ '^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
  then
    return false;
  end if;

  begin
    v_issued_at := v_issued_at_text::timestamptz;
  exception
    when others then
      return false;
  end;

  if v_issued_at < clock_timestamp() - interval '10 minutes'
    or v_issued_at > clock_timestamp() + interval '1 minute'
  then
    return false;
  end if;

  v_payload := concat_ws(
    E'\n',
    'admin-bootstrap',
    v_email,
    v_issued_at_text,
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
  ) or private.admin_provisioning_attestation_is_valid(
    event -> 'user' ->> 'email',
    coalesce(event -> 'user' -> 'app_metadata', '{}'::jsonb),
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

revoke all on function private.admin_provisioning_attestation_is_valid(text, jsonb, jsonb)
  from public, anon, authenticated, service_role;
revoke all on function private.before_user_created(jsonb)
  from public, anon, authenticated, service_role;

grant execute on function private.admin_provisioning_attestation_is_valid(text, jsonb, jsonb)
  to supabase_auth_admin;
grant execute on function private.before_user_created(jsonb)
  to supabase_auth_admin;

commit;
