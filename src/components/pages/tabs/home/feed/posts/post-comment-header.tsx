import { useAuthContext } from '@/src/context/auth-context';
import { UserDto } from '@/src/types/user.types';
import { getTimestamp } from '@/src/utils/date';
import { ChevronLeft, MoreVertical } from '@tamagui/lucide-icons';
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
};

const AnonPostBar = ({
	createdAt,
	withNav,
	onBackPress,
	user,
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
	deleted = false,
}: PostCommentHeaderProps) => {
	const { guestMode } = useAuthContext();
	const [openMenu, setOpenMenu] = useState(false);

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

	if (guestMode || !user)
		return (
			<AnonPostBar
				user={userInfo}
				withNav={withNav}
				createdAt={createdAt}
				onBackPress={onBackPress}
				contextOptions={contextOptions}
				deleted={deleted}
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
									minWidth={100}
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
