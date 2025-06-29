import { useAuthContext } from '@/src/context/auth-context';
import { XStack, YStack } from 'tamagui';
import { Body, BodyType } from '@ui/body';
import { UserAvatar } from '@ui/user-avatar';
import { PostDto } from '@/src/types/posts.types';
import { getTimestamp } from '@/src/utils/date';
import Popover from '@ui/popover';
import { useState } from 'react';
import { MoreVertical } from '@tamagui/lucide-icons';
import { Button } from '@ui/button';

type PostHeaderProps = {
	post: PostDto;
};

const AnonPostBar = ({ post }: PostHeaderProps) => {
	return (
		<XStack pb="$md" jc="space-between">
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
					{getTimestamp(post.createdAt)}
				</Body>
			</XStack>
		</XStack>
	);
};

export const PostHeader = ({ post }: PostHeaderProps) => {
	const { guestMode } = useAuthContext();
	const [openMenu, setOpenMenu] = useState(false);

	if (guestMode || !post.user) return <AnonPostBar post={post} />;

	return (
		<XStack pb="$md" jc="space-between">
			<XStack gap="$md" alignItems="center">
				<UserAvatar size="sm" user={post.user} />
				<YStack gap="$sm">
					<Body variant={BodyType.small} c="$primary">
						@{post.user.username}
					</Body>
				</YStack>
			</XStack>
			<XStack gap="$md" alignItems="center" jc="space-between">
				<Body c="$textMuted" variant={BodyType.small}>
					{getTimestamp(post.createdAt)}
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
