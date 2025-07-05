import { CommentDto } from '@/src/types/comments.types';
import { queryClient } from '@/src/utils/query-client';

export const onSuccessCommentCreate = (comment: CommentDto) => {
	queryClient.setQueryData(
		['comments', comment.postId],
		(
			oldData: { pages: CommentDto[][] } | undefined,
		): { pages: CommentDto[][] } => {
			if (!oldData) return { pages: [] };

			return {
				...oldData,
				pages: oldData.pages.map((page, idx) => {
					if (idx === 0) {
						return [{ ...comment, isLocal: true }, ...page];
					}
					return page;
				}),
			};
		},
	);
};
