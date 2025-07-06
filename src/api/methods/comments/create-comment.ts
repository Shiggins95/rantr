import { COMMENTS_SCHEMA } from '@/src/api/schemas/comments.schema';
import {
	CommentDb,
	CommentDto,
	CommentInsert,
} from '@/src/types/comments.types';
import { SupabaseClient } from '@supabase/supabase-js';

export const createComment = async (
	commentBody: CommentInsert & { depth: number },
	supabase: SupabaseClient,
) => {
	const { depth, ...rest } = commentBody;
	const { data, error } = await supabase
		.from('comments')
		.insert(rest)
		.select(COMMENTS_SCHEMA)
		.single();
	if (error) throw error;

	return {
		entity: new CommentDto(data as CommentDb),
		depth,
	};
};
