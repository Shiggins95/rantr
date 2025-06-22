-- Create enum for user status
create type user_status as enum ('SETUP_REQUIRED', 'COMPLETE', 'DELETED');

-- Create users table (without terms_id to avoid circular reference)
create table public.rantr_users (
    id uuid primary key not null,
    email text not null unique,
    first_name text,
    last_name text,
    created_at timestamptz not null default now(),
    status user_status not null default 'SETUP_REQUIRED',
    last_sign_in timestamptz default now(),
    username text unique,
    profile_photo text
);

-- Enable row level security for users
alter table public.rantr_users enable row level security;

-- RLS: Allow authenticated users to read any user
create policy "Authenticated users can read any user"
    on public.rantr_users
    for select
    to authenticated
    using (true);

-- RLS: Users can insert their own row
create policy "Users can insert their own row"
    on public.rantr_users
    for insert
    to authenticated
    with check (id = auth.uid());

-- RLS: Users can update their own row
create policy "Users can update their own row"
    on public.rantr_users
    for update
    to authenticated
    using (id = auth.uid());

-- Create terms table (can reference rantr_users safely)
create table public.terms (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references public.rantr_users(id) on delete cascade,
    timestamp timestamptz not null default now()
);

-- Enable row level security for terms
alter table public.terms enable row level security;

-- RLS: Users can create their terms row
create policy "User can create their terms row"
    on public.terms
    for insert
    to authenticated
    with check (user_id = auth.uid());

-- RLS: Users can edit their terms row
create policy "User can edit their terms row"
    on public.terms
    for update
    to authenticated
    using (user_id = auth.uid());

-- RLS: Users can read their terms row
create policy "User can read their terms row"
    on public.terms
    for select
    to authenticated
    using (user_id = auth.uid());

-- Now safely add terms_id to users table
alter table public.rantr_users
    add column terms_id uuid references public.terms(id) on delete cascade;
