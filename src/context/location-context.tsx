import {
	getCurrentPositionAsync,
	LocationAccuracy,
	LocationPermissionResponse,
	PermissionResponse,
	reverseGeocodeAsync,
	useForegroundPermissions,
} from 'expo-location';
import {
	createContext,
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	useContext,
	useState,
} from 'react';

export type LocationResponse = {
	lat: number;
	lng: number;
	status: 'granted' | 'denied';
	ttl: number;
	label: string;
};

type LocationContextType = {
	checkPermissions: () => Promise<LocationPermissionResponse>;
	requestPermissions: () => Promise<LocationPermissionResponse>;
	status: PermissionResponse | null;
	getCurrentLocation: () => Promise<LocationResponse>;
	location: LocationResponse;
	setLocation: Dispatch<SetStateAction<LocationResponse>>;
};

export const LocationContext = createContext<LocationContextType>({
	checkPermissions: () => Promise.resolve({} as LocationPermissionResponse),
	requestPermissions: () => Promise.resolve({} as LocationPermissionResponse),
	status: null,
	getCurrentLocation: () => Promise.resolve({} as LocationResponse),
	location: {} as LocationResponse,
	setLocation: () => null,
});

export const useLocationContext = () => {
	const value = useContext(LocationContext);
	if (!value) {
		throw new Error('useSession must be wrapped in a <SessionProvider />');
	}

	return value;
};

export const LocationProvider = ({ children }: PropsWithChildren) => {
	const [location, setLocation] = useState<LocationResponse>(
		{} as LocationResponse,
	);
	const [status, requestPermission, getPermission] = useForegroundPermissions();
	const checkPermissions = async () => {
		return await getPermission();
	};

	const requestPermissions = async () => {
		return await requestPermission();
	};

	const getCurrentLocation = async (): Promise<LocationResponse> => {
		const { granted, canAskAgain } = await getPermission();
		const noResponse: LocationResponse = {
			lat: 0,
			lng: 0,
			status: 'denied',
			ttl: 0,
			label: 'No location provided',
		};
		if (!granted) {
			if (!canAskAgain) return noResponse;
			const { granted: requestGranted } = await requestPermission();
			if (!requestGranted) return noResponse;
		}

		const result = await getCurrentPositionAsync({
			accuracy: LocationAccuracy.Highest,
		});
		const hours = 1;
		const ttl = new Date(Date.now() + hours * 60 * 60 * 1000);
		const newLocation: LocationResponse = {
			lat: result.coords.latitude,
			lng: result.coords.longitude,
			status: 'granted',
			ttl: ttl.getTime(),
			label: 'none',
		};

		if (newLocation.lat && newLocation.lng) {
			const reverseGeocode = await reverseGeocodeAsync({
				latitude: newLocation.lat,
				longitude: newLocation.lng,
			});
			const currentLocation = reverseGeocode[0];
			newLocation.label =
				currentLocation.city ||
				currentLocation.district ||
				currentLocation.region ||
				currentLocation.country ||
				'none';
		}

		setLocation(newLocation);
		return newLocation;
	};

	return (
		<LocationContext.Provider
			value={{
				requestPermissions,
				checkPermissions,
				status,
				getCurrentLocation,
				location,
				setLocation,
			}}
		>
			{children}
		</LocationContext.Provider>
	);
};
