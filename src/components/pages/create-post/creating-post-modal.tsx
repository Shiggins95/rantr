import { Colours } from '@/src/constants/colours';
import { useColorScheme } from '@hooks/useColorScheme';
import { Body } from '@ui/body';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { Dimensions } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withSequence,
	withTiming,
} from 'react-native-reanimated';
import { Dialog, View } from 'tamagui';

type CreatingPostModalProps = {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
};

export const CreatingPostModal = ({
	open,
	setOpen,
}: CreatingPostModalProps) => {
	const { width: screenWidth } = Dimensions.get('window');
	const translateX = useSharedValue(0);
	const theme = useColorScheme() ?? 'dark';

	useEffect(() => {
		translateX.value = withRepeat(
			withSequence(
				withTiming(screenWidth + 100, { duration: 750 }),
				withTiming(-100, { duration: 750 }),
			),
			-1,
			true,
		);
	}, []);

	const aniamtedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: translateX.value }],
			height: 5,
			width: 95,
			backgroundColor: Colours[theme].primary,
		};
	});

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<Dialog.Portal>
				<Dialog.Overlay key="post-create-dialog" />
				<Dialog.Content w="100%" px="$md" bg="transparent">
					<View
						mx="$md"
						bg="$background"
						borderRadius="$radius.m"
						bw={2}
						borderColor="$color.borderColor"
						py="$xl"
						px="$md"
						jc="center"
						alignItems="center"
						gap="$md"
					>
						<Body>Creating post</Body>
						<View w="100%" bg="$primary40" overflow="hidden">
							<Animated.View style={aniamtedStyle} />
						</View>
					</View>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog>
	);
};
