import {
	ANON_MULTI_POSTS_SCHEMA,
	MULTI_POSTS_SCHEMA,
} from '@/src/api/schemas/posts.schema';
import { POSTS_PER_PAGE } from '@/src/constants/query';
import { PostDto } from '@/src/types/posts.types';
import { SupabaseClient } from '@supabase/supabase-js';

export const getPosts = async (
	{ userId }: { userId?: string },
	supabase: SupabaseClient,
	lastCursor: unknown = new Date().toISOString(),
) => {
	const { data, error } = await supabase
		.from('posts')
		.select(MULTI_POSTS_SCHEMA)
		.lt('created_at', lastCursor)
		.eq('my_interaction.user_id', userId)
		.order('created_at', { ascending: false })
		.limit(POSTS_PER_PAGE);

	if (error) throw error;

	return data.map((post) => new PostDto(post));
};

export const getAnonPosts = async (
	_: { userId?: string },
	supabase: SupabaseClient,
	lastCursor: unknown = new Date().toISOString(),
) => {
	const { data, error } = await supabase
		.from('posts')
		.select(ANON_MULTI_POSTS_SCHEMA)
		.lt('created_at', lastCursor)
		.order('created_at', { ascending: false })
		.limit(POSTS_PER_PAGE);

	if (error) throw error;

	return data.map((post) => new PostDto(post));
};
