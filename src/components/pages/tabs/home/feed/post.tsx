import { PostDto } from '@/src/types/posts.types';
import { useMemo, useState } from 'react';
import { View } from 'tamagui';
import { PostHeader } from '@/src/components/pages/tabs/home/feed/post-header';
import { Headline, HeadlineType } from '@ui/healine';
import { ImageCarousel } from '@ui/image-carousel';
import { Body, BodyType } from '@ui/body';
import { Button } from '@ui/button';
import { ChevronDown, ChevronUp, MessageSquare } from '@tamagui/lucide-icons';
import { useSupabaseMutation } from '@/src/api/hooks/use-supabase-mutation';
import { createPostInteraction } from '@/src/api/methods/posts/create-post-interaction';
import { editPostInteraction } from '@/src/api/methods/posts/edit-post-interaction';
import { useCurrentUser } from '@/src/context/auth-context';
import { deletePostInteraction } from '@/src/api/methods/posts/delete-post-interaction';

type PostProps = {
	post: PostDto;
};

export const Post = ({ post }: PostProps) => {
	const [totalVotes, setTotalVotes] = useState(
		Math.abs(post.upVotes) - Math.abs(post.downVotes),
	);
	const [commentCount, setCommentCount] = useState(post.commentCount);
	console.log('commentcount', commentCount);
	const [myInteraction, setMyInteraction] = useState(
		post.myInteraction?.direction,
	);

	const { mutateAsync: createInteraction } = useSupabaseMutation(
		createPostInteraction,
	);
	const { mutateAsync: editInteraction } =
		useSupabaseMutation(editPostInteraction);
	const { mutateAsync: deleteInteraction } = useSupabaseMutation(
		deletePostInteraction,
	);
	const currentUser = useCurrentUser();

	const colour = useMemo(() => {
		let colour: '$rantTagText' | '$adviceTagText' | '$otherTagText' | '$lime' =
			'$lime';
		switch (post.type) {
			case 'RANT':
				colour = '$rantTagText';
				break;
			case 'ADVICE':
				colour = '$adviceTagText';
				break;
			case 'OTHER':
				colour = '$otherTagText';
				break;
			default:
				break;
		}

		return colour;
	}, [post.type]);

	const handleDeleteInteraction = async () => {
		await deleteInteraction({
			userId: currentUser?.id || '',
			postId: post.id,
		});

		// TODO - voting not working. Up voting multiple times in a row making negative numbers go down down down

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
		try {
			if (!myInteraction) {
				console.log('creating');
				await handleCreateInteraction(direction);
				return;
			}

			if (direction === myInteraction) {
				console.log('deleting');
				await handleDeleteInteraction();
				return;
			}

			console.log('editing', post.id);
			await handleEditInteraction(direction);
		} catch (e) {
			console.log('error', e);
		}
	};

	return (
		<View
			f={1}
			px="$lg"
			py="$md"
			borderRadius="$l"
			bw={1}
			borderColor="$borderColor"
			bg="$background15"
			marginHorizontal="$md"
		>
			<PostHeader post={post} />
			<Headline variant={HeadlineType.h3Thin} c={colour}>
				{post.title}
			</Headline>
			<View my="$md">
				{post.images.length > 0 && <ImageCarousel images={post.images} />}
			</View>
			<Body variant={BodyType.small}>{post.content}</Body>
			<View fd="row" alignItems="center" pt="$sm">
				<Button variant="ghost" onPress={() => handleInteraction('up')}>
					<ChevronUp
						size="$md"
						c={myInteraction === 'up' ? '$primary' : undefined}
					/>
				</Button>
				<Body
					variant={BodyType.small}
					c={
						myInteraction === 'up' || totalVotes > 0
							? '$primary'
							: myInteraction === 'down' || totalVotes <= 0
								? '$accent'
								: '$text'
					}
				>
					{totalVotes}
				</Body>
				<Button variant="ghost" onPress={() => handleInteraction('down')}>
					<ChevronDown
						size="$md"
						c={myInteraction === 'down' ? '$accent' : undefined}
					/>
				</Button>
				<Button variant="ghost" fd="row" p="$sm">
					<MessageSquare size="$md" />
					<Body variant={BodyType.small}>{commentCount}</Body>
				</Button>
			</View>
		</View>
	);
};
