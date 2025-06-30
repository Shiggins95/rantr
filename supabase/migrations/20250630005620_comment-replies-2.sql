create type comment_status as enum ('ACTIVE', 'DELETED');

ALTER TABLE comments
    ADD COLUMN status comment_status not null default 'ACTIVE';
