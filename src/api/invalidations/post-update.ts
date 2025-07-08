import { PostDto } from '@/src/types/posts.types';
import { queryClient } from '@/src/utils/query-client';

export const onPostEditSuccess = (post: PostDto) => {
	queryClient.setQueryData(
		['posts'],
		(oldData: { pages: PostDto[][] } | undefined): { pages: PostDto[][] } => {
			if (!oldData) return { pages: [[post]] };

			return {
				...oldData,
				pages: oldData.pages.map((page) => {
					return page.map((p) => {
						if (p.id === post.id) return post;
						return p;
					});
				}),
			};
		},
	);

	queryClient.setQueryData(['post', post.id], () => {
		return post;
	});
};
