import { CommentDto } from '@/src/types/comments.types';
import { PostDto } from '@/src/types/posts.types';
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
								commentCount: (post.commentCount || 0) + 1,
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
				commentCount: (oldData.commentCount || 0) + 1,
			};
		},
	);
};
