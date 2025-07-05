import { useAuthContext } from '@/src/context/auth-context';
import {
	getSupabaseAnonymousClient,
	getSupabaseAuthenticatedClient,
} from '@/src/utils/supabase';
import { SupabaseClient } from '@supabase/supabase-js';
import {
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
		'queryKey' | 'queryFn'
	>,
) {
	const { guestMode } = useAuthContext();
	const supabase = guestMode
		? getSupabaseAnonymousClient()
		: getSupabaseAuthenticatedClient();

	const wrappedQueryFn = ({ pageParam }: { pageParam?: unknown }) => {
		return queryFn(args, supabase, pageParam);
	};

	return useInfiniteQuery<TPage[], Error, TPage[]>({
		queryKey: key,
		queryFn: wrappedQueryFn,
		...options,
		initialPageParam: 0,
	});
}
