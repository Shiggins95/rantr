import { SupabaseClient } from '@supabase/supabase-js';

type PostInteractParams = {
	userId: string;
	direction: 'up' | 'down';
	entityId: string;
	type: 'post' | 'comment' | 'reply';
};

export const editPostInteraction = async (
	{ userId, direction, entityId, type }: PostInteractParams,
	supabase: SupabaseClient,
) => {
	const column = type === 'post' ? 'post_id' : 'comment_id';
	const { error } = await supabase
		.from(type === 'post' ? 'post_interactions' : 'comment_interactions')
		.update({
			direction,
		})
		.eq('user_id', userId)
		.eq(column, entityId);

	if (error) throw error;
	return { entityId, direction, type: 'edit' as 'edit', tableType: type };
};
