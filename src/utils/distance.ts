import { CameraEdges } from '@/src/components/pages/search/search.types';
import { Region } from 'react-native-maps';

export const getBoundingBox = (lat: number, lng: number, radiusKm: number) => {
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

export const calculateCenter = (edges: CameraEdges) => {
	const latCenter = (edges.north + edges.south) / 2;
	const lngCenter = (edges.east + edges.west) / 2;
	return {
		lat: latCenter,
		lng: lngCenter,
	};
};

export function calculateApproxRadiusKm(
	north: number,
	south: number,
	east: number,
	west: number,
): number {
	const toRad = (x: number) => (x * Math.PI) / 180;
	const earthRadius = 6371; // Radius of Earth in km

	const latCenter = (north + south) / 2;
	const lngCenter = (east + west) / 2;

	const haversineDistanceKm = (
		lat1: number,
		lon1: number,
		lat2: number,
		lon2: number,
	): number => {
		const dLat = toRad(lat2 - lat1);
		const dLon = toRad(lon2 - lon1);
		const a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(toRad(lat1)) *
				Math.cos(toRad(lat2)) *
				Math.sin(dLon / 2) *
				Math.sin(dLon / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		return earthRadius * c;
	};

	// Calculate distance to 4 corners
	const distNE = haversineDistanceKm(latCenter, lngCenter, north, east);
	const distNW = haversineDistanceKm(latCenter, lngCenter, north, west);
	const distSE = haversineDistanceKm(latCenter, lngCenter, south, east);
	const distSW = haversineDistanceKm(latCenter, lngCenter, south, west);

	const maxDist = Math.max(distNE, distNW, distSE, distSW);

	// Optionally round to 1 decimal
	return Math.ceil((maxDist * 10) / 10);
}
