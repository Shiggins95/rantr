import { SupabaseClient } from '@supabase/supabase-js';
import {
	getSupabaseAnonymousClient,
	getSupabaseAuthenticatedClient,
} from '@/src/utils/supabase';
import { useMutation, UseMutationOptions } from 'react-query';
import { useAuthContext } from '@/src/context/auth-context';

type MutationFn<TArgs, TResult> = (
	args: TArgs,
	supabase: SupabaseClient,
) => Promise<TResult>;

export function useSupabaseMutation<TArgs, TResult>(
	mutationFn: MutationFn<TArgs, TResult>,
	options?: UseMutationOptions<TResult, Error, TArgs>,
) {
	const { guestMode } = useAuthContext();
	let supabase: SupabaseClient;
	if (guestMode) {
		supabase = getSupabaseAnonymousClient();
	} else {
		supabase = getSupabaseAuthenticatedClient();
	}

	return useMutation<TResult, Error, TArgs>({
		mutationFn: async (args: TArgs) => {
			return mutationFn(args, supabase);
		},
		...options,
	});
}
