import { Database } from '@/src/types/supabase';
import {
	PostInteractionDb,
	PostInteractionDto,
} from '@/src/types/interactions.types';
import { CommentDb, CommentDto } from '@/src/types/comments.types';
import { UserDbBase, UserDto } from '@/src/types/user.types';
import { PostImageDb, PostImageDto } from '@/src/types/post-images.types';

export type PostType = Database['public']['Enums']['post_type_enum'];
export type PostDbBase = Database['public']['Tables']['posts']['Row'];
export type PostDb = PostDbBase & {
	user?: UserDbBase;
	comments?: CommentDb[];
	interactions?: PostInteractionDb[];
	images?: PostImageDb[];
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

	constructor(entity: PostDb) {
		this.id = entity.id;
		this.title = entity.title;
		this.content = entity.content;
		this.userId = entity.user_id;
		this.upVotes = entity.up_votes || 0;
		this.downVotes = entity.down_votes || 0;
		this.deleted = entity.deleted || false;
		this.createdAt = new Date(entity.created_at);
		this.type = entity.type;
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
	}
}
