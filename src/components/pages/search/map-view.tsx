import { useSupabaseQuery } from '@/src/api/hooks/common/use-supabase-query';
import { getAnonPosts, getPosts } from '@/src/api/methods/posts/get-posts';
import { MapMarker } from '@/src/components/pages/search/map-marker';
import { CameraEdges } from '@/src/components/pages/search/search.types';
import { Colours } from '@/src/constants/colours';
import { spacing } from '@/src/constants/spacing';
import { useAuthContext } from '@/src/context/auth-context';
import { useLocationContext } from '@/src/context/location-context';
import { calculateEdges } from '@/src/utils/distance';
import { useDebouncedValue } from '@hooks/use-debounced-value';
import { List, Navigation } from '@tamagui/lucide-icons';
import { Body, BodyType } from '@ui/body';
import { Button } from '@ui/button';
import { DebouncedInputField } from '@ui/input-field';
import { geocodeAsync, reverseGeocodeAsync } from 'expo-location';
import { useRouter } from 'expo-router';
import { forwardRef, RefObject, useEffect, useState } from 'react';
import { Dimensions, Keyboard, TouchableWithoutFeedback } from 'react-native';
import MapView, { Region } from 'react-native-maps';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, YStack } from 'tamagui';

type MapViewComponentProps = {
	initialRegion: Region;
};

export const MapViewComponent = forwardRef<MapView, MapViewComponentProps>(
	({ initialRegion }, ref) => {
		const { user: currentUser, guestMode } = useAuthContext();
		const { top: topInset } = useSafeAreaInsets();
		const { width: windowWidth } = Dimensions.get('window');
		const { location } = useLocationContext();
		const router = useRouter();
		const [mapChanged, setMapChanged] = useState(false);
		const loadingTranslate = useSharedValue(-(windowWidth / 2));
		const [cameraEdges, setCameraEdges] = useState<CameraEdges>(
			calculateEdges(initialRegion),
		);
		const [locationLabel, setLocationLabel] = useState(location.label);
		const theme = 'dark';

		const onMarkerPress = (postId: string) => {
			router.navigate(`/(app)/(out-of-tabs)/post/${postId}/post`);
		};

		const debouncedEdges = useDebouncedValue(cameraEdges, 1000);

		const handleRegionChangeStart = () => {
			loadingTranslate.value = 0;
			loadingTranslate.value = withRepeat(
				withTiming(windowWidth * 1.5, { duration: 500 }),
				-1,
			);
			setMapChanged(true);
		};
		const handleRegionChange = async (region: Region) => {
			const newEdges = calculateEdges(region);
			setCameraEdges(newEdges);
			setMapChanged(true);

			const reverseGeocode = await reverseGeocodeAsync({
				latitude: region.latitude,
				longitude: region.longitude,
			});

			const currentLocation = reverseGeocode[0];

			const label =
				currentLocation.subregion ||
				currentLocation.city ||
				currentLocation.district ||
				currentLocation.region ||
				currentLocation.country ||
				'none';

			setLocationLabel(label);
		};

		const recenterLocation = () => {
			setSearchTerm('');
			(ref as RefObject<MapView>).current?.animateToRegion(initialRegion);
		};

		const navigateToListView = async () => {
			router.push({
				pathname: '/search-list-view',
				params: {
					...cameraEdges,
					locationName: locationLabel,
				},
			});
		};

		const [searchTerm, setSearchTerm] = useState('');

		const { data } = useSupabaseQuery(
			[
				'map-view-posts',
				debouncedEdges.north,
				debouncedEdges.south,
				debouncedEdges.east,
				debouncedEdges.west,
			],
			!currentUser || guestMode ? getAnonPosts : getPosts,
			{ locationBox: debouncedEdges, userId: currentUser?.id, limit: 1000 },
		);

		const [markers, setMarkers] = useState<
			{ id: string; lat: number; lng: number }[]
		>([]);

		useEffect(() => {
			if (!data) return;
			setMapChanged(false);
			setMarkers(
				data.map((post) => {
					return {
						id: post.id,
						lat: post.lat,
						lng: post.lng,
					};
				}),
			);
		}, [data]);

		const animatedStyle = useAnimatedStyle(() => {
			return {
				transform: [{ translateX: loadingTranslate.value }],
				width: windowWidth / 2,
				height: 5,
				backgroundColor: Colours[theme].primary,
				zIndex: 1000,
			};
		});

		useEffect(() => {
			if (!searchTerm) return;
			const getSuggestion = async () => {
				const results = await geocodeAsync(searchTerm);
				(ref as RefObject<MapView>).current.animateToRegion({
					...initialRegion,
					longitude: results[0].longitude,
					latitude: results[0].latitude,
				});
			};

			void getSuggestion();
		}, [searchTerm]);

		return (
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View f={1}>
					{mapChanged && (
						<View
							w={windowWidth}
							h={5}
							bg="$background"
							position="absolute"
							bottom={0}
							zIndex={1000}
						>
							<Animated.View style={animatedStyle} />
						</View>
					)}
					<View
						px="$md"
						position="absolute"
						top={topInset + spacing.md}
						w="100%"
						zIndex={1000}
					>
						<DebouncedInputField
							placeholder="See what's happening around the world!"
							textAlignVertical="center"
							delay={500}
							value={searchTerm}
							onChangeText={setSearchTerm}
						/>
					</View>
					<YStack
						gap="$md"
						position="absolute"
						bottom={25}
						right="$md"
						zIndex={1000}
					>
						{markers.length > 0 && (
							<View
								bg="$background"
								w={50}
								h={50}
								borderRadius="$radius.l"
								jc="center"
								alignItems="center"
							>
								<Button variant="ghost" onPress={navigateToListView}>
									<View
										bg="$primary"
										w={25}
										h={25}
										position="absolute"
										top={-7}
										right={-7}
										jc="center"
										alignItems="center"
										borderRadius={25}
									>
										<Body c="$background" variant={BodyType.extraSmall}>
											{markers.length}
										</Body>
									</View>
									<List size="$size.lg" c="$primary" />
								</Button>
							</View>
						)}
						<View
							bg="$background"
							w={50}
							h={50}
							borderRadius="$radius.l"
							jc="center"
							alignItems="center"
						>
							<Button variant="ghost" onPress={recenterLocation}>
								<Navigation size="$size.lg" c="$primary" />
							</Button>
						</View>
					</YStack>
					<MapView
						ref={ref}
						style={{ flex: 1 }}
						showsMyLocationButton={true}
						showsPointsOfInterest={false}
						showsCompass={false}
						showsIndoors={false}
						maxZoomLevel={12}
						minZoomLevel={9}
						onRegionChangeComplete={handleRegionChange}
						onRegionChangeStart={handleRegionChangeStart}
						showsUserLocation
						region={initialRegion}
					>
						{markers.map((marker) => {
							return (
								<MapMarker
									latitude={marker.lat}
									longitude={marker.lng}
									onMarkerPress={onMarkerPress}
									key={marker.id}
									postId={marker.id}
								/>
							);
						})}
					</MapView>
				</View>
			</TouchableWithoutFeedback>
		);
	},
);
