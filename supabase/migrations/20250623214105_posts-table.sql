-- ENUM TYPES
CREATE TYPE interaction_type_enum AS ENUM ('up', 'down');

-- POSTS TABLE
CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    content TEXT NOT NULL, -- markdown-compatible
    user_id UUID NOT NULL REFERENCES rantr_users(id) ON DELETE CASCADE,
    lat double precision not null default 0,
    lng double precision not null default 0,
    deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- POST IMAGES
CREATE TABLE post_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL
);
-- COMMENTS
CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    comment TEXT NOT NULL,
    user_id UUID NOT NULL REFERENCES rantr_users(id) ON DELETE CASCADE,
    original_comment TEXT,
    deleted BOOLEAN DEFAULT FALSE,
    edited BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE
);

-- COMMENT INTERACTIONS
CREATE TABLE comment_interactions (
    comment_id UUID NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES rantr_users(id) ON DELETE CASCADE,
    direction interaction_type_enum NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (comment_id, user_id)
);

-- POST INTERACTIONS
CREATE TABLE post_interactions (
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES rantr_users(id) ON DELETE CASCADE,
    direction interaction_type_enum NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (post_id, user_id)
);
