import { ImageCarousel } from '@ui/image-carousel';
import { Dialog, View, XStack } from 'tamagui';
import { PostImageDto } from '@/src/types/post-images.types';
import { Dimensions, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HEADER_HEIGHT, spacing } from '@/src/constants/spacing';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { useMemo, useRef } from 'react';
import { X } from '@tamagui/lucide-icons';
import { Colours } from '@/src/constants/colours';
import { useColorScheme } from '@hooks/useColorScheme';
import { ICarouselInstance } from 'react-native-reanimated-carousel';

type FullScreenImageCarouselProps = {
	postId: string;
	images: PostImageDto[];
	open: boolean;
	onOpenChange: (endingIndex: number) => void;
	startingIndex?: number;
};

export const FullScreenImageCarousel = ({
	images,
	postId,
	open,
	onOpenChange,
	startingIndex,
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
			paddingLeft: spacing.md,
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

	const carousel = useMemo(() => {
		return (
			<ImageCarousel
				height={height - spacing.md * 2}
				width={width}
				renderType="image-full"
				images={images}
				onClose={onClose}
				onSingleTap={hideHeader}
				dotContainerStyle={styles.dotContainer}
				startingIndex={startingIndex}
				ref={ref}
			/>
		);
	}, [images]);

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<Dialog.Portal>
				<Dialog.Overlay key={postId} />
				<Dialog.Content>
					<Animated.View style={animatedStyle}>
						<XStack>
							<Pressable onPress={onClose}>
								<X size="$xl" c="$primary" />
							</Pressable>
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
