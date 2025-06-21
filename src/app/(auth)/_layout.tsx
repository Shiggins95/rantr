import { Stack, useRouter } from 'expo-router';
import { View } from 'tamagui';
import * as Icon from '@tamagui/lucide-icons';
import { Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HEADER_HEIGHT } from '@/src/constants/spacing';

export default function OnboardingLayout() {
	const router = useRouter();

	const { top } = useSafeAreaInsets();

	const BasicHeader = () => {
		return (
			<View h={top + HEADER_HEIGHT} pt={top} bg="transparent" px="$md">
				<Pressable onPress={() => router.back()}>
					<Icon.ChevronLeft size="$xl" c="$primary" />
				</Pressable>
			</View>
		);
	};

	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="sign-in"
				options={{
					header: BasicHeader,
				}}
			/>
			<Stack.Screen
				name="verification-code"
				options={{
					header: BasicHeader,
				}}
			/>
		</Stack>
	);
}
