import { Redirect, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useAuthContext } from '@/src/context/auth-context';
import { useAndroidStatusBar } from '@hooks/use-android-status-bar';

export default function AppLayout() {
	const { session, isLoading, user , guestMode} = useAuthContext();
	useAndroidStatusBar();

	console.log('userStatus', user?.status);

	if (!guestMode) {
		if (session && user?.status === 'SETUP_REQUIRED') {
			return <Redirect href="/(onboarding)" />;
		}

		if (session && user?.status === 'PERSONAL_DETAILS_COMPLETE') {
			return <Redirect href="/(onboarding)/join-reason" />;
		}

		if (!session) {
			return <Redirect href="/(auth)" />;
		}
	}

	if (isLoading) {
		return null;
	}

	return (
		<>
			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			</Stack>
			<StatusBar style="auto" />
		</>
	);
}
