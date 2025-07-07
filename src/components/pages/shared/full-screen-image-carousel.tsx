import { Colours } from '@/src/constants/colours';
import { HEADER_HEIGHT, spacing } from '@/src/constants/spacing';
import { PostImageDto } from '@/src/types/post-images.types';
import { useColorScheme } from '@hooks/useColorScheme';
import { Trash, X } from '@tamagui/lucide-icons';
import { ImageCarousel } from '@ui/image-carousel';
import { ImageContentFit } from 'expo-image';
import { useMemo, useRef } from 'react';
import { Dimensions, Pressable, StyleSheet } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { ICarouselInstance } from 'react-native-reanimated-carousel';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dialog, View, XStack } from 'tamagui';

type FullScreenImageCarouselProps = {
	postId: string;
	images: PostImageDto[];
	open: boolean;
	onOpenChange: (endingIndex: number) => void;
	startingIndex?: number;
	parallax?: boolean;
	showRemoveButton?: boolean;
	onRemove?: (index: number) => void;
	resizeMode?: ImageContentFit;
};

export const FullScreenImageCarousel = ({
	images,
	postId,
	open,
	onOpenChange,
	startingIndex,
	parallax = true,
	showRemoveButton = false,
	onRemove,
	resizeMode,
}: FullScreenImageCarouselProps) => {
	const ref = useRef<ICarouselInstance | null>(null);
	const { width, height } = Dimensions.get('window');
	const { top } = useSafeAreaInsets();
	const opacity = useSharedValue(1);
	const theme = useColorScheme() ?? 'dark';
	const styles = useStyles();
	const animatedStyle = useAnimatedStyle(() => {
		return {
			opacity: opacity.value,
			height: top + HEADER_HEIGHT,
			width,
			paddingTop: top,
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			zIndex: 100,
			backgroundColor: Colours[theme].background40,
			marginLeft: spacing.md,
		};
	});

	const hideHeader = () => {
		opacity.value = withTiming(opacity.value === 1 ? 0 : 1, {
			duration: 250,
		});
	};

	const onClose = () => {
		const currentIndex = ref.current?.getCurrentIndex();
		onOpenChange(currentIndex || 0);
	};

	const handleRemove = () => {
		const currentImageIndex = ref.current?.getCurrentIndex() || 0;
		onRemove?.(currentImageIndex);
	};

	const carousel = useMemo(() => {
		return (
			<ImageCarousel
				mode={images.length > 1 && parallax ? 'parallax' : undefined}
				height={height - spacing.md * 2}
				width={width}
				renderType="image-full"
				images={images}
				onClose={onClose}
				onSingleTap={hideHeader}
				dotContainerStyle={styles.dotContainer}
				startingIndex={startingIndex}
				ref={ref}
				resizeMode={resizeMode}
			/>
		);
	}, [images, resizeMode, parallax, startingIndex]);

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<Dialog.Portal>
				<Dialog.Overlay key={postId} />
				<Dialog.Content>
					<Animated.View style={animatedStyle}>
						<XStack jc="space-between" px="$md">
							<Pressable onPress={onClose}>
								<X size="$xl" c="$primary" />
							</Pressable>
							{showRemoveButton && (
								<Pressable onPress={handleRemove}>
									<Trash size="$xl" c="$danger" />
								</Pressable>
							)}
						</XStack>
					</Animated.View>
					<View>{carousel}</View>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog>
	);
};

const useStyles = () => {
	const { bottom } = useSafeAreaInsets();
	return StyleSheet.create({
		dotContainer: {
			position: 'absolute',
			bottom: bottom + spacing.md,
		},
	});
};
