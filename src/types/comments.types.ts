import { Database } from '@/src/types/supabase';
import { UserDbBase, UserDto } from '@/src/types/user.types';
import {
	CommentInteractionDb,
	CommentInteractionDto,
} from '@/src/types/interactions.types';

export type CommentDbBase = Database['public']['Tables']['comments']['Row'];
export type CommentDb = CommentDbBase & {
	user?: UserDbBase;
	interactions?: CommentInteractionDb[];
};

export class CommentDto {
	id!: string;
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

	constructor(entity: CommentDb) {
		this.id = entity.id;
		this.comment = entity.comment;
		this.userId = entity.user_id;
		this.upVotes = entity.up_votes || 0;
		this.downVotes = entity.down_votes || 0;
		this.originalComment = entity.original_comment || '';
		this.deleted = entity.deleted || false;
		this.edited = entity.edited || false;
		this.createdAt = new Date(entity.created_at);

		if (entity.interactions) {
			this.interactions = entity.interactions.map(
				(i) => new CommentInteractionDto(i),
			);
		}

		if (entity.user) {
			this.user = new UserDto(entity.user);
		}
	}
}
