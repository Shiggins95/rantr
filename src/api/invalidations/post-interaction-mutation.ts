import { PostDto } from '@/src/types/posts.types';
import { queryClient } from '@/src/utils/query-client';

const applyNewValues = (
	post: PostDto,
	interactionType: 'delete' | 'create' | 'edit',
	direction: 'up' | 'down',
) => {
	let newObj: Partial<PostDto> = {};

	switch (interactionType) {
		case 'create':
			const accessKey = direction === 'up' ? 'upVotes' : 'downVotes';
			const existing = post[accessKey] || 0;
			newObj[accessKey] = existing + 1;
			break;
		case 'edit': {
			const directionToIncrease = direction;
			const directionToDecrease = directionToIncrease === 'up' ? 'down' : 'up';
			const directionToIncreaseKey = `${directionToIncrease}Votes` as
				| 'upVotes'
				| 'downVotes';
			const directionToDecreaseKey = `${directionToDecrease}Votes` as
				| 'upVotes'
				| 'downVotes';
			const existingValueToIncrease = post[directionToIncreaseKey] || 0;
			const existingValueToDecrease = post[directionToDecreaseKey] || 0;

			newObj[directionToDecreaseKey] = existingValueToDecrease - 1;
			newObj[directionToIncreaseKey] = existingValueToIncrease + 1;
			break;
		}
		case 'delete': {
			const accessKey = direction === 'up' ? 'upVotes' : 'downVotes';
			const existing = post[accessKey] || 0;
			newObj[accessKey] = existing - 1;
			break;
		}
	}

	return {
		...post,
		...newObj,
		myInteraction:
			interactionType !== 'delete' ? { direction: direction } : undefined,
	};
};

export const onSuccess = (interaction: {
	type: 'create' | 'edit' | 'delete';
	postId: string;
	direction: 'up' | 'down';
}) => {
	queryClient.setQueryData(
		['posts'],
		(oldData: { pages: PostDto[][] } | undefined): { pages: PostDto[][] } => {
			if (!oldData) return { pages: [] };

			return {
				...oldData,
				pages: oldData.pages.map((page) => {
					return page.map((post) => {
						if (post.id === interaction.postId) {
							return applyNewValues(
								post,
								interaction.type,
								interaction.direction,
							);
						}

						return post;
					}) as PostDto[];
				}),
			};
		},
	);
};
