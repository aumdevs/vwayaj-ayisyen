-- Public object URLs do not require broad metadata listing policies. Staff and
-- owners still need narrowly scoped SELECT access for UPDATE/DELETE flows,
-- because PostgreSQL RLS must be able to see the existing storage.objects row.
begin;

drop policy if exists content_media_staff_select on storage.objects;
create policy content_media_staff_select
on storage.objects for select to authenticated
using (
  bucket_id = 'content-media'
  and private.can_manage_content()
);

drop policy if exists avatars_owner_select on storage.objects;
create policy avatars_owner_select
on storage.objects for select to authenticated
using (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
);

commit;
