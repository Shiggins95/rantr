alter table comment_interaction_counts
    add column comment_count integer not null default 0;

create or replace function update_comment_count_on_insert_or_update()
    returns trigger as $$
begin
    -- INSERT
    if tg_op = 'INSERT' then
        update post_interaction_counts
        set comment_count = comment_count + 1
        where post_id = new.post_id;

        if new.reply_id is not null then
            update comment_interaction_counts
            set comment_count = comment_count + 1
            where comment_id = new.reply_id;
        end if;

        return new;

        -- DELETE
    elsif tg_op = 'DELETE' then
        update post_interaction_counts
        set comment_count = comment_count - 1
        where post_id = old.post_id;

        if old.reply_id is not null then
            update comment_interaction_counts
            set comment_count = comment_count - 1
            where comment_id = old.reply_id;
        end if;

        return old;

        -- UPDATE
    elsif tg_op = 'UPDATE' then
        -- post_interaction_counts logic
        if new.status = 'DELETED' and old.status is distinct from 'DELETED' then
            update post_interaction_counts
            set comment_count = comment_count - 1
            where post_id = new.post_id;
        elsif new.status != 'DELETED' and old.status = 'DELETED' then
            update post_interaction_counts
            set comment_count = comment_count + 1
            where post_id = new.post_id;
        end if;

        -- comment_interaction_counts logic
        if new.reply_id is not null and old.status is distinct from 'DELETED' and new.status = 'DELETED' then
            update comment_interaction_counts
            set comment_count = comment_count - 1
            where comment_id = new.reply_id;
        elsif new.reply_id is not null and old.status = 'DELETED' and new.status != 'DELETED' then
            update comment_interaction_counts
            set comment_count = comment_count + 1
            where comment_id = new.reply_id;
        end if;

        return new;
    end if;

    return null;
end;
$$ language plpgsql;
