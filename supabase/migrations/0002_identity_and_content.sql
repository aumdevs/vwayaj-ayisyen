-- 0002_identity_and_content.sql
begin;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  preferred_locale public.app_locale not null default 'ht',
  country_of_residence text,
  timezone text not null default 'America/Port-au-Prince',
  avatar_path text,
  force_password_change boolean not null default false,
  account_status public.account_status not null default 'active',
  terms_version text,
  privacy_version text,
  terms_accepted_at timestamptz,
  privacy_accepted_at timestamptz,
  last_seen_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_display_name_length check (display_name is null or char_length(display_name) between 1 and 120),
  constraint profiles_timezone_length check (char_length(timezone) between 1 and 100)
);

create table if not exists public.user_roles (
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  granted_by uuid references auth.users(id) on delete set null,
  granted_at timestamptz not null default now(),
  reason text,
  primary key (user_id, role),
  constraint user_roles_reason_length check (reason is null or char_length(reason) <= 500)
);
create index if not exists user_roles_role_idx on public.user_roles(role);

create table if not exists public.staff_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  status public.staff_status not null default 'invited',
  public_bio text,
  locales public.app_locale[] not null default '{}',
  countries public.country_code[] not null default '{}',
  timezone text not null default 'UTC',
  capacity_per_week integer not null default 0 check (capacity_per_week between 0 and 200),
  internal_reference text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint staff_public_bio_length check (public_bio is null or char_length(public_bio) <= 2000)
);

create table if not exists public.professional_organizations (
  id uuid primary key default gen_random_uuid(),
  legal_name text not null,
  public_name text not null,
  country text,
  website_url text,
  verification_status text not null default 'pending'
    check (verification_status in ('pending','verified','rejected','expired')),
  verified_by uuid references auth.users(id) on delete set null,
  verified_at timestamptz,
  verification_expires_at timestamptz,
  internal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.professional_memberships (
  organization_id uuid not null references public.professional_organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  title text,
  license_type text,
  license_reference text,
  jurisdictions text[] not null default '{}',
  status text not null default 'pending' check (status in ('pending','active','suspended','expired')),
  valid_from date,
  valid_until date,
  verified_by uuid references auth.users(id) on delete set null,
  verified_at timestamptz,
  primary key (organization_id, user_id)
);

create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  is_public boolean not null default false,
  description text,
  updated_by uuid references auth.users(id) on delete set null,
  updated_at timestamptz not null default now(),
  constraint site_settings_key_format check (key ~ '^[a-z][a-z0-9_.-]{1,99}$')
);

create table if not exists public.feature_flags (
  key text primary key,
  enabled boolean not null default false,
  public_readable boolean not null default false,
  conditions jsonb not null default '{}'::jsonb,
  launch_requirements jsonb not null default '[]'::jsonb,
  updated_by uuid references auth.users(id) on delete set null,
  updated_at timestamptz not null default now(),
  constraint feature_flags_key_format check (key ~ '^feature_[a-z0-9_]{2,80}$')
);

create table if not exists public.countries (
  code public.country_code primary key,
  iso2 char(2) not null unique,
  display_order smallint not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.country_translations (
  country_code public.country_code not null references public.countries(code) on delete cascade,
  locale public.app_locale not null,
  name text not null,
  short_summary text,
  seo_title text,
  seo_description text,
  translation_status public.translation_status not null default 'draft',
  reviewed_by uuid references auth.users(id) on delete set null,
  reviewed_at timestamptz,
  primary key (country_code, locale),
  constraint country_name_length check (char_length(name) between 1 and 100),
  constraint country_summary_length check (short_summary is null or char_length(short_summary) <= 600)
);

create table if not exists public.content_items (
  id uuid primary key default gen_random_uuid(),
  country_code public.country_code references public.countries(code) on delete cascade,
  section_key text not null,
  slug text not null,
  information_type public.information_type not null,
  risk_level public.risk_level not null default 'medium',
  status public.content_status not null default 'draft',
  current_version_no integer not null default 0,
  published_version_id uuid,
  author_id uuid references auth.users(id) on delete set null,
  next_review_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  unique (country_code, slug),
  constraint content_section_key_format check (section_key ~ '^[a-z][a-z0-9_]{1,79}$'),
  constraint content_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);
create index if not exists content_items_public_idx
  on public.content_items(country_code, status, section_key, next_review_at)
  where deleted_at is null;

create table if not exists public.content_versions (
  id uuid primary key default gen_random_uuid(),
  content_item_id uuid not null references public.content_items(id) on delete cascade,
  version_no integer not null,
  status public.content_status not null default 'draft',
  effective_from timestamptz,
  effective_until timestamptz,
  last_verified_at timestamptz,
  next_review_at timestamptz,
  methodology text,
  change_summary text,
  created_by uuid references auth.users(id) on delete set null,
  fact_reviewer_id uuid references auth.users(id) on delete set null,
  legal_reviewer_id uuid references auth.users(id) on delete set null,
  approved_by uuid references auth.users(id) on delete set null,
  approved_at timestamptz,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  unique (content_item_id, version_no),
  constraint content_version_dates check (
    effective_until is null or effective_from is null or effective_until > effective_from
  )
);
alter table public.content_items
  drop constraint if exists content_items_published_version_id_fkey;
alter table public.content_items
  add constraint content_items_published_version_id_fkey
  foreign key (published_version_id) references public.content_versions(id) on delete set null;

create table if not exists public.content_translations (
  content_version_id uuid not null references public.content_versions(id) on delete cascade,
  locale public.app_locale not null,
  title text not null,
  summary text,
  body jsonb not null default '[]'::jsonb,
  seo_title text,
  seo_description text,
  status public.translation_status not null default 'draft',
  translator_id uuid references auth.users(id) on delete set null,
  reviewer_id uuid references auth.users(id) on delete set null,
  reviewed_at timestamptz,
  primary key (content_version_id, locale),
  constraint content_title_length check (char_length(title) between 1 and 220),
  constraint content_summary_length check (summary is null or char_length(summary) <= 1200),
  constraint content_body_is_array check (jsonb_typeof(body) = 'array')
);

create table if not exists public.content_sources (
  id uuid primary key default gen_random_uuid(),
  content_version_id uuid not null references public.content_versions(id) on delete cascade,
  title text not null,
  publisher text,
  url text not null,
  is_official boolean not null default false,
  source_type text not null default 'web'
    check (source_type in ('web','law','report','interview','survey','dataset','other')),
  published_at timestamptz,
  accessed_at timestamptz not null default now(),
  effective_from timestamptz,
  effective_until timestamptz,
  archive_url text,
  notes text,
  display_order integer not null default 0,
  constraint content_source_url_length check (char_length(url) between 8 and 2048)
);
create index if not exists content_sources_version_idx on public.content_sources(content_version_id, display_order);

create table if not exists public.content_review_events (
  id bigint generated always as identity primary key,
  content_version_id uuid not null references public.content_versions(id) on delete cascade,
  actor_id uuid references auth.users(id) on delete set null,
  from_status public.content_status,
  to_status public.content_status not null,
  reason text,
  created_at timestamptz not null default now()
);

create table if not exists public.glossary_terms (
  id uuid primary key default gen_random_uuid(),
  country_code public.country_code references public.countries(code) on delete cascade,
  canonical_term text not null,
  slug text not null,
  status public.content_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (country_code, slug)
);

create table if not exists public.glossary_translations (
  term_id uuid not null references public.glossary_terms(id) on delete cascade,
  locale public.app_locale not null,
  label text not null,
  explanation text not null,
  status public.translation_status not null default 'draft',
  reviewed_by uuid references auth.users(id) on delete set null,
  reviewed_at timestamptz,
  primary key (term_id, locale)
);

create table if not exists public.faq_items (
  id uuid primary key default gen_random_uuid(),
  country_code public.country_code references public.countries(code) on delete cascade,
  category text not null,
  display_order integer not null default 0,
  status public.content_status not null default 'draft',
  next_review_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.faq_translations (
  faq_id uuid not null references public.faq_items(id) on delete cascade,
  locale public.app_locale not null,
  question text not null,
  answer jsonb not null default '[]'::jsonb,
  status public.translation_status not null default 'draft',
  primary key (faq_id, locale),
  constraint faq_answer_array check (jsonb_typeof(answer) = 'array')
);

create table if not exists public.whatsapp_templates (
  id uuid primary key default gen_random_uuid(),
  locale public.app_locale not null,
  country_code public.country_code,
  package_id uuid,
  page_code text,
  service_code text,
  phone_e164 text,
  message_template text not null,
  active boolean not null default false,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint whatsapp_phone_format check (phone_e164 is null or phone_e164 ~ '^\+[1-9][0-9]{7,14}$'),
  constraint whatsapp_message_length check (char_length(message_template) between 1 and 1000)
);

commit;
