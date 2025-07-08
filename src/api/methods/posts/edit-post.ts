import { SINGLE_POST_SCHEMA } from '@/src/api/schemas/posts.schema';
import { PostImageCreate, PostImageDto } from '@/src/types/post-images.types';
import { mapToDto, PostUpdate } from '@/src/types/posts.types';
import { SupabaseClient } from '@supabase/supabase-js';

export const editPost = async (
	input: {
		post: PostUpdate;
		images: PostImageCreate[];
		removedImages: PostImageDto[];
	},
	supabase: SupabaseClient,
) => {
	if (input.removedImages.length > 0) {
		const { error: errorDeletingPostImages } = await supabase
			.from('post_images')
			.delete()
			.in(
				'id',
				input.removedImages.map((i) => i.id),
			);

		if (errorDeletingPostImages) throw errorDeletingPostImages;
	}

	const { error } = await supabase
		.from('posts')
		.update(input.post)
		.eq('id', input.post.id);

	if (error) throw error;

	if (input.images.length > 0) {
		const { error: imageError } = await supabase
			.from('post_images')
			.insert(input.images);

		if (imageError) throw imageError;
	}

	const { data: post, error: postError } = await supabase
		.from('posts')
		.select(SINGLE_POST_SCHEMA)
		.eq('id', input.post.id)
		.single();

	if (postError) throw postError;

	return mapToDto(post, supabase);
};
