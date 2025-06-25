import { FlatList, StyleSheet } from 'react-native';
import { getPosts } from '@/src/api/methods/posts/get-posts';
import { useSupabaseInfiniteQuery } from '@/src/api/hooks/use-supabase-infinite-query';
import { POSTS_PER_PAGE } from '@/src/constants/query';
import { HomeHeader } from '@/src/components/pages/tabs/home/header';
import { PostDto } from '@/src/types/posts.types';
import { View } from 'tamagui';
import { Page } from '@/src/components/page';
import { spacing } from '@/src/constants/spacing';
import { useCallback, useMemo, useState } from 'react';
import { Post } from '@/src/components/pages/tabs/home/feed/post';

export default function HomeScreen() {
	const [currentTag, setCurrentTag] = useState('');

	const { data, fetchNextPage, hasNextPage, isFetching, resetAndRefetch } =
		useSupabaseInfiniteQuery(['posts'], getPosts, undefined, {
			getNextPageParam: (lastPage, allPages) => {
				return lastPage?.length === POSTS_PER_PAGE
					? allPages.length * POSTS_PER_PAGE
					: undefined;
			},
		});

	const handleFetchNextPage = async () => {
		if (!hasNextPage) return;
		await fetchNextPage();
	};

	const handleRefresh = async () => {
		void resetAndRefetch();
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
				data={filteredData}
				keyExtractor={(i) => i.id}
				renderItem={renderItem}
				style={styles.contentContainer}
				contentContainerStyle={styles.sectionListContent}
				onEndReached={handleFetchNextPage}
				onEndReachedThreshold={0.2}
				initialNumToRender={5}
				refreshing={isFetching}
				onRefresh={handleRefresh}
				maxToRenderPerBatch={POSTS_PER_PAGE}
				windowSize={5}
			/>
		);
	}, [filteredData]);

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
		// paddingTop: 100,
	},
	sectionListContent: {
		paddingBottom: 100,
		gap: spacing.md,
	},
});
