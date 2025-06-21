import { ProfilePhoto } from '@ui/profile-photo';
import { Alert, Pressable } from 'react-native';
import { Dispatch, FC, SetStateAction } from 'react';
import { View } from 'tamagui';
import { Pencil } from '@tamagui/lucide-icons';
import * as ImagePicker from 'expo-image-picker';
import { ImageManipulator, SaveFormat } from 'expo-image-manipulator';
import { useController } from 'react-hook-form';

type ProfilePhotoPickerProps = {
	onChange: (photoUrl: string) => void;
	setIsImageCompressing: Dispatch<SetStateAction<boolean>>;
	isImageCompressing: boolean;
};

export const ProfilePhotoPicker: FC<ProfilePhotoPickerProps> = ({
	onChange,
	setIsImageCompressing,
	isImageCompressing,
}) => {
	const size = 75;

	const { field } = useController({
		name: 'profilePhotoUrl',
	});

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ['images', 'videos'],
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			const selectedUri = result.assets[0].uri;
			setIsImageCompressing(true);

			try {
				const context = ImageManipulator.manipulate(selectedUri);
				context.resize({ width: 200, height: 200 });
				const imageResult = await context.renderAsync();
				const result = await imageResult.saveAsync({
					format: SaveFormat.JPEG,
					compress: 0.5,
				});
				onChange(result.uri);
			} catch (err) {
				console.log('error', err);
				Alert.alert('Error', 'Failed to process image.');
			} finally {
				setIsImageCompressing(false);
			}
		}
	};

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
