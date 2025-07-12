import { AppleMapOnMoveEvent } from '@/src/components/pages/search/search.types';
import { CameraPosition } from 'expo-maps';
import { GoogleMapsViewType } from 'expo-maps/build/google/GoogleMaps.types';
import { GoogleMapsView } from 'expo-maps/build/google/GoogleMapsView';
import { forwardRef } from 'react';

export type AndroidMapViewProps = {
	cameraPosition: CameraPosition;
	onCameraMove: (event: AppleMapOnMoveEvent) => void;
};

export const MapView = forwardRef<GoogleMapsViewType, AndroidMapViewProps>(
	({ cameraPosition, onCameraMove }, ref) => {
		return (
			<GoogleMapsView
				ref={ref}
				properties={{
					selectionEnabled: false,
					isMyLocationEnabled: true,
				}}
				uiSettings={{
					compassEnabled: false,
					myLocationButtonEnabled: false,
				}}
				onCameraMove={onCameraMove}
				cameraPosition={cameraPosition}
				style={{ flex: 1 }}
			/>
		);
	},
);
