-- Public content smoke test. Codex should expand this into a full role matrix.
begin;

create extension if not exists pgtap with schema extensions;
select plan(4);

set local role anon;

select is(
  (select count(*)::integer from public.countries),
  4,
  'Anon sees the four active countries'
);

select is(
  (select count(*)::integer from public.content_items),
  0,
  'Anon does not see draft content'
);

select is(
  (select count(*)::integer from public.service_packages),
  0,
  'Anon does not see draft packages'
);

select is(
  (select count(*)::integer from public.comparison_criteria),
  0,
  'Anon does not see draft comparison criteria'
);

reset role;
select * from finish();
rollback;
