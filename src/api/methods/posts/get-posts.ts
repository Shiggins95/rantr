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
	_page: unknown = 0,
) => {
	const page = Number(_page);
	const { data, error } = await supabase
		.from('posts')
		.select(MULTI_POSTS_SCHEMA)
		.eq('my_interaction.user_id', userId)
		.order('created_at', { ascending: false })
		.range(page, page + POSTS_PER_PAGE - 1);

	if (error) throw error;

	return data.map((post) => new PostDto(post));
};

export const getAnonPosts = async (
	_: { userId?: string },
	supabase: SupabaseClient,
	_page: unknown = 0,
) => {
	const page = Number(_page);
	const { data, error } = await supabase
		.from('posts')
		.select(ANON_MULTI_POSTS_SCHEMA)
		.order('created_at', { ascending: false })
		.range(page, page + POSTS_PER_PAGE - 1);

	if (error) throw error;

	return data.map((post) => new PostDto(post));
};
