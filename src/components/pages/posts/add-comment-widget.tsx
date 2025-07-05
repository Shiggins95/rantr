import { useSupabaseMutation } from '@/src/api/hooks/common/use-supabase-mutation';
import { onSuccessCommentCreate } from '@/src/api/invalidations/comment-creation';
import { createComment } from '@/src/api/methods/comments/create-comment';
import { Colours } from '@/src/constants/colours';
import { HEADER_HEIGHT, INPUT_HEIGHT, spacing } from '@/src/constants/spacing';
import { useCurrentUser } from '@/src/context/auth-context';
import { PostDto } from '@/src/types/posts.types';
import { useColorScheme } from '@hooks/useColorScheme';
import { SendHorizontal } from '@tamagui/lucide-icons';
import { useToastController } from '@tamagui/toast';
import { Body, BodyType } from '@ui/body';
import { Button } from '@ui/button';
import InputField from '@ui/input-field';
import { useMemo, useState } from 'react';
import {
	Dimensions,
	Keyboard,
	StyleSheet,
	TouchableWithoutFeedback,
} from 'react-native';
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
	post: PostDto;
};

export const AddCommentWidget = ({ post }: AddCommentWidgetProps) => {
	// region state & vars
	const { height: screenHeight, width: screenWidth } = Dimensions.get('window');
	const translateY = useSharedValue(0);
	const insets = useSafeAreaInsets();
	const extraHeight = useSharedValue(0);
	const baseExtraHeight = useSharedValue(0);
	const theme = useColorScheme() ?? 'dark';
	const { height: keyboardHeight } = useKeyboardState();
	const currentUser = useCurrentUser();
	const [visible, setVisible] = useState(false);
	const [comment, setComment] = useState('');
	const toast = useToastController();
	// endregion

	// region styles
	const styles = useStyles();
	const borderStyle = useMemo(() => {
		return {
			borderColor: visible ? Colours[theme].primary : 'transparent',
		};
	}, [visible]);

	const maxAllowedHeight =
		screenHeight - keyboardHeight - insets.top - HEADER_HEIGHT;

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
			minHeight: INPUT_HEIGHT + extraHeight.value,
			maxHeight: maxAllowedHeight,
		};
	});
	// endregion

	// region gestures & animations

	const dismissKeyboard = () => {
		Keyboard.dismiss();
	};

	const panGesture = Gesture.Pan()
		.onStart(() => {
			baseExtraHeight.value = extraHeight.value;
		})
		.onUpdate((e) => {
			'worklet';
			const unclamped = baseExtraHeight.value - e.translationY;
			const maxAllowed = Math.max(maxAllowedHeight - INPUT_HEIGHT, 0);

			extraHeight.value = Math.max(Math.min(unclamped, maxAllowed), 0);
		})
		.onEnd((e) => {
			'worklet';
			const maxAllowed = Math.max(maxAllowedHeight - INPUT_HEIGHT, 0);

			if (Math.abs(e.velocityY) > 200) {
				cancelAnimation(extraHeight); // cancel any previous
				const existing = extraHeight.value;
				extraHeight.value = withDecay(
					{
						velocity: -e.velocityY,
						clamp: [
							e.velocityY < 0 ? 0 : -25,
							e.velocityY < 0 ? maxAllowed + 25 : 25,
						],
						// We skip clamp to allow overshoot
					},
					() => {
						'worklet';
						if (existing <= 50) {
							runOnJS(dismissKeyboard)();
						}
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
	// endregion

	// region mutations
	const { mutateAsync } = useSupabaseMutation(createComment, {
		onSuccess: onSuccessCommentCreate,
	});
	const handleCommentCreate = async () => {
		if (!currentUser) return;
		try {
			await mutateAsync({
				comment,
				post_id: post.id,
				user_id: currentUser.id,
			});
		} catch (e) {
			toast.show('Something went wrong', {
				message: 'Something went wrong when creating your comment',
				type: 'error',
				viewportName: 'top-toast',
			});
		}
	};
	// endregion

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
								{post.title.truncate(40)}
							</Body>
						</Text>
					</View>
				)}
				<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
					<View
						style={{
							flex: 1,
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'flex-start',
						}}
					>
						<InputField
							maxWidth={screenWidth - spacing.md * 4}
							value={comment}
							onChangeText={setComment}
							placeholder="Add a comment"
							variant="invisible"
							multiline
							maxLength={500}
							customPaddingBottom={comment.split('\n').length > 5 ? 500 : 0}
						/>
						<View>
							<Button variant="ghost" onPress={handleCommentCreate}>
								<SendHorizontal size="$size.md" c="$primary" />
							</Button>
						</View>
					</View>
				</TouchableWithoutFeedback>
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
