import {
	ANON_COMMENTS_SCHEMA,
	COMMENTS_SCHEMA,
} from '@/src/api/schemas/comments.schema';
import { COMMENTS_PER_PAGE, POSTS_PER_PAGE } from '@/src/constants/query';
import { CommentDto } from '@/src/types/comments.types';
import { SupabaseClient } from '@supabase/supabase-js';

export const getRootComments = async (
	{ userId, postId }: { userId?: string; postId: string },
	supabase: SupabaseClient,
	_page: unknown = 0,
) => {
	const page = Number(_page);
	const { data, error } = await supabase
		.from('comments')
		.select(COMMENTS_SCHEMA)
		.eq('my_interaction.user_id', userId)
		.eq('post_id', postId)
		.is('reply_id', null)
		.limit(5, { referencedTable: 'comments' })
		.order('created_at', { ascending: false })
		.order('created_at', { referencedTable: 'comments', ascending: false })
		.range(page, page + POSTS_PER_PAGE - 1);

	if (error) throw error;

	return data.map((comment) => new CommentDto(comment));
};
export const getAnonRootComments = async (
	{ postId }: { userId?: string; postId: string },
	supabase: SupabaseClient,
	_page: unknown = 0,
) => {
	const page = Number(_page);
	const { data, error } = await supabase
		.from('comments')
		.select(ANON_COMMENTS_SCHEMA)
		.eq('post_id', postId)
		.is('reply_id', null)
		.limit(1, { referencedTable: 'comments' })
		.order('created_at', { ascending: false })
		.order('created_at', { referencedTable: 'comments', ascending: false })
		.range(page, page + COMMENTS_PER_PAGE - 1);

	if (error) throw error;

	return data.map((comment) => new CommentDto(comment));
};
