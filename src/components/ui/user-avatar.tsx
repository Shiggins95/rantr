import { RantrImage } from '@ui/image';
import { View } from 'tamagui';

export const USER_AVATAR_SIZES = {
	sm: 30,
	md: 40,
	lg: 60,
};

type UserAvatarProps = {
	url?: string;
	size?: keyof typeof USER_AVATAR_SIZES;
};

export const UserAvatar = ({ url, size = 'sm' }: UserAvatarProps) => {
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
				src={url}
			/>
		</View>
	);
};
