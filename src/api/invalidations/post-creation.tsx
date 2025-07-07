import { PostDto } from '@/src/types/posts.types';
import { queryClient } from '@/src/utils/query-client';

export const onPostCreateSuccess = (post: PostDto) => {
	queryClient.setQueryData(
		['posts'],
		(oldData: { pages: PostDto[][] } | undefined): { pages: PostDto[][] } => {
			if (!oldData) return { pages: [] };

			return {
				...oldData,
				pages: oldData.pages.map((page, index) => {
					if (index === 0) {
						return [post, ...page];
					}

					return page;
				}),
			};
		},
	);
};
