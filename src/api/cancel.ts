import { queryClient } from '@/src/utils/query-client';

export const createCancel = (queryKey: string) => () => {
	void queryClient.cancelQueries(queryKey);
};
