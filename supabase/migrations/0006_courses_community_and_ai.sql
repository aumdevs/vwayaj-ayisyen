-- 0006_courses_community_and_ai.sql
begin;

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  country_code public.country_code references public.countries(code) on delete set null,
  status public.content_status not null default 'draft',
  public_access boolean not null default false,
  estimated_minutes integer check (estimated_minutes is null or estimated_minutes between 1 and 100000),
  published_at timestamptz,
  next_review_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.course_translations (
  course_id uuid not null references public.courses(id) on delete cascade,
  locale public.app_locale not null,
  title text not null,
  summary text,
  description jsonb not null default '[]'::jsonb,
  status public.translation_status not null default 'draft',
  primary key (course_id, locale),
  constraint course_description_array check (jsonb_typeof(description) = 'array')
);

create table if not exists public.course_modules (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);
create index if not exists course_modules_order_idx on public.course_modules(course_id, display_order);

create table if not exists public.course_module_translations (
  module_id uuid not null references public.course_modules(id) on delete cascade,
  locale public.app_locale not null,
  title text not null,
  summary text,
  primary key (module_id, locale)
);

create table if not exists public.course_lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.course_modules(id) on delete cascade,
  lesson_type text not null check (lesson_type in ('article','video','audio','quiz','resource')),
  display_order integer not null default 0,
  duration_minutes integer check (duration_minutes is null or duration_minutes between 1 and 1440),
  media_path text,
  transcript_path text,
  status public.content_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists course_lessons_order_idx on public.course_lessons(module_id, display_order);

create table if not exists public.course_lesson_translations (
  lesson_id uuid not null references public.course_lessons(id) on delete cascade,
  locale public.app_locale not null,
  title text not null,
  body jsonb not null default '[]'::jsonb,
  captions_path text,
  status public.translation_status not null default 'draft',
  primary key (lesson_id, locale),
  constraint lesson_body_array check (jsonb_typeof(body) = 'array')
);

create table if not exists public.course_enrollments (
  course_id uuid not null references public.courses(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  enrolled_at timestamptz not null default now(),
  completed_at timestamptz,
  status text not null default 'active' check (status in ('active','completed','withdrawn')),
  primary key (course_id, user_id)
);

create table if not exists public.lesson_progress (
  lesson_id uuid not null references public.course_lessons(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  progress_percent numeric(5,2) not null default 0 check (progress_percent between 0 and 100),
  completed_at timestamptz,
  last_position jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (lesson_id, user_id)
);

create table if not exists public.community_categories (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  country_code public.country_code references public.countries(code) on delete set null,
  active boolean not null default false,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.community_category_translations (
  category_id uuid not null references public.community_categories(id) on delete cascade,
  locale public.app_locale not null,
  name text not null,
  description text,
  primary key (category_id, locale)
);

create table if not exists public.community_posts (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.community_categories(id) on delete restrict,
  author_id uuid not null references auth.users(id) on delete cascade,
  locale public.app_locale not null,
  title text not null,
  body text not null,
  status public.community_content_status not null default 'published',
  reply_count integer not null default 0 check (reply_count >= 0),
  last_activity_at timestamptz not null default now(),
  edited_at timestamptz,
  hidden_reason text,
  created_at timestamptz not null default now(),
  constraint community_post_title_length check (char_length(title) between 3 and 180),
  constraint community_post_body_length check (char_length(body) between 1 and 10000)
);
create index if not exists community_posts_feed_idx
  on public.community_posts(category_id, last_activity_at desc)
  where status = 'published';

create table if not exists public.community_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.community_posts(id) on delete cascade,
  author_id uuid not null references auth.users(id) on delete cascade,
  parent_comment_id uuid references public.community_comments(id) on delete set null,
  body text not null,
  status public.community_content_status not null default 'published',
  edited_at timestamptz,
  hidden_reason text,
  created_at timestamptz not null default now(),
  constraint community_comment_length check (char_length(body) between 1 and 5000)
);
create index if not exists community_comments_post_idx
  on public.community_comments(post_id, created_at)
  where status = 'published';

create table if not exists public.community_reactions (
  user_id uuid not null references auth.users(id) on delete cascade,
  post_id uuid references public.community_posts(id) on delete cascade,
  comment_id uuid references public.community_comments(id) on delete cascade,
  reaction text not null check (reaction in ('helpful','support','thanks')),
  created_at timestamptz not null default now(),
  constraint community_reaction_one_target check (
    (post_id is not null and comment_id is null) or
    (post_id is null and comment_id is not null)
  ),
  unique nulls not distinct (user_id, post_id, comment_id, reaction)
);

create table if not exists public.community_reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references auth.users(id) on delete cascade,
  post_id uuid references public.community_posts(id) on delete cascade,
  comment_id uuid references public.community_comments(id) on delete cascade,
  reason_code text not null,
  details text,
  status public.community_report_status not null default 'open',
  assigned_to uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint community_report_one_target check (
    (post_id is not null and comment_id is null) or
    (post_id is null and comment_id is not null)
  ),
  constraint community_report_details_length check (details is null or char_length(details) <= 2000)
);
create index if not exists community_reports_queue_idx on public.community_reports(status, created_at);

create table if not exists public.moderation_actions (
  id bigint generated always as identity primary key,
  report_id uuid references public.community_reports(id) on delete set null,
  post_id uuid references public.community_posts(id) on delete set null,
  comment_id uuid references public.community_comments(id) on delete set null,
  target_user_id uuid references auth.users(id) on delete set null,
  moderator_id uuid not null references auth.users(id) on delete restrict,
  action_type public.moderation_action_type not null,
  reason_code text not null,
  reason_detail text,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.community_bans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  reason_code text not null,
  starts_at timestamptz not null default now(),
  expires_at timestamptz,
  permanent boolean not null default false,
  created_by uuid not null references auth.users(id) on delete restrict,
  revoked_at timestamptz,
  revoked_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  constraint community_ban_end check (
    permanent = true or (expires_at is not null and expires_at > starts_at)
  )
);
create index if not exists community_bans_active_idx on public.community_bans(user_id, starts_at, expires_at)
  where revoked_at is null;

create table if not exists public.content_chunks (
  id uuid primary key default gen_random_uuid(),
  content_version_id uuid not null references public.content_versions(id) on delete cascade,
  content_translation_locale public.app_locale not null,
  chunk_index integer not null,
  chunk_text text not null,
  embedding extensions.vector(1536),
  token_count integer check (token_count is null or token_count > 0),
  country_code public.country_code,
  information_type public.information_type not null,
  reviewed_at timestamptz,
  expires_at timestamptz,
  indexed_at timestamptz not null default now(),
  unique (content_version_id, content_translation_locale, chunk_index),
  constraint content_chunk_length check (char_length(chunk_text) between 1 and 12000)
);
create index if not exists content_chunks_filter_idx
  on public.content_chunks(content_translation_locale, country_code, information_type, expires_at);
-- Add an IVFFlat/HNSW index only after selecting a stable embedding model and sufficient rows.

create table if not exists public.ai_conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  anonymous_token_hash text,
  locale public.app_locale not null default 'ht',
  country_context public.country_code,
  title text,
  retention_until timestamptz not null,
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint ai_conversation_identity check (user_id is not null or anonymous_token_hash is not null),
  constraint ai_conversation_retention check (retention_until > created_at)
);
create index if not exists ai_conversations_user_idx on public.ai_conversations(user_id, created_at desc);

create table if not exists public.ai_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.ai_conversations(id) on delete cascade,
  role public.ai_message_role not null,
  content_redacted text not null,
  content_hash char(64),
  confidence text check (confidence is null or confidence in ('supported','partial','unsupported')),
  risk_flags text[] not null default '{}',
  provider_request_id text,
  model_name text,
  input_tokens integer,
  output_tokens integer,
  latency_ms integer,
  created_at timestamptz not null default now(),
  constraint ai_message_length check (char_length(content_redacted) between 1 and 20000)
);
create index if not exists ai_messages_conversation_idx on public.ai_messages(conversation_id, created_at);

create table if not exists public.ai_message_citations (
  message_id uuid not null references public.ai_messages(id) on delete cascade,
  content_chunk_id uuid not null references public.content_chunks(id) on delete restrict,
  ordinal integer not null check (ordinal >= 0),
  quoted_excerpt text,
  primary key (message_id, content_chunk_id)
);

create table if not exists public.ai_feedback (
  id uuid primary key default gen_random_uuid(),
  message_id uuid not null references public.ai_messages(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  rating smallint check (rating in (-1,1)),
  reason_code text,
  comment text,
  created_at timestamptz not null default now(),
  unique (message_id, user_id),
  constraint ai_feedback_comment_length check (comment is null or char_length(comment) <= 2000)
);

commit;
