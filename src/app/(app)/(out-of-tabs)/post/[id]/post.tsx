import { useLocalSearchParams, useRouter } from 'expo-router';
import { Page } from '@/src/components/page';
import { Headline, HeadlineType } from '@ui/healine';
import { useSupabaseQuery } from '@/src/api/hooks/use-supabase-query';
import { useCurrentUser } from '@/src/context/auth-context';
import { getPost, getPostAnon } from '@/src/api/methods/posts/get-post';
import { PostInteractions } from '@/src/components/pages/tabs/home/feed/posts/post-interactions';
import { useEffect, useMemo, useRef } from 'react';
import { View } from 'tamagui';
import { Body, BodyType } from '@ui/body';
import { PostTag } from '@/src/components/pages/tabs/home/feed/posts/post-tag';
import { PostDto } from '@/src/types/posts.types';
import { FlatList, StyleSheet } from 'react-native';
import { CommentDto } from '@/src/types/comments.types';
import { getRootComments } from '@/src/api/methods/comments/get-root-comments';
import { CommentView } from '@/src/components/pages/posts/comments';
import { useSupabaseInfiniteQuery } from '@/src/api/hooks/use-supabase-infinite-query';
import { COMMENTS_PER_PAGE } from '@/src/constants/query';
import { ExpandableImageCarousel } from '@ui/expandable-image-carousel';

type SinglePostHeaderProps = {
	post: PostDto;
};

const SinglePostHeader = ({ post }: SinglePostHeaderProps) => {
	return (
		<View px="$md">
			<PostTag post={post} />
			<ExpandableImageCarousel renderType="post-full" post={post} />
			<Headline variant={HeadlineType.h3Thin}>{post.title}</Headline>
			<Body variant={BodyType.small}>{post.content}</Body>
			<PostInteractions isFullPage post={post} />
		</View>
	);
};

export default function PostFullPage() {
	const router = useRouter();
	const { id, toComments } = useLocalSearchParams();
	const flatListRef = useRef<FlatList | null>(null);
	const currentUser = useCurrentUser();
	const { isLoading: isLoadingPost, data: post } = useSupabaseQuery(
		['post', id],
		currentUser ? getPost : getPostAnon,
		{
			userId: currentUser?.id,
			postId: id as string,
		},
	);

	const {
		isLoading: isLoadingComments,
		fetchNextPage,
		hasNextPage,
		data: comments,
	} = useSupabaseInfiniteQuery(
		[`comments.${id}`],
		getRootComments,
		{
			userId: currentUser?.id,
			postId: id as string,
		},
		{
			getNextPageParam: (lastPage, allPages) => {
				return lastPage?.length === COMMENTS_PER_PAGE
					? allPages.length * COMMENTS_PER_PAGE
					: undefined;
			},
		},
	);

	const isLoading = isLoadingPost || isLoadingComments;

	useEffect(() => {
		if (!post || !comments || isLoading) return;
		if (
			toComments === 'true' &&
			flatListRef.current &&
			(post.commentCount || 0) > 0
		) {
			flatListRef.current.scrollToIndex({
				index: 0,
				animated: true,
			});
		}
	}, [post, comments, toComments]);

	useEffect(() => {
		if (!post) return;
		router.setParams({
			user: JSON.stringify(post.user || {}),
			createdAt: post.createdAt.toISOString(),
		});
	}, [post]);

	const renderItem = ({ item }: { item: CommentDto }) => {
		return <CommentView comment={item} depth={0} />;
	};

	const onEndReached = async () => {
		if (hasNextPage) {
			await fetchNextPage();
		}
	};

	const postHeader = useMemo(() => {
		if (!post || isLoading) return null;
		return <SinglePostHeader post={post} />;
	}, [post, isLoading, comments]);

	return (
		<Page withNavigationHeader isSafeAreaTop>
			{isLoading && <Headline>Loading...</Headline>}
			{!isLoading && post && (
				<FlatList
					ref={flatListRef}
					showsVerticalScrollIndicator={false}
					bounces={(post.commentCount || 0) > 5}
					data={comments}
					contentContainerStyle={styles.contentContainer}
					renderItem={renderItem}
					ListHeaderComponent={postHeader}
					onEndReached={onEndReached}
				/>
			)}
		</Page>
	);
}

const styles = StyleSheet.create({
	contentContainer: {
		paddingBottom: 100,
	},
});
