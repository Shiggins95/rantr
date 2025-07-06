import { useGetComments } from '@/src/api/hooks/comments/use-get-comments';
import { useGetReplies } from '@/src/api/hooks/comments/use-get-replies';
import { useSupabaseQuery } from '@/src/api/hooks/common/use-supabase-query';
import { getPost, getPostAnon } from '@/src/api/methods/posts/get-post';
import { Page } from '@/src/components/page';
import { AddCommentWidget } from '@/src/components/pages/posts/add-comment-widget';
import { CommentView } from '@/src/components/pages/posts/comment-view';
import { PostInteractions } from '@/src/components/pages/tabs/home/feed/posts/post-interactions';
import { PostTag } from '@/src/components/pages/tabs/home/feed/posts/post-tag';
import { useCurrentUser } from '@/src/context/auth-context';
import { CommentDto } from '@/src/types/comments.types';
import { PostDto } from '@/src/types/posts.types';
import { useQueryClient } from '@tanstack/react-query';
import { Body, BodyType } from '@ui/body';
import { ExpandableImageCarousel } from '@ui/expandable-image-carousel';
import { Headline, HeadlineType } from '@ui/healine';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
	Dimensions,
	FlatList,
	Keyboard,
	StyleSheet,
	TouchableWithoutFeedback,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
			<PostInteractions isFullPage item={post} type="post" />
		</View>
	);
};

export default function PostFullPage() {
	// region state
	const queryClient = useQueryClient();
	const router = useRouter();
	const { id, toComments, commentId } = useLocalSearchParams<{
		id: string;
		toComments: 'true' | 'false';
		commentId: string;
	}>();
	const flatListRef = useRef<FlatList | null>(null);
	const insets = useSafeAreaInsets();
	const currentUser = useCurrentUser();
	const [refreshing, setRefreshing] = useState(false);
	const inputRef = useRef<TextInput | null>(null);
	const { height: screenHeight } = Dimensions.get('window');
	const commentInsertedRef = useRef(false);
	const [focussedComment, setFocussedComment] = useState<
		CommentDto | undefined
	>();
	// endregion

	// region queries
	const {
		isLoading: isLoadingPost,
		data: post,
		refetch,
	} = useSupabaseQuery(['post', id], currentUser ? getPost : getPostAnon, {
		userId: currentUser?.id,
		postId: id,
	});

	const {
		isLoading: isLoadingComments,
		fetchNextPage,
		hasNextPage,
		data: comments,
	} = useGetComments({ postId: id, enabled: !commentId });

	const {
		isLoading: isLoadingReplyComments,
		fetchNextPage: fetchNextReplyPage,
		hasNextPage: hasNextReplyPage,
		data: replies,
	} = useGetReplies({ commentId: commentId, postId: id, enabled: !!commentId });

	const isLoading = isLoadingPost || isLoadingComments;
	// endregion

	// region methods
	const onCommentReplyPress = (comment: CommentDto) => {
		setFocussedComment(comment);
		inputRef.current?.focus();
	};

	const renderItem = ({ item }: { item: CommentDto }) => {
		return (
			<CommentView
				onCommentReplyPress={onCommentReplyPress}
				comment={item}
				depth={0}
			/>
		);
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

	const onRefresh = async () => {
		setRefreshing(true);
		queryClient.removeQueries({ queryKey: ['post', id] });
		queryClient.removeQueries({ queryKey: ['comments', id] });
		queryClient.removeQueries({ queryKey: ['replies'] });
		await refetch();
	};

	const clearInput = () => {
		// inputRef.current?.blur();
		// inputRef.current?.clear();
		Keyboard.dismiss();
	};
	// endregion

	// region memos
	const postHeader = useMemo(() => {
		if (!post || isLoading) return null;
		return <SinglePostHeader post={post} />;
	}, [post, isLoading]);
	// endregion

	// region useEffect
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

	useEffect(() => {
		const commentsToUse = commentId ? replies : comments;
		if (refreshing && !!commentsToUse && !!post) {
			setRefreshing(false);
		}
	}, [comments, replies, post]);

	useEffect(() => {
		return () => {
			if (!commentInsertedRef.current) return;
			queryClient.removeQueries({ queryKey: ['comments', id] });
			queryClient.removeQueries({ queryKey: ['replies'] });
		};
	}, []);
	// endregion

	return (
		<Page withNavigationHeader isSafeAreaTop>
			<View>
				{isLoading && <Headline>Loading...</Headline>}
				{!isLoading && post && (
					<>
						<View h={screenHeight - 50 - insets.top}>
							<TouchableWithoutFeedback onPress={clearInput}>
								<FlatList
									ref={flatListRef}
									showsVerticalScrollIndicator={false}
									data={commentId ? replies : comments}
									contentContainerStyle={styles.contentContainer}
									renderItem={renderItem}
									ListHeaderComponent={postHeader}
									style={{ flex: 1 }}
									onEndReached={onEndReached}
									refreshing={refreshing}
									onRefresh={onRefresh}
								/>
							</TouchableWithoutFeedback>
							{currentUser && (
								<AddCommentWidget
									clearReplyToComment={() => setFocussedComment(undefined)}
									flatListRef={flatListRef}
									ref={inputRef}
									post={post}
									replyToComment={focussedComment}
									onCommentAdd={() => (commentInsertedRef.current = true)}
								/>
							)}
						</View>
					</>
				)}
			</View>
		</Page>
	);
}

const styles = StyleSheet.create({
	contentContainer: {
		paddingBottom: 150,
		// flex: 1,
	},
});
