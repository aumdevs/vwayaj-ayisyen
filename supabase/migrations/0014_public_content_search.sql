-- 0014_public_content_search.sql
begin;

create or replace function public.search_published_content(
  p_locale public.app_locale,
  p_query text,
  p_limit integer default 10
)
returns table (
  country_code public.country_code,
  section_key text,
  slug text,
  title text,
  summary text,
  last_verified_at timestamptz
)
language sql
stable
security invoker
set search_path = ''
as $$
  select
    content.country_code,
    content.section_key,
    content.slug,
    content.title,
    content.summary,
    content.last_verified_at
  from public.published_country_content content
  where content.locale = p_locale
    and char_length(trim(p_query)) between 2 and 100
    and to_tsvector('simple', coalesce(content.title, '') || ' ' || coalesce(content.summary, ''))
      @@ websearch_to_tsquery('simple', trim(p_query))
  order by
    ts_rank_cd(
      to_tsvector('simple', coalesce(content.title, '') || ' ' || coalesce(content.summary, '')),
      websearch_to_tsquery('simple', trim(p_query))
    ) desc,
    content.title asc
  limit least(greatest(p_limit, 1), 20);
$$;

revoke all on function public.search_published_content(public.app_locale, text, integer) from public;
grant execute on function public.search_published_content(public.app_locale, text, integer) to anon, authenticated;

commit;
