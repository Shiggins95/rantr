ALTER TABLE comments
    ADD COLUMN reply_id uuid;

ALTER TABLE comments
    ADD CONSTRAINT fk_comments_reply
        FOREIGN KEY (reply_id) REFERENCES comments(id) ON DELETE CASCADE;

CREATE INDEX idx_comments_reply_id ON comments(reply_id);
