import { useSupabaseInfiniteQuery } from '@/src/api/hooks/common/use-supabase-infinite-query';
import {
	getAnonRootComments,
	getRootComments,
} from '@/src/api/methods/comments/get-root-comments';
import { COMMENTS_PER_PAGE } from '@/src/constants/query';
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
			getNextPageParam: (lastPage, allPages) => {
				return lastPage?.length === COMMENTS_PER_PAGE
					? allPages.length * COMMENTS_PER_PAGE
					: undefined;
			},
		},
	);
};
