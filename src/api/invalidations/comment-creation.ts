import { CommentDto } from '@/src/types/comments.types';
import { PostDto } from '@/src/types/posts.types';
import { queryClient } from '@/src/utils/query-client';

type OnSuccessArgs = { entity: CommentDto; depth: number };

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

export const onSuccessReplyCreate = ({ entity }: OnSuccessArgs) => {
	queryClient.setQueryData(
		['replies', entity.replyId],
		(
			oldData: { pages: CommentDto[][] } | undefined,
		): { pages: CommentDto[][]; pageParams?: unknown[] } => {
			const newItem = { ...entity, isLocal: true };
			if (!oldData)
				return { pages: [[newItem]], pageParams: [new Date().toISOString()] };

			return {
				...oldData,
				pages: oldData.pages.map((page, idx) => {
					if (idx === 0) {
						return [newItem, ...page];
					}
					return page;
				}),
			};
		},
	);
	invalidateRest(entity);
};

export const onSuccessCommentCreate = ({ entity, depth }: OnSuccessArgs) => {
	if (entity.replyId) {
		return onSuccessReplyCreate({ entity, depth });
	}

	queryClient.setQueryData(
		['comments', entity.postId],
		(
			oldData: { pages: CommentDto[][] } | undefined,
		): { pages: CommentDto[][]; pageParams?: unknown[] } => {
			const newItem = { ...entity, isLocal: true } as CommentDto;
			if (!oldData)
				return { pages: [[newItem]], pageParams: [new Date().toISOString()] };

			return {
				...oldData,
				pages: oldData.pages.map((page, idx) => {
					if (idx === 0) {
						return [newItem, ...page];
					}
					return page;
				}),
			};
		},
	);

	invalidateRest(entity);
};
