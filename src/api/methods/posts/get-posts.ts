import { SupabaseClient } from '@supabase/supabase-js';
import { PostDto } from '@/src/types/posts.types';
import { POSTS_PER_PAGE } from '@/src/constants/query';
import { POSTS_SCHEMA } from '@/src/api/schemas/posts.schema';

export const getPosts = async (
	{ userId }: { userId?: string },
	supabase: SupabaseClient,
	_page: unknown = 0,
) => {
	const page = Number(_page);
	const { data, error } = await supabase
		.from('posts')
		.select(POSTS_SCHEMA)
		.eq('my_interaction.user_id', userId)
		.order('created_at', { ascending: false })
		.range(page, page + POSTS_PER_PAGE - 1);

	if (error) throw error;

	console.log('data raw', data);

	return data.map((post) => new PostDto(post));
};
