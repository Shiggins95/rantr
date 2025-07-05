create policy "Allow authenticated users to create comment interaction counts"
    on comment_interaction_counts
    for insert
    with check (auth.role() = 'authenticated');

create policy "Allow authenticated users to create post interaction counts"
    on post_interaction_counts
    for insert
    with check (auth.role() = 'authenticated');
