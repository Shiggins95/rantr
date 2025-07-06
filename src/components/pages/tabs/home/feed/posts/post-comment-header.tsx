import { useAuthContext } from '@/src/context/auth-context';
import { UserDto } from '@/src/types/user.types';
import { getTimestamp } from '@/src/utils/date';
import { ChevronLeft, MoreVertical } from '@tamagui/lucide-icons';
import { Body, BodyType } from '@ui/body';
import { Button } from '@ui/button';
import Popover from '@ui/popover';
import { UserAvatar } from '@ui/user-avatar';
import { useState } from 'react';
import { Pressable } from 'react-native';
import { XStack, YStack } from 'tamagui';

export type ContextOption = {
	label: string;
	onPress: () => void;
};

type PostCommentHeaderProps = {
	createdAt: Date;
	user: UserDto;
	withNav?: boolean;
	onBackPress?: () => void;
	contextOptions: ContextOption[];
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
	contextOptions,
}: PostCommentHeaderProps) => {
	const { guestMode } = useAuthContext();
	const [openMenu, setOpenMenu] = useState(false);

	if (guestMode || !user)
		return (
			<AnonPostBar
				withNav={withNav}
				createdAt={createdAt}
				onBackPress={onBackPress}
				contextOptions={contextOptions}
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
					{contextOptions.map((option) => {
						return (
							<Button
								key={option.label}
								variant="ghost"
								onPress={option.onPress}
							>
								{option.label}
							</Button>
						);
					})}
				</Popover>
			</XStack>
		</XStack>
	);
};
