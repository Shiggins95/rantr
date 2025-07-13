import { MapViewComponent } from '@/src/components/pages/search/map-view';
import {
	LocationResponse,
	useLocationContext,
} from '@/src/context/location-context';
import { Navigation } from '@tamagui/lucide-icons';
import { Button } from '@ui/button';
import { useEffect, useRef, useState } from 'react';
import MapView from 'react-native-maps';
import { View } from 'tamagui';

export default function TabTwoScreen() {
	const mapRef = useRef<MapView | null>(null);
	const {
		location,
		checkPermissions,
		requestPermissions,
		getCurrentLocation,
		status,
	} = useLocationContext();

	const [locationPosition, setLocationPosition] =
		useState<LocationResponse>(location);

	const initialRegion = {
		latitude: locationPosition?.lat,
		longitude: locationPosition?.lng,
		latitudeDelta: 0.75,
		longitudeDelta: 0.75,
	};

	const recenterLocation = () => {
		mapRef.current?.animateToRegion(initialRegion);
	};

	useEffect(() => {
		if (locationPosition.lat && locationPosition.lng) {
			return;
		}

		if (status?.granted && location.ttl < new Date().getTime()) {
			getCurrentLocation().then((location) => {
				console.log('got location', location);
				setLocationPosition(location);
			});
			return;
		}

		requestPermissions().then((status) => {
			if (status.granted) {
				getCurrentLocation().then((location) => {
					setLocationPosition(location);
				});
			}
		});
	}, [
		status,
		location,
		checkPermissions,
		requestPermissions,
		getCurrentLocation,
		locationPosition,
	]);

	return (
		<View f={1}>
			<MapViewComponent ref={mapRef} initialRegion={initialRegion} />
			<View
				bg="$background"
				position="absolute"
				bottom={25}
				right="$md"
				zIndex={1000}
				w={50}
				h={50}
				borderRadius="$radius.l"
				jc="center"
				alignItems="center"
			>
				<Button variant="ghost" onPress={recenterLocation}>
					<Navigation size="$size.lg" c="$primary" />
				</Button>
			</View>
		</View>
	);
}
