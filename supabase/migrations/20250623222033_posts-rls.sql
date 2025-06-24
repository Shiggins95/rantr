ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE comment_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_interactions ENABLE ROW LEVEL SECURITY;

-- POSTS RLS
-- Allow all users (auth and anon) to read
CREATE POLICY "Anyone can read posts"
    ON posts FOR SELECT
    USING (true);

-- Only authenticated users can create
CREATE POLICY "Authenticated users can create posts"
    ON posts FOR INSERT
    WITH CHECK (auth.role() = 'authenticated' AND user_id = auth.uid());

-- Only the owner can update
CREATE POLICY "Users can update their own posts"
    ON posts FOR UPDATE
    USING (user_id = auth.uid());

-- Nobody can delete
-- (Don't create a DELETE policy)

-- COMMENTS
-- Allow all users to read
CREATE POLICY "Anyone can read comments"
    ON comments FOR SELECT
    USING (true);

-- Only authenticated users can create
CREATE POLICY "Authenticated users can create comments"
    ON comments FOR INSERT
    WITH CHECK (auth.role() = 'authenticated' AND user_id = auth.uid());

-- Only the owner can update
CREATE POLICY "Users can update their own comments"
    ON comments FOR UPDATE
    USING (user_id = auth.uid());

-- Nobody can delete
-- (Don't create a DELETE policy)

-- POST_IMAGES
-- Allow all users to read
CREATE POLICY "Anyone can read post images"
    ON post_images FOR SELECT
    USING (true);

-- Only authenticated users can create
CREATE POLICY "Authenticated users can create post images"
    ON post_images FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

-- Only the creator can update
CREATE POLICY "Users can update their own post images"
    ON post_images FOR UPDATE
    USING (
    EXISTS (
        SELECT 1 FROM posts
        WHERE posts.id = post_images.post_id AND posts.user_id = auth.uid()
    )
);

-- Only the creator can delete
CREATE POLICY "Users can delete their own post images"
    ON post_images FOR DELETE
    USING (
    EXISTS (
        SELECT 1 FROM posts
        WHERE posts.id = post_images.post_id AND posts.user_id = auth.uid()
    )
);

-- POST INTERACTIONS
-- Allow all users to read
CREATE POLICY "Anyone can read post interactions"
    ON post_interactions FOR SELECT
    USING (true);

-- Only authenticated users can insert
CREATE POLICY "Authenticated users can create post interactions"
    ON post_interactions FOR INSERT
    WITH CHECK (auth.role() = 'authenticated' AND user_id = auth.uid());

-- Only creator can update
CREATE POLICY "Users can update their own post interactions"
    ON post_interactions FOR UPDATE
    USING (user_id = auth.uid());

-- Only creator can delete
CREATE POLICY "Users can delete their own post interactions"
    ON post_interactions FOR DELETE
    USING (user_id = auth.uid());

-- COMMENT INTERACTIONS
-- Allow all users to read
CREATE POLICY "Anyone can read comment interactions"
    ON comment_interactions FOR SELECT
    USING (true);

-- Only authenticated users can insert
CREATE POLICY "Authenticated users can create comment interactions"
    ON comment_interactions FOR INSERT
    WITH CHECK (auth.role() = 'authenticated' AND user_id = auth.uid());

-- Only creator can update
CREATE POLICY "Users can update their own comment interactions"
    ON comment_interactions FOR UPDATE
    USING (user_id = auth.uid());

-- Only creator can delete
CREATE POLICY "Users can delete their own comment interactions"
    ON comment_interactions FOR DELETE
    USING (user_id = auth.uid());
