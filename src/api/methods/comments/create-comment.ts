import { COMMENTS_SCHEMA } from '@/src/api/schemas/comments.schema';
import {
	CommentDb,
	CommentDto,
	CommentInsert,
} from '@/src/types/comments.types';
import { SupabaseClient } from '@supabase/supabase-js';

export const createComment = async (
	commentBody: CommentInsert,
	supabase: SupabaseClient,
) => {
	const { data, error } = await supabase
		.from('comments')
		.insert(commentBody)
		.select(COMMENTS_SCHEMA)
		.single();
	if (error) throw error;

	console.log('inserted comment', data);

	return new CommentDto(data as CommentDb);
};
