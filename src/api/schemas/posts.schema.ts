import { PRIVATE_USERS_SCHEMA } from '@/src/api/schemas/private-users.schema';

export const POST_USER_SCHEMA = `
	user:rantr_users!fk_posts_user (
		${PRIVATE_USERS_SCHEMA}
	)
`;
