import { UserDb, UserDto } from '@/src/types/user.types';
import { SupabaseClient } from '@supabase/supabase-js';

type UpdateUserArgs = {
	id: string;
	data: Partial<UserDb>;
};

export const updateUser = async (
	{ id, data }: UpdateUserArgs,
	supabase: SupabaseClient,
) => {
	const { error, data: updated } = await supabase
		.from('rantr_users')
		.update(data)
		.eq('id', id)
		.select()
		.single();

	if (error) throw error;

	return new UserDto(updated);
};
