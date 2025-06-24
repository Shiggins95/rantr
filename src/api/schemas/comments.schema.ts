import { PRIVATE_USERS_SCHEMA } from '@/src/api/schemas/private-users.schema';

export const COMMENTS_SCHEMA = `
	comments:comments!fk_comments_post (
		*,
		user:rantr_users!fk_comments_user (
			${PRIVATE_USERS_SCHEMA}
		)
	)
`;
