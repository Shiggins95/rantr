import { PostCommentHeader } from '@/src/components/pages/tabs/home/feed/posts/post-comment-header';
import { PostInteractions } from '@/src/components/pages/tabs/home/feed/posts/post-interactions';
import { PostTag } from '@/src/components/pages/tabs/home/feed/posts/post-tag';
import { useCurrentUser } from '@/src/context/auth-context';
import { PostDto } from '@/src/types/posts.types';
import { Flag, Pencil } from '@tamagui/lucide-icons';
import { Body, BodyType } from '@ui/body';
import { ExpandableImageCarousel } from '@ui/expandable-image-carousel';
import { Headline, HeadlineType } from '@ui/healine';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { Pressable } from 'react-native';
import { Text, View } from 'tamagui';

type PostProps = {
	post: PostDto;
};

export const Post = ({ post }: PostProps) => {
	const router = useRouter();
	const currentUser = useCurrentUser();
	const navigateToPost = () => {
		router.navigate({
			pathname: `/(app)/(out-of-tabs)/post/[id]/post`,
			params: {
				id: post.id,
			},
		});
	};

	const postCommentOptions = useMemo(() => {
		if (!currentUser) return [];
		const baseOptions = [];

		if (currentUser.id === post.userId) {
			baseOptions.push({
				label: 'Edit',
				icon: <Pencil size="$size.md" c="$primary" />,
				onPress: () => console.info('edit'),
			});
		} else {
			baseOptions.push({
				label: 'Report',
				onPress: () => console.info('report'),
				icon: <Flag size="$size.md" c="$primary" />,
			});
		}

		return baseOptions;
	}, [currentUser, post]);

	return (
		<>
			<Pressable onPress={navigateToPost}>
				<View
					f={1}
					px="$md"
					py="$md"
					borderRadius="$l"
					bw={1}
					bg="$background"
					borderColor="$primary30"
					marginHorizontal="$md"
				>
					<PostCommentHeader
						user={post.user!}
						createdAt={post.createdAt}
						contextOptions={postCommentOptions}
						entityId={post.id}
						showDelete
						type="post"
					/>
					<PostTag post={post} />
					<Text>
						<Headline variant={HeadlineType.h3Thin}>
							{post.title.truncate(100)}
						</Headline>
						{post.title.length > 100 && (
							<>
								{'    '}
								<Body
									textDecorationLine="underline"
									c="$primary"
									variant={BodyType.small}
								>
									see more
								</Body>
							</>
						)}
					</Text>
					<ExpandableImageCarousel renderType="feed" post={post} />
					<Text>
						<Body variant={BodyType.small}>{post.content.truncate(200)}</Body>
						{post.title.length > 50 && (
							<>
								{'    '}
								<Body
									textDecorationLine="underline"
									c="$primary"
									variant={BodyType.extraSmall}
								>
									see more
								</Body>
							</>
						)}
					</Text>
					<PostInteractions
						item={post}
						type="post"
						onCommentButtonPress={navigateToPost}
					/>
				</View>
			</Pressable>
		</>
	);
};
