import {
	ANON_MULTI_POSTS_SCHEMA,
	MULTI_POSTS_SCHEMA,
} from '@/src/api/schemas/posts.schema';
import { POSTS_PER_PAGE } from '@/src/constants/query';
import { LocationResponse } from '@/src/context/location-context';
import { mapToDtos } from '@/src/types/posts.types';
import { getBoundingBox } from '@/src/utils/distance';
import { SupabaseClient } from '@supabase/supabase-js';

export const getPosts = async (
	{ userId, location }: { userId?: string; location: LocationResponse },
	supabase: SupabaseClient,
	lastCursor: unknown = new Date().toISOString(),
) => {
	let query = supabase
		.from('posts')
		.select(MULTI_POSTS_SCHEMA)
		.lt('created_at', lastCursor)
		.eq('my_interaction.user_id', userId)
		.eq('deleted', false)
		.order('created_at', { ascending: false })
		.limit(POSTS_PER_PAGE);

	if (location.status === 'granted') {
		const { maxLat, maxLng, minLat, minLng } = getBoundingBox(
			location.lat,
			location.lng,
			20,
		);

		query = query
			.lt('lat', maxLat)
			.gt('lat', minLat)
			.lt('lng', maxLng)
			.gt('lng', minLng);
	}

	const { data, error } = await query;

	if (error) throw error;

	return mapToDtos(data, supabase);
};

export const getAnonPosts = async (
	{ location }: { userId?: string; location: LocationResponse },
	supabase: SupabaseClient,
	lastCursor: unknown = new Date().toISOString(),
) => {
	let query = supabase
		.from('posts')
		.select(ANON_MULTI_POSTS_SCHEMA)
		.lt('created_at', lastCursor)
		.order('created_at', { ascending: false })
		.eq('deleted', false)
		.limit(POSTS_PER_PAGE);

	if (location.status === 'granted') {
		const { maxLat, maxLng, minLat, minLng } = getBoundingBox(
			location.lat,
			location.lng,
			20,
		);

		query = query
			.lt('lat', maxLat)
			.gt('lat', minLat)
			.lt('lng', maxLng)
			.gt('lng', minLng);
	}

	const { data, error } = await query;

	if (error) throw error;

	return mapToDtos(data, supabase);
};
