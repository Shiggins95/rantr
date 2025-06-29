import { SupabaseClient } from '@supabase/supabase-js';
import { PostDto } from '@/src/types/posts.types';
import {
	ANON_POSTS_SCHEMA,
	POSTS_SCHEMA,
} from '@/src/api/schemas/posts.schema';

export const getPost = async (
	{ userId, postId }: { userId?: string; postId: string },
	supabase: SupabaseClient,
) => {
	const { data, error } = await supabase
		.from('posts')
		.select(POSTS_SCHEMA)
		.eq('my_interaction.user_id', userId)
		.eq('id', postId)
		.maybeSingle();

	if (error) throw error;

	return new PostDto(data);
};

export const getPostAnon = async (
	{ postId }: { userId?: string; postId: string },
	supabase: SupabaseClient,
) => {
	const { data, error } = await supabase
		.from('posts')
		.select(ANON_POSTS_SCHEMA)
		.eq('id', postId)
		.maybeSingle();

	if (error) throw error;

	return new PostDto(data);
};
