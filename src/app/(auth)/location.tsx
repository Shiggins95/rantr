import { Page } from '@/src/components/page';
import { useLocationContext } from '@/src/context/location-context';
import { Body, BodyType } from '@ui/body';
import { Button } from '@ui/button';
import { Headline, HeadlineType } from '@ui/healine';
import { Modal } from '@ui/modal';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Linking } from 'react-native';
import { View } from 'tamagui';

export default function () {
	const router = useRouter();
	const { requestPermissions, getCurrentLocation } = useLocationContext();
	const [showWarning, setShowWarning] = useState(true);

	const handleRequestPermissions = async () => {
		const result = await requestPermissions();
		if (!result.granted) {
			setShowWarning(true);
			return;
		}
		// get the current location to store in the context
		await getCurrentLocation();
		navigateToApp();
	};

	const goToSettings = async () => {
		setShowWarning(false);
		await Linking.openSettings();
	};

	const navigateToApp = () => {
		router.replace('/(app)/(tabs)/(home)');
	};

	return (
		<Page isSafeArea>
			<View f={1} px="$md" py="$md">
				<Headline variant={HeadlineType.h2}>Unlock the local chaos.</Headline>
				<Body>
					We need your location to deliver the freshest rants in your area. Give
					us access, stay salty.
				</Body>
			</View>
			<Modal open={showWarning} setOpen={setShowWarning}>
				<Headline variant={HeadlineType.h4} textAlign="center">
					Location access is required to continue.
				</Headline>
				<Body mb="$md" variant={BodyType.normal} textAlign="center">
					You can still browse without location, but you won't see your local
					dumpster fires.
				</Body>

				<Button onPress={goToSettings} w="100%" variant="primary">
					Go to settings
				</Button>
				<Button w="100%" variant="outline" onPress={navigateToApp}>
					Continue without location
				</Button>
			</Modal>

			<Button mx="$md" variant="primary" onPress={handleRequestPermissions}>
				Approve Location
			</Button>
		</Page>
	);
}
