CREATE TYPE post_type_enum AS ENUM ('RANT', 'ADVICE', 'OTHER');

ALTER TABLE posts
ADD COLUMN type post_type_enum NOT NULL DEFAULT 'RANT';
