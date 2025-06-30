import { useAuthContext } from '@/src/context/auth-context';
import { XStack, YStack } from 'tamagui';
import { Body, BodyType } from '@ui/body';
import { UserAvatar } from '@ui/user-avatar';
import { getTimestamp } from '@/src/utils/date';
import Popover from '@ui/popover';
import { useState } from 'react';
import { ChevronLeft, MoreVertical } from '@tamagui/lucide-icons';
import { Button } from '@ui/button';
import { UserDto } from '@/src/types/user.types';
import { Pressable } from 'react-native';

type PostCommentHeaderProps = {
	createdAt: Date;
	user: UserDto;
	withNav?: boolean;
	onBackPress?: () => void;
};

const AnonPostBar = ({
	createdAt,
	withNav,
	onBackPress,
}: Omit<PostCommentHeaderProps, 'user'>) => {
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
					<Body variant={BodyType.small} c="$primary">
						@anon
					</Body>
				</YStack>
			</XStack>
			<XStack gap="$md" alignItems="center">
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
}: PostCommentHeaderProps) => {
	const { guestMode } = useAuthContext();
	const [openMenu, setOpenMenu] = useState(false);

	if (guestMode || !user)
		return <AnonPostBar withNav={withNav} createdAt={createdAt} />;

	return (
		<XStack pb="$md" jc="space-between">
			{withNav && (
				<Pressable onPress={onBackPress}>
					<ChevronLeft size="$xl" c="$primary" />
				</Pressable>
			)}
			<XStack gap="$md" alignItems="center">
				<UserAvatar size="sm" user={user} />
				<YStack gap="$sm">
					<Body variant={BodyType.small} c="$primary">
						@{user.username}
					</Body>
				</YStack>
			</XStack>
			<XStack gap="$md" alignItems="center" jc="space-between">
				<Body c="$textMuted" variant={BodyType.extraSmallMonospace}>
					{getTimestamp(createdAt)}
				</Body>
				<Popover
					open={openMenu}
					setOpen={setOpenMenu}
					icon={<MoreVertical size="$lg" c="$primary" />}
					width="$lg"
					height="$lg"
				>
					<Button variant="ghost">Report</Button>
				</Popover>
			</XStack>
		</XStack>
	);
};
