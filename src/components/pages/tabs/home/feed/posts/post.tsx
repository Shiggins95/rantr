import { PostDto } from '@/src/types/posts.types';
import { View } from 'tamagui';
import { PostCommentHeader } from '@/src/components/pages/tabs/home/feed/posts/post-comment-header';
import { Headline, HeadlineType } from '@ui/healine';
import { Body, BodyType } from '@ui/body';
import { Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { PostInteractions } from '@/src/components/pages/tabs/home/feed/posts/post-interactions';
import { PostTag } from '@/src/components/pages/tabs/home/feed/posts/post-tag';
import { ExpandableImageCarousel } from '@ui/expandable-image-carousel';

type PostProps = {
	post: PostDto;
};

export const Post = ({ post }: PostProps) => {
	const router = useRouter();
	const navigateToPost = (toComments?: boolean) => {
		router.navigate({
			pathname: `/(app)/(out-of-tabs)/post/[id]/post`,
			params: {
				id: post.id,
				toComments: toComments ? 'true' : 'false',
			},
		});
	};

	return (
		<>
			<Pressable onPress={() => navigateToPost(false)}>
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
					<PostCommentHeader user={post.user!} createdAt={post.createdAt} />
					<PostTag post={post} />
					<Headline variant={HeadlineType.h3Thin}>{post.title}</Headline>
					<ExpandableImageCarousel renderType="feed" post={post} />
					<Body variant={BodyType.small}>{post.content}</Body>
					<PostInteractions
						post={post}
						navigateToComments={() => navigateToPost(true)}
					/>
				</View>
			</Pressable>
		</>
	);
};
