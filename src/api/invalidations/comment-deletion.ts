import { CommentDto } from '@/src/types/comments.types';
import { PostDto } from '@/src/types/posts.types';
import { queryClient } from '@/src/utils/query-client';

const invalidateRest = (comment: CommentDto) => {
	queryClient.setQueryData(
		['posts'],
		(oldData: { pages: PostDto[][] } | undefined): { pages: PostDto[][] } => {
			if (!oldData) return { pages: [] };

			return {
				...oldData,
				pages: oldData.pages.map((page) => {
					return page.map((post) => {
						if (post.id === comment.postId) {
							return {
								...post,
								commentCount: (post.commentCount || 0) - 1,
							};
						}

						return post;
					});
				}),
			};
		},
	);

	queryClient.setQueryData(
		['post', comment.postId],
		(oldData: PostDto): PostDto => {
			if (!oldData) return oldData;

			return {
				...oldData,
				commentCount: (oldData.commentCount || 0) - 1,
			};
		},
	);
};

export const onSuccessDeleteReply = (deletedComment: CommentDto) => {
	queryClient.setQueryData(
		['replies', deletedComment.replyId],
		(
			oldData: { pages: CommentDto[][] } | undefined,
		): { pages: CommentDto[][] } => {
			if (!oldData) return { pages: [] };

			return {
				...oldData,
				pages: oldData.pages.map((page) => {
					return page.map((c) =>
						c.id === deletedComment.id ? deletedComment : c,
					);
				}),
			};
		},
	);
	invalidateRest(deletedComment);
};

export const onSuccessDeleteComment = (deletedComment: CommentDto) => {
	if (deletedComment.replyId) {
		return onSuccessDeleteReply(deletedComment);
	}

	queryClient.setQueryData(
		['comments', deletedComment.postId],
		(
			oldData: { pages: CommentDto[][] } | undefined,
		): { pages: CommentDto[][]; pageParams?: unknown[] } => {
			if (!oldData)
				return {
					pages: [[deletedComment]],
					pageParams: [new Date().toISOString()],
				};

			return {
				...oldData,
				pages: oldData.pages.map((page) => {
					return page.map((c) =>
						c.id === deletedComment.id ? deletedComment : c,
					);
				}),
			};
		},
	);

	invalidateRest(deletedComment);
};
