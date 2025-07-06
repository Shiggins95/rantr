import { CommentDto } from '@/src/types/comments.types';
import { queryClient } from '@/src/utils/query-client';

export const onSuccessCommentEdit = (comment: CommentDto) => {
	const queryKey = comment.replyId
		? ['replies', comment.replyId]
		: ['comments', comment.postId];

	queryClient.setQueryData(
		queryKey,
		(
			oldData: { pages: CommentDto[][] } | undefined,
		): { pages: CommentDto[][]; pageParams?: unknown[] } => {
			const newItem = { ...comment, isLocal: true } as CommentDto;
			if (!oldData)
				return { pages: [[newItem]], pageParams: [new Date().toISOString()] };

			return {
				...oldData,
				pages: oldData.pages.map((page) => {
					return page.map((item) => {
						if (item.id === comment.id) {
							return newItem;
						}
						return item;
					});
				}),
			};
		},
	);
};
