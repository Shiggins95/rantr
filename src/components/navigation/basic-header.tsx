import { useRouter } from 'expo-router';
import { View } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HEADER_HEIGHT } from '@/src/constants/spacing';
import { Pressable } from 'react-native';
import * as Icon from '@tamagui/lucide-icons';
import { useCurrentUser } from '@/src/context/auth-context';

export const NavigationHeader = () => {
	const { top } = useSafeAreaInsets();
	const router = useRouter();

	const currentUser = useCurrentUser();

	const handleBackPress = () => {
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
