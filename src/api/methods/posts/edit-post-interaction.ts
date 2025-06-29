import { SupabaseClient } from '@supabase/supabase-js';

type PostInteractParams = {
	userId: string;
	direction: 'up' | 'down';
	postId: string;
};

export const editPostInteraction = async (
	{ userId, direction, postId }: PostInteractParams,
	supabase: SupabaseClient,
) => {
	const { error } = await supabase
		.from('post_interactions')
		.update({
			direction,
		})
		.eq('user_id', userId)
		.eq('post_id', postId);

	if (error) throw error;
	return { postId, direction, type: 'edit' as 'edit' };
};
