import { SupabaseClient } from '@supabase/supabase-js';

type PostInteractParams = {
	userId: string;
	direction: 'up' | 'down';
	entityId: string;
	type: 'post' | 'comment' | 'reply';
};

export const createPostInteraction = async (
	{ userId, direction, entityId, type }: PostInteractParams,
	supabase: SupabaseClient,
) => {
	const column = type === 'post' ? 'post_id' : 'comment_id';

	const { error } = await supabase
		.from(type === 'post' ? 'post_interactions' : 'comment_interactions')
		.insert({
			user_id: userId,
			[column]: entityId,
			direction,
		});

	if (error) throw error;
	return { type: 'create' as 'create', entityId, direction, tableType: type };
};
