import { useAuthContext } from '@/src/context/auth-context';
import {
	getSupabaseAnonymousClient,
	getSupabaseAuthenticatedClient,
} from '@/src/utils/supabase';
import { SupabaseClient } from '@supabase/supabase-js';
import {
	InfiniteData,
	useInfiniteQuery,
	UseInfiniteQueryOptions,
} from '@tanstack/react-query';

type InfiniteQueryFn<TArgs, TPage> = (
	args: TArgs,
	supabase: SupabaseClient,
	pageParam?: unknown,
) => Promise<TPage[]>;

export function useSupabaseInfiniteQuery<TArgs, TPage extends object>(
	key: readonly unknown[],
	queryFn: InfiniteQueryFn<TArgs, TPage>,
	args: TArgs,
	options: Omit<
		UseInfiniteQueryOptions<TPage[], Error, TPage[]>,
		'queryKey' | 'queryFn' | 'initialPageParam'
	>,
) {
	const { guestMode } = useAuthContext();
	const supabase = guestMode
		? getSupabaseAnonymousClient()
		: getSupabaseAuthenticatedClient();

	const wrappedQueryFn = ({ pageParam }: { pageParam?: unknown }) => {
		return queryFn(args, supabase, pageParam);
	};

	const query = useInfiniteQuery<TPage[], Error, TPage[]>({
		queryKey: key,
		queryFn: wrappedQueryFn,
		...options,
		initialPageParam: new Date().toISOString(),
	});

	const pages =
		(query.data as InfiniteData<TPage[], unknown> | undefined)?.pages ?? [];
	const flatData = pages.flat();

	return {
		...query,
		data: flatData,
	};
}
