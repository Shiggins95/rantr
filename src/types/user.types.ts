export enum UserStatus {
	SETUP_REQUIRED = 'SETUP_REQUIRED',
	COMPLETE = 'COMPLETE',
	DELETED = 'DELETED',
}

export type UserDb = {
	id: string;
	email: string;
	first_name: string;
	last_name: string;
	created_at: Date;
	status: string;
	last_sign_in: Date;
	username: string;
	profile_photo: string;
	terms_id: string;
};

export class UserDto {
	id!: string;
	email!: string;
	firstName?: string;
	lastName?: string;
	createdAt!: Date;
	status!: UserStatus;
	fullName?: string;
	lastSignIn?: Date;
	username?: string;
	profilePhoto?: string;
	termsId: string;

	constructor(entity: UserDb) {
		Object.assign(this, entity);
		this.firstName = entity.first_name;
		this.lastName = entity.last_name;
		this.createdAt = entity.created_at;
		this.lastSignIn = entity.last_sign_in;
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
