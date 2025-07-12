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
