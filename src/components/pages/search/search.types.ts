import { Coordinates } from 'expo-maps';

export type AppleMapOnMoveEvent = {
	coordinates: Coordinates;
	zoom: number;
	tilt: number;
	bearing: number;
};
