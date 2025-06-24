ALTER TABLE posts
    ADD CONSTRAINT fk_posts_user FOREIGN KEY (user_id) REFERENCES rantr_users(id);

ALTER TABLE comments
    ADD CONSTRAINT fk_comments_user FOREIGN KEY (user_id) REFERENCES rantr_users(id);

ALTER TABLE comments
    ADD CONSTRAINT fk_comments_post FOREIGN KEY (post_id) REFERENCES posts(id);

ALTER TABLE comment_interactions
    ADD CONSTRAINT fk_comment_interactions_comment FOREIGN KEY (comment_id) REFERENCES comments(id) ON DELETE CASCADE;

ALTER TABLE comment_interactions
    ADD CONSTRAINT fk_comment_interactions_user FOREIGN KEY (user_id) REFERENCES rantr_users(id) ON DELETE CASCADE;

ALTER TABLE post_images
    ADD CONSTRAINT fk_post_images_post FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE;
