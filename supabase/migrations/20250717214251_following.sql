-- user_follows table creation
create table public.user_follows (
    id uuid primary key default gen_random_uuid(),
    person_following uuid references public.rantr_users(id) on delete cascade,
    person_followed uuid references public.rantr_users(id) on delete cascade,
    created_at timestamptz not null default now(),
    constraint no_self_follow check (person_following <> person_followed),
    unique (person_following, person_followed)
);

-- user_follows RLS policies
alter table public.user_follows enable row level security;

create policy "Users can follow others"
    on public.user_follows
    for insert
    with check (
    auth.uid() = person_following
);

create policy "Users can delete if involved"
    on public.user_follows
    for delete
    using (
    auth.uid() = person_following or auth.uid() = person_followed
);

-- rantr_users table update
alter table public.rantr_users
    add column if not exists follower_count integer default 0,
    add column if not exists following_count integer default 0;

-- functions to increment / decrement following count
create or replace function public.increment_follow_counts()
    returns trigger
    security definer
as $$
begin
    update public.rantr_users
    set follower_count = follower_count + 1
    where id = new.person_followed;

    update public.rantr_users
    set following_count = following_count + 1
    where id = new.person_following;

    return new;
end;
$$ language plpgsql;

create or replace function public.decrement_follow_counts()
    returns trigger
    security definer
as $$
begin
    update public.rantr_users
    set follower_count = follower_count - 1
    where id = old.person_followed;

    update public.rantr_users
    set following_count = following_count - 1
    where id = old.person_following;

    return old;
end;
$$ language plpgsql;

create trigger on_user_follow_insert
    after insert on public.user_follows
    for each row
execute function public.increment_follow_counts();

create trigger on_user_follow_delete
    after delete on public.user_follows
    for each row
execute function public.decrement_follow_counts();
