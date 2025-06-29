import { SupabaseClient } from '@supabase/supabase-js';

type PostInteractParams = {
	userId: string;
	postId: string;
	direction: 'up' | 'down';
};

export const deletePostInteraction = async (
	{ userId, postId, direction }: PostInteractParams,
	supabase: SupabaseClient,
) => {
	const { error } = await supabase
		.from('post_interactions')
		.delete()
		.eq('user_id', userId)
		.eq('post_id', postId);

	if (error) throw error;
	return { postId, type: 'delete' as 'delete', direction: direction };
};
