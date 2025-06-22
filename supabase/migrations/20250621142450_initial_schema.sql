-- Create enum for user status
create type user_status as enum ('SETUP_REQUIRED', 'COMPLETE', 'DELETED');

-- Create users table
create table public.rantr_users (
    id uuid primary key not null,
    email text not null unique,
    first_name text,
    last_name text,
    created_at timestamptz not null default now(),
    status user_status not null default 'SETUP_REQUIRED'
);

alter table public.rantr_users enable row level security;

create policy "User can access their own row"
    on public.rantr_users
    for all
    using (id = auth.uid());
