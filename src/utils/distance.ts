import { Region } from 'react-native-maps';

export const getBoundingBox = (lat: number, lng: number, radiusKm: number) => {
	const earthRadiusKm = 6371;

	const deltaLat = radiusKm / 111.32;

	const deltaLng = radiusKm / (111.32 * Math.cos(lat * (Math.PI / 180)));

	return {
		minLat: lat - deltaLat,
		maxLat: lat + deltaLat,
		minLng: lng - deltaLng,
		maxLng: lng + deltaLng,
	};
};

export const calculateEdges = (region: Region) => {
	const { latitude, longitude, latitudeDelta, longitudeDelta } = region;

	const northEdge = latitude + latitudeDelta / 2;
	const southEdge = latitude - latitudeDelta / 2;
	const eastEdge = longitude + longitudeDelta / 2;
	const westEdge = longitude - longitudeDelta / 2;
	return {
		north: northEdge,
		east: eastEdge,
		south: southEdge,
		west: westEdge,
	};
};
