-- Run with `supabase test db` after enabling pgTAP locally.
begin;

create extension if not exists pgtap with schema extensions;

select plan(19);

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

select ok(
  not has_function_privilege('anon', 'public.admin_set_user_role(uuid,public.app_role,boolean,text)', 'EXECUTE'),
  'Anon cannot execute role administration RPC'
);

select ok(
  not has_function_privilege('anon', 'public.complete_privileged_onboarding()', 'EXECUTE'),
  'Anon cannot execute privileged onboarding RPC'
);

select ok(
  not has_function_privilege('anon', 'public.mark_notification_read(uuid)', 'EXECUTE'),
  'Anon cannot execute notification mutation RPC'
);

select ok(
  not has_function_privilege('anon', 'public.update_my_profile(text,public.app_locale,text,text)', 'EXECUTE'),
  'Anon cannot execute profile mutation RPC'
);

select ok(
  not exists (
    select 1 from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'content_media_public_read'
  ),
  'Public content bucket cannot be listed through a broad policy'
);

select ok(
  not exists (
    select 1 from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'avatars_public_read'
  ),
  'Public avatar bucket cannot be listed through a broad policy'
);

select ok(
  exists (
    select 1 from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'content_media_staff_select'
      and cmd = 'SELECT'
      and 'authenticated' = any(roles)
      and qual like '%can_manage_content%'
  ),
  'Content staff retain scoped SELECT access required for mutations'
);

select ok(
  exists (
    select 1 from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'avatars_owner_select'
      and cmd = 'SELECT'
      and 'authenticated' = any(roles)
      and qual like '%auth.uid()%'
  ),
  'Avatar owners retain folder-scoped SELECT access required for mutations'
);

select * from finish();
rollback;
