import { SupabaseClient } from '@supabase/supabase-js';

type PostInteractParams = {
	userId: string;
	direction: 'up' | 'down';
	postId: string;
};

export const createPostInteraction = async (
	{ userId, direction, postId }: PostInteractParams,
	supabase: SupabaseClient,
) => {
	const { error } = await supabase.from('post_interactions').insert({
		user_id: userId,
		post_id: postId,
		direction,
	});

	if (error) throw error;
	return { type: 'create' as 'create', postId, direction };
};
