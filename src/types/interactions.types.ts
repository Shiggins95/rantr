import { Database } from '@/src/types/supabase';

export type InteractionType =
	Database['public']['Enums']['interaction_type_enum'];

export type CommentInteractionDb =
	Database['public']['Tables']['comment_interactions']['Row'];
export type PostInteractionDb =
	Database['public']['Tables']['post_interactions']['Row'];
export type CommentInteractionCountDb =
	Database['public']['Tables']['comment_interaction_counts']['Row'];
export type PostInteractionCountDb =
	Database['public']['Tables']['post_interaction_counts']['Row'];

export class CommentInteractionDto {
	direction!: InteractionType;
	createdAt!: Date;
	commentId!: string;
	userId!: string;

	constructor(entity: CommentInteractionDb) {
		this.commentId = entity.comment_id;
		this.userId = entity.user_id;
		this.createdAt = new Date(entity.created_at);
		this.direction = entity.direction;
	}
}

export class PostInteractionDto {
	direction!: InteractionType;
	createdAt!: Date;
	postId!: string;
	userId!: string;

	constructor(entity: PostInteractionDb) {
		this.postId = entity.post_id;
		this.userId = entity.user_id;
		this.createdAt = new Date(entity.created_at);
		this.direction = entity.direction;
	}
}
