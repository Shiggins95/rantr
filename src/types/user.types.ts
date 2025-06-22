import { Database } from '@/src/types/supabase';

// export enum UserStatus {
// 	SETUP_REQUIRED = 'SETUP_REQUIRED',
// 	COMPLETE = 'COMPLETE',
// 	DELETED = 'DELETED',
// }

export type UserDb = Database['public']['Tables']['rantr_users']['Row'];
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

	constructor(entity: UserDb) {
		Object.assign(this, entity);
		this.firstName = entity.first_name;
		this.lastName = entity.last_name;
		this.createdAt = new Date(entity.created_at);
		if (entity.last_sign_in) {
			this.lastSignIn = new Date(entity.last_sign_in);
		}
		this.username = entity.username;
		this.profilePhoto = entity.profile_photo;
		this.termsId = entity.terms_id;
		if (entity.last_name && entity.first_name) {
			this.fullName = `${entity.first_name} ${entity.last_name}`;
		}
	}

	static mapMany(entities: UserDb[]) {
		return entities.map((entity) => new UserDto(entity));
	}
}
