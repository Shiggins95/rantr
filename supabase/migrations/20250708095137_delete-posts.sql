alter table posts
add column original_title text,
add column original_content text,
add column deleted_at timestamptz;

alter table comments
    add column deleted_at timestamptz;

create or replace function handle_post_soft_delete()
    returns trigger as $$
begin
    if NOT OLD.deleted and NEW.deleted then
        NEW.original_title := OLD.title;
        NEW.original_content := OLD.content;
        NEW.title := 'Deleted';
        NEW.content := 'Deleted';
        NEW.deleted_at := now();
    end if;

    return NEW;
end;
$$ language plpgsql;

create trigger trigger_handle_post_soft_delete
    before update on posts
    for each row
execute function handle_post_soft_delete();

create or replace function handle_comment_soft_delete()
    returns trigger as $$
begin
    if OLD.status != 'DELETED' and NEW.status = 'DELETED' then
        NEW.original_comment := OLD.comment;
        NEW.deleted := true;
        NEW.deleted_at := now();
    end if;

    return NEW;
end;
$$ language plpgsql;

create trigger trigger_handle_comment_soft_delete
    before update on comments
    for each row
execute function handle_comment_soft_delete();

