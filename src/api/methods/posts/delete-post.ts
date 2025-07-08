import { PostDto } from '@/src/types/posts.types';
import { SupabaseClient } from '@supabase/supabase-js';

export const deletePost = async (id: string, supabase: SupabaseClient) => {
	const { error: deletePostError, data } = await supabase
		.from('posts')
		.update({
			deleted: true,
		})
		.eq('id', id)
		.select()
		.single();

	if (deletePostError) throw deletePostError;

	const { data: images, error: getImagesError } = await supabase
		.from('post_images')
		.select('*')
		.eq('post_id', id);

	if (getImagesError) throw getImagesError;

	const imageUrls = images.map((image) => image.image_url);

	if (imageUrls.length > 0) {
		const { error: deleteImagesError } = await supabase
			.from('post_images')
			.delete()
			.eq('post_id', id);

		if (deleteImagesError) throw deleteImagesError;

		const { error: deleteStorageImagesError } = await supabase.storage
			.from('post-photos')
			.remove(imageUrls);

		if (deleteStorageImagesError) throw deleteStorageImagesError;
	}

	return new PostDto(data);
};
