import { HEADER_HEIGHT } from '@/src/constants/spacing';
import { useCurrentUser } from '@/src/context/auth-context';
import * as Icon from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'tamagui';

type NavigationHeaderProps = {
	onBackPress?: () => void;
};

export const NavigationHeader = ({ onBackPress }: NavigationHeaderProps) => {
	const { top } = useSafeAreaInsets();
	const router = useRouter();

	const currentUser = useCurrentUser();

	const handleBackPress = () => {
		if (onBackPress) {
			onBackPress();
			return;
		}
		if (router.canGoBack()) {
			return router.back();
		}
		if (!currentUser) {
			router.navigate('/(auth)/sign-in');
			return;
		}
		router.navigate('/(app)/(tabs)/(home)');
		return true;
	};

	return (
		<View
			h={top + HEADER_HEIGHT}
			pt={top}
			bg="transparent"
			px="$md"
			fd="row"
			jc="flex-start"
			alignItems="center"
		>
			<Pressable onPress={handleBackPress}>
				<Icon.ChevronLeft size="$xl" c="$primary" />
			</Pressable>
		</View>
	);
};
