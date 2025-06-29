import { PostDto } from '@/src/types/posts.types';
import { useMemo } from 'react';
import { View } from 'tamagui';
import { PostHeader } from '@/src/components/pages/tabs/home/feed/posts/post-header';
import { Headline, HeadlineType } from '@ui/healine';
import { ImageCarousel } from '@ui/image-carousel';
import { Body, BodyType } from '@ui/body';
import { Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { PostInteractions } from '@/src/components/pages/tabs/home/feed/posts/post-interactions';

type PostProps = {
	post: PostDto;
};

export const Post = ({ post }: PostProps) => {
	const router = useRouter();

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

	return (
		<Pressable onPress={() => router.navigate(`/post-full/${post.id}`)}>
			<View
				f={1}
				px="$lg"
				py="$md"
				borderRadius="$l"
				bw={1}
				borderColor="$borderColor"
				bg="$background"
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
				<PostInteractions post={post} />
			</View>
		</Pressable>
	);
};
