import { RantrImage } from '@ui/image';
import { UserDto } from '@/src/types/user.types';
import { View } from 'tamagui';

export const USER_AVATAR_SIZES = {
	sm: 30,
	md: 40,
	lg: 60,
};

type UserAvatarProps = {
	user?: UserDto;
	size?: keyof typeof USER_AVATAR_SIZES;
};

export const UserAvatar = ({ user, size = 'sm' }: UserAvatarProps) => {
	return (
		<View
			w={USER_AVATAR_SIZES[size]}
			h={USER_AVATAR_SIZES[size]}
			borderRadius={USER_AVATAR_SIZES[size]}
			overflow="hidden"
		>
			<RantrImage
				width={USER_AVATAR_SIZES[size]}
				height={USER_AVATAR_SIZES[size]}
				src={user && !!user.profilePhoto ? user.profilePhoto : undefined}
			/>
		</View>
	);
};
