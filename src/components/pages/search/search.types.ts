import { LatLng } from 'react-native-maps';

export type CameraEdges = {
	north: number;
	east: number;
	south: number;
	west: number;
};

export type AppleMapOnMoveEvent = {
	coordinates: LatLng;
	zoom: number;
	tilt: number;
	bearing: number;
};
