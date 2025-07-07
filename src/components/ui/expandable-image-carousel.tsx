import { FullScreenImageCarousel } from '@/src/components/pages/shared/full-screen-image-carousel';
import { PostImageDto } from '@/src/types/post-images.types';
import { PostDto } from '@/src/types/posts.types';
import { ImageCarousel } from '@ui/image-carousel';
import { useMemo, useRef, useState } from 'react';
import { Pressable } from 'react-native';
import { ICarouselInstance } from 'react-native-reanimated-carousel';
import { View } from 'tamagui';

type ExpandableImageCarouselProps = {
	post: PostDto;
	renderType: 'feed' | 'post-full' | 'image-full';
};

type FullScreenPostImageProps = {
	images: PostImageDto[];
	open: boolean;
	startingIndex: number;
};

export const ExpandableImageCarousel = ({
	post,
	renderType,
}: ExpandableImageCarouselProps) => {
	const ref = useRef<ICarouselInstance>(null);
	const [fullScreenPostImageProps, setFullScreenPostImageProps] =
		useState<FullScreenPostImageProps>({
			open: false,
			images: [],
			startingIndex: 0,
		});

	const carousel = useMemo(() => {
		return (
			<View my="$md">
				{post.images.length > 0 && (
					<ImageCarousel
						ref={ref}
						renderType={renderType}
						images={post.images}
					/>
				)}
			</View>
		);
	}, [post.images]);

	const handlePress = () => {
		const currentIndex = ref.current?.getCurrentIndex();
		setFullScreenPostImageProps({
			open: true,
			images: post.images,
			startingIndex: currentIndex ?? 0,
		});
	};

	const handleClose = (endingIndex: number) => {
		if (endingIndex !== fullScreenPostImageProps.startingIndex) {
			ref.current?.scrollTo({
				index: endingIndex,
			});
		}
		setFullScreenPostImageProps({
			open: false,
			images: [],
			startingIndex: 0,
		});
	};

	return (
		<>
			<Pressable onPress={handlePress}>{carousel}</Pressable>
			<FullScreenImageCarousel
				resizeMode="contain"
				parallax={false}
				onOpenChange={handleClose}
				postId={post.id}
				images={fullScreenPostImageProps.images}
				open={fullScreenPostImageProps.open}
				startingIndex={fullScreenPostImageProps.startingIndex}
			/>
		</>
	);
};
