import { PostDto } from '@/src/types/posts.types';
import { View } from 'tamagui';
import { PostCommentHeader } from '@/src/components/pages/tabs/home/feed/posts/post-comment-header';
import { Headline, HeadlineType } from '@ui/healine';
import { ImageCarousel } from '@ui/image-carousel';
import { Body, BodyType } from '@ui/body';
import { Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { PostInteractions } from '@/src/components/pages/tabs/home/feed/posts/post-interactions';
import { PostTag } from '@/src/components/pages/tabs/home/feed/posts/post-tag';

type PostProps = {
	post: PostDto;
};

export const Post = ({ post }: PostProps) => {
	const router = useRouter();

	return (
		<Pressable
			onPress={() =>
				router.navigate(`/(app)/(out-of-tabs)/post/${post.id}/post`)
			}
		>
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
				<View my="$md">
					{post.images.length > 0 && <ImageCarousel images={post.images} />}
				</View>
				<Body variant={BodyType.small}>{post.content}</Body>
				<PostInteractions post={post} />
			</View>
		</Pressable>
	);
};
