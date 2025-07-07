import { Database } from '@/src/types/supabase';

export type PostImageDb = Database['public']['Tables']['post_images']['Row'];
export type PostImageCreate =
	Database['public']['Tables']['post_images']['Insert'];

export class PostImageDto {
	id!: string;
	postId!: string;
	imageUrl!: string;

	constructor(entity: PostImageDb) {
		this.id = entity.id;
		this.postId = entity.post_id;
		this.imageUrl = entity.image_url;
	}
}
