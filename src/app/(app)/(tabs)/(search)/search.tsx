import { MapView } from '@/src/components/pages/search/map-view';
import { AppleMapOnMoveEvent } from '@/src/components/pages/search/search.types';
import {
	LocationResponse,
	useLocationContext,
} from '@/src/context/location-context';
import { Navigation } from '@tamagui/lucide-icons';
import { Button } from '@ui/button';
import { CameraPosition } from 'expo-maps';
import { AppleMapsViewType } from 'expo-maps/build/apple/AppleMaps.types';
import { GoogleMapsViewType } from 'expo-maps/build/google/GoogleMaps.types';
import { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'tamagui';

export default function TabTwoScreen() {
	const {
		location,
		checkPermissions,
		requestPermissions,
		getCurrentLocation,
		status,
	} = useLocationContext();

	const { top: topInset } = useSafeAreaInsets();

	const [locationPosition, setLocationPosition] =
		useState<LocationResponse>(location);
	const mapRef = useRef<AppleMapsViewType | GoogleMapsViewType | null>(null);
	const defaultCamera: CameraPosition = {
		coordinates: {
			latitude: locationPosition?.lat,
			longitude: locationPosition?.lng,
		},
		zoom: 10,
	};

	const onAppleCameraMove = (event: AppleMapOnMoveEvent) => {
		if (event.zoom > 10) {
			console.log('event.coor', event);
			mapRef.current?.setCameraPosition({
				coordinates: event.coordinates,
				zoom: 10,
			});
		}
	};
	const onAndroidCameraMove = (event: AppleMapOnMoveEvent) => {
		if (event.zoom > 10) {
			mapRef.current?.setCameraPosition({
				coordinates: event.coordinates,
				zoom: 10,
			});
		}
	};

	const recenterLocation = () => {
		mapRef.current?.setCameraPosition({
			coordinates: {
				latitude: locationPosition?.lat,
				longitude: locationPosition?.lng,
			},
			zoom: 10,
		});
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
			<View
				bg="$background"
				position="absolute"
				top={topInset + 50}
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
			<MapView
				ref={mapRef}
				cameraPosition={defaultCamera}
				onCameraMove={
					Platform.OS === 'ios' ? onAppleCameraMove : onAndroidCameraMove
				}
			/>
		</View>
	);
}
