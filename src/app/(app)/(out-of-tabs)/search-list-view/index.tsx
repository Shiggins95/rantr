import { useSupabaseInfiniteQuery } from '@/src/api/hooks/common/use-supabase-infinite-query';
import { getAnonPosts, getPosts } from '@/src/api/methods/posts/get-posts';
import { Page } from '@/src/components/page';
import { Feed } from '@/src/components/pages/tabs/home/feed/feed';
import { useAuthContext } from '@/src/context/auth-context';
import { Body, BodyType } from '@ui/body';
import { useLocalSearchParams } from 'expo-router';
import { View } from 'tamagui';

export default function SearchListViewLayout() {
	const { user: currentUser, guestMode } = useAuthContext();
	const {
		north: northString,
		south: southString,
		east: eastString,
		west: westString,
		locationName,
		locationDistance,
	} = useLocalSearchParams() as {
		north: string;
		south: string;
		east: string;
		west: string;
		locationName: string;
		locationDistance: string;
	};

	const north = parseFloat(northString);
	const south = parseFloat(southString);
	const east = parseFloat(eastString);
	const west = parseFloat(westString);

	const { data, isLoading, refetch, fetchNextPage, hasNextPage } =
		useSupabaseInfiniteQuery(
			['posts', north, south, east, west],
			!currentUser || guestMode ? getAnonPosts : getPosts,
			{
				userId: currentUser?.id,
				locationBox: {
					north,
					south,
					east,
					west,
				},
				limit: 10,
			},
			{
				getNextPageParam: (lastPage) => {
					if (lastPage.length === 0) return undefined;
					return lastPage[lastPage.length - 1].createdAt.toISOString();
				},
			},
		);

	const handleFetchNextPage = async () => {
		if (!hasNextPage) return;
		await fetchNextPage();
	};

	return (
		<Page isSafeAreaTop withNavigationHeader>
			<View py="$md" px="$md" fd="row" jc="space-between" alignItems="center">
				<View gap="$xs" alignItems="center" fd="row">
					<View gap="$xs" alignItems="center" fd="row">
						<Body variant={BodyType.small} p={0} m={0}>
							Near
						</Body>
						<Body variant={BodyType.small} c="$primary80" p={0} m={0}>
							{locationName}
						</Body>
					</View>
				</View>
			</View>
			<Feed
				data={data || []}
				isFetching={isLoading}
				onRefresh={refetch}
				handleGetNextPage={handleFetchNextPage}
			/>
		</Page>
	);
}
