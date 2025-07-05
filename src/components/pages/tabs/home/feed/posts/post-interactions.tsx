import { useSupabaseMutation } from '@/src/api/hooks/common/use-supabase-mutation';
import { onSuccess } from '@/src/api/invalidations/post-interaction-mutation';
import { createPostInteraction } from '@/src/api/methods/posts/create-post-interaction';
import { deletePostInteraction } from '@/src/api/methods/posts/delete-post-interaction';
import { editPostInteraction } from '@/src/api/methods/posts/edit-post-interaction';
import { useAuthContext } from '@/src/context/auth-context';
import { PostDto } from '@/src/types/posts.types';
import { formatVoteCount } from '@/src/utils/numbers';
import { ChevronDown, ChevronUp, MessageSquare } from '@tamagui/lucide-icons';
import { useToastController } from '@tamagui/toast';
import { Body, BodyType } from '@ui/body';
import { Button } from '@ui/button';
import { useEffect, useMemo, useState } from 'react';
import { View } from 'tamagui';

type PostInteractionsProps = {
	post: PostDto;
	isFullPage?: boolean;
	navigateToComments?: () => void;
};

export const PostInteractions = ({
	post,
	isFullPage,
	navigateToComments,
}: PostInteractionsProps) => {
	// region state variables
	const upVotes = Math.abs(post.upVotes);
	const downVotes = Math.abs(post.downVotes);
	const myInteractionDirection = post.myInteraction?.direction;
	const [totalVotes, setTotalVotes] = useState(upVotes - downVotes);
	const [commentCount, setCommentCount] = useState(post.commentCount);
	const [myInteraction, setMyInteraction] = useState(myInteractionDirection);

	const { guestMode, user: currentUser } = useAuthContext();
	const toast = useToastController();
	// endregion

	// region mutations
	const { mutateAsync: createInteraction } = useSupabaseMutation(
		createPostInteraction,
		{ onSuccess },
	);
	const { mutateAsync: editInteraction } = useSupabaseMutation(
		editPostInteraction,
		{ onSuccess },
	);
	const { mutateAsync: deleteInteraction } = useSupabaseMutation(
		deletePostInteraction,
		{ onSuccess },
	);
	// endregion

	// region methods
	const handleDeleteInteraction = async (direction: 'up' | 'down') => {
		await deleteInteraction({
			userId: currentUser?.id || '',
			postId: post.id,
			direction,
		});

		const multiplier = myInteraction === 'up' ? -1 : 1;
		setTotalVotes((prev) => prev + multiplier);
		setMyInteraction(undefined);
	};

	const handleEditInteraction = async (direction: 'up' | 'down') => {
		await editInteraction({
			direction,
			userId: currentUser?.id || '',
			postId: post.id,
		});

		const multiplier = direction === 'up' ? 2 : -2;
		setTotalVotes((prev) => prev + multiplier);

		setMyInteraction(direction);
	};
	const handleCreateInteraction = async (direction: 'up' | 'down') => {
		await createInteraction({
			direction,
			userId: currentUser?.id || '',
			postId: post.id,
		});
		const multiplier = direction === 'up' ? 1 : -1;
		setTotalVotes((prev) => prev + multiplier);
		setMyInteraction(direction);
	};

	const handleInteraction = async (direction: 'up' | 'down') => {
		if (guestMode) {
			toast.show('Please sign in to interact with posts', {
				message: 'You must be signed in to interact with posts',
				duration: 1500,
				type: 'warning',
				viewportName: 'top-toast',
			});
			return;
		}
		try {
			if (!myInteraction) {
				await handleCreateInteraction(direction);
				return;
			}

			if (direction === myInteraction) {
				await handleDeleteInteraction(direction);
				return;
			}

			await handleEditInteraction(direction);
		} catch (e) {
			console.log('error', e);
		}
	};
	// endregion

	// region memos
	const voteCountColour = useMemo(() => {
		if (myInteraction) {
			return myInteraction === 'up' ? '$primary' : '$accent';
		}

		return '$textMuted';
	}, [totalVotes, myInteraction]);
	// endregion

	// endregion useEffects
	useEffect(() => {
		// this feels super fucking dirty, but it's the best way to handle it when the post changes e.g. if the queries are invalidated
		setMyInteraction(myInteractionDirection);
		setTotalVotes(upVotes - downVotes);
		setCommentCount(post.commentCount);
	}, [post]);
	// endregion

	return (
		<View fd="row" alignItems="center" pt="$sm">
			<Button
				variant="ghost"
				onPress={() => handleInteraction('up')}
				paddingLeft={0}
			>
				<ChevronUp
					size="$md"
					c={myInteraction === 'up' ? '$primary' : '$color.textMuted'}
				/>
			</Button>
			<Body variant={BodyType.smallMonospace} c={voteCountColour}>
				{formatVoteCount(totalVotes)}
			</Body>
			<Button variant="ghost" onPress={() => handleInteraction('down')}>
				<ChevronDown
					size="$md"
					c={myInteraction === 'down' ? '$accent' : '$color.textMuted'}
				/>
			</Button>
			{!isFullPage ? (
				<Button variant="ghost" fd="row" p="$sm" onPress={navigateToComments}>
					<MessageSquare size="$md" c="$color.textMuted" />
					<Body c="$textMuted" variant={BodyType.smallMonospace}>
						{commentCount}
					</Body>
				</Button>
			) : (
				<View fd="row" p="$sm" gap="$sm">
					<MessageSquare size="$md" c="$color.textMuted" />
					<Body c="$textMuted" variant={BodyType.smallMonospace}>
						{commentCount}
					</Body>
				</View>
			)}
		</View>
	);
};
