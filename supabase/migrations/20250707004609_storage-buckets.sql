-- Enable RLS if not already
alter table storage.objects enable row level security;

-- Profile Photos

create policy "Authenticated users can insert into profile-photos"
on storage.objects
for insert
with check (
bucket_id = 'profile-photos'
    and auth.role() = 'authenticated'
);

create policy "Authenticated users can read profile-photos"
on storage.objects
for select
using (
bucket_id = 'profile-photos'
    and auth.role() = 'authenticated'
);

create policy "Only owner can delete profile-photos"
on storage.objects
for delete
using (
bucket_id = 'profile-photos'
    and auth.uid() = owner
);

-- Post Photos

create policy "Authenticated users can insert into post-photos"
    on storage.objects
    for insert
    with check (
    bucket_id = 'post-photos'
        and auth.role() = 'authenticated'
    );

create policy "Anyone can read post-photos"
    on storage.objects
    for select
    using (
    bucket_id = 'post-photos'
    );

create policy "Only owner can delete post-photos"
    on storage.objects
    for delete
    using (
    bucket_id = 'post-photos'
        and auth.uid() = owner
    );

alter table post_images
    add column created_at TIMESTAMPTZ NOT NULL DEFAULT now();
