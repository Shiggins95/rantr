import { CommentDb, CommentDto } from '@/src/types/comments.types';
import {
	PostInteractionCountDb,
	PostInteractionDb,
	PostInteractionDto,
} from '@/src/types/interactions.types';
import { PostImageDb, PostImageDto } from '@/src/types/post-images.types';
import { Database } from '@/src/types/supabase';
import { UserDbBase, UserDto } from '@/src/types/user.types';
import { SupabaseClient } from '@supabase/supabase-js';

export type PostType = Database['public']['Enums']['post_type_enum'];
export type PostDbBase = Database['public']['Tables']['posts']['Row'];
export type PostCreate = Database['public']['Tables']['posts']['Insert'];
export type PostDb = PostDbBase & {
	user?: UserDbBase;
	comments?: CommentDb[];
	interactions?: PostInteractionDb[];
	images?: PostImageDb[];
	my_interaction?: PostInteractionDb[] | null;
	interaction_count?: PostInteractionCountDb | null;
};

export const mapToDto = async (entity: PostDb, supabase: SupabaseClient) => {
	const dto = new PostDto(entity);
	if (entity.images) {
		dto.images = await Promise.all(
			entity.images.map(async (image) => {
				const { data } = await supabase.storage
					.from('post-photos')
					.createSignedUrl(image.image_url, 60 * 60);

				return new PostImageDto({
					image_url: data?.signedUrl || '',
					id: image.id,
					post_id: entity.id,
				});
			}),
		);
	}
	return dto;
};

export const mapToDtos = async (data: PostDb[], supabase: SupabaseClient) => {
	return await Promise.all(
		data.map(async (post) => {
			return await mapToDto(post, supabase);
		}),
	);
};

export class PostDto {
	id!: string;
	title!: string;
	content!: string;
	userId!: string;
	upVotes!: number;
	downVotes!: number;
	deleted!: boolean;
	type!: PostType;
	createdAt!: Date;
	comments?: CommentDto[];
	interactions?: PostInteractionDto[];
	user?: UserDto;
	images: PostImageDto[] = [];
	myInteraction?: PostInteractionDto;
	commentCount?: number;
	disableComments?: boolean;

	constructor(entity: PostDb) {
		this.id = entity.id;
		this.title = entity.title;
		this.content = entity.content;
		this.userId = entity.user_id;
		this.upVotes = 0;
		this.downVotes = 0;
		this.deleted = entity.deleted || false;
		this.createdAt = new Date(entity.created_at);
		this.type = entity.type;
		this.disableComments = entity.disable_comments;

		if (entity.interactions) {
			this.interactions = entity.interactions.map(
				(i) => new PostInteractionDto(i),
			);
		}

		if (entity.comments) {
			this.comments = entity.comments.map((c) => new CommentDto(c));
		}

		if (entity.user) {
			this.user = new UserDto(entity.user);
		}

		if (entity.images) {
			this.images = entity.images.map((i) => new PostImageDto(i));
		}

		if (entity.my_interaction && entity.my_interaction.length > 0) {
			this.myInteraction = new PostInteractionDto(entity.my_interaction[0]);
		}

		if (entity.interaction_count) {
			this.upVotes = entity.interaction_count.up_votes || 0;
			this.downVotes = entity.interaction_count.down_votes || 0;
			this.commentCount = entity.interaction_count.comment_count || 0;
		}
	}
}
