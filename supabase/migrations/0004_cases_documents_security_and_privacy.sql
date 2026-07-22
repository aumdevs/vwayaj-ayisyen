-- 0004_cases_documents_security_and_privacy.sql
begin;

create sequence if not exists public.case_reference_seq start 1000;

create table if not exists public.cases (
  id uuid primary key default gen_random_uuid(),
  reference_code text not null unique
    default ('CASE-' || to_char(current_date, 'YYYY') || '-' || lpad(nextval('public.case_reference_seq')::text, 6, '0')),
  client_user_id uuid not null references auth.users(id) on delete restrict,
  country_code public.country_code not null references public.countries(code) on delete restrict,
  package_id uuid references public.service_packages(id) on delete set null,
  lead_id uuid references public.leads(id) on delete set null,
  status public.case_status not null default 'intake',
  title text,
  current_stage_code text,
  opened_at timestamptz,
  completed_at timestamptz,
  cancelled_at timestamptz,
  archived_at timestamptz,
  retention_until timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint cases_title_length check (title is null or char_length(title) <= 240)
);
create index if not exists cases_client_idx on public.cases(client_user_id, created_at desc);
create index if not exists cases_pipeline_idx on public.cases(status, country_code, updated_at desc);

create table if not exists public.case_participants (
  case_id uuid not null references public.cases(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  participant_role public.case_participant_role not null,
  can_view_documents boolean not null default false,
  can_upload_documents boolean not null default false,
  can_message boolean not null default false,
  can_manage_tasks boolean not null default false,
  starts_at timestamptz not null default now(),
  expires_at timestamptz,
  granted_by uuid references auth.users(id) on delete set null,
  revoked_at timestamptz,
  revoke_reason text,
  primary key (case_id, user_id, participant_role),
  constraint case_participant_expiry check (expires_at is null or expires_at > starts_at)
);
create index if not exists case_participants_user_idx on public.case_participants(user_id, case_id)
  where revoked_at is null;

create table if not exists public.case_status_history (
  id bigint generated always as identity primary key,
  case_id uuid not null references public.cases(id) on delete cascade,
  from_status public.case_status,
  to_status public.case_status not null,
  visible_to_client boolean not null default true,
  note text,
  changed_by uuid references auth.users(id) on delete set null,
  changed_at timestamptz not null default now()
);
create index if not exists case_status_history_idx on public.case_status_history(case_id, changed_at desc);

create table if not exists public.case_tasks (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.cases(id) on delete cascade,
  parent_task_id uuid references public.case_tasks(id) on delete set null,
  template_code text,
  title text not null,
  description text,
  status public.task_status not null default 'todo',
  assigned_user_id uuid references auth.users(id) on delete set null,
  visible_to_client boolean not null default true,
  evidence_required boolean not null default false,
  due_at timestamptz,
  submitted_at timestamptz,
  completed_at timestamptz,
  rejected_reason text,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint case_task_title_length check (char_length(title) between 1 and 240),
  constraint case_task_description_length check (description is null or char_length(description) <= 10000)
);
create index if not exists case_tasks_case_idx on public.case_tasks(case_id, status, due_at);

create table if not exists public.case_notes (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.cases(id) on delete cascade,
  author_id uuid references auth.users(id) on delete set null,
  body text not null,
  visible_to_client boolean not null default false,
  sensitivity public.risk_level not null default 'medium',
  supersedes_id uuid references public.case_notes(id) on delete set null,
  created_at timestamptz not null default now(),
  constraint case_note_length check (char_length(body) between 1 and 20000)
);
create index if not exists case_notes_case_idx on public.case_notes(case_id, created_at desc);

create table if not exists public.case_messages (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.cases(id) on delete cascade,
  sender_id uuid references auth.users(id) on delete set null,
  body text not null,
  reply_to_id uuid references public.case_messages(id) on delete set null,
  edited_at timestamptz,
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  constraint case_message_length check (char_length(body) between 1 and 10000)
);
create index if not exists case_messages_case_idx on public.case_messages(case_id, created_at desc);

create table if not exists public.case_documents (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.cases(id) on delete cascade,
  uploaded_by uuid references auth.users(id) on delete set null,
  requested_by uuid references auth.users(id) on delete set null,
  task_id uuid references public.case_tasks(id) on delete set null,
  document_type_code text not null,
  classification public.document_classification not null default 'confidential',
  original_filename_ciphertext bytea,
  original_filename_iv bytea,
  original_filename_tag bytea,
  encryption_key_version smallint,
  quarantine_bucket text not null default 'case-documents-quarantine',
  quarantine_path text,
  clean_bucket text default 'case-documents-clean',
  clean_path text,
  detected_mime text,
  declared_mime text,
  byte_size bigint check (byte_size is null or byte_size between 1 and 10485760),
  sha256_hex char(64),
  scan_status public.document_scan_status not null default 'uploading',
  scanner_provider text,
  scanner_reference text,
  scan_details jsonb not null default '{}'::jsonb,
  scan_started_at timestamptz,
  scan_completed_at timestamptz,
  version_no integer not null default 1 check (version_no > 0),
  supersedes_id uuid references public.case_documents(id) on delete set null,
  verified_by uuid references auth.users(id) on delete set null,
  verified_at timestamptz,
  rejection_reason text,
  retention_until timestamptz,
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (case_id, document_type_code, version_no),
  constraint document_paths_not_same check (
    quarantine_path is null or clean_path is null or quarantine_path <> clean_path
  ),
  constraint document_sha_format check (sha256_hex is null or sha256_hex ~ '^[0-9a-f]{64}$')
);
create index if not exists case_documents_case_idx on public.case_documents(case_id, scan_status, created_at desc);
create index if not exists case_documents_retention_idx on public.case_documents(retention_until)
  where deleted_at is null;

create table if not exists public.document_access_grants (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.cases(id) on delete cascade,
  document_id uuid references public.case_documents(id) on delete cascade,
  grantee_user_id uuid not null references auth.users(id) on delete cascade,
  permission text not null check (permission in ('view','download','verify')),
  reason text not null,
  starts_at timestamptz not null default now(),
  expires_at timestamptz not null,
  granted_by uuid references auth.users(id) on delete set null,
  revoked_at timestamptz,
  revoked_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  constraint document_grant_expiry check (expires_at > starts_at)
);
create index if not exists document_grants_active_idx
  on public.document_access_grants(grantee_user_id, case_id, document_id, expires_at)
  where revoked_at is null;

create table if not exists public.document_access_events (
  id bigint generated always as identity primary key,
  document_id uuid not null references public.case_documents(id) on delete cascade,
  case_id uuid not null references public.cases(id) on delete cascade,
  actor_id uuid references auth.users(id) on delete set null,
  action text not null check (action in ('metadata_view','signed_url_created','download','verify','reject','delete')),
  request_id text,
  reason text,
  ip_prefix text,
  user_agent_hash text,
  created_at timestamptz not null default now()
);
create index if not exists document_access_events_idx on public.document_access_events(document_id, created_at desc);

create table if not exists public.consent_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  case_id uuid references public.cases(id) on delete cascade,
  document_id uuid references public.case_documents(id) on delete cascade,
  consent_type public.consent_type not null,
  policy_version text not null,
  locale public.app_locale not null,
  scope jsonb not null default '{}'::jsonb,
  granted boolean not null,
  granted_at timestamptz not null default now(),
  withdrawn_at timestamptz,
  evidence_hash text,
  created_at timestamptz not null default now()
);
create index if not exists consent_records_user_idx on public.consent_records(user_id, consent_type, granted_at desc);

create table if not exists public.audit_log (
  id bigint generated always as identity primary key,
  actor_id uuid references auth.users(id) on delete set null,
  actor_role public.app_role,
  action text not null,
  target_table text,
  target_id text,
  request_id text,
  reason text,
  before_data jsonb,
  after_data jsonb,
  risk_level public.risk_level not null default 'medium',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists audit_log_target_idx on public.audit_log(target_table, target_id, created_at desc);
create index if not exists audit_log_actor_idx on public.audit_log(actor_id, created_at desc);

create table if not exists public.security_events (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users(id) on delete set null,
  event_type text not null,
  severity public.risk_level not null,
  request_id text,
  ip_prefix text,
  user_agent_hash text,
  details jsonb not null default '{}'::jsonb,
  resolved_at timestamptz,
  resolved_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);
create index if not exists security_events_open_idx on public.security_events(severity, created_at desc)
  where resolved_at is null;

create table if not exists public.data_subject_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  request_type public.data_request_type not null,
  status public.data_request_status not null default 'received',
  locale public.app_locale not null default 'ht',
  description text,
  identity_verification_method text,
  due_at timestamptz,
  assigned_to uuid references auth.users(id) on delete set null,
  resolution_summary text,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists dsr_status_idx on public.data_subject_requests(status, due_at);

create table if not exists public.admin_invitations (
  id uuid primary key default gen_random_uuid(),
  email_lookup_hash text not null,
  email_ciphertext bytea not null,
  email_iv bytea not null,
  email_tag bytea not null,
  encryption_key_version smallint not null default 1,
  roles public.app_role[] not null,
  token_hash text not null unique,
  invited_by uuid not null references auth.users(id) on delete restrict,
  expires_at timestamptz not null,
  accepted_by uuid references auth.users(id) on delete set null,
  accepted_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz not null default now(),
  constraint admin_invitation_expiry check (expires_at > created_at),
  constraint admin_invitation_roles check (cardinality(roles) > 0)
);
create index if not exists admin_invitations_active_idx on public.admin_invitations(expires_at)
  where accepted_at is null and revoked_at is null;

create table if not exists public.outbox_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  aggregate_type text,
  aggregate_id text,
  payload jsonb not null default '{}'::jsonb,
  available_at timestamptz not null default now(),
  attempts integer not null default 0,
  locked_at timestamptz,
  locked_by text,
  processed_at timestamptz,
  last_error text,
  created_at timestamptz not null default now()
);
create index if not exists outbox_pending_idx on public.outbox_events(available_at, created_at)
  where processed_at is null;

commit;
