-- 0003_services_assessment_and_crm.sql
begin;

create table if not exists public.service_packages (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  country_code public.country_code references public.countries(code) on delete restrict,
  tier smallint not null check (tier between 1 and 10),
  status public.package_status not null default 'draft',
  remote_only boolean not null default true,
  duration_days integer check (duration_days is null or duration_days between 1 and 730),
  display_order integer not null default 0,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint service_package_code_format check (code ~ '^[a-z][a-z0-9_]{2,80}$')
);

create table if not exists public.service_package_translations (
  package_id uuid not null references public.service_packages(id) on delete cascade,
  locale public.app_locale not null,
  name text not null,
  short_description text,
  full_description jsonb not null default '[]'::jsonb,
  includes_summary text,
  excludes_summary text,
  status public.translation_status not null default 'draft',
  primary key (package_id, locale),
  constraint package_full_description_array check (jsonb_typeof(full_description) = 'array')
);

create table if not exists public.package_prices (
  id uuid primary key default gen_random_uuid(),
  package_id uuid not null references public.service_packages(id) on delete cascade,
  currency char(3) not null,
  unit_amount bigint not null check (unit_amount >= 0),
  stripe_price_id text,
  active boolean not null default false,
  valid_from timestamptz,
  valid_until timestamptz,
  created_at timestamptz not null default now(),
  unique (package_id, currency, stripe_price_id),
  constraint package_price_dates check (valid_until is null or valid_from is null or valid_until > valid_from),
  constraint stripe_price_id_format check (stripe_price_id is null or stripe_price_id ~ '^price_[A-Za-z0-9]+$')
);

create table if not exists public.package_features (
  id uuid primary key default gen_random_uuid(),
  package_id uuid not null references public.service_packages(id) on delete cascade,
  code text not null,
  included boolean not null default true,
  display_order integer not null default 0,
  unique (package_id, code)
);

create table if not exists public.package_feature_translations (
  feature_id uuid not null references public.package_features(id) on delete cascade,
  locale public.app_locale not null,
  label text not null,
  detail text,
  primary key (feature_id, locale)
);

alter table public.whatsapp_templates
  drop constraint if exists whatsapp_templates_package_id_fkey;
alter table public.whatsapp_templates
  add constraint whatsapp_templates_package_id_fkey
  foreign key (package_id) references public.service_packages(id) on delete set null;

create table if not exists public.comparison_criteria (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  default_weight numeric(6,3) not null default 1 check (default_weight >= 0 and default_weight <= 100),
  higher_is_better boolean not null default true,
  status public.content_status not null default 'draft',
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.comparison_criterion_translations (
  criterion_id uuid not null references public.comparison_criteria(id) on delete cascade,
  locale public.app_locale not null,
  name text not null,
  explanation text not null,
  scale_low_label text,
  scale_high_label text,
  status public.translation_status not null default 'draft',
  primary key (criterion_id, locale)
);

create table if not exists public.country_comparison_scores (
  id uuid primary key default gen_random_uuid(),
  country_code public.country_code not null references public.countries(code) on delete cascade,
  criterion_id uuid not null references public.comparison_criteria(id) on delete cascade,
  score numeric(3,2) not null check (score between 1 and 5),
  confidence numeric(4,3) not null default 0.5 check (confidence between 0 and 1),
  source_summary jsonb not null default '[]'::jsonb,
  methodology text,
  effective_at timestamptz,
  last_verified_at timestamptz,
  next_review_at timestamptz,
  status public.content_status not null default 'draft',
  reviewed_by uuid references auth.users(id) on delete set null,
  unique (country_code, criterion_id),
  constraint comparison_source_summary_array check (jsonb_typeof(source_summary) = 'array')
);

create table if not exists public.country_comparison_score_translations (
  score_id uuid not null references public.country_comparison_scores(id) on delete cascade,
  locale public.app_locale not null,
  explanation text not null,
  status public.translation_status not null default 'draft',
  primary key (score_id, locale)
);

create table if not exists public.assessment_questions (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  version integer not null default 1,
  question_type text not null check (question_type in ('single','multi','boolean','range')),
  required boolean not null default true,
  display_order integer not null default 0,
  status public.content_status not null default 'draft',
  config jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.assessment_question_translations (
  question_id uuid not null references public.assessment_questions(id) on delete cascade,
  locale public.app_locale not null,
  prompt text not null,
  help_text text,
  status public.translation_status not null default 'draft',
  primary key (question_id, locale)
);

create table if not exists public.assessment_options (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.assessment_questions(id) on delete cascade,
  code text not null,
  display_order integer not null default 0,
  config jsonb not null default '{}'::jsonb,
  unique (question_id, code)
);

create table if not exists public.assessment_option_translations (
  option_id uuid not null references public.assessment_options(id) on delete cascade,
  locale public.app_locale not null,
  label text not null,
  explanation text,
  primary key (option_id, locale)
);

create table if not exists public.assessment_option_weights (
  option_id uuid not null references public.assessment_options(id) on delete cascade,
  country_code public.country_code not null references public.countries(code) on delete cascade,
  weight numeric(6,3) not null check (weight between -100 and 100),
  rationale text,
  primary key (option_id, country_code)
);

create table if not exists public.assessment_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  anonymous_token_hash text,
  locale public.app_locale not null default 'ht',
  rules_version text not null,
  consent_version text not null,
  consented_at timestamptz not null default now(),
  expires_at timestamptz not null,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  constraint assessment_session_identity check (user_id is not null or anonymous_token_hash is not null),
  constraint assessment_session_expiry check (expires_at > created_at)
);
create index if not exists assessment_sessions_user_idx on public.assessment_sessions(user_id, created_at desc);
create index if not exists assessment_sessions_expiry_idx on public.assessment_sessions(expires_at);

create table if not exists public.assessment_answers (
  session_id uuid not null references public.assessment_sessions(id) on delete cascade,
  question_id uuid not null references public.assessment_questions(id) on delete restrict,
  answer jsonb not null,
  answered_at timestamptz not null default now(),
  primary key (session_id, question_id)
);

create table if not exists public.assessment_results (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.assessment_sessions(id) on delete cascade,
  country_code public.country_code not null references public.countries(code) on delete restrict,
  rank smallint not null check (rank between 1 and 4),
  score numeric(10,3) not null,
  explanation_keys jsonb not null default '[]'::jsonb,
  rules_version text not null,
  created_at timestamptz not null default now(),
  unique (session_id, country_code),
  constraint assessment_explanation_keys_array check (jsonb_typeof(explanation_keys) = 'array')
);

create table if not exists public.crm_contacts (
  id uuid primary key default gen_random_uuid(),
  linked_user_id uuid references auth.users(id) on delete set null,
  display_name_ciphertext bytea,
  display_name_iv bytea,
  display_name_tag bytea,
  email_ciphertext bytea,
  email_iv bytea,
  email_tag bytea,
  email_lookup_hash text,
  phone_ciphertext bytea,
  phone_iv bytea,
  phone_tag bytea,
  phone_lookup_hash text,
  encryption_key_version smallint not null default 1,
  preferred_locale public.app_locale,
  do_not_contact boolean not null default false,
  data_minimization_review_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index if not exists crm_contacts_email_hash_unique
  on public.crm_contacts(email_lookup_hash) where email_lookup_hash is not null;
create unique index if not exists crm_contacts_phone_hash_unique
  on public.crm_contacts(phone_lookup_hash) where phone_lookup_hash is not null;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  contact_id uuid not null references public.crm_contacts(id) on delete restrict,
  country_interest public.country_code,
  goal_code text,
  source_code text,
  status public.lead_status not null default 'new',
  assigned_advisor_id uuid references auth.users(id) on delete set null,
  next_action_at timestamptz,
  closed_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists leads_pipeline_idx on public.leads(status, assigned_advisor_id, next_action_at);

create table if not exists public.lead_assignments (
  id bigint generated always as identity primary key,
  lead_id uuid not null references public.leads(id) on delete cascade,
  advisor_id uuid references auth.users(id) on delete set null,
  assigned_by uuid references auth.users(id) on delete set null,
  assigned_at timestamptz not null default now(),
  unassigned_at timestamptz,
  reason text
);

create table if not exists public.crm_tags (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  color_token text,
  created_at timestamptz not null default now()
);

create table if not exists public.crm_contact_tags (
  contact_id uuid not null references public.crm_contacts(id) on delete cascade,
  tag_id uuid not null references public.crm_tags(id) on delete cascade,
  added_by uuid references auth.users(id) on delete set null,
  added_at timestamptz not null default now(),
  primary key (contact_id, tag_id)
);

create table if not exists public.crm_tasks (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete cascade,
  contact_id uuid references public.crm_contacts(id) on delete cascade,
  assigned_to uuid references auth.users(id) on delete set null,
  title text not null,
  status public.task_status not null default 'todo',
  due_at timestamptz,
  completed_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint crm_task_parent check (lead_id is not null or contact_id is not null),
  constraint crm_task_title_length check (char_length(title) between 1 and 240)
);

create table if not exists public.crm_notes (
  id uuid primary key default gen_random_uuid(),
  contact_id uuid not null references public.crm_contacts(id) on delete cascade,
  lead_id uuid references public.leads(id) on delete cascade,
  author_id uuid references auth.users(id) on delete set null,
  body text not null,
  sensitivity public.risk_level not null default 'medium',
  supersedes_id uuid references public.crm_notes(id) on delete set null,
  created_at timestamptz not null default now(),
  constraint crm_note_length check (char_length(body) between 1 and 10000)
);

create table if not exists public.crm_activities (
  id bigint generated always as identity primary key,
  contact_id uuid not null references public.crm_contacts(id) on delete cascade,
  lead_id uuid references public.leads(id) on delete cascade,
  actor_id uuid references auth.users(id) on delete set null,
  activity_type text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists crm_activities_contact_idx on public.crm_activities(contact_id, created_at desc);

create table if not exists public.intake_submissions (
  id uuid primary key default gen_random_uuid(),
  contact_id uuid not null references public.crm_contacts(id) on delete restrict,
  lead_id uuid references public.leads(id) on delete set null,
  locale public.app_locale not null,
  country_interest public.country_code,
  structured_answers jsonb not null default '{}'::jsonb,
  consent_version text not null,
  consented_at timestamptz not null,
  source_code text,
  risk_status text not null default 'pending' check (risk_status in ('pending','accepted','spam','blocked')),
  created_at timestamptz not null default now()
);

commit;
