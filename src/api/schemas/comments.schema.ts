import { PRIVATE_USERS_SCHEMA } from '@/src/api/schemas/private-users.schema';

export const MAX_COMMENT_DEPTH = 4;

export const COMMENTS_SCHEMA = `
	*,
	user:rantr_users!fk_comments_user (
		${PRIVATE_USERS_SCHEMA}
	),
	replies:comments (
		*
	),
	my_interaction:comment_interactions!fk_comment_interactions_comment (user_id,direction),
	interaction_count:comment_interaction_counts (up_votes,down_votes,comment_count)
`;

export const ANON_COMMENTS_SCHEMA = `
	*,
	user:rantr_users!fk_comments_user (
		${PRIVATE_USERS_SCHEMA}
	),
	replies:comments (
		*
	),
	interaction_count:comment_interaction_counts (up_votes,down_votes,comment_count)
`;
