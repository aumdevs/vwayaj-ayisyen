-- Require distinct Terms and Privacy controls in the signed registration
-- attestation. Registration evidence remains server-verified, and browser
-- sessions cannot create their own Terms or Privacy consent records.
begin;

create table if not exists private.registration_legal_versions (
  singleton boolean primary key default true check (singleton),
  terms_version text not null
    check (terms_version ~ '^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$'),
  privacy_version text not null
    check (privacy_version ~ '^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$'),
  updated_at timestamptz not null default now()
);

insert into private.registration_legal_versions(
  singleton,
  terms_version,
  privacy_version
)
values (
  true,
  'terms-2026-07-23-v1',
  'privacy-2026-07-23-v1'
)
on conflict (singleton) do update
set
  terms_version = excluded.terms_version,
  privacy_version = excluded.privacy_version,
  updated_at = clock_timestamp();

revoke all on private.registration_legal_versions
  from public, anon, authenticated, service_role;
grant select on private.registration_legal_versions to supabase_auth_admin;

-- Before this hardening point, an older deployed policy could let a browser
-- write Terms or Privacy rows. Preserve those rows for audit, but quarantine
-- them from legal display and rely on the server-owned profile evidence as the
-- legacy fallback.
lock table public.consent_records in share row exclusive mode;

update public.consent_records
set
  granted = false,
  withdrawn_at = coalesce(withdrawn_at, clock_timestamp()),
  scope = scope || jsonb_build_object(
    'provenance', 'unverified_pre_hardening',
    'quarantined_at', clock_timestamp()
  )
where consent_type in (
  'terms'::public.consent_type,
  'privacy'::public.consent_type
);

drop policy if exists consent_insert_self on public.consent_records;
drop policy if exists consent_insert_self_non_registration on public.consent_records;

create policy consent_insert_self_non_registration on public.consent_records
for insert to authenticated with check (
  user_id = auth.uid()
  and consent_type not in ('terms'::public.consent_type, 'privacy'::public.consent_type)
);

alter table public.consent_records
  drop constraint if exists legal_consent_requires_signed_provenance;
alter table public.consent_records
  add constraint legal_consent_requires_signed_provenance
  check (
    consent_type not in (
      'terms'::public.consent_type,
      'privacy'::public.consent_type
    )
    or not granted
    or coalesce(
      (
        evidence_hash ~ '^[0-9a-f]{64}$'
        and scope ->> 'provenance' = 'auth_hook_signed_v1'
        and scope ->> 'separate_acceptance' = 'true'
        and (
          consent_type <> 'terms'::public.consent_type
          or (
            scope ->> 'age_capacity_mechanism' = 'signup_age_capacity_checkbox'
            and scope ->> 'age_capacity_confirmed_at'
              ~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{3}Z$'
          )
        )
        and (
          (
            consent_type = 'terms'::public.consent_type
            and scope ->> 'mechanism' = 'signup_terms_checkbox'
          )
          or (
            consent_type = 'privacy'::public.consent_type
            and scope ->> 'mechanism' = 'signup_privacy_acknowledgement_checkbox'
          )
        )
      ),
      false
    )
  );

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
  v_age_capacity_confirmed_at_text text;
  v_age_capacity_mechanism text;
  v_email text;
  v_legal_locale text;
  v_nonce text;
  v_payload text;
  v_privacy_acceptance_mechanism text;
  v_privacy_accepted_at_text text;
  v_privacy_version text;
  v_signature text;
  v_terms_acceptance_mechanism text;
  v_terms_version text;
begin
  v_email := lower(btrim(coalesce(p_email, '')));
  v_age_capacity_confirmed_at_text :=
    coalesce(p_metadata ->> 'age_capacity_confirmed_at', '');
  v_age_capacity_mechanism := coalesce(p_metadata ->> 'age_capacity_mechanism', '');
  v_legal_locale := coalesce(p_metadata ->> 'legal_locale', '');
  v_accepted_at_text := coalesce(p_metadata ->> 'terms_accepted_at', '');
  v_privacy_acceptance_mechanism :=
    coalesce(p_metadata ->> 'privacy_acceptance_mechanism', '');
  v_privacy_accepted_at_text := coalesce(p_metadata ->> 'privacy_accepted_at', '');
  v_nonce := coalesce(p_metadata ->> 'registration_nonce', '');
  v_privacy_version := coalesce(p_metadata ->> 'privacy_version', '');
  v_signature := coalesce(p_metadata ->> 'registration_signature', '');
  v_terms_acceptance_mechanism :=
    coalesce(p_metadata ->> 'terms_acceptance_mechanism', '');
  v_terms_version := coalesce(p_metadata ->> 'terms_version', '');

  if v_email = '' or char_length(v_email) > 254
    or v_terms_version !~ '^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$'
    or v_privacy_version !~ '^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$'
    or v_legal_locale not in ('es', 'pt')
    or v_terms_acceptance_mechanism <> 'signup_terms_checkbox'
    or v_privacy_acceptance_mechanism <> 'signup_privacy_acknowledgement_checkbox'
    or v_age_capacity_mechanism <> 'signup_age_capacity_checkbox'
    or v_accepted_at_text
      !~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{3}Z$'
    or v_privacy_accepted_at_text <> v_accepted_at_text
    or v_age_capacity_confirmed_at_text <> v_accepted_at_text
    or v_nonce !~ '^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
    or not exists (
      select 1
      from private.registration_legal_versions as active_versions
      where active_versions.singleton
        and active_versions.terms_version = v_terms_version
        and active_versions.privacy_version = v_privacy_version
    )
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
    v_privacy_version,
    v_legal_locale,
    v_terms_acceptance_mechanism,
    v_privacy_acceptance_mechanism,
    v_age_capacity_mechanism,
    v_accepted_at_text,
    v_nonce
  );

  return private.registration_signature_matches(v_payload, v_signature);
exception
  when others then
    return false;
end;
$$;

create or replace function private.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_accepted_at timestamptz;
  v_attestation_valid boolean;
  v_evidence_hash text;
  v_legal_locale public.app_locale;
begin
  v_attestation_valid := private.registration_attestation_is_valid(
    new.email,
    coalesce(new.raw_user_meta_data, '{}'::jsonb)
  );

  if v_attestation_valid then
    v_accepted_at := (new.raw_user_meta_data ->> 'terms_accepted_at')::timestamptz;
    v_legal_locale := (new.raw_user_meta_data ->> 'legal_locale')::public.app_locale;
    v_evidence_hash := encode(
      extensions.digest(
        new.raw_user_meta_data ->> 'registration_signature',
        'sha256'
      ),
      'hex'
    );
  end if;

  insert into public.profiles(
    id,
    display_name,
    preferred_locale,
    account_status,
    terms_version,
    privacy_version,
    terms_accepted_at,
    privacy_accepted_at
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
      when v_attestation_valid then new.raw_user_meta_data ->> 'privacy_version'
      else null
    end,
    case
      when v_attestation_valid then v_accepted_at
      else null
    end,
    case
      when v_attestation_valid then v_accepted_at
      else null
    end
  )
  on conflict (id) do nothing;

  if v_attestation_valid then
    insert into public.consent_records(
      user_id,
      consent_type,
      policy_version,
      locale,
      scope,
      granted,
      granted_at,
      evidence_hash
    )
    values
      (
        new.id,
        'terms',
        new.raw_user_meta_data ->> 'terms_version',
        v_legal_locale,
        jsonb_build_object(
          'age_capacity_confirmed_at',
            new.raw_user_meta_data ->> 'age_capacity_confirmed_at',
          'age_capacity_mechanism',
            new.raw_user_meta_data ->> 'age_capacity_mechanism',
          'mechanism', new.raw_user_meta_data ->> 'terms_acceptance_mechanism',
          'provenance', 'auth_hook_signed_v1',
          'separate_acceptance', true
        ),
        true,
        v_accepted_at,
        v_evidence_hash
      ),
      (
        new.id,
        'privacy',
        new.raw_user_meta_data ->> 'privacy_version',
        v_legal_locale,
        jsonb_build_object(
          'acceptance_kind', 'acknowledgement',
          'mechanism', new.raw_user_meta_data ->> 'privacy_acceptance_mechanism',
          'provenance', 'auth_hook_signed_v1',
          'separate_acceptance', true
        ),
        true,
        v_accepted_at,
        v_evidence_hash
      );
  end if;

  insert into public.user_roles(user_id, role, reason)
  values (new.id, 'user', 'automatic signup role')
  on conflict (user_id, role) do nothing;

  return new;
end;
$$;

revoke all on function private.registration_attestation_is_valid(text, jsonb)
  from public, anon, authenticated, service_role;
grant execute on function private.registration_attestation_is_valid(text, jsonb)
  to supabase_auth_admin;

-- CREATE OR REPLACE preserves a manual EXECUTE revocation. Repair the earlier
-- production migration only when bootstrap has actually completed, while a
-- fresh database with no super administrator keeps the original 0012 grant.
do $$
begin
  if exists (
    select 1
    from public.user_roles
    where role = 'super_admin'::public.app_role
  ) then
    execute
      'revoke execute on function public.bootstrap_initial_admin(uuid, text) from service_role';
  end if;
end;
$$;

commit;
