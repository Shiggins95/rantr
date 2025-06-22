import { UserDb, UserDto } from '@/src/types/user.types';
import { SupabaseClient } from '@supabase/supabase-js';

type CreateUserArgs = {
	data: Partial<UserDb>;
};

export const createUser = async (
	{ data }: CreateUserArgs,
	supabase: SupabaseClient,
) => {
	const { error, data: updated } = await supabase
		.from('rantr_users')
		.insert(data)
		.select()
		.single();

	if (error) throw error;

	return new UserDto(updated);
};
