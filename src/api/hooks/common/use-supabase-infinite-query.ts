import {
	useInfiniteQuery,
	UseInfiniteQueryOptions,
	QueryKey,
} from 'react-query';
import { SupabaseClient } from '@supabase/supabase-js';
import {
	getSupabaseAnonymousClient,
	getSupabaseAuthenticatedClient,
} from '@/src/utils/supabase';
import { useAuthContext } from '@/src/context/auth-context';

type InfiniteQueryFn<TArgs, TResult> = (
	args: TArgs,
	supabase: SupabaseClient,
	pageParam?: unknown,
) => Promise<TResult>;

export function useSupabaseInfiniteQuery<TArgs, TResult>(
	key: QueryKey,
	queryFn: InfiniteQueryFn<TArgs, TResult>,
	args: TArgs,
	options?: UseInfiniteQueryOptions<TResult, Error, TResult, TResult, QueryKey>,
) {
	const { guestMode } = useAuthContext();
	let supabase: SupabaseClient;
	if (guestMode) {
		supabase = getSupabaseAnonymousClient();
	} else {
		supabase = getSupabaseAuthenticatedClient();
	}

	const query = useInfiniteQuery<TResult, Error, TResult, QueryKey>({
		queryKey: key,
		queryFn: ({ pageParam }) => queryFn(args, supabase, pageParam),
		...options,
	});

	const resetAndRefetch = async () => {
		query.remove();
		await query.refetch();
	};

	const flatData = query.data?.pages.flat();
	return {
		...query,
		resetAndRefetch,
		data: flatData,
	};
}
