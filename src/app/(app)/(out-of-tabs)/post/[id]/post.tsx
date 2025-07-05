import { useSupabaseInfiniteQuery } from '@/src/api/hooks/use-supabase-infinite-query';
import { useSupabaseQuery } from '@/src/api/hooks/use-supabase-query';
import { getReplyComments } from '@/src/api/methods/comments/get-reply-comments';
import { getRootComments } from '@/src/api/methods/comments/get-root-comments';
import { getPost, getPostAnon } from '@/src/api/methods/posts/get-post';
import { Page } from '@/src/components/page';
import { CommentView } from '@/src/components/pages/posts/comments';
import { PostInteractions } from '@/src/components/pages/tabs/home/feed/posts/post-interactions';
import { PostTag } from '@/src/components/pages/tabs/home/feed/posts/post-tag';
import { COMMENTS_PER_PAGE } from '@/src/constants/query';
import { useCurrentUser } from '@/src/context/auth-context';
import { CommentDto } from '@/src/types/comments.types';
import { PostDto } from '@/src/types/posts.types';
import { Body, BodyType } from '@ui/body';
import { ExpandableImageCarousel } from '@ui/expandable-image-carousel';
import { Headline, HeadlineType } from '@ui/healine';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useRef } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { View } from 'tamagui';

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
	// region state
	const router = useRouter();
	const { id, toComments, commentId } = useLocalSearchParams();
	const flatListRef = useRef<FlatList | null>(null);
	const currentUser = useCurrentUser();
	// endregion

	// region queries
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
			enabled: !commentId,
			getNextPageParam: (lastPage, allPages) => {
				return lastPage?.length === COMMENTS_PER_PAGE
					? allPages.length * COMMENTS_PER_PAGE
					: undefined;
			},
		},
	);

	const {
		isLoading: isLoadingReplyComments,
		fetchNextPage: fetchNextReplyPage,
		hasNextPage: hasNextReplyPage,
		data: replies,
	} = useSupabaseInfiniteQuery(
		[`post-reply-comments.${commentId}`],
		getReplyComments,
		{
			userId: currentUser?.id,
			postId: id as string,
			parentId: commentId as string,
		},
		{
			enabled: !!commentId,
			getNextPageParam: (lastPage, allPages) => {
				return lastPage?.length === COMMENTS_PER_PAGE
					? allPages.length * COMMENTS_PER_PAGE
					: undefined;
			},
		},
	);

	const isLoading = isLoadingPost || isLoadingComments;
	// endregion

	// region useEffects
	useEffect(() => {
		const commentsToUse = commentId ? replies : comments;
		const isLoadingToUse = commentId
			? isLoadingReplyComments
			: isLoadingComments;
		if (!post || !commentsToUse || isLoadingToUse) return;
		if (toComments === 'true' && flatListRef.current) {
			flatListRef.current.scrollToIndex({
				index: 0,
				animated: true,
			});
		}
	}, [post, comments, toComments, commentId]);

	useEffect(() => {
		if (!post) return;
		router.setParams({
			user: JSON.stringify(post.user || {}),
			createdAt: post.createdAt.toISOString(),
		});
	}, [post]);
	// endregion

	// region methods
	const renderItem = ({ item }: { item: CommentDto }) => {
		return <CommentView comment={item} depth={0} />;
	};

	const onEndReached = async () => {
		if (commentId) {
			if (!hasNextReplyPage) return;
			await fetchNextReplyPage();
			return;
		}
		if (!hasNextPage) return;
		await fetchNextPage();
	};
	// endregion

	// region memos
	const postHeader = useMemo(() => {
		if (!post || isLoading) return null;
		return <SinglePostHeader post={post} />;
	}, [post, isLoading]);
	// endregion

	return (
		<Page withNavigationHeader isSafeAreaTop>
			{isLoading && <Headline>Loading...</Headline>}
			{!isLoading && post && (
				<FlatList
					ref={flatListRef}
					showsVerticalScrollIndicator={false}
					bounces={(post.commentCount || 0) > 5}
					data={commentId ? replies : comments}
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
