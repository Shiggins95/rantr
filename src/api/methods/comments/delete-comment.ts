import { COMMENTS_SCHEMA } from '@/src/api/schemas/comments.schema';
import { CommentDto } from '@/src/types/comments.types';
import { SupabaseClient } from '@supabase/supabase-js';

export const deleteComment = async (
	commentId: string,
	supabase: SupabaseClient,
) => {
	const { error, data } = await supabase
		.from('comments')
		.update({ status: 'DELETED', deleted: true })
		.eq('id', commentId)
		.select(COMMENTS_SCHEMA)
		.single();

	if (error) throw error;
	return new CommentDto(data);
};
