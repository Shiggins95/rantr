import { CommentDto } from '@/src/types/comments.types';
import { PostDto } from '@/src/types/posts.types';
import { queryClient } from '@/src/utils/query-client';

const applyNewValues = (
	post: PostDto | CommentDto,
	interactionType: 'delete' | 'create' | 'edit',
	direction: 'up' | 'down',
) => {
	let newObj: Partial<PostDto | CommentDto> = {};

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
	entityId: string;
	direction: 'up' | 'down';
	tableType: 'post' | 'comment' | 'reply';
}) => {
	let queryKey: unknown[];
	switch (interaction.tableType) {
		case 'post':
			queryKey = ['posts'];
			break;
		case 'comment':
			queryKey = ['comments', interaction.entityId];
			break;
		case 'reply':
			queryKey = ['replies', interaction.entityId];
			break;
	}
	queryClient.setQueryData(
		queryKey,
		(
			oldData: { pages: (PostDto | CommentDto)[][] } | undefined,
		): { pages: (PostDto | CommentDto)[][] } => {
			if (!oldData) return { pages: [] };

			return {
				...oldData,
				pages: oldData.pages.map((page) => {
					return page.map((entity) => {
						if (entity.id === interaction.entityId) {
							return applyNewValues(
								entity,
								interaction.type,
								interaction.direction,
							);
						}

						return entity;
					}) as PostDto[];
				}),
			};
		},
	);

	if (interaction.tableType === 'post') {
		queryClient.setQueryData(
			['post', interaction.entityId],
			(oldData: PostDto): PostDto => {
				if (!oldData) return oldData;

				return applyNewValues(
					oldData,
					interaction.type,
					interaction.direction,
				) as PostDto;
			},
		);
	}
};
