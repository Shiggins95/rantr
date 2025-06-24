import { Image, StyleSheet } from 'react-native';
import ParallaxScrollView from '@/src/components/ParallaxScrollView';
import { Button } from '@ui/button';
import { useRouter } from 'expo-router';
import { useAuthContext } from '@/src/context/auth-context';
import { getPosts } from '@/src/api/methods/posts/get-posts';
import { useSupabaseInfiniteQuery } from '@/src/api/hooks/use-supabase-infinite-query';
import { POSTS_PER_PAGE } from '@/src/constants/query';

export default function HomeScreen() {
	const router = useRouter();
	const { signOut, guestMode } = useAuthContext();
	console.log('guestMode', guestMode);

	const { data, fetchNextPage, hasNextPage } = useSupabaseInfiniteQuery(
		['posts'],
		getPosts,
		undefined,
		{
			getNextPageParam: (lastPage, allPages) => {
				return lastPage?.length === POSTS_PER_PAGE
					? allPages.length * POSTS_PER_PAGE
					: undefined;
			},
		},
	);

	const handleFetchNextPage = async () => {
		if (!hasNextPage) return;
		await fetchNextPage();
	};

	console.log('data', data);

	const triggerGetUserById = async () => {
		router.navigate('/test');
	};

	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
			headerImage={
				<Image
					source={require('@assets/images/partial-react-logo.png')}
					style={styles.reactLogo}
				/>
			}
		>
			<Button variant="primary" onPress={triggerGetUserById}>
				Primary
			</Button>
			<Button variant="secondary" onPress={signOut}>
				Secondary
			</Button>
			<Button variant="danger" onPress={handleFetchNextPage}>
				Danger
			</Button>
		</ParallaxScrollView>
	);
}

const styles = StyleSheet.create({
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	stepContainer: {
		gap: 8,
		marginBottom: 8,
	},
	reactLogo: {
		height: 178,
		width: 290,
		bottom: 0,
		left: 0,
		position: 'absolute',
	},
});
