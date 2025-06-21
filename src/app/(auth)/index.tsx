import 'react-native-url-polyfill/auto';
import { Text } from 'react-native';
import { useAuthContext } from '@/src/context/auth-context';
import { Redirect, useRouter } from 'expo-router';
import { Page } from '@/src/components/page';
import { LogoSvg } from '@/src/components/svg/logo';
import { View, YStack } from 'tamagui';
import { HeadlineType } from '@ui/healine';
import { Body, BodyType } from '@ui/body';
import { Button } from '@ui/button';
import TrustiFiHeading from '@/src/components/trustifi-heading';

export default function LandingPage() {
	const { session } = useAuthContext();
	const router = useRouter();

	const handleSignIn = () => {
		router.navigate('/sign-in');
	};

	if (session) {
		return <Redirect href="/(app)/(tabs)/(home)" />;
	}

	return (
		<Page isSafeArea>
			<View f={1} px="$md">
				<YStack alignItems="center" gap="$sm" f={1} py="$md">
					<LogoSvg width={100} height={100} />
					<TrustiFiHeading
						type="headline"
						variant={HeadlineType.h1}
						thinVariant={HeadlineType.h1Thin}
					/>
					<Text>
						<Body variant={BodyType.normal}>Building </Body>
						<Body variant={BodyType.normal} c="$primary">
							Trust
						</Body>
						<Body variant={BodyType.normal}> in every </Body>
						<Body variant={BodyType.normal} c="$secondary">
							connection
						</Body>
						<Body variant={BodyType.normal} c="$secondary">
							.
						</Body>
					</Text>
				</YStack>
				<Button variant="primary" onPress={handleSignIn}>
					Get started
				</Button>
			</View>
		</Page>
	);
}
