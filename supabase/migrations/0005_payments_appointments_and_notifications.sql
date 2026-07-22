-- 0005_payments_appointments_and_notifications.sql
begin;

create sequence if not exists public.order_reference_seq start 1000;

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  reference_code text not null unique
    default ('ORD-' || to_char(current_date, 'YYYY') || '-' || lpad(nextval('public.order_reference_seq')::text, 6, '0')),
  user_id uuid not null references auth.users(id) on delete restrict,
  status public.order_status not null default 'draft',
  currency char(3) not null,
  subtotal_amount bigint not null default 0 check (subtotal_amount >= 0),
  discount_amount bigint not null default 0 check (discount_amount >= 0),
  tax_amount bigint not null default 0 check (tax_amount >= 0),
  total_amount bigint not null default 0 check (total_amount >= 0),
  stripe_checkout_session_id text unique,
  stripe_customer_id text,
  accepted_terms_version text not null,
  accepted_refund_policy_version text not null,
  accepted_at timestamptz not null,
  expires_at timestamptz,
  paid_at timestamptz,
  fulfilled_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint order_amount_math check (
    total_amount = greatest(0, subtotal_amount - discount_amount + tax_amount)
  )
);
create index if not exists orders_user_idx on public.orders(user_id, created_at desc);
create index if not exists orders_status_idx on public.orders(status, created_at);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  package_id uuid not null references public.service_packages(id) on delete restrict,
  package_price_id uuid not null references public.package_prices(id) on delete restrict,
  package_code_snapshot text not null,
  description_snapshot text not null,
  unit_amount bigint not null check (unit_amount >= 0),
  quantity integer not null default 1 check (quantity between 1 and 20),
  total_amount bigint generated always as (unit_amount * quantity) stored,
  created_at timestamptz not null default now()
);
create index if not exists order_items_order_idx on public.order_items(order_id);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete restrict,
  provider text not null default 'stripe' check (provider in ('stripe')),
  provider_payment_intent_id text unique,
  provider_charge_id text,
  status public.payment_status not null default 'requires_action',
  amount bigint not null check (amount >= 0),
  currency char(3) not null,
  failure_code text,
  failure_message_safe text,
  last_provider_event_at timestamptz,
  succeeded_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists payments_order_idx on public.payments(order_id, created_at desc);

create table if not exists public.refunds (
  id uuid primary key default gen_random_uuid(),
  payment_id uuid not null references public.payments(id) on delete restrict,
  provider_refund_id text unique,
  amount bigint not null check (amount > 0),
  currency char(3) not null,
  reason_code text not null,
  reason_detail text,
  status text not null default 'pending' check (status in ('pending','succeeded','failed','cancelled')),
  requested_by uuid references auth.users(id) on delete set null,
  approved_by uuid references auth.users(id) on delete set null,
  provider_response_safe jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.stripe_webhook_events (
  stripe_event_id text primary key,
  event_type text not null,
  api_version text,
  livemode boolean not null,
  object_id text,
  payload_hash char(64) not null,
  received_at timestamptz not null default now(),
  processed_at timestamptz,
  processing_status text not null default 'received'
    check (processing_status in ('received','processing','processed','ignored','failed')),
  attempts integer not null default 0,
  last_error text
);
create index if not exists stripe_webhook_pending_idx
  on public.stripe_webhook_events(received_at)
  where processed_at is null;

create table if not exists public.appointment_types (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  country_code public.country_code references public.countries(code) on delete set null,
  duration_minutes integer not null check (duration_minutes between 10 and 480),
  buffer_before_minutes integer not null default 0 check (buffer_before_minutes between 0 and 240),
  buffer_after_minutes integer not null default 0 check (buffer_after_minutes between 0 and 240),
  minimum_notice_hours integer not null default 24 check (minimum_notice_hours between 0 and 8760),
  cancellation_notice_hours integer not null default 24 check (cancellation_notice_hours between 0 and 8760),
  requires_payment boolean not null default false,
  package_id uuid references public.service_packages(id) on delete set null,
  active boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.appointment_type_translations (
  appointment_type_id uuid not null references public.appointment_types(id) on delete cascade,
  locale public.app_locale not null,
  name text not null,
  description text,
  cancellation_summary text,
  primary key (appointment_type_id, locale)
);

create table if not exists public.advisor_availability_rules (
  id uuid primary key default gen_random_uuid(),
  advisor_id uuid not null references auth.users(id) on delete cascade,
  timezone text not null,
  weekday smallint not null check (weekday between 0 and 6),
  local_start time not null,
  local_end time not null,
  effective_from date,
  effective_until date,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  constraint availability_rule_time check (local_end > local_start),
  constraint availability_rule_dates check (effective_until is null or effective_from is null or effective_until >= effective_from)
);
create index if not exists availability_rules_advisor_idx
  on public.advisor_availability_rules(advisor_id, weekday, active);

create table if not exists public.advisor_availability_exceptions (
  id uuid primary key default gen_random_uuid(),
  advisor_id uuid not null references auth.users(id) on delete cascade,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  available boolean not null default false,
  reason text,
  created_at timestamptz not null default now(),
  constraint availability_exception_time check (ends_at > starts_at)
);
create index if not exists availability_exceptions_advisor_idx
  on public.advisor_availability_exceptions(advisor_id, starts_at, ends_at);

create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  appointment_type_id uuid not null references public.appointment_types(id) on delete restrict,
  booked_by uuid not null references auth.users(id) on delete restrict,
  advisor_id uuid not null references auth.users(id) on delete restrict,
  case_id uuid references public.cases(id) on delete set null,
  order_id uuid references public.orders(id) on delete set null,
  status public.appointment_status not null default 'hold',
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  hold_expires_at timestamptz,
  user_timezone text not null,
  advisor_timezone text not null,
  meeting_provider text,
  meeting_external_id text,
  meeting_url_ciphertext bytea,
  meeting_url_iv bytea,
  meeting_url_tag bytea,
  encryption_key_version smallint,
  cancellation_reason text,
  cancelled_by uuid references auth.users(id) on delete set null,
  cancelled_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint appointment_time check (ends_at > starts_at),
  constraint appointment_hold_expiry check (
    status <> 'hold' or (hold_expires_at is not null and hold_expires_at > created_at)
  )
);
create index if not exists appointments_user_idx on public.appointments(booked_by, starts_at desc);
create index if not exists appointments_advisor_idx on public.appointments(advisor_id, starts_at);
alter table public.appointments
  drop constraint if exists appointments_no_advisor_overlap;
alter table public.appointments
  add constraint appointments_no_advisor_overlap
  exclude using gist (
    advisor_id with =,
    tstzrange(starts_at, ends_at, '[)') with &&
  )
  where (status in ('hold','confirmed'));

create table if not exists public.appointment_participants (
  appointment_id uuid not null references public.appointments(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  participant_role text not null check (participant_role in ('client','advisor','professional','observer')),
  joined_at timestamptz,
  primary key (appointment_id, user_id)
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  category text not null,
  title_key text not null,
  body_key text not null,
  safe_variables jsonb not null default '{}'::jsonb,
  target_path text,
  read_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  constraint notification_target_path check (target_path is null or target_path ~ '^/')
);
create index if not exists notifications_user_unread_idx on public.notifications(user_id, created_at desc)
  where read_at is null;

create table if not exists public.notification_preferences (
  user_id uuid not null references auth.users(id) on delete cascade,
  category text not null,
  channel public.notification_channel not null,
  enabled boolean not null default true,
  locale public.app_locale not null default 'ht',
  quiet_hours_start time,
  quiet_hours_end time,
  timezone text not null default 'UTC',
  updated_at timestamptz not null default now(),
  primary key (user_id, category, channel)
);

create table if not exists public.notification_deliveries (
  id uuid primary key default gen_random_uuid(),
  notification_id uuid not null references public.notifications(id) on delete cascade,
  channel public.notification_channel not null,
  provider text,
  provider_message_id text,
  status public.delivery_status not null default 'queued',
  attempt_count integer not null default 0,
  last_error_code text,
  sent_at timestamptz,
  delivered_at timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists notification_deliveries_pending_idx
  on public.notification_deliveries(status, created_at)
  where status in ('queued','failed');

commit;
