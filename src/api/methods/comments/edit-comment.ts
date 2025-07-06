import { COMMENTS_SCHEMA } from '@/src/api/schemas/comments.schema';
import { CommentDto, CommentUpdate } from '@/src/types/comments.types';
import { SupabaseClient } from '@supabase/supabase-js';

export const editComment = async (
	commentBody: CommentUpdate,
	supabase: SupabaseClient,
) => {
	const { data, error } = await supabase
		.from('comments')
		.update({
			...commentBody,
			edited: true,
		})
		.eq('id', commentBody.id)
		.select(COMMENTS_SCHEMA)
		.single();

	if (error) throw error;

	return new CommentDto(data);
};
