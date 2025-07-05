import { useSupabaseInfiniteQuery } from '@/src/api/hooks/common/use-supabase-infinite-query';
import {
	getAnonRootComments,
	getRootComments,
} from '@/src/api/methods/comments/get-root-comments';
import { useCurrentUser } from '@/src/context/auth-context';

type UseGetComments = {
	postId: string;
	enabled?: boolean;
};

export const useGetComments = ({ postId, enabled }: UseGetComments) => {
	const currentUser = useCurrentUser();
	return useSupabaseInfiniteQuery(
		['comments', postId],
		currentUser ? getRootComments : getAnonRootComments,
		{
			userId: currentUser?.id,
			postId: postId as string,
		},
		{
			enabled,
			getNextPageParam: (lastPage) => {
				if (lastPage.length === 0) return undefined;
				return lastPage[lastPage.length - 1].createdAt.toISOString();
			},
		},
	);
};
