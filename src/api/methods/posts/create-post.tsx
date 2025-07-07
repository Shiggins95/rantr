import { SINGLE_POST_SCHEMA } from '@/src/api/schemas/posts.schema';
import { PostImageCreate } from '@/src/types/post-images.types';
import { mapToDto, PostCreate } from '@/src/types/posts.types';
import { SupabaseClient } from '@supabase/supabase-js';

export const createPost = async (
	input: { post: PostCreate; images: PostImageCreate[] },
	supabase: SupabaseClient,
) => {
	const { error } = await supabase.from('posts').insert(input.post).single();

	if (error) throw error;

	const { error: imageError } = await supabase
		.from('post_images')
		.insert(input.images);

	if (imageError) throw imageError;

	const { data: post, error: postError } = await supabase
		.from('posts')
		.select(SINGLE_POST_SCHEMA)
		.eq('id', input.post.id)
		.single();

	if (postError) throw postError;

	return mapToDto(post, supabase);
};
