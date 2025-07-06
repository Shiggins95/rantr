import { SupabaseClient } from '@supabase/supabase-js';

type PostInteractParams = {
	userId: string;
	entityId: string;
	direction: 'up' | 'down';
	type: 'post' | 'comment' | 'reply';
};

export const deletePostInteraction = async (
	{ userId, entityId, direction, type }: PostInteractParams,
	supabase: SupabaseClient,
) => {
	const column = type === 'post' ? 'post_id' : 'comment_id';
	const { error } = await supabase
		.from(type === 'post' ? 'post_interactions' : 'comment_interactions')
		.delete()
		.eq('user_id', userId)
		.eq(column, entityId);

	if (error) throw error;
	return {
		entityId,
		type: 'delete' as 'delete',
		direction: direction,
		tableType: type,
	};
};
