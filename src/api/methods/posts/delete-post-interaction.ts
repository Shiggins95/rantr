import { SupabaseClient } from '@supabase/supabase-js';

type PostInteractParams = {
	userId: string;
	postId: string;
};

export const deletePostInteraction = async (
	{ userId, postId }: PostInteractParams,
	supabase: SupabaseClient,
) => {
	const { error } = await supabase
		.from('post_interactions')
		.delete()
		.eq('user_id', userId)
		.eq('post_id', postId);

	if (error) throw error;
	return true;
};
