import { useGetReplies } from '@/src/api/hooks/comments/use-get-replies';
import { CommentSkeleton } from '@/src/components/pages/posts/comment.skeleton';
import { PostCommentHeader } from '@/src/components/pages/tabs/home/feed/posts/post-comment-header';
import { spacing } from '@/src/constants/spacing';
import { CommentDto } from '@/src/types/comments.types';
import { ArrowRight } from '@tamagui/lucide-icons';
import { Body, BodyType } from '@ui/body';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';
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

	const {
		data: replies,
		isLoading: loadingReplies,
		isFetching: fetchingReplies,
	} = useGetReplies({
		commentId: comment.id,
		postId: comment.postId,
		enabled: true,
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

	if (isLoading && depth === 0) {
		return <CommentSkeleton depth={depth} />;
	}

	return (
		<View
			bg="$background"
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
					{isLoading ? (
						<Body>Loading...</Body>
					) : (
						<>
							<Body>{comment.comment}</Body>
							{replies &&
								depth < MAX_COMMENT_DEPTH &&
								replies.map((reply) => (
									<CommentView
										key={reply.id}
										comment={reply}
										depth={depth + 1}
									/>
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
						</>
					)}
				</Collapsible>
			</View>
		</View>
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
	});
};
