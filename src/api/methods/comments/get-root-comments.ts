import {
	ANON_COMMENTS_SCHEMA,
	COMMENTS_SCHEMA,
} from '@/src/api/schemas/comments.schema';
import { COMMENTS_PER_PAGE } from '@/src/constants/query';
import { CommentDto } from '@/src/types/comments.types';
import { SupabaseClient } from '@supabase/supabase-js';

export const getRootComments = async (
	{ userId, postId }: { userId?: string; postId: string },
	supabase: SupabaseClient,
	lastCursor: unknown = 0,
) => {
	const { data, error } = await supabase
		.from('comments')
		.select(COMMENTS_SCHEMA)
		.eq('my_interaction.user_id', userId)
		.eq('post_id', postId)
		.eq('status', 'ACTIVE')
		.lt('created_at', lastCursor)
		.is('reply_id', null)
		.limit(5, { referencedTable: 'comments' })
		.order('created_at', { ascending: false })
		.order('created_at', { referencedTable: 'comments', ascending: false })
		.limit(COMMENTS_PER_PAGE);

	if (error) throw error;

	return data.map((comment) => new CommentDto(comment));
};
export const getAnonRootComments = async (
	{ postId }: { userId?: string; postId: string },
	supabase: SupabaseClient,
	lastCursor: unknown = 0,
) => {
	const { data, error } = await supabase
		.from('comments')
		.select(ANON_COMMENTS_SCHEMA)
		.eq('post_id', postId)
		.is('reply_id', null)
		.eq('status', 'ACTIVE')
		.lt('created_at', lastCursor)
		.limit(1, { referencedTable: 'comments' })
		.order('created_at', { ascending: false })
		.order('created_at', { referencedTable: 'comments', ascending: false })
		.limit(COMMENTS_PER_PAGE);

	if (error) throw error;

	return data.map((comment) => new CommentDto(comment));
};
