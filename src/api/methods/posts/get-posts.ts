import {
	ANON_MULTI_POSTS_SCHEMA,
	MULTI_POSTS_SCHEMA,
} from '@/src/api/schemas/posts.schema';
import { CameraEdges } from '@/src/components/pages/search/search.types';
import { POSTS_PER_PAGE } from '@/src/constants/query';
import { LocationResponse } from '@/src/context/location-context';
import { mapToDtos } from '@/src/types/posts.types';
import { getBoundingBox } from '@/src/utils/distance';
import { SupabaseClient } from '@supabase/supabase-js';

const applyLocationFilter = (
	query: any,
	location?: LocationResponse,
	locationBox?: CameraEdges,
) => {
	if (locationBox) {
		query = query
			.gte('lat', locationBox.south)
			.lte('lat', locationBox.north)
			.gte('lng', locationBox.west)
			.lte('lng', locationBox.east);

		return query;
	}

	if (location && location?.status === 'granted') {
		const { minLat, minLng, maxLat, maxLng } = getBoundingBox(
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

	return query;
};

export const getPosts = async (
	{
		userId,
		location,
		locationBox,
		limit,
	}: {
		userId?: string;
		location?: LocationResponse;
		locationBox?: CameraEdges;
		limit?: number;
	},
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
		.limit(limit ?? POSTS_PER_PAGE);

	query = applyLocationFilter(query, location, locationBox);

	const { data, error } = await query;

	if (error) throw error;

	return mapToDtos(data, supabase);
};

export const getAnonPosts = async (
	{
		location,
		locationBox,
		limit,
	}: {
		userId?: string;
		location?: LocationResponse;
		locationBox?: CameraEdges;
		limit?: number;
	},
	supabase: SupabaseClient,
	lastCursor: unknown = new Date().toISOString(),
) => {
	let query = supabase
		.from('posts')
		.select(ANON_MULTI_POSTS_SCHEMA)
		.lt('created_at', lastCursor)
		.order('created_at', { ascending: false })
		.eq('deleted', false)
		.limit(limit ?? POSTS_PER_PAGE);

	query = applyLocationFilter(query, location, locationBox);

	const { data, error } = await query;

	if (error) throw error;

	return mapToDtos(data, supabase);
};
