import { SupabaseClient } from '@supabase/supabase-js';
import { PostDto } from '@/src/types/posts.types';
import { POSTS_PER_PAGE } from '@/src/constants/query';
import { POST_USER_SCHEMA } from '@/src/api/schemas/posts.schema';
import { COMMENTS_SCHEMA } from '@/src/api/schemas/comments.schema';

export const getPosts = async <TArgs>(
	_: TArgs,
	supabase: SupabaseClient,
	_page: unknown = 0,
) => {
	const page = Number(_page);
	const { data, error } = await supabase
		.from('posts')
		.select(
			`
				*,
				${POST_USER_SCHEMA},
				${COMMENTS_SCHEMA}
		`,
		)
		.order('created_at', { ascending: false })
		.range(page, page + POSTS_PER_PAGE - 1);

	if (error) throw error;
	return data.map((post) => new PostDto(post));
};
