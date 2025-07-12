import { AppleMapOnMoveEvent } from '@/src/components/pages/search/search.types';
import { CameraPosition } from 'expo-maps';
import { AppleMapsViewType } from 'expo-maps/build/apple/AppleMaps.types';
import { AppleMapsView } from 'expo-maps/build/apple/AppleMapsView';
import { forwardRef } from 'react';

export type AppleMapViewProps = {
	cameraPosition: CameraPosition;
	onCameraMove: (event: AppleMapOnMoveEvent) => void;
};

export const MapView = forwardRef<AppleMapsViewType, AppleMapViewProps>(
	({ cameraPosition, onCameraMove }, ref) => {
		return (
			<AppleMapsView
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
