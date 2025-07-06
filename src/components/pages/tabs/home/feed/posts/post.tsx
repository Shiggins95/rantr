import { PostCommentHeader } from '@/src/components/pages/tabs/home/feed/posts/post-comment-header';
import { PostInteractions } from '@/src/components/pages/tabs/home/feed/posts/post-interactions';
import { PostTag } from '@/src/components/pages/tabs/home/feed/posts/post-tag';
import { PostDto } from '@/src/types/posts.types';
import { Body, BodyType } from '@ui/body';
import { ExpandableImageCarousel } from '@ui/expandable-image-carousel';
import { Headline, HeadlineType } from '@ui/healine';
import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';
import { Text, View } from 'tamagui';

type PostProps = {
	post: PostDto;
};

export const Post = ({ post }: PostProps) => {
	const router = useRouter();
	const navigateToPost = () => {
		router.navigate({
			pathname: `/(app)/(out-of-tabs)/post/[id]/post`,
			params: {
				id: post.id,
			},
		});
	};

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
						contextOptions={[
							{ label: 'Report', onPress: () => console.log('report') },
						]}
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
