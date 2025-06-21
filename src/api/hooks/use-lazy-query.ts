import { useQuery, UseQueryOptions } from 'react-query';
import { queryClient } from '@/src/utils/query-client';

export const useLazyQuery = <TData>(
	options: UseQueryOptions<TData>,
	deps: string[],
) => {
	const query = useQuery<TData>({
		...options,
		queryKey: deps.join('-'),
		enabled: deps.filter((d) => !!d).length > 1,
	});

	return {
		...query,
		cancel: () => queryClient.cancelQueries(options.queryKey),
	};
};
