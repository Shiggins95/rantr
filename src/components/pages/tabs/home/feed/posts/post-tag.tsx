import {
	getPostTypeBgColourFromPost,
	getPostTypeColourFromPost,
} from '@/src/utils/strings';
import { Body, BodyType } from '@ui/body';
import { View } from 'tamagui';
import { PostDto } from '@/src/types/posts.types';

type PostTagProps = {
	post: PostDto;
};

export const PostTag = ({ post }: PostTagProps) => {
	return (
		<View
			alignSelf="flex-start"
			px="$md"
			py="$xs"
			bg={getPostTypeBgColourFromPost(post)}
			mb="$md"
		>
			<Body c={getPostTypeColourFromPost(post)} variant={BodyType.small}>
				{post.type || 'OTHER'}
			</Body>
		</View>
	);
};
