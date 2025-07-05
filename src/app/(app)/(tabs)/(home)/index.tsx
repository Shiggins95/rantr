import { useSupabaseInfiniteQuery } from '@/src/api/hooks/common/use-supabase-infinite-query';
import { getAnonPosts, getPosts } from '@/src/api/methods/posts/get-posts';
import { Page } from '@/src/components/page';
import { Post } from '@/src/components/pages/tabs/home/feed/posts/post';
import { HomeHeader } from '@/src/components/pages/tabs/home/header';
import { POSTS_PER_PAGE } from '@/src/constants/query';
import { spacing } from '@/src/constants/spacing';
import { useCurrentUser } from '@/src/context/auth-context';
import { PostDto } from '@/src/types/posts.types';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { View } from 'tamagui';

export default function HomeScreen() {
	const [currentTag, setCurrentTag] = useState('');
	const currentUser = useCurrentUser();
	const queryClient = useQueryClient();

	const { data, fetchNextPage, hasNextPage, isFetching, refetch } =
		useSupabaseInfiniteQuery(
			['posts'],
			currentUser ? getPosts : getAnonPosts,
			{ userId: currentUser?.id },
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

	const handleRefresh = async () => {
		queryClient.removeQueries({ queryKey: ['posts'] });
		void refetch();
	};

	const renderItem = useCallback(({ item }: { item: PostDto }) => {
		return <Post post={item} />;
	}, []);

	const filteredData = useMemo(() => {
		if (!currentTag || !data) return data || [];
		return data.filter((p) => p.type === currentTag);
	}, [currentTag, data]);

	const flatList = useMemo(() => {
		return (
			<FlatList<PostDto>
				showsVerticalScrollIndicator={false}
				data={filteredData}
				keyExtractor={(i) => i.id}
				renderItem={renderItem}
				style={styles.contentContainer}
				contentContainerStyle={styles.sectionListContent}
				onEndReached={handleFetchNextPage}
				onEndReachedThreshold={0.2}
				initialNumToRender={10}
				refreshing={isFetching}
				onRefresh={handleRefresh}
				maxToRenderPerBatch={POSTS_PER_PAGE}
				windowSize={10}
			/>
		);
	}, [filteredData, data]);

	return (
		<Page>
			<HomeHeader currentTag={currentTag} setCurrentTag={setCurrentTag} />
			<View f={1}>{flatList}</View>
		</Page>
	);
}

const styles = StyleSheet.create({
	contentContainer: {
		flex: 1,
	},
	sectionListContent: {
		paddingBottom: 100,
		gap: spacing.md,
	},
});
