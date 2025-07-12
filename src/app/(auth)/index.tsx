import { Page } from '@/src/components/page';
import { Headline, HeadlineType } from '@/src/components/ui/healine';
import { useAuthContext } from '@/src/context/auth-context';
import { useLocationContext } from '@/src/context/location-context';
import { Button } from '@ui/button';
import { Redirect, useRouter } from 'expo-router';
import { Text } from 'react-native';
import 'react-native-url-polyfill/auto';
import { Image, View, YStack } from 'tamagui';

export default function LandingPage() {
	const { session, setGuestMode } = useAuthContext();
	const router = useRouter();
	const { checkPermissions, getCurrentLocation } = useLocationContext();
	const handleSignIn = () => {
		router.navigate('/sign-in');
	};

	const navigateToHome = async () => {
		setGuestMode(true);
		const { granted } = await checkPermissions();
		if (!granted) return router.navigate('/location');
		await getCurrentLocation();
		router.navigate('/(app)/(tabs)/(home)');
	};

	if (session) {
		return <Redirect href="/(app)/(tabs)/(home)" />;
	}

	return (
		<Page isSafeArea>
			<View f={1} px="$md">
				<YStack alignItems="center" gap="$sm" f={1} py="$md">
					<Image
						w={150}
						h={150}
						source={require('@/assets/images/adaptive-icon.png')}
					/>
					<Text>
						<Headline textAlign="center" variant={HeadlineType.h2}>
							Your daily dose of{' '}
						</Headline>
						<Headline textAlign="center" variant={HeadlineType.h2} c="$primary">
							petty
						</Headline>
						<Headline textAlign="center" variant={HeadlineType.h2}>
							,{' '}
						</Headline>
						<Headline
							textAlign="center"
							variant={HeadlineType.h2}
							c="$secondary"
						>
							public
						</Headline>
						<Headline textAlign="center" variant={HeadlineType.h2}>
							, and{' '}
						</Headline>
						<Headline textAlign="center" variant={HeadlineType.h2} c="$danger">
							PISSED
						</Headline>
						<Headline textAlign="center" variant={HeadlineType.h2}>
							!
						</Headline>
					</Text>
				</YStack>
				<Button variant="primary" onPress={handleSignIn}>
					Get started
				</Button>
				<Button mt="$md" variant="ghost" onPress={navigateToHome}>
					Continue without account
				</Button>
			</View>
		</Page>
	);
}
