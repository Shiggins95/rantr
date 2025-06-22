import { useQuery, UseQueryOptions, QueryKey } from 'react-query';
import { SupabaseClient } from '@supabase/supabase-js';
import { getSupabaseAuthenticatedClient } from '@/src/utils/supabase';

type QueryFn<TArgs, TResult> = (
	args: TArgs,
	supabase: SupabaseClient,
) => Promise<TResult>;

export function useSupabaseQuery<TArgs, TResult>(
	key: QueryKey,
	queryFn: QueryFn<TArgs, TResult>,
	args: TArgs,
	options?: UseQueryOptions<TResult, Error>,
) {
	const supabase = getSupabaseAuthenticatedClient();

	return useQuery<TResult, Error>({
		queryKey: key,
		queryFn: () => queryFn(args, supabase),
		...options,
	});
}
