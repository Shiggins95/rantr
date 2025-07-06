drop trigger if exists update_post_comment_count_trigger on comments;

create trigger update_post_comment_count_trigger_before_delete
    before delete on comments
    for each row
execute function update_comment_count_on_insert_or_update();

create trigger update_post_comment_count_trigger_after_insert_update
    after insert or update on comments
    for each row
execute function update_comment_count_on_insert_or_update();
