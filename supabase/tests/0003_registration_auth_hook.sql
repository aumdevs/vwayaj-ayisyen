-- Verify that public registration can only cross the Supabase Auth boundary
-- with a fresh server-issued HMAC, and that verified terms are persisted.
begin;

create extension if not exists pgtap with schema extensions;

select plan(10);

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

create temporary table registration_test_vector (
  accepted_at text not null,
  email text not null,
  event jsonb not null,
  nonce text not null,
  signature text not null,
  terms_version text not null,
  user_id uuid not null
);

insert into registration_test_vector(
  accepted_at,
  email,
  event,
  nonce,
  signature,
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
    extensions.gen_random_uuid()::text as nonce,
    'terms-ci-v1'::text as terms_version,
    extensions.gen_random_uuid() as user_id
),
signed as (
  select
    *,
    encode(
      extensions.hmac(
        concat_ws(E'\n', email, terms_version, accepted_at, nonce),
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
        'preferred_locale',
        'ht',
        'registration_nonce',
        nonce,
        'registration_signature',
        signature,
        'terms_accepted_at',
        accepted_at,
        'terms_version',
        terms_version
      )
    )
  ),
  nonce,
  signature,
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
  'The hook fails closed when the Vault signing key is missing'
)
from registration_test_vector;

do $$
begin
  perform vault.create_secret(
    'ci_registration_gate_signing_key_at_least_32_chars',
    'vwayaj_registration_gate_hmac',
    'Ephemeral pgTAP registration key'
  );
end;
$$;

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

select * from finish();
rollback;
