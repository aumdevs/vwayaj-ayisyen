-- Run with `supabase test db` after enabling pgTAP locally.
begin;

create extension if not exists pgtap with schema extensions;

select plan(28);

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

select ok(
  not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'consent_records'
      and policyname = 'consent_insert_self'
  ),
  'The broad self-service consent insert policy is absent'
);

select ok(
  exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'consent_records'
      and policyname = 'consent_insert_self_non_registration'
      and cmd = 'INSERT'
      and 'authenticated' = any(roles)
      and with_check like '%terms%'
      and with_check like '%privacy%'
  ),
  'Authenticated browser inserts exclude Terms and Privacy evidence'
);

select ok(
  not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'data_subject_requests'
      and policyname = 'dsr_own_insert'
  ),
  'The broad privacy-request insert policy is absent'
);

select ok(
  not has_table_privilege('authenticated', 'public.data_subject_requests', 'INSERT'),
  'Authenticated browsers cannot insert privacy workflow rows directly'
);

select ok(
  not has_table_privilege('authenticated', 'public.data_subject_requests', 'UPDATE'),
  'Authenticated browsers cannot update privacy workflow rows directly'
);

select ok(
  has_function_privilege(
    'authenticated',
    'public.submit_data_subject_request(public.data_request_type,public.app_locale,text)',
    'EXECUTE'
  ),
  'Authenticated users can call the restricted privacy-request intake RPC'
);

select ok(
  not has_function_privilege(
    'anon',
    'public.submit_data_subject_request(public.data_request_type,public.app_locale,text)',
    'EXECUTE'
  ),
  'Anonymous users cannot call the privacy-request intake RPC'
);

select ok(
  has_function_privilege(
    'authenticated',
    'public.complete_data_subject_request(uuid,public.data_request_status,text,text)',
    'EXECUTE'
  ),
  'Authenticated sessions can reach the independently AAL2-gated completion RPC'
);

select ok(
  not has_function_privilege(
    'anon',
    'public.complete_data_subject_request(uuid,public.data_request_status,text,text)',
    'EXECUTE'
  ),
  'Anonymous users cannot call the privacy-request completion RPC'
);

select * from finish();
rollback;
