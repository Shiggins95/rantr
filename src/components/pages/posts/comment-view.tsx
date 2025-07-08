import { useGetReplies } from '@/src/api/hooks/comments/use-get-replies';
import { MAX_COMMENT_DEPTH } from '@/src/api/schemas/comments.schema';
import { CommentSkeleton } from '@/src/components/pages/posts/comment.skeleton';
import {
	ContextOption,
	PostCommentHeader,
} from '@/src/components/pages/tabs/home/feed/posts/post-comment-header';
import { PostInteractions } from '@/src/components/pages/tabs/home/feed/posts/post-interactions';
import { Colours } from '@/src/constants/colours';
import { spacing } from '@/src/constants/spacing';
import { useCurrentUser } from '@/src/context/auth-context';
import { CommentDto } from '@/src/types/comments.types';
import { useColorScheme } from '@hooks/useColorScheme';
import { ArrowRight, Flag, Glasses, Pencil } from '@tamagui/lucide-icons';
import { useQueryClient } from '@tanstack/react-query';
import { Body, BodyType } from '@ui/body';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
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
	onCommentReplyPress: (comment: CommentDto, depth: number) => void;
	onEditCommentPress: (comment: CommentDto) => void;
	onLongPress?: () => void;
};

export const CommentView = ({
	comment,
	depth = 0,
	onCommentReplyPress,
	onLongPress: _onLongPress,
	onEditCommentPress,
}: CommentViewProps) => {
	const queryClient = useQueryClient();
	const styles = useStyles();
	const router = useRouter();
	const theme = useColorScheme() ?? 'dark';
	const initialAddedColour = Colours[theme].primary40;
	const bgColour = Colours[theme].background;
	const colourProgress = useSharedValue(0);
	const [open, setOpen] = useState(
		(depth <= 1 && !comment.deleted) || comment.isLocal || false,
	);
	const onLongPress = depth === 0 ? () => setOpen(false) : _onLongPress;
	const currentUser = useCurrentUser();

	const [showOriginal, setShowOriginal] = useState(false);

	const {
		data: replies,
		isLoading: loadingReplies,
		isFetching: fetchingReplies,
	} = useGetReplies({
		commentId: comment.id,
		postId: comment.postId,
		enabled: !comment.isLocal && !comment.deleted,
	});

	const navigateToPostWithComments = () => {
		queryClient.removeQueries({ queryKey: ['replies', comment.replyId] });
		queryClient.removeQueries({ queryKey: ['replies', comment.id] });
		router.push({
			pathname: '/(app)/(out-of-tabs)/post/[id]/[parentId]/post',
			params: {
				id: comment.postId,
				// use the parent id so that this comment is returned in the response
				parentId: comment.replyId || '',
				commentId: comment.id,
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

	const triggerCommentReply = () => {
		onCommentReplyPress(comment, depth);
	};

	const contextMenuOptions = useMemo<ContextOption[]>(() => {
		const options = [
			{
				label: 'Report',
				icon: <Flag size="$size.md" c="$primary" />,
				onPress: () => console.info('report'),
			},
		];

		if (comment.userId === currentUser?.id) {
			options.push({
				label: 'Edit',
				icon: <Pencil size="$size.md" c="$primary" />,
				onPress: () => {
					onEditCommentPress(comment);
				},
			});
		}

		if (comment.edited) {
			options.push({
				label: showOriginal ? 'Show current' : 'Show original',
				icon: <Glasses size="$size.md" c="$primary" />,
				onPress: () => setShowOriginal(!showOriginal),
			});
		}

		return options;
	}, [comment, currentUser, showOriginal]);

	if (isLoading && depth === 0) {
		return <CommentSkeleton depth={depth} />;
	}

	return (
		<Animated.View
			style={!comment.isLocal ? styles.baseComment : animatedStyle}
		>
			<Pressable onLongPress={onLongPress}>
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
							open={open}
							setOpen={setOpen}
							onLongPress={onLongPress}
							heading={
								<PostCommentHeader
									entityId={comment.id}
									showDelete
									createdAt={comment.createdAt}
									user={comment.user}
									contextOptions={contextMenuOptions}
									deleted={comment.deleted}
									type="comment"
									edited={comment.edited}
								/>
							}
						>
							{!comment.deleted && (
								<Body>
									{showOriginal ? comment.originalComment : comment.comment}
								</Body>
							)}
							{comment.deleted && <Body c="$textMuted">Comment deleted</Body>}
							<PostInteractions
								item={comment}
								type="comment"
								onCommentButtonPress={triggerCommentReply}
							/>
							{replies &&
								depth < MAX_COMMENT_DEPTH &&
								replies.map((reply) => (
									<CommentView
										onEditCommentPress={onEditCommentPress}
										onCommentReplyPress={onCommentReplyPress}
										key={reply.id}
										comment={reply}
										depth={depth + 1}
										onLongPress={
											depth === 0 ? () => setOpen(false) : onLongPress
										}
									/>
								))}
							{replies.length > 0 && depth >= MAX_COMMENT_DEPTH && (
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
			</Pressable>
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
