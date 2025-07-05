import { useGetComments } from '@/src/api/hooks/comments/use-get-comments';
import { useGetReplies } from '@/src/api/hooks/comments/use-get-replies';
import { useSupabaseQuery } from '@/src/api/hooks/common/use-supabase-query';
import { getPost, getPostAnon } from '@/src/api/methods/posts/get-post';
import { Page } from '@/src/components/page';
import { CommentView } from '@/src/components/pages/posts/comments';
import { PostInteractions } from '@/src/components/pages/tabs/home/feed/posts/post-interactions';
import { PostTag } from '@/src/components/pages/tabs/home/feed/posts/post-tag';
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
	} = useGetComments({ postId: id as string, enabled: !commentId });

	const {
		isLoading: isLoadingReplyComments,
		fetchNextPage: fetchNextReplyPage,
		hasNextPage: hasNextReplyPage,
		data: replies,
	} = useGetReplies({
		commentId: commentId as string,
		postId: id as string,
		enabled: !!commentId,
	});

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
