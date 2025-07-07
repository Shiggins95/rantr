import { Zoomable, ZoomableRef } from '@likashefqet/react-native-image-zoom';
import { RantrImage } from '@ui/image';
import { ImageContentFit } from 'expo-image';
import { useRef } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from 'react-native-reanimated';

type ZoomableImageProps = {
	src: string;
	onClose?: () => void;
	onSingleTap?: () => void;
	resizeMode?: ImageContentFit;
};

export const RantrZoomableImage = ({
	src,
	onClose,
	onSingleTap,
	resizeMode,
}: ZoomableImageProps) => {
	const translateY = useSharedValue(0);
	const translateX = useSharedValue(0);
	const opacity = useSharedValue(1);

	const ref = useRef<ZoomableRef | null>(null);

	const panGestureDown = Gesture.Pan()
		.onUpdate((e) => {
			translateY.value = withSpring(e.translationY);
			translateX.value = withSpring(e.translationX);
			opacity.value = withSpring(1 - Math.abs(e.translationY) / 100);
		})
		.onEnd((e) => {
			if (Math.abs(e.velocityY) > 200) {
				runOnJS(onClose!)();
			} else {
				translateY.value = withTiming(0);
				translateX.value = withTiming(0);
				opacity.value = withTiming(1, { duration: 300 });
			}
		})
		.activeOffsetY([-10, 10]);

	// Animated style for swipe
	const animatedStyle = useAnimatedStyle(() => ({
		transform: [
			{ translateY: translateY.value },
			{ translateX: translateX.value },
		],
		opacity: opacity.value,
	}));

	return (
		<GestureDetector gesture={panGestureDown}>
			<Animated.View style={[{ flex: 1 }, animatedStyle]}>
				<Zoomable
					ref={ref}
					minScale={0.5}
					maxScale={5}
					doubleTapScale={3}
					isSingleTapEnabled
					isDoubleTapEnabled
					onSingleTap={onSingleTap}
				>
					<RantrImage resizeMode={resizeMode} src={src} />
				</Zoomable>
			</Animated.View>
		</GestureDetector>
	);
};
