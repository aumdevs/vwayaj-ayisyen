-- Verify that public registration can only cross the Supabase Auth boundary
-- with a fresh server-issued HMAC, and that verified legal acceptance is persisted.
begin;

create extension if not exists pgtap with schema extensions;
grant usage on schema extensions to current_user;
set local search_path = extensions, public, pg_temp;

select plan(29);

select ok(
  has_function_privilege(
    'supabase_auth_admin',
    'private.before_user_created(jsonb)',
    'EXECUTE'
  ),
  'Supabase Auth can execute the before-user-created hook'
);

select ok(
  has_function_privilege(
    'supabase_auth_admin',
    'private.registration_attestation_is_valid(text,jsonb)',
    'EXECUTE'
  ),
  'Supabase Auth can validate a server attestation'
);

select ok(
  has_function_privilege(
    'supabase_auth_admin',
    'private.admin_provisioning_attestation_is_valid(text,jsonb,jsonb)',
    'EXECUTE'
  ),
  'Supabase Auth can validate signed administrator provisioning'
);

select ok(
  not has_function_privilege(
    'anon',
    'private.admin_provisioning_attestation_is_valid(text,jsonb,jsonb)',
    'EXECUTE'
  ),
  'Anon cannot execute the administrator provisioning validator'
);

select ok(
  not has_function_privilege('anon', 'private.before_user_created(jsonb)', 'EXECUTE'),
  'Anon cannot execute the registration hook through the Data API'
);

select ok(
  not has_function_privilege('authenticated', 'private.before_user_created(jsonb)', 'EXECUTE'),
  'Authenticated users cannot execute the registration hook'
);

select ok(
  not has_function_privilege('service_role', 'private.before_user_created(jsonb)', 'EXECUTE'),
  'The general service role cannot execute the registration hook'
);

select ok(
  has_table_privilege(
    'supabase_auth_admin',
    'private.registration_legal_versions',
    'SELECT'
  ),
  'Supabase Auth can read the active registration legal versions'
);

select ok(
  not has_table_privilege('anon', 'private.registration_legal_versions', 'SELECT'),
  'Anon cannot read the active registration legal versions'
);

select ok(
  not has_table_privilege('authenticated', 'private.registration_legal_versions', 'SELECT'),
  'Authenticated users cannot read the private legal-version control row'
);

select ok(
  not has_table_privilege('service_role', 'private.registration_legal_versions', 'SELECT'),
  'The general service role cannot read the private legal-version control row'
);

update private.registration_legal_versions
set
  terms_version = 'terms-ci-v1',
  terms_es_content_hash = repeat('a', 64),
  terms_pt_content_hash = repeat('c', 64),
  privacy_version = 'privacy-ci-v1',
  privacy_es_content_hash = repeat('b', 64),
  privacy_pt_content_hash = repeat('d', 64),
  updated_at = clock_timestamp()
where singleton;

create temporary table registration_gate_secret_backup (
  decrypted_secret text,
  description text,
  existed boolean not null,
  secret_id uuid
);

insert into registration_gate_secret_backup(
  decrypted_secret,
  description,
  existed,
  secret_id
)
select
  existing.decrypted_secret,
  existing.description,
  existing.id is not null,
  existing.id
from (values (true)) as singleton(present)
left join lateral (
  select id, decrypted_secret, description
  from vault.decrypted_secrets
  where name = 'vwayaj_registration_gate_hmac'
  order by updated_at desc, created_at desc
  limit 1
) as existing on singleton.present;

do $$
declare
  v_secret_id uuid;
begin
  select id
    into v_secret_id
  from vault.secrets
  where name = 'vwayaj_registration_gate_hmac'
  order by updated_at desc, created_at desc
  limit 1;

  if v_secret_id is null then
    perform vault.create_secret(
      'pretest_registration_gate_key_different_at_least_32_chars',
      'vwayaj_registration_gate_hmac',
      'Ephemeral pgTAP pretest key'
    );
  else
    perform vault.update_secret(
      v_secret_id,
      'pretest_registration_gate_key_different_at_least_32_chars',
      'vwayaj_registration_gate_hmac',
      'Ephemeral pgTAP pretest key'
    );
  end if;
end;
$$;

create temporary table registration_test_vector (
  accepted_at text not null,
  email text not null,
  event jsonb not null,
  legal_locale text not null,
  nonce text not null,
  privacy_content_hash text not null,
  privacy_version text not null,
  signature text not null,
  terms_content_hash text not null,
  terms_version text not null,
  user_id uuid not null
);

insert into registration_test_vector(
  accepted_at,
  email,
  event,
  legal_locale,
  nonce,
  privacy_content_hash,
  privacy_version,
  signature,
  terms_content_hash,
  terms_version,
  user_id
)
with source as (
  select
    to_char(
      clock_timestamp() at time zone 'UTC',
      'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'
    ) as accepted_at,
    'registration-test@example.invalid'::text as email,
    'es'::text as legal_locale,
    extensions.gen_random_uuid()::text as nonce,
    repeat('b', 64)::text as privacy_content_hash,
    'privacy-ci-v1'::text as privacy_version,
    repeat('a', 64)::text as terms_content_hash,
    'terms-ci-v1'::text as terms_version,
    extensions.gen_random_uuid() as user_id
),
signed as (
  select
    *,
    encode(
      extensions.hmac(
        concat_ws(
          E'\n',
          email,
          terms_version,
          terms_content_hash,
          privacy_version,
          privacy_content_hash,
          legal_locale,
          'signup_terms_checkbox',
          'signup_privacy_acknowledgement_checkbox',
          'signup_age_capacity_checkbox',
          accepted_at,
          nonce
        ),
        'ci_registration_gate_signing_key_at_least_32_chars',
        'sha256'
      ),
      'hex'
    ) as signature
  from source
)
select
  accepted_at,
  email,
  jsonb_build_object(
    'metadata',
    jsonb_build_object('name', 'before-user-created'),
    'user',
    jsonb_build_object(
      'email',
      email,
      'user_metadata',
      jsonb_build_object(
        'age_capacity_confirmed_at',
        accepted_at,
        'age_capacity_mechanism',
        'signup_age_capacity_checkbox',
        'legal_locale',
        legal_locale,
        'preferred_locale',
        'ht',
        'privacy_accepted_at',
        accepted_at,
        'privacy_acceptance_mechanism',
        'signup_privacy_acknowledgement_checkbox',
        'privacy_content_hash',
        privacy_content_hash,
        'privacy_version',
        privacy_version,
        'registration_nonce',
        nonce,
        'registration_signature',
        signature,
        'terms_accepted_at',
        accepted_at,
        'terms_acceptance_mechanism',
        'signup_terms_checkbox',
        'terms_content_hash',
        terms_content_hash,
        'terms_version',
        terms_version
      )
    )
  ),
  legal_locale,
  nonce,
  privacy_content_hash,
  privacy_version,
  signature,
  terms_content_hash,
  terms_version,
  user_id
from signed;

select is(
  private.before_user_created(event),
  jsonb_build_object(
    'error',
    jsonb_build_object(
      'http_code', 400,
      'message', 'Registration request could not be verified.'
    )
  ),
  'The hook fails closed before the matching test signing key is installed'
)
from registration_test_vector;

do $$
declare
  v_secret_id uuid;
begin
  select id
    into v_secret_id
  from vault.secrets
  where name = 'vwayaj_registration_gate_hmac'
  order by updated_at desc, created_at desc
  limit 1;

  perform vault.update_secret(
    v_secret_id,
    'ci_registration_gate_signing_key_at_least_32_chars',
    'vwayaj_registration_gate_hmac',
    'Ephemeral pgTAP registration key'
  );
end;
$$;

create temporary table provisioning_test_vector (
  email text not null,
  event jsonb not null,
  issued_at text not null,
  nonce text not null,
  signature text not null,
  user_id uuid not null
);

insert into provisioning_test_vector(email, event, issued_at, nonce, signature, user_id)
with source as (
  select
    'bootstrap-test@example.invalid'::text as email,
    to_char(
      clock_timestamp() at time zone 'UTC',
      'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'
    ) as issued_at,
    extensions.gen_random_uuid()::text as nonce,
    extensions.gen_random_uuid() as user_id
),
signed as (
  select
    *,
    encode(
      extensions.hmac(
        concat_ws(E'\n', 'admin-bootstrap', email, issued_at, nonce),
        'ci_registration_gate_signing_key_at_least_32_chars',
        'sha256'
      ),
      'hex'
    ) as signature
  from source
)
select
  email,
  jsonb_build_object(
    'metadata',
    jsonb_build_object('name', 'before-user-created'),
    'user',
    jsonb_build_object(
      'email',
      email,
      'app_metadata',
      jsonb_build_object(
        'bootstrap_source',
        'one-time-script',
        'provider',
        'email',
        'providers',
        jsonb_build_array('email')
      ),
      'user_metadata',
      jsonb_build_object(
        'preferred_locale',
        'ht',
        'provisioning_issued_at',
        issued_at,
        'provisioning_nonce',
        nonce,
        'provisioning_purpose',
        'admin-bootstrap',
        'provisioning_signature',
        signature
      )
    )
  ),
  issued_at,
  nonce,
  signature,
  user_id
from signed;

select is(
  private.before_user_created(event),
  '{}'::jsonb,
  'A fresh signed administrator provisioning request is allowed'
)
from provisioning_test_vector;

select is(
  private.before_user_created(
    jsonb_set(event, '{user,app_metadata}', '{}'::jsonb)
  ),
  jsonb_build_object(
    'error',
    jsonb_build_object(
      'http_code', 400,
      'message', 'Registration request could not be verified.'
    )
  ),
  'Provisioning without server-controlled app metadata is rejected'
)
from provisioning_test_vector;

select is(
  private.before_user_created(event),
  '{}'::jsonb,
  'A fresh correctly signed registration is allowed'
)
from registration_test_vector;

select is(
  private.before_user_created(
    jsonb_set(
      event,
      '{user,user_metadata,registration_signature}',
      to_jsonb(repeat('0', 64))
    )
  ),
  jsonb_build_object(
    'error',
    jsonb_build_object(
      'http_code', 400,
      'message', 'Registration request could not be verified.'
    )
  ),
  'A tampered registration signature is rejected'
)
from registration_test_vector;

select is(
  private.before_user_created(
    event #- '{user,user_metadata,privacy_version}'
  ),
  jsonb_build_object(
    'error',
    jsonb_build_object(
      'http_code', 400,
      'message', 'Registration request could not be verified.'
    )
  ),
  'Registration without a privacy policy version is rejected'
)
from registration_test_vector;

select is(
  private.before_user_created(
    event #- '{user,user_metadata,privacy_content_hash}'
  ),
  jsonb_build_object(
    'error',
    jsonb_build_object(
      'http_code', 400,
      'message', 'Registration request could not be verified.'
    )
  ),
  'Registration without the published privacy content hash is rejected'
)
from registration_test_vector;

select is(
  private.before_user_created(
    jsonb_set(
      jsonb_set(
        event,
        '{user,user_metadata,terms_content_hash}',
        to_jsonb(repeat('e', 64))
      ),
      '{user,user_metadata,registration_signature}',
      to_jsonb(
        encode(
          extensions.hmac(
            concat_ws(
              E'\n',
              email,
              terms_version,
              repeat('e', 64),
              privacy_version,
              privacy_content_hash,
              legal_locale,
              'signup_terms_checkbox',
              'signup_privacy_acknowledgement_checkbox',
              'signup_age_capacity_checkbox',
              accepted_at,
              nonce
            ),
            'ci_registration_gate_signing_key_at_least_32_chars',
            'sha256'
          ),
          'hex'
        )
      )
    )
  ),
  jsonb_build_object(
    'error',
    jsonb_build_object(
      'http_code', 400,
      'message', 'Registration request could not be verified.'
    )
  ),
  'A correctly signed but unregistered legal content hash is rejected'
)
from registration_test_vector;

select is(
  private.before_user_created(
    event #- '{user,user_metadata,age_capacity_mechanism}'
  ),
  jsonb_build_object(
    'error',
    jsonb_build_object(
      'http_code', 400,
      'message', 'Registration request could not be verified.'
    )
  ),
  'Registration without the 18+ and legal-capacity confirmation is rejected'
)
from registration_test_vector;

select is(
  private.before_user_created(
    jsonb_set(
      jsonb_set(
        event,
        '{user,user_metadata,terms_version}',
        to_jsonb('terms-stale-v1'::text)
      ),
      '{user,user_metadata,registration_signature}',
      to_jsonb(
        encode(
          extensions.hmac(
            concat_ws(
              E'\n',
              email,
              'terms-stale-v1',
              terms_content_hash,
              privacy_version,
              privacy_content_hash,
              legal_locale,
              'signup_terms_checkbox',
              'signup_privacy_acknowledgement_checkbox',
              'signup_age_capacity_checkbox',
              accepted_at,
              nonce
            ),
            'ci_registration_gate_signing_key_at_least_32_chars',
            'sha256'
          ),
          'hex'
        )
      )
    )
  ),
  jsonb_build_object(
    'error',
    jsonb_build_object(
      'http_code', 400,
      'message', 'Registration request could not be verified.'
    )
  ),
  'A correctly re-signed attestation for a stale legal version is rejected'
)
from registration_test_vector;

insert into auth.users(
  id,
  instance_id,
  aud,
  role,
  email,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at
)
select
  user_id,
  '00000000-0000-0000-0000-000000000000'::uuid,
  'authenticated',
  'authenticated',
  email,
  '{"provider":"email","providers":["email"]}'::jsonb,
  event -> 'user' -> 'user_metadata',
  clock_timestamp(),
  clock_timestamp()
from registration_test_vector;

select is(
  (select p.terms_version from public.profiles p where p.id = v.user_id),
  v.terms_version,
  'The verified terms version is persisted on the profile'
)
from registration_test_vector v;

select is(
  (select p.privacy_version from public.profiles p where p.id = v.user_id),
  v.privacy_version,
  'The verified privacy policy version is persisted on the profile'
)
from registration_test_vector v;

select is(
  (
    select to_char(
      p.terms_accepted_at at time zone 'UTC',
      'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'
    )
    from public.profiles p
    where p.id = v.user_id
  ),
  v.accepted_at,
  'The verified terms acceptance timestamp is persisted on the profile'
)
from registration_test_vector v;

select is(
  (
    select to_char(
      p.privacy_accepted_at at time zone 'UTC',
      'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'
    )
    from public.profiles p
    where p.id = v.user_id
  ),
  v.accepted_at,
  'The verified privacy acceptance timestamp is persisted on the profile'
)
from registration_test_vector v;

select is(
  (
    select array_agg(c.consent_type::text order by c.consent_type::text)
    from public.consent_records c
    where c.user_id = v.user_id
  ),
  array['privacy', 'terms']::text[],
  'Terms and privacy are stored as separate consent records'
)
from registration_test_vector v;

select ok(
  (
    select bool_and(
      c.granted
      and c.locale::text = v.legal_locale
      and c.evidence_hash is not null
      and c.scope ->> 'separate_acceptance' = 'true'
      and c.scope ->> 'document_hash_algorithm' = 'sha256'
      and case c.consent_type
        when 'terms'::public.consent_type
          then c.scope ->> 'mechanism' = 'signup_terms_checkbox'
            and c.scope ->> 'document_hash' = v.terms_content_hash
            and c.scope ->> 'age_capacity_mechanism' = 'signup_age_capacity_checkbox'
            and c.scope ->> 'age_capacity_confirmed_at' = v.accepted_at
        when 'privacy'::public.consent_type
          then c.scope ->> 'mechanism' = 'signup_privacy_acknowledgement_checkbox'
            and c.scope ->> 'document_hash' = v.privacy_content_hash
            and c.scope ->> 'acceptance_kind' = 'acknowledgement'
        else false
      end
    )
    from public.consent_records c
    where c.user_id = v.user_id
  ),
  'Consent records preserve locale, document hash, mechanism and proportional evidence'
)
from registration_test_vector v;

insert into auth.users(
  id,
  instance_id,
  aud,
  role,
  email,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at
)
select
  user_id,
  '00000000-0000-0000-0000-000000000000'::uuid,
  'authenticated',
  'authenticated',
  email,
  event -> 'user' -> 'app_metadata',
  event -> 'user' -> 'user_metadata',
  clock_timestamp(),
  clock_timestamp()
from provisioning_test_vector;

select ok(
  (
    select
      p.terms_version is null
      and p.privacy_version is null
      and p.terms_accepted_at is null
      and p.privacy_accepted_at is null
    from public.profiles p
    where p.id = v.user_id
  ),
  'Administrator provisioning does not fabricate public legal acceptance'
)
from provisioning_test_vector v;

select is(
  (
    select count(*)::integer
    from public.consent_records c
    where c.user_id = v.user_id
  ),
  0,
  'Administrator provisioning does not fabricate consent records'
)
from provisioning_test_vector v;

do $$
declare
  v_backup registration_gate_secret_backup%rowtype;
begin
  select *
    into strict v_backup
  from registration_gate_secret_backup;

  if v_backup.existed then
    perform vault.update_secret(
      v_backup.secret_id,
      v_backup.decrypted_secret,
      'vwayaj_registration_gate_hmac',
      coalesce(v_backup.description, '')
    );
  else
    delete from vault.secrets
    where name = 'vwayaj_registration_gate_hmac';
  end if;
end;
$$;

select * from finish();
rollback;
