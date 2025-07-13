import { Post } from '@/src/components/pages/tabs/home/feed/posts/post';
import { POSTS_PER_PAGE } from '@/src/constants/query';
import { spacing } from '@/src/constants/spacing';
import { PostDto } from '@/src/types/posts.types';
import { useCallback, useMemo } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';

type FeedProps = {
	data: PostDto[];
	isFetching: boolean;
	onRefresh: () => void;
	handleGetNextPage: () => void;
};

export const Feed = ({
	data,
	isFetching,
	onRefresh,
	handleGetNextPage,
}: FeedProps) => {
	const renderItem = useCallback(({ item }: ListRenderItemInfo<PostDto>) => {
		return <Post post={item} />;
	}, []);

	return useMemo(() => {
		return (
			<FlatList<PostDto>
				showsVerticalScrollIndicator={false}
				data={data}
				keyExtractor={(i) => i.id}
				renderItem={renderItem}
				style={styles.contentContainer}
				contentContainerStyle={styles.sectionListContent}
				onEndReached={handleGetNextPage}
				onEndReachedThreshold={0.2}
				initialNumToRender={10}
				refreshing={isFetching}
				onRefresh={onRefresh}
				maxToRenderPerBatch={POSTS_PER_PAGE}
				windowSize={10}
			/>
		);
	}, [data]);
};

const styles = StyleSheet.create({
	contentContainer: {
		flex: 1,
	},
	sectionListContent: {
		paddingBottom: 100,
		gap: spacing.md,
	},
});
