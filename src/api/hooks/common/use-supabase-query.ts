import { useAuthContext } from '@/src/context/auth-context';
import {
	getSupabaseAnonymousClient,
	getSupabaseAuthenticatedClient,
} from '@/src/utils/supabase';
import { SupabaseClient } from '@supabase/supabase-js';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';

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
	const { guestMode } = useAuthContext();
	let supabase: SupabaseClient;
	if (guestMode) {
		supabase = getSupabaseAnonymousClient();
	} else {
		supabase = getSupabaseAuthenticatedClient();
	}

	return useQuery<TResult, Error>({
		queryKey: key,
		queryFn: () => queryFn(args, supabase),
		...options,
	});
}
