import { MapViewComponent } from '@/src/components/pages/search/map-view';
import {
	LocationResponse,
	useLocationContext,
} from '@/src/context/location-context';
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
		</View>
	);
}
