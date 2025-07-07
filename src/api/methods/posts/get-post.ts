import {
	ANON_SINGLE_POST_SCHEMA,
	SINGLE_POST_SCHEMA,
} from '@/src/api/schemas/posts.schema';
import { mapToDto } from '@/src/types/posts.types';
import { SupabaseClient } from '@supabase/supabase-js';

export const getPost = async (
	{ userId, postId }: { userId?: string; postId: string },
	supabase: SupabaseClient,
) => {
	const { data, error } = await supabase
		.from('posts')
		.select(SINGLE_POST_SCHEMA)
		.eq('my_interaction.user_id', userId)
		.eq('id', postId)
		.maybeSingle();

	if (error) throw error;

	return mapToDto(data, supabase);
};

export const getPostAnon = async (
	{ postId }: { userId?: string; postId: string },
	supabase: SupabaseClient,
) => {
	const { data, error } = await supabase
		.from('posts')
		.select(ANON_SINGLE_POST_SCHEMA)
		.eq('id', postId)
		.maybeSingle();

	if (error) throw error;

	return mapToDto(data, supabase);
};
