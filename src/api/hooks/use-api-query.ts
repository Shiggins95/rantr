import { useQuery, UseQueryOptions } from 'react-query';
import { queryClient } from '@/src/utils/query-client';

export function useApiQuery<TData>(options: UseQueryOptions<TData>) {
	const query = useQuery<TData>(options);
	return {
		...query,
		cancel: () => queryClient.cancelQueries(options.queryKey),
	};
}
