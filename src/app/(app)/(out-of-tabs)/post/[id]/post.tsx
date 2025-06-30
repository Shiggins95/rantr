import { useLocalSearchParams, useRouter } from 'expo-router';
import { Page } from '@/src/components/page';
import { Headline, HeadlineType } from '@ui/healine';
import { useSupabaseQuery } from '@/src/api/hooks/use-supabase-query';
import { useCurrentUser } from '@/src/context/auth-context';
import { getPost, getPostAnon } from '@/src/api/methods/posts/get-post';
import { PostInteractions } from '@/src/components/pages/tabs/home/feed/posts/post-interactions';
import { useEffect } from 'react';
import { View } from 'tamagui';
import { Body, BodyType } from '@ui/body';
import { PostTag } from '@/src/components/pages/tabs/home/feed/posts/post-tag';
import { PostDto } from '@/src/types/posts.types';
import { FlatList } from 'react-native';
import { CommentDto } from '@/src/types/comments.types';
import { ImageCarousel } from '@ui/image-carousel';
import { getRootComments } from '@/src/api/methods/comments/get-root-comments';
import { CommentView } from '@/src/components/pages/posts/comments';
import { useSupabaseInfiniteQuery } from '@/src/api/hooks/use-supabase-infinite-query';
import { COMMENTS_PER_PAGE } from '@/src/constants/query';

type SinglePostHeaderProps = {
	post: PostDto;
};

const SinglePostHeader = ({ post }: SinglePostHeaderProps) => {
	return (
		<View px="$md">
			<PostTag post={post} />
			<View my="$md">
				{post.images.length > 0 && (
					<ImageCarousel isFullPage images={post.images} />
				)}
			</View>
			<Headline variant={HeadlineType.h3Thin}>{post.title}</Headline>
			<Body variant={BodyType.small}>{post.content}</Body>
			<PostInteractions isFullPage post={post} />
		</View>
	);
};

export default function PostFullPage() {
	const router = useRouter();
	const { id } = useLocalSearchParams();
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
		console.log('getting next page§', hasNextPage);
		await fetchNextPage();
	};

	return (
		<Page withNavigationHeader isSafeAreaTop>
			{isLoading && <Headline>Loading...</Headline>}
			{!isLoading && post && (
				<FlatList
					showsVerticalScrollIndicator={false}
					bounces={(post.commentCount || 0) > 5}
					data={comments}
					contentContainerStyle={{
						paddingBottom: 100,
					}}
					renderItem={renderItem}
					ListHeaderComponent={() => <SinglePostHeader post={post} />}
					onEndReached={onEndReached}
				/>
			)}
		</Page>
	);
}
