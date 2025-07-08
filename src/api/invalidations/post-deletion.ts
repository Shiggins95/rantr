import { PostDto } from '@/src/types/posts.types';
import { queryClient } from '@/src/utils/query-client';

export const onSuccessPostDeletion = (deletedPost: PostDto) => {
	queryClient.setQueryData(
		['posts'],
		(oldData: { pages: PostDto[][] } | undefined): { pages: PostDto[][] } => {
			if (!oldData) return { pages: [] };

			return {
				...oldData,
				pages: oldData.pages.map((page) => {
					return page.filter((p) => p.id !== deletedPost.id);
				}),
			};
		},
	);

	queryClient.setQueryData(['post', deletedPost.id], (): PostDto => {
		return deletedPost;
	});
};
