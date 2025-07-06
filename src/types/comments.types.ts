import {
	CommentInteractionCountDb,
	CommentInteractionDb,
	CommentInteractionDto,
} from '@/src/types/interactions.types';
import { Database } from '@/src/types/supabase';
import { UserDbBase, UserDto } from '@/src/types/user.types';

export type CommentDbBase = Database['public']['Tables']['comments']['Row'];
export type CommentInsert = Database['public']['Tables']['comments']['Insert'];
export type CommentDb = CommentDbBase & {
	user?: UserDbBase;
	interactions?: CommentInteractionDb[];
	replies?: CommentDb[];
	my_interaction?: CommentInteractionDb[] | null;
	interaction_count?: CommentInteractionCountDb | null;
};

export class CommentDto {
	id!: string;
	postId!: string;
	comment!: string;
	userId!: string;
	upVotes!: number;
	downVotes!: number;
	originalComment!: string;
	deleted!: boolean;
	edited!: boolean;
	createdAt!: Date;
	user!: UserDto;
	interactions: CommentInteractionDto[] = [];
	replies: CommentDto[] = [];
	replyId: string | null;
	isLocal?: boolean = false;
	myInteraction?: CommentInteractionDto | null;
	commentCount: number = 0;

	constructor(entity: CommentDb) {
		this.id = entity.id;
		this.postId = entity.post_id;
		this.comment = entity.comment;
		this.userId = entity.user_id;
		this.originalComment = entity.original_comment || '';
		this.deleted = entity.deleted || false;
		this.edited = entity.edited || false;
		this.createdAt = new Date(entity.created_at);
		this.replyId = entity.reply_id;

		if (entity.interaction_count) {
			this.upVotes = entity.interaction_count.up_votes;
			this.downVotes = entity.interaction_count.down_votes;
			this.commentCount = entity.interaction_count.comment_count;
		}

		if (entity.my_interaction && entity.my_interaction.length > 0) {
			this.myInteraction = new CommentInteractionDto(entity.my_interaction[0]);
		}

		if (entity.interactions) {
			this.interactions = entity.interactions.map(
				(i) => new CommentInteractionDto(i),
			);
		}

		if (entity.user) {
			this.user = new UserDto(entity.user);
		}

		if (entity.replies) {
			this.replies = entity.replies.map((c) => new CommentDto(c));
		}
	}
}
