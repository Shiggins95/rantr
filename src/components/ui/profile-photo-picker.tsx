import { Pencil } from '@tamagui/lucide-icons';
import { ProfilePhoto } from '@ui/profile-photo';
import { FC } from 'react';
import { useController } from 'react-hook-form';
import { Pressable } from 'react-native';
import { View } from 'tamagui';

type ProfilePhotoPickerProps = {
	isImageCompressing: boolean;
	pickImage: () => void;
};

export const ProfilePhotoPicker: FC<ProfilePhotoPickerProps> = ({
	pickImage,
	isImageCompressing,
}) => {
	const size = 75;

	const { field } = useController({
		name: 'profilePhotoUrl',
	});

	return (
		<View w={size} h={size}>
			<Pressable onPress={pickImage} disabled={isImageCompressing}>
				<ProfilePhoto
					size={size}
					photoUrl={field.value}
					isLoading={isImageCompressing}
				/>
				<View
					position="absolute"
					bottom={2}
					right={2}
					bg="$secondary"
					w={25}
					h={25}
					borderRadius={10}
					jc="center"
					alignItems="center"
				>
					<Pencil c="$background" size="$size.sm" />
				</View>
			</Pressable>
		</View>
	);
};
