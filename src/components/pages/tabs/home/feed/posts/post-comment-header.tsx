import { useSupabaseMutation } from '@/src/api/hooks/common/use-supabase-mutation';
import { onSuccessDeleteComment } from '@/src/api/invalidations/comment-deletion';
import { onSuccessPostDeletion } from '@/src/api/invalidations/post-deletion';
import { deleteComment } from '@/src/api/methods/comments/delete-comment';
import { deletePost } from '@/src/api/methods/posts/delete-post';
import { useAuthContext } from '@/src/context/auth-context';
import { UserDto } from '@/src/types/user.types';
import { getTimestamp } from '@/src/utils/date';
import { ChevronLeft, MoreVertical, Trash } from '@tamagui/lucide-icons';
import { useToastController } from '@tamagui/toast';
import { Body, BodyType } from '@ui/body';
import { Button } from '@ui/button';
import Popover from '@ui/popover';
import { UserAvatar } from '@ui/user-avatar';
import { ReactNode, useMemo, useState } from 'react';
import { Pressable } from 'react-native';
import { View, XStack, YStack } from 'tamagui';

export type ContextOption = {
	label: string;
	onPress: () => void;
	icon?: ReactNode;
};

type HeaderUser = Partial<UserDto> & {
	headerColour?: '$primary' | '$primary50';
	avatar?: string;
};

type PostCommentHeaderProps = {
	createdAt: Date;
	user: HeaderUser;
	withNav?: boolean;
	onBackPress?: () => void;
	contextOptions: ContextOption[];
	deleted?: boolean;
	type: 'post' | 'comment';
	edited?: boolean;
	showDelete?: boolean;
	entityId: string;
};

const AnonPostBar = ({
	createdAt,
	withNav,
	onBackPress,
	user,
	edited,
	deleted,
}: PostCommentHeaderProps) => {
	return (
		<XStack pb="$md" jc="space-between">
			{withNav && (
				<Pressable onPress={onBackPress}>
					<ChevronLeft size="$xl" c="$primary" />
				</Pressable>
			)}
			<XStack gap="$md" alignItems="center">
				<UserAvatar size="sm" />
				<YStack gap="$sm">
					<Body variant={BodyType.small} c={user.headerColour}>
						{user.username}
					</Body>
				</YStack>
			</XStack>
			<XStack gap="$md" alignItems="center">
				{edited && !deleted && (
					<Body c="$primary30" variant={BodyType.small}>
						Edited
					</Body>
				)}
				<Body c="$textMuted" variant={BodyType.small}>
					{getTimestamp(createdAt)}
				</Body>
			</XStack>
		</XStack>
	);
};

export const PostCommentHeader = ({
	createdAt,
	user,
	withNav,
	onBackPress,
	contextOptions: _contextOptions,
	deleted = false,
	edited = false,
	showDelete,
	type,
	entityId,
}: PostCommentHeaderProps) => {
	const { guestMode, user: currentUser } = useAuthContext();
	const [openMenu, setOpenMenu] = useState(false);

	const toast = useToastController();

	const { mutateAsync: deleteCommentMutation } = useSupabaseMutation(
		deleteComment,
		{ onSuccess: onSuccessDeleteComment },
	);

	const { mutateAsync: deletePostMutation } = useSupabaseMutation(deletePost, {
		onSuccess: onSuccessPostDeletion,
	});

	const handleDeleteComment = async () => {
		try {
			await deleteCommentMutation(entityId);
			toast.show('Comment deleted', {
				message: 'Comment deleted successfully',
				type: 'success',
			});
		} catch (e) {
			console.error('error deleting comment', e);
			toast.show('Something went wrong', {
				message: 'Failed to delete comment',
				type: 'error',
			});
		}
	};

	const handleDeletePost = async () => {
		try {
			await deletePostMutation(entityId);
			toast.show('Post deleted', {
				message: 'Post deleted successfully',
				type: 'success',
			});
		} catch (e) {
			console.error('error deleting post', e);
			toast.show('Something went wrong', {
				message: 'Failed to delete comment',
				type: 'error',
			});
		}
	};

	const userInfo = useMemo<HeaderUser>(() => {
		if (guestMode || !user) {
			return {
				username: '@anon',
				avatar: '',
				headerColour: '$primary50',
			};
		}
		if (deleted) {
			return {
				username: '-Deleted user-',
				avatar: '',
				headerColour: '$primary50',
			};
		}

		return {
			username: `@${user.username}`,
			avatar: user.profilePhoto || '',
			headerColour: '$primary',
		};
	}, [user, deleted, guestMode]);

	const contextOptions = useMemo(() => {
		const options = [..._contextOptions];
		if (!currentUser) return options;
		if (currentUser.id !== user.id) return options;

		if (showDelete) {
			if (type === 'comment') {
				options.push({
					label: 'Delete',
					icon: <Trash size="$size.md" c="$primary" />,
					onPress: handleDeleteComment,
				});
				return options;
			}

			options.push({
				label: 'Delete',
				icon: <Trash size="$size.md" c="$primary" />,
				onPress: handleDeletePost,
			});
		}

		return options;
	}, [_contextOptions, currentUser, showDelete, type]);

	if (guestMode || !user)
		return (
			<AnonPostBar
				type={type}
				user={userInfo}
				withNav={withNav}
				createdAt={createdAt}
				onBackPress={onBackPress}
				contextOptions={[]}
				deleted={deleted}
				entityId={entityId}
			/>
		);

	return (
		<XStack pb="$md" jc="space-between">
			{withNav && (
				<Pressable onPress={onBackPress}>
					<ChevronLeft size="$xl" c="$primary" />
				</Pressable>
			)}
			<XStack gap="$md" alignItems="center">
				<UserAvatar size="sm" url={userInfo.avatar} />
				<YStack gap="$sm">
					<Body variant={BodyType.small} c={userInfo.headerColour}>
						{userInfo.username}
					</Body>
				</YStack>
			</XStack>
			<XStack gap="$md" alignItems="center" jc="space-between">
				{edited && !deleted && (
					<Body c="$primary30" variant={BodyType.small}>
						Edited
					</Body>
				)}
				<Body c="$textMuted" variant={BodyType.extraSmallMonospace}>
					{getTimestamp(createdAt)}
				</Body>
				<Popover
					disabled={deleted}
					open={openMenu}
					setOpen={setOpenMenu}
					icon={<MoreVertical size="$lg" c="$primary" />}
					width="$lg"
					height="$lg"
				>
					{contextOptions.map((option) => {
						return (
							<Button
								key={option.label}
								variant="ghost"
								alignItems="center"
								onPress={() => {
									option.onPress();
									setOpenMenu(false);
								}}
							>
								<View
									fd="row"
									minWidth={150}
									jc="space-between"
									alignItems="center"
								>
									<Body variant={BodyType.small}>{option.label}</Body>
									{option.icon}
								</View>
							</Button>
						);
					})}
				</Popover>
			</XStack>
		</XStack>
	);
};
