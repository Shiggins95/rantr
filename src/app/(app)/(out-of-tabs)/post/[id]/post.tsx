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
import { PostCommentHeader } from '@/src/components/pages/tabs/home/feed/posts/post-comment-header';
import { ImageCarousel } from '@ui/image-carousel';

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
	const {
		isLoading,
		isFetching,
		data: post,
	} = useSupabaseQuery([`post/${id}`], currentUser ? getPost : getPostAnon, {
		userId: currentUser?.id,
		postId: id as string,
	});

	useEffect(() => {
		if (!post) return;
		router.setParams({
			user: JSON.stringify(post.user || {}),
			createdAt: post.createdAt.toISOString(),
		});
	}, [post]);

	const renderItem = ({ item }: { item: CommentDto }) => {
		return (
			<View bg="$background" p="$md" my="$xs">
				<PostCommentHeader createdAt={item.createdAt} user={item.user} />
				<Body>{item.comment}</Body>
			</View>
		);
	};

	return (
		<Page withNavigationHeader isSafeAreaTop>
			{(isLoading || isFetching) && <Headline>Loading...</Headline>}
			{!isLoading && !isFetching && post && (
				<FlatList
					showsVerticalScrollIndicator={false}
					bounces={(post.commentCount || 0) > 5}
					data={post.comments}
					contentContainerStyle={{
						paddingBottom: 100,
					}}
					renderItem={renderItem}
					ListHeaderComponent={() => <SinglePostHeader post={post} />}
				/>
			)}
		</Page>
	);
}
