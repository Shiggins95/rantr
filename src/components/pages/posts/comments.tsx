import { CommentDto } from '@/src/types/comments.types';
import { PostCommentHeader } from '@/src/components/pages/tabs/home/feed/posts/post-comment-header';
import { Body } from '@ui/body';
import { View } from 'tamagui';
import { Collapsible } from '../../Collapsible';
import { useCurrentUser } from '@/src/context/auth-context';
import {
	getAnonReplyComments,
	getReplyComments,
} from '@/src/api/methods/comments/get-reply-comments';
import { useSupabaseInfiniteQuery } from '@/src/api/hooks/use-supabase-infinite-query';
import { ActivityIndicator } from 'react-native';
import { darkColours } from '@/themes/themes';

type CommentViewProps = {
	comment: CommentDto;
	depth?: number;
};

export const CommentView = ({ comment, depth = 0 }: CommentViewProps) => {
	const currentUser = useCurrentUser();
	const {
		data: replies,
		isLoading: loadingReplies,
		isFetching: fetchingReplies,
	} = useSupabaseInfiniteQuery(
		['replies', comment.id],
		currentUser ? getReplyComments : getAnonReplyComments,
		{
			postId: comment.postId,
			parentId: comment.id,
			userId: currentUser?.id,
		},
	);

	const isLoading = loadingReplies || fetchingReplies;

	if (isLoading) {
		return <ActivityIndicator color={darkColours.color.primary.val} />;
	}

	return (
		<View
			bg="$background"
			paddingLeft="$md"
			pt="$md"
			pb="$xs"
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
								replies.map((reply) => (
									<CommentView
										key={reply.id}
										comment={reply}
										depth={depth + 1}
									/>
								))}
						</>
					)}
				</Collapsible>
			</View>
		</View>
	);
};
