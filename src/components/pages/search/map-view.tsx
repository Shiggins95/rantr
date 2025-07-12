import { AppleMapsViewType } from 'expo-maps/build/apple/AppleMaps.types';
import { GoogleMapsViewType } from 'expo-maps/build/google/GoogleMaps.types';
import { forwardRef, RefObject } from 'react';
import { Platform } from 'react-native';
import {
	AndroidMapViewProps,
	MapView as GoogleMapView,
} from './map-view.android';
import { MapView as AppleMapView, AppleMapViewProps } from './map-view.ios';

export const MapView = forwardRef<
	GoogleMapsViewType | AppleMapsViewType,
	AndroidMapViewProps | AppleMapViewProps
>((props, ref) => {
	if (Platform.OS === 'ios') {
		return (
			<AppleMapView ref={ref as RefObject<AppleMapsViewType>} {...props} />
		);
	}

	return (
		<GoogleMapView ref={ref as RefObject<GoogleMapsViewType>} {...props} />
	);
});
