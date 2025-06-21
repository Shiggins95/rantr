import { Spinner, View, Image } from 'tamagui';
import { FC } from 'react';
import { User2 } from '@tamagui/lucide-icons';

type ProfilePhotoProps = {
	size: number;
	photoUrl?: string;
	isLoading?: boolean;
};

export const ProfilePhoto: FC<ProfilePhotoProps> = ({
	size,
	photoUrl,
	isLoading,
}) => {
	return (
		<View
			w={size}
			h={size}
			borderRadius={size / 2}
			jc="center"
			alignItems="center"
			bg="$backgroundSubtle"
		>
			{!!photoUrl && (
				<Image
					borderRadius={size / 2}
					source={{
						uri: photoUrl,
						width: size,
						height: size,
					}}
				/>
			)}
			{!photoUrl && !isLoading && <User2 size="$size.xl" c="$background" />}

			{isLoading && (
				<View
					w={size}
					h={size}
					borderRadius={size / 2}
					jc="center"
					alignItems="center"
					position="absolute"
					bg="$overlay"
				>
					<Spinner size="small" color="$secondary" />
				</View>
			)}
		</View>
	);
};
