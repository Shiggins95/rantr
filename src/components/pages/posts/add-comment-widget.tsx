import { Colours } from '@/src/constants/colours';
import { HEADER_HEIGHT, spacing } from '@/src/constants/spacing';
import { useColorScheme } from '@hooks/useColorScheme';
import { SendHorizontal } from '@tamagui/lucide-icons';
import { Body, BodyType } from '@ui/body';
import { Button } from '@ui/button';
import InputField from '@ui/input-field';
import { useMemo, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import {
	useKeyboardHandler,
	useKeyboardState,
} from 'react-native-keyboard-controller';
import Animated, {
	cancelAnimation,
	Extrapolation,
	interpolate,
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withDecay,
	withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, View } from 'tamagui';

type AddCommentWidgetProps = {
	title: string;
};

export const AddCommentWidget = ({ title }: AddCommentWidgetProps) => {
	const { height: screenHeight, width: screenWidth } = Dimensions.get('window');
	const translateY = useSharedValue(0);
	const styles = useStyles();
	const insets = useSafeAreaInsets();
	const extraHeight = useSharedValue(0);
	const baseExtraHeight = useSharedValue(0);
	const theme = useColorScheme() ?? 'dark';
	const { height: keyboardHeight } = useKeyboardState();

	const [visible, setVisible] = useState(false);

	const borderStyle = useMemo(() => {
		return {
			borderColor: visible ? Colours[theme].primary : 'transparent',
		};
	}, [visible]);

	const animatedStyle = useAnimatedStyle(() => {
		const paddingTopValue = interpolate(
			translateY.value,
			[0, 50],
			[spacing.sm, 50],
			Extrapolation.CLAMP,
		);

		return {
			transform: [{ translateY: -translateY.value }],
			...styles.container,
			...borderStyle,
			paddingBottom: insets.bottom + spacing.md,
			paddingTop: paddingTopValue,
			minHeight: 60 + extraHeight.value,
		};
	});

	const maxAllowedHeight =
		screenHeight - keyboardHeight - insets.top - HEADER_HEIGHT;

	const panGesture = Gesture.Pan()
		.onStart(() => {
			baseExtraHeight.value = extraHeight.value;
		})
		.onUpdate((e) => {
			'worklet';
			const unclamped = baseExtraHeight.value - e.translationY;
			const maxAllowed = Math.max(maxAllowedHeight - 60, 0);

			extraHeight.value = Math.max(Math.min(unclamped, maxAllowed), 0);
		})
		.onEnd((e) => {
			'worklet';
			const maxAllowed = Math.max(maxAllowedHeight - 60, 0);

			if (e.velocityY !== 0) {
				cancelAnimation(extraHeight); // cancel any previous
				extraHeight.value = withDecay(
					{
						velocity: -e.velocityY,
						clamp: [0, maxAllowed + 5],
						// We skip clamp to allow overshoot
					},
					() => {
						'worklet';
						if (extraHeight.value < 0) {
							extraHeight.value = withSpring(0);
						} else if (extraHeight.value > maxAllowed) {
							extraHeight.value = withSpring(maxAllowed);
						}
					},
				);
			}
		})
		.enabled(visible);

	useKeyboardHandler(
		{
			onStart(e) {
				'worklet';
				runOnJS(setVisible)(e.progress === 1);
			},
			onMove: (event) => {
				'worklet';
				translateY.value = Math.max(event.height, 0);
			},
		},
		[],
	);

	const [comment, setComment] = useState('');

	return (
		<GestureDetector gesture={panGesture}>
			<Animated.View style={animatedStyle}>
				{visible && (
					<View
						py="$sm"
						position="absolute"
						w={screenWidth}
						fd="column"
						px="$md"
						jc="center"
						pt={20}
					>
						<View
							position="absolute"
							top={10}
							left={(screenWidth / 5) * 2}
							h={2}
							w={screenWidth / 5}
							bg="$primary40"
						/>
						<Text>
							<Body variant={BodyType.extraSmall}>Commenting on</Body>{' '}
							<Body variant={BodyType.extraSmallBold}>
								{title.truncate(40)}
							</Body>
						</Text>
					</View>
				)}
				<InputField
					value={comment}
					onChangeText={setComment}
					placeholder="Add a comment"
					variant="invisible"
				/>
				<Button variant="ghost">
					<SendHorizontal size="$size.md" c="$primary" />
				</Button>
			</Animated.View>
		</GestureDetector>
	);
};

const useStyles = () => {
	const theme = useColorScheme() ?? 'dark';
	return StyleSheet.create({
		container: {
			position: 'absolute',
			bottom: 0,
			width: '100%',
			backgroundColor: Colours[theme].pureBg,
			flexDirection: 'row',
			justifyContent: 'space-between',
			paddingHorizontal: spacing.md,
			paddingTop: spacing.sm,
			borderWidth: 0,
			borderTopWidth: 1,
		},
	});
};
