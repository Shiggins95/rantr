import { SupabaseClient } from '@supabase/supabase-js';
import { getSupabaseAuthenticatedClient } from '@/src/utils/supabase';
import { useMutation, UseMutationOptions } from 'react-query';

type MutationFn<TArgs, TResult> = (
	args: TArgs,
	supabase: SupabaseClient
) => Promise<TResult>;

export function useSupabaseMutation<TArgs, TResult>(
	mutationFn: MutationFn<TArgs, TResult>,
	options?: UseMutationOptions<TResult, Error, TArgs>
) {

	const supabase = getSupabaseAuthenticatedClient();

	return useMutation<TResult, Error, TArgs>({
		mutationFn: async (args: TArgs) => {
			return mutationFn(args, supabase);
		},
		...options,
	});
}
