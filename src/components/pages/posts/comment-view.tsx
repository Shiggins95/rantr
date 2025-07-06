import { useGetReplies } from '@/src/api/hooks/comments/use-get-replies';
import { CommentSkeleton } from '@/src/components/pages/posts/comment.skeleton';
import { PostCommentHeader } from '@/src/components/pages/tabs/home/feed/posts/post-comment-header';
import { Colours } from '@/src/constants/colours';
import { spacing } from '@/src/constants/spacing';
import { CommentDto } from '@/src/types/comments.types';
import { useColorScheme } from '@hooks/useColorScheme';
import { ArrowRight } from '@tamagui/lucide-icons';
import { Body, BodyType } from '@ui/body';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { View } from 'tamagui';
import { Collapsible } from '../../Collapsible';

type CommentViewProps = {
	comment: CommentDto;
	depth?: number;
};

const MAX_COMMENT_DEPTH = 2;

export const CommentView = ({ comment, depth = 0 }: CommentViewProps) => {
	const styles = useStyles();
	const router = useRouter();
	const theme = useColorScheme() ?? 'dark';
	const initialAddedColour = Colours[theme].primary40;
	const bgColour = Colours[theme].background;
	const colourProgress = useSharedValue(0);

	const {
		data: replies,
		isLoading: loadingReplies,
		isFetching: fetchingReplies,
	} = useGetReplies({
		commentId: comment.id,
		postId: comment.postId,
		enabled: !comment.isLocal,
	});

	const navigateToPostWithComments = () => {
		router.push({
			pathname: '/(app)/(out-of-tabs)/post/[id]/[commentId]/post',
			params: {
				id: comment.postId,
				// use the parent id so that this comment is returned in the response
				commentId: comment.replyId || '',
				toComments: 'true',
			},
		});
	};

	const isLoading = loadingReplies || fetchingReplies;

	const animatedStyle = useAnimatedStyle(() => {
		const backgroundColor = interpolateColor(
			colourProgress.value,
			[0, 1],
			[initialAddedColour, bgColour],
		);

		return {
			backgroundColor,
			...styles.baseComment,
		};
	});

	useEffect(() => {
		if (isLoading) {
			colourProgress.value = 0;
			return;
		}
		if (comment.isLocal) {
			colourProgress.value = withTiming(1, {
				duration: 1000,
			});
		}
	}, [comment.isLocal, isLoading]);

	if (isLoading && depth === 0) {
		return <CommentSkeleton depth={depth} />;
	}

	return (
		<Animated.View
			style={!comment.isLocal ? styles.baseComment : animatedStyle}
		>
			<View
				bg="$background"
				paddingRight={depth === 0 ? '$md' : 0}
				paddingLeft="$md"
				pt="$md"
				pb={depth === 0 ? '$xs' : 0}
				alignItems="center"
				my="$xs"
				mb={depth > 0 ? 0 : '$xs'}
				jc="space-between"
				position="relative"
				borderBottomWidth={depth > 0 ? 2 : 0}
				borderLeftWidth={depth > 0 ? 2 : 0}
				borderColor="$primary20"
			>
				<View f={1} flexGrow={1} w="100%">
					<Collapsible
						isOpenDefault={depth === 0}
						heading={
							<PostCommentHeader
								createdAt={comment.createdAt}
								user={comment.user}
							/>
						}
					>
						<Body>{comment.comment}</Body>
						{replies &&
							depth < MAX_COMMENT_DEPTH &&
							replies.map((reply) => (
								<CommentView key={reply.id} comment={reply} depth={depth + 1} />
							))}
						{comment.replies.length > 0 && depth >= MAX_COMMENT_DEPTH && (
							<Pressable
								style={styles.continueThread}
								onPress={navigateToPostWithComments}
							>
								<Body c="$primary" variant={BodyType.small}>
									Continue thread
								</Body>
								<ArrowRight size="$size.sm" c="$primary" />
							</Pressable>
						)}
					</Collapsible>
				</View>
			</View>
		</Animated.View>
	);
};

const useStyles = () => {
	return StyleSheet.create({
		continueThread: {
			paddingVertical: spacing.md,
			paddingHorizontal: spacing.md,
			flexDirection: 'row',
			alignItems: 'center',
			gap: spacing.sm,
		},
		baseComment: { flex: 1, flexGrow: 1, width: '100%' },
	});
};
