drop policy if exists "User can access their own row" on public.rantr_users;

-- Policy: Any authenticated user can SELECT any row
create policy "Authenticated users can read any user"
    on public.rantr_users
    for select
    to authenticated
    using (true);

-- Policy: Users can update their own row
create policy "Users can update their own row"
    on public.rantr_users
    for update
    to authenticated
    using (id = auth.uid());
