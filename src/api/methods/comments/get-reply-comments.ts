import {
	ANON_COMMENTS_SCHEMA,
	COMMENTS_SCHEMA,
} from '@/src/api/schemas/comments.schema';
import { COMMENTS_PER_PAGE } from '@/src/constants/query';
import { CommentDto } from '@/src/types/comments.types';
import { SupabaseClient } from '@supabase/supabase-js';

export const getReplyComments = async (
	{
		userId,
		postId,
		parentId,
	}: { userId?: string; postId: string; parentId?: string },
	supabase: SupabaseClient,
	lastCursor: unknown = new Date().toISOString(),
) => {
	if (!parentId) return [];

	const { data, error } = await supabase
		.from('comments')
		.select(COMMENTS_SCHEMA)
		.eq('my_interaction.user_id', userId)
		.eq('post_id', postId)
		.eq('reply_id', parentId)
		.eq('status', 'ACTIVE')
		.lt('created_at', lastCursor)
		.limit(1, { referencedTable: 'comments' })
		.order('created_at', { ascending: false })
		.order('created_at', { referencedTable: 'comments', ascending: false })
		.limit(COMMENTS_PER_PAGE);

	if (error) throw error;

	return data.map((comment) => new CommentDto(comment));
};

export const getAnonReplyComments = async (
	{ postId, parentId }: { userId?: string; postId: string; parentId?: string },
	supabase: SupabaseClient,
	lastCursor: unknown = new Date().toISOString(),
) => {
	if (!parentId) return [];

	const { data, error } = await supabase
		.from('comments')
		.select(ANON_COMMENTS_SCHEMA)
		.eq('post_id', postId)
		.eq('reply_id', parentId)
		.eq('status', 'ACTIVE')
		.lt('created_at', lastCursor)
		.limit(1, { referencedTable: 'comments' })
		.order('created_at', { ascending: false })
		.order('created_at', { referencedTable: 'comments', ascending: false })
		.limit(COMMENTS_PER_PAGE);

	if (error) throw error;

	return data.map((comment) => new CommentDto(comment));
};
