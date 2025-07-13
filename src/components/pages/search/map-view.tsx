import { useSupabaseQuery } from '@/src/api/hooks/common/use-supabase-query';
import { getAnonPosts, getPosts } from '@/src/api/methods/posts/get-posts';
import { MapMarker } from '@/src/components/pages/search/map-marker';
import { CameraEdges } from '@/src/components/pages/search/search.types';
import { Colours } from '@/src/constants/colours';
import { spacing } from '@/src/constants/spacing';
import { useAuthContext } from '@/src/context/auth-context';
import { calculateEdges } from '@/src/utils/distance';
import { useDebouncedValue } from '@hooks/use-debounced-value';
import { DebouncedInputField } from '@ui/input-field';
import { geocodeAsync } from 'expo-location';
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
import { View } from 'tamagui';

type MapViewComponentProps = {
	initialRegion: Region;
};

export const MapViewComponent = forwardRef<MapView, MapViewComponentProps>(
	({ initialRegion }, ref) => {
		const { top: topInset } = useSafeAreaInsets();
		const { width: windowWidth } = Dimensions.get('window');
		const router = useRouter();
		const { user: currentUser, guestMode } = useAuthContext();
		const [mapChanged, setMapChanged] = useState(false);
		const loadingTranslate = useSharedValue(-(windowWidth / 2));
		const theme = 'dark';

		const [cameraEdges, setCameraEdges] = useState<CameraEdges>(
			calculateEdges(initialRegion),
		);

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
		const handleRegionChange = (region: Region) => {
			setCameraEdges(calculateEdges(region));
			setMapChanged(true);
		};

		const [searchTerm, setSearchTerm] = useState('');

		const { data } = useSupabaseQuery(
			[
				'map-posts',
				debouncedEdges.north,
				debouncedEdges.south,
				debouncedEdges.east,
				debouncedEdges.west,
			],
			guestMode || !currentUser ? getAnonPosts : getPosts,
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
			const getSuggestion = async () => {
				const results = await geocodeAsync(searchTerm);
				console.log('results', results);
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
					<MapView
						ref={ref}
						style={{ flex: 1 }}
						showsMyLocationButton={true}
						showsPointsOfInterest={false}
						showsCompass={false}
						showsIndoors={false}
						maxZoomLevel={12}
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
