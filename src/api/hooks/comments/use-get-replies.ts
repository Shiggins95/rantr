import { useSupabaseInfiniteQuery } from '@/src/api/hooks/common/use-supabase-infinite-query';
import {
	getAnonReplyComments,
	getReplyComments,
} from '@/src/api/methods/comments/get-reply-comments';
import { useCurrentUser } from '@/src/context/auth-context';

type UseGetReplies = {
	commentId?: string;
	postId: string;
	enabled?: boolean;
	filterByCommentId?: string;
};

export const useGetReplies = ({
	commentId,
	postId,
	enabled,
	filterByCommentId,
}: UseGetReplies) => {
	const currentUser = useCurrentUser();
	const query = useSupabaseInfiniteQuery(
		['replies', commentId],
		currentUser ? getReplyComments : getAnonReplyComments,
		{
			userId: currentUser?.id,
			postId,
			parentId: commentId as string,
		},
		{
			enabled,
			getNextPageParam: (lastPage) => {
				if (lastPage.length === 0) return undefined;
				return lastPage[lastPage.length - 1].createdAt.toISOString();
			},
		},
	);

	let data = query.data;

	if (filterByCommentId) {
		data = data.filter((d) => d.id === filterByCommentId);
	}

	return {
		...query,
		data,
	};
};
