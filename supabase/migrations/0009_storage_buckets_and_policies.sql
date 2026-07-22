-- 0009_storage_buckets_and_policies.sql
-- Storage object access is separate from table metadata access.
begin;

create or replace function private.try_uuid(p_value text)
returns uuid
language plpgsql
immutable
set search_path = ''
as $$
begin
  return p_value::uuid;
exception when others then
  return null;
end;
$$;
grant execute on function private.try_uuid(text) to authenticated;

insert into storage.buckets(id, name, public, file_size_limit, allowed_mime_types)
values
  (
    'case-documents-quarantine',
    'case-documents-quarantine',
    false,
    10485760,
    array['application/pdf','image/jpeg','image/png','image/webp']
  ),
  (
    'case-documents-clean',
    'case-documents-clean',
    false,
    10485760,
    array['application/pdf','image/jpeg','image/png','image/webp']
  ),
  (
    'course-assets',
    'course-assets',
    false,
    524288000,
    array[
      'application/pdf','image/jpeg','image/png','image/webp',
      'video/mp4','audio/mpeg','text/vtt'
    ]
  ),
  (
    'content-media',
    'content-media',
    true,
    20971520,
    array['image/jpeg','image/png','image/webp','image/avif']
  ),
  (
    'avatars',
    'avatars',
    true,
    5242880,
    array['image/jpeg','image/png','image/webp']
  )
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Quarantine path: {case_uuid}/{uploader_uuid}/{random_uuid}.{ext}
drop policy if exists quarantine_user_insert on storage.objects;
create policy quarantine_user_insert
on storage.objects for insert to authenticated
with check (
  bucket_id = 'case-documents-quarantine'
  and (storage.foldername(name))[2] = auth.uid()::text
  and private.try_uuid((storage.foldername(name))[1]) is not null
  and private.is_case_participant(
    private.try_uuid((storage.foldername(name))[1]),
    'upload_documents'
  )
  and lower(storage.extension(name)) in ('pdf','jpg','jpeg','png','webp')
);

-- There is intentionally no authenticated SELECT/UPDATE/DELETE policy for quarantine.
-- Scanner/service worker uses server-only service role.

-- Clean documents are never directly listed/read through client Storage.
-- A server Route Handler authorizes, audits, then creates a short-lived signed URL.
-- There is intentionally no authenticated policy on case-documents-clean.

-- Content media is publicly readable but only content staff with aal2 can mutate.
drop policy if exists content_media_public_read on storage.objects;
create policy content_media_public_read
on storage.objects for select to anon, authenticated
using (bucket_id = 'content-media');

drop policy if exists content_media_staff_insert on storage.objects;
create policy content_media_staff_insert
on storage.objects for insert to authenticated
with check (
  bucket_id = 'content-media'
  and private.can_manage_content()
  and lower(storage.extension(name)) in ('jpg','jpeg','png','webp','avif')
);

drop policy if exists content_media_staff_update on storage.objects;
create policy content_media_staff_update
on storage.objects for update to authenticated
using (bucket_id = 'content-media' and private.can_manage_content())
with check (
  bucket_id = 'content-media'
  and private.can_manage_content()
  and lower(storage.extension(name)) in ('jpg','jpeg','png','webp','avif')
);

drop policy if exists content_media_staff_delete on storage.objects;
create policy content_media_staff_delete
on storage.objects for delete to authenticated
using (bucket_id = 'content-media' and private.can_manage_content());

-- Course assets remain private; delivery uses a server-authorized signed URL.
drop policy if exists course_assets_staff_insert on storage.objects;
create policy course_assets_staff_insert
on storage.objects for insert to authenticated
with check (
  bucket_id = 'course-assets'
  and private.can_manage_content()
  and lower(storage.extension(name)) in ('pdf','jpg','jpeg','png','webp','mp4','mp3','vtt')
);
drop policy if exists course_assets_staff_update on storage.objects;
create policy course_assets_staff_update
on storage.objects for update to authenticated
using (bucket_id = 'course-assets' and private.can_manage_content())
with check (bucket_id = 'course-assets' and private.can_manage_content());
drop policy if exists course_assets_staff_delete on storage.objects;
create policy course_assets_staff_delete
on storage.objects for delete to authenticated
using (bucket_id = 'course-assets' and private.can_manage_content());

-- Avatar path: {auth.uid()}/{random_uuid}.{ext}. Public bucket contains no documents.
drop policy if exists avatars_public_read on storage.objects;
create policy avatars_public_read
on storage.objects for select to anon, authenticated
using (bucket_id = 'avatars');

drop policy if exists avatars_owner_insert on storage.objects;
create policy avatars_owner_insert
on storage.objects for insert to authenticated
with check (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
  and lower(storage.extension(name)) in ('jpg','jpeg','png','webp')
);

drop policy if exists avatars_owner_update on storage.objects;
create policy avatars_owner_update
on storage.objects for update to authenticated
using (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
  and lower(storage.extension(name)) in ('jpg','jpeg','png','webp')
);

drop policy if exists avatars_owner_delete on storage.objects;
create policy avatars_owner_delete
on storage.objects for delete to authenticated
using (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
);

commit;
