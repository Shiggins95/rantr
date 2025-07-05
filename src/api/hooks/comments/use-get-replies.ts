import { useSupabaseInfiniteQuery } from '@/src/api/hooks/common/use-supabase-infinite-query';
import {
	getAnonReplyComments,
	getReplyComments,
} from '@/src/api/methods/comments/get-reply-comments';
import { COMMENTS_PER_PAGE } from '@/src/constants/query';
import { useCurrentUser } from '@/src/context/auth-context';

type UseGetReplies = {
	commentId?: string;
	postId: string;
	enabled?: boolean;
};

export const useGetReplies = ({
	commentId,
	postId,
	enabled,
}: UseGetReplies) => {
	const currentUser = useCurrentUser();
	return useSupabaseInfiniteQuery(
		['replies', commentId],
		currentUser ? getReplyComments : getAnonReplyComments,
		{
			userId: currentUser?.id,
			postId,
			parentId: commentId as string,
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
