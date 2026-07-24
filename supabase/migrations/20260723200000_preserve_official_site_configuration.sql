-- Apply official identity/contact defaults without discarding any completed or
-- operational configuration that is still present. This cannot reconstruct
-- values already overwritten by a previously executed migration; an affected
-- environment must restore those values from a pre-migration backup or audit
-- export. The corrected 20260723180000 migration prevents that loss on fresh
-- installs, while this forward migration installs the safe idempotent helper.
begin;

create or replace function private.apply_official_site_setting_defaults()
returns void
language sql
security definer
set search_path = ''
as $$
  insert into public.site_settings as existing(key, value, is_public, description)
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
    value = case excluded.key
      when 'brand' then
        (
          excluded.value
          || pg_catalog.jsonb_strip_nulls(existing.value)
          || '{"status":"approved","name":"Vwayaj Ayisyen"}'::jsonb
        )
        - 'owner_email'
        - 'admin_email'
        - 'bootstrap_admin_email'
        - 'private_owner_email'
      when 'support' then
        (
          excluded.value
          || pg_catalog.jsonb_strip_nulls(existing.value)
          || '{"email":"support@vwayajayisyen.com","legal_email":"legal@vwayajayisyen.com","marketing_email":"promo@vwayajayisyen.com"}'::jsonb
        )
        - 'owner_email'
        - 'admin_email'
        - 'bootstrap_admin_email'
        - 'private_owner_email'
      when 'legal_entity' then
        (
          excluded.value
          || pg_catalog.jsonb_strip_nulls(existing.value)
          || pg_catalog.jsonb_build_object(
            'status',
            case
              when existing.value ->> 'status' in ('complete', 'completed', 'approved', 'verified')
                then existing.value ->> 'status'
              else 'partial'
            end
          )
          || case
            when existing.value ->> 'status' in ('complete', 'completed', 'approved', 'verified')
              then pg_catalog.jsonb_build_object(
                'missing',
                coalesce(existing.value -> 'missing', '[]'::jsonb)
              )
            else '{}'::jsonb
          end
        )
        - 'owner_email'
        - 'admin_email'
        - 'bootstrap_admin_email'
        - 'private_owner_email'
      else excluded.value
    end,
    is_public = excluded.is_public,
    description = excluded.description,
    updated_at = pg_catalog.clock_timestamp();
$$;

revoke all on function private.apply_official_site_setting_defaults()
  from public, anon, authenticated, service_role;

select private.apply_official_site_setting_defaults();

commit;
