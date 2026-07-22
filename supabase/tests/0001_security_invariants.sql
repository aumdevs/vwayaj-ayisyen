-- Run with `supabase test db` after enabling pgTAP locally.
begin;

create extension if not exists pgtap with schema extensions;

select plan(11);

select ok(
  not exists (
    select 1
    from pg_class c
    join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'public'
      and c.relkind = 'r'
      and c.relname not in ('spatial_ref_sys')
      and not c.relrowsecurity
  ),
  'All public application tables have RLS enabled'
);

select ok(
  not exists (
    select 1 from public.feature_flags
    where key in (
      'feature_payments','feature_document_uploads','feature_ai_assistant',
      'feature_community','feature_appointments','feature_whatsapp','feature_public_intake'
    ) and enabled
  ),
  'High-risk features are disabled by default'
);

select is(
  (select count(*)::integer from public.countries where active),
  4,
  'Exactly four countries are active'
);

select is(
  (select count(*)::integer from public.user_roles where role = 'super_admin'),
  0,
  'Migrations do not create a super admin'
);

select ok(
  not exists (
    select 1 from storage.buckets
    where id in ('case-documents-quarantine','case-documents-clean') and public
  ),
  'Case document buckets are private'
);

select ok(
  exists (
    select 1 from storage.buckets
    where id = 'case-documents-quarantine'
      and file_size_limit = 10485760
  ),
  'Quarantine bucket has 10 MB limit'
);

select ok(
  not has_table_privilege('anon', 'public.crm_contacts', 'SELECT'),
  'Anon cannot select CRM contacts'
);

select ok(
  not has_table_privilege('authenticated', 'public.crm_contacts', 'SELECT'),
  'Browser authenticated role cannot select CRM ciphertext table'
);

select ok(
  not has_table_privilege('authenticated', 'public.outbox_events', 'SELECT'),
  'Outbox is server-only'
);

select ok(
  not has_function_privilege('anon', 'public.bootstrap_initial_admin(uuid,text)', 'EXECUTE'),
  'Anon cannot execute initial admin bootstrap'
);

select ok(
  not has_function_privilege('authenticated', 'public.bootstrap_initial_admin(uuid,text)', 'EXECUTE'),
  'Authenticated users cannot execute initial admin bootstrap'
);

select * from finish();
rollback;
