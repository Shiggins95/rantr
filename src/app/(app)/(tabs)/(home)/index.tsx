import { useSupabaseInfiniteQuery } from '@/src/api/hooks/common/use-supabase-infinite-query';
import { getAnonPosts, getPosts } from '@/src/api/methods/posts/get-posts';
import { Page } from '@/src/components/page';
import { Feed } from '@/src/components/pages/tabs/home/feed/feed';
import { HomeHeader } from '@/src/components/pages/tabs/home/header';
import { useCurrentUser } from '@/src/context/auth-context';
import { useLocationContext } from '@/src/context/location-context';
import { RefreshCcw } from '@tamagui/lucide-icons';
import { Body, BodyType } from '@ui/body';
import { useMemo, useState } from 'react';
import { Pressable } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withTiming,
} from 'react-native-reanimated';
import { View } from 'tamagui';

export default function HomeScreen() {
	const [currentTag, setCurrentTag] = useState('');
	const currentUser = useCurrentUser();
	const { location, getCurrentLocation } = useLocationContext();
	const rotation = useSharedValue(0);

	const { data, fetchNextPage, hasNextPage, isFetching, refetch } =
		useSupabaseInfiniteQuery(
			['posts', location?.lat, location?.lng],
			currentUser ? getPosts : getAnonPosts,
			{ userId: currentUser?.id, location },
			{
				getNextPageParam: (lastPage) => {
					if (lastPage.length === 0) return undefined;
					return lastPage[lastPage.length - 1].createdAt.toISOString();
				},
			},
		);

	const locationTitle = useMemo(() => {
		if (!location.label || location.label === 'none') return '';
		return location.label;
	}, [location]);

	const handleFetchNextPage = async () => {
		if (!hasNextPage) return;
		await fetchNextPage();
	};

	const handleRefresh = async () => {
		if (new Date().getTime() > location.ttl) {
			await getCurrentLocation();
		}
		void refetch();
	};

	const forceRefreshLocation = async () => {
		rotation.value = withRepeat(withTiming(360, { duration: 500 }), -1, true);
		setTimeout(() => (rotation.value = 0), 1000);
		await getCurrentLocation();
		void refetch();
	};

	const filteredData = useMemo(() => {
		if (!currentTag || !data) return data || [];
		return data.filter((p) => p.type === currentTag);
	}, [currentTag, data]);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ rotate: `${rotation.value}deg` }],
		};
	});

	return (
		<Page>
			<HomeHeader currentTag={currentTag} setCurrentTag={setCurrentTag} />
			<View py="$md" px="$md" fd="row" jc="space-between" alignItems="center">
				<View gap="$xs" alignItems="center" fd="row">
					<Body variant={BodyType.small} p={0} m={0}>
						Near
					</Body>
					<Body variant={BodyType.small} c="$primary80" p={0} m={0}>
						{locationTitle}
					</Body>
				</View>
				<Pressable onPress={forceRefreshLocation}>
					<Animated.View style={animatedStyle}>
						<RefreshCcw size="$md" c="$primary" />
					</Animated.View>
				</Pressable>
			</View>
			<View f={1}>
				<Feed
					data={filteredData}
					isFetching={isFetching}
					onRefresh={handleRefresh}
					handleGetNextPage={handleFetchNextPage}
				/>
			</View>
		</Page>
	);
}
