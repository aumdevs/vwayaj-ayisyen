-- Prove that official identity/contact defaults remove private owner fields
-- without erasing completed legal data or operational support configuration.
begin;

create extension if not exists pgtap with schema extensions;
set local search_path = extensions, public, pg_temp;

select plan(5);

update public.site_settings
set value = '{
  "status":"draft",
  "name":"Previous display name",
  "logo_path":"/custom-logo.svg",
  "theme":"accessible",
  "owner_email":"private-owner@example.invalid"
}'::jsonb
where key = 'brand';

update public.site_settings
set value = '{
  "email":"private-owner@example.invalid",
  "legal_email":"private-owner@example.invalid",
  "marketing_email":"private-owner@example.invalid",
  "whatsapp_e164":"+5500000000000",
  "hours":"test-only-hours",
  "routing":{"support":"test-only-queue"},
  "admin_email":"private-owner@example.invalid"
}'::jsonb
where key = 'support';

update public.site_settings
set value = '{
  "status":"complete",
  "legal_name":"Vwayaj ayisyen",
  "entity_type":"Ltda.",
  "country":"Brasil",
  "public_address":"Test-only complete public address",
  "cnpj":"test-only-cnpj",
  "full_commercial_address":"Test-only complete commercial address",
  "registration_metadata":{"source":"test-only"},
  "private_owner_email":"private-owner@example.invalid"
}'::jsonb
where key = 'legal_entity';

select private.apply_official_site_setting_defaults();

select ok(
  (
    select
      value ->> 'status' = 'approved'
      and value ->> 'name' = 'Vwayaj Ayisyen'
      and value ->> 'logo_path' = '/custom-logo.svg'
      and value ->> 'theme' = 'accessible'
      and not (value ?| array[
        'owner_email',
        'admin_email',
        'bootstrap_admin_email',
        'private_owner_email'
      ])
    from public.site_settings
    where key = 'brand'
  ),
  'Official brand identity is applied while custom visual configuration is retained'
);

select ok(
  (
    select
      value ->> 'email' = 'support@vwayajayisyen.com'
      and value ->> 'legal_email' = 'legal@vwayajayisyen.com'
      and value ->> 'marketing_email' = 'promo@vwayajayisyen.com'
      and value ->> 'whatsapp_e164' = '+5500000000000'
      and value ->> 'hours' = 'test-only-hours'
      and value -> 'routing' = '{"support":"test-only-queue"}'::jsonb
      and not (value ?| array[
        'owner_email',
        'admin_email',
        'bootstrap_admin_email',
        'private_owner_email'
      ])
    from public.site_settings
    where key = 'support'
  ),
  'Official contact addresses replace private identity without losing support operations'
);

select ok(
  (
    select
      value ->> 'status' = 'complete'
      and value ->> 'cnpj' = 'test-only-cnpj'
      and value ->> 'full_commercial_address' =
        'Test-only complete commercial address'
      and value -> 'registration_metadata' = '{"source":"test-only"}'::jsonb
      and value -> 'missing' = '[]'::jsonb
      and not (value ?| array[
        'owner_email',
        'admin_email',
        'bootstrap_admin_email',
        'private_owner_email'
      ])
    from public.site_settings
    where key = 'legal_entity'
  ),
  'Completed legal configuration remains complete and keeps every verified field'
);

select ok(
  (
    select bool_and(
      case key
        when 'legal_entity' then not is_public
        else is_public
      end
    )
    from public.site_settings
    where key in ('brand', 'support', 'legal_entity')
  ),
  'Public visibility remains restricted for the legal-entity record'
);

select ok(
  not has_function_privilege(
    'authenticated',
    'private.apply_official_site_setting_defaults()',
    'EXECUTE'
  )
  and not has_function_privilege(
    'service_role',
    'private.apply_official_site_setting_defaults()',
    'EXECUTE'
  ),
  'Only the migration owner can reapply official site-setting defaults'
);

select * from finish();
rollback;
