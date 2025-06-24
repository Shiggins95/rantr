import { Database } from '@/src/types/supabase';
import { CommentDb, CommentDto } from '@/src/types/comments.types';
import { PostDb, PostDto } from '@/src/types/posts.types';
import {
	CommentInteractionDb,
	CommentInteractionDto,
	PostInteractionDb,
	PostInteractionDto,
} from '@/src/types/interactions.types';

export type UserDbBase = Database['public']['Tables']['rantr_users']['Row'];
export type UserDb = UserDbBase & {
	posts?: PostDb[];
	comments?: CommentDb[];
	comment_interactions?: CommentInteractionDb[];
	post_interactions?: PostInteractionDb[];
};
export type UserStatus = Database['public']['Enums']['user_status'];

export class UserDto {
	id!: string;
	email!: string;
	firstName?: string | null;
	lastName?: string | null;
	createdAt!: Date;
	status!: UserStatus;
	fullName?: string | null;
	lastSignIn?: Date | null;
	username?: string | null;
	profilePhoto?: string | null;
	termsId: string | null;
	comments?: CommentDto[];
	posts?: PostDto[];
	commentInteractions?: CommentInteractionDto[];
	postInteractions?: PostInteractionDto[];

	constructor(entity: UserDb) {
		this.id = entity.id;
		this.email = entity.email;
		this.firstName = entity.first_name;
		this.lastName = entity.last_name;
		this.createdAt = new Date(entity.created_at);
		this.status = entity.status;
		this.username = entity.username;
		this.profilePhoto = entity.profile_photo;
		this.termsId = entity.terms_id;

		if (entity.last_sign_in) {
			this.lastSignIn = new Date(entity.last_sign_in);
		}

		if (entity.last_name && entity.first_name) {
			this.fullName = `${entity.first_name} ${entity.last_name}`;
		}

		if (entity.posts) {
			this.posts = entity.posts.map((p) => new PostDto(p));
		}

		if (entity.comments) {
			this.comments = entity.comments.map((c) => new CommentDto(c));
		}

		if (entity.comment_interactions) {
			this.commentInteractions = entity.comment_interactions.map(
				(i) => new CommentInteractionDto(i),
			);
		}

		if (entity.post_interactions) {
			this.postInteractions = entity.post_interactions.map(
				(i) => new PostInteractionDto(i),
			);
		}
	}

	static mapMany(entities: UserDbBase[]) {
		return entities.map((entity) => new UserDto(entity));
	}
}
