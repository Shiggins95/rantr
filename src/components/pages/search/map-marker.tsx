import { Image } from 'expo-image';
import { memo, useCallback } from 'react';
import { Marker } from 'react-native-maps';

type MapMarkerProps = {
	postId: string;
	latitude: number;
	longitude: number;
	onMarkerPress: (postId: string) => void;
};

export const MapMarker = memo(
	({ latitude, longitude, onMarkerPress, postId }: MapMarkerProps) => {
		const onMarkerPressHandler = useCallback(() => {
			onMarkerPress(postId);
		}, [postId]);
		return (
			<Marker
				coordinate={{ latitude, longitude }}
				draggable={false}
				onPress={onMarkerPressHandler}
			>
				<Image
					source={require('@assets/images/flame.png')}
					style={{
						width: 50,
						height: 50,
					}}
				/>
			</Marker>
		);
	},
	(prevProps, nextProps) => {
		return (
			prevProps.postId === nextProps.postId &&
			prevProps.latitude === nextProps.latitude &&
			prevProps.longitude === nextProps.longitude
		);
	},
);
