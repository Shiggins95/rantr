import { SupabaseClient } from '@supabase/supabase-js';
import { UserDto } from '@/src/types/user.types';

export const getUser = async (id: string, supabase: SupabaseClient) => {
	const { error, data } = await supabase
		.from('rantr_users')
		.select()
		.eq('id', id)
		.maybeSingle();

	if (error) throw error;

	if (!data) return null;

	return new UserDto(data);
};
