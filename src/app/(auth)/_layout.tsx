import { NavigationHeader } from '@/src/components/navigation/basic-header';
import { Stack } from 'expo-router';

export default function OnboardingLayout() {
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
					header: () => <NavigationHeader />,
				}}
			/>
			<Stack.Screen
				name="verification-code"
				options={{
					header: () => <NavigationHeader />,
				}}
			/>
		</Stack>
	);
}
