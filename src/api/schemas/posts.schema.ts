import { PRIVATE_USERS_SCHEMA } from '@/src/api/schemas/private-users.schema';
import { COMMENTS_SCHEMA } from '@/src/api/schemas/comments.schema';

export const POST_USER_SCHEMA = `
	user:rantr_users!fk_posts_user (
		${PRIVATE_USERS_SCHEMA}
	),
	images:post_images!fk_post_images_post (
		*
	)
`;

export const POSTS_SCHEMA = `
	*,
	${POST_USER_SCHEMA},
	${COMMENTS_SCHEMA},
	my_interaction:post_interactions!fk_post_interactions_post (user_id,direction),
	interaction_count:post_interaction_counts (up_votes,down_votes,comment_count)
`;
export const ANON_POSTS_SCHEMA = `
	*,
	${POST_USER_SCHEMA},
	${COMMENTS_SCHEMA},
	interaction_count:post_interaction_counts (up_votes,down_votes,comment_count)
`;
