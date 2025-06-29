create table post_interaction_counts (
    post_id uuid primary key references posts(id) on delete cascade,
    up_votes integer not null default 0,
    down_votes integer not null default 0,
    comment_count integer not null default 0
);

create table comment_interaction_counts (
    comment_id uuid primary key references comments(id) on delete cascade,
    up_votes integer not null default 0,
    down_votes integer not null default 0
);

alter table post_interaction_counts enable row level security;
alter table comment_interaction_counts enable row level security;

create policy "Allow authenticated to update vote counts"
    on post_interaction_counts
    for update
    using (auth.role() = 'authenticated');

create policy "Allow all users to view post interaction counts"
    on post_interaction_counts
    for select
    using (true);

create policy "Allow authenticated to update vote counts"
    on comment_interaction_counts
    for update
    using (auth.role() = 'authenticated');


create policy "Allow all users to view comment interaction counts"
    on comment_interaction_counts
    for select
    using (true);

-- up_vote down_vote trigger method

create or replace function sync_interaction_count()
    returns trigger
    security definer
as $$
declare
    target_table text;
    id_column text;
    id_value uuid;
begin
    target_table := TG_ARGV[0];
    id_column := TG_ARGV[1];

    if id_column = 'comment_id' then
        if TG_OP = 'INSERT' then
            id_value := NEW.comment_id;
        else
            id_value := OLD.comment_id;
        end if;
    else
        if TG_OP = 'INSERT' then
            id_value := NEW.post_id;
        else
            id_value := OLD.post_id;
        end if;
    end if;

    if (TG_OP = 'INSERT') then
        if (NEW.direction = 'up') then
            execute format('update %I set up_votes = up_votes + 1 where %I = %L', target_table, id_column, id_value::text);
        else
            execute format('update %I set down_votes = down_votes + 1 where %I = %L', target_table, id_column, id_value::text);
        end if;

    elsif (TG_OP = 'DELETE') then
        if (OLD.direction = 'up') then
            execute format('update %I set up_votes = up_votes - 1 where %I = %L', target_table, id_column, id_value::text);
        else
            execute format('update %I set down_votes = down_votes - 1 where %I = %L', target_table, id_column, id_value::text);
        end if;

    elsif (TG_OP = 'UPDATE') then
        if (OLD.direction != NEW.direction) then
            if (OLD.direction = 'up') then
                execute format('update %I set up_votes = up_votes - 1 where %I = %L', target_table, id_column, id_value::text);
            else
                execute format('update %I set down_votes = down_votes - 1 where %I = %L', target_table, id_column, id_value::text);
            end if;

            if (NEW.direction = 'up') then
                execute format('update %I set up_votes = up_votes + 1 where %I = %L', target_table, id_column, id_value::text);
            else
                execute format('update %I set down_votes = down_votes + 1 where %I = %L', target_table, id_column, id_value::text);
            end if;
        end if;
    end if;

    return null;
end;
$$ language plpgsql;

-- comment_count method

create or replace function update_comment_count_on_insert_or_update()
    returns trigger as $$
begin
    -- On INSERT
    if tg_op = 'INSERT' then
        update post_interaction_counts
        set comment_count = comment_count + 1
        where post_id = new.post_id;
        return new;

    -- On DELETE
    elsif tg_op = 'DELETE' then
        update post_interaction_counts
        set comment_count = comment_count - 1
        where post_id = old.post_id;
        return old;

    -- On UPDATE
    elsif tg_op = 'UPDATE' then
        -- Check if status changed to 'DELETED' and was previously not 'DELETED'
        if new.status = 'DELETED' and old.status is distinct from 'DELETED' then
            update post_interaction_counts
            set comment_count = comment_count - 1
            where post_id = new.post_id;
        elsif new.status != 'DELETED' and old.status = 'DELETED' then
            update post_interaction_counts
            set comment_count = comment_count + 1
            where post_id = new.post_id;
        end if;
        return new;
    end if;

    return null;
end;
$$ language plpgsql;

create trigger update_post_vote_counts_trigger
after insert or delete or update on post_interactions
for each row
execute function sync_interaction_count('post_interaction_counts', 'post_id');

create trigger update_comment_vote_counts_trigger
after insert or delete or update on comment_interactions
for each row
execute function sync_interaction_count('comment_interaction_counts', 'comment_id');

-- Posts
create or replace function create_post_interaction_count()
    returns trigger as $$
begin
    insert into post_interaction_counts (post_id, up_votes, down_votes)
    values (NEW.id, 0, 0);
    return NEW;
end;
$$ language plpgsql;

create trigger create_post_interaction_count_trigger
    after insert on posts
    for each row
execute function create_post_interaction_count();


-- Comments
create or replace function create_comment_interaction_count()
    returns trigger as $$
begin
    insert into comment_interaction_counts (comment_id, up_votes, down_votes)
    values (NEW.id, 0, 0);
    return NEW;
end;
$$ language plpgsql;

create trigger create_comment_interaction_count_trigger
    after insert on comments
    for each row
execute function create_comment_interaction_count();

-- trigger comment_count update on comment insert or delete
create trigger update_post_comment_count_trigger
    after insert or update or delete on comments
    for each row
execute function update_comment_count_on_insert_or_update();
