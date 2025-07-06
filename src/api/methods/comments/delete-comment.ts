import { CommentDto } from '@/src/types/comments.types';
import { SupabaseClient } from '@supabase/supabase-js';

export const deleteComment = async (
	comment: CommentDto,
	supabase: SupabaseClient,
) => {
	const { error } = await supabase
		.from('comments')
		.update({ status: 'DELETED', deleted: true })
		.eq('id', comment.id);

	if (error) throw error;
	return comment;
};
