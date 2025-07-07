import { ImageManipulator, SaveFormat } from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { Dispatch, SetStateAction, useState } from 'react';
import { Alert } from 'react-native';

type UseImagePicker = {
	onChange?: (value: string | undefined) => void;
	onChangeMultiple?: (value: string[] | undefined) => void;
	multiple?: boolean;
	remainingAllowed?: number;
	setPlaceholders?: Dispatch<SetStateAction<string[]>>;
};

export const useImagePicker = ({
	onChange,
	onChangeMultiple,
	multiple,
	remainingAllowed = 10,
	setPlaceholders,
}: UseImagePicker) => {
	const [isImageCompressing, setIsImageCompressing] = useState(false);

	const handleSingleImagePick = async (imageUri: string) => {
		const context = ImageManipulator.manipulate(imageUri);
		context.resize({ width: 200, height: 200 });
		const imageResult = await context.renderAsync();
		const result = await imageResult.saveAsync({
			format: SaveFormat.JPEG,
			compress: 0.5,
		});
		onChange?.(result.uri);
	};

	const handleMultipleImagePick = async (imageUris: string[]) => {
		setPlaceholders?.(imageUris);

		const compressedUris = await Promise.all(
			imageUris.map(async (imageUri) => {
				const startingContext = ImageManipulator.manipulate(imageUri);
				const { width } = await startingContext.renderAsync();
				const minWidth = 250;
				const halvedWidth = width / 2;

				const context = ImageManipulator.manipulate(imageUri);
				context.resize({
					width: halvedWidth < minWidth ? minWidth : halvedWidth,
				});
				const imageResult = await context.renderAsync();

				const result = await imageResult.saveAsync({
					format: SaveFormat.JPEG,
					compress: 0.5,
				});

				return result.uri;
			}),
		);

		onChangeMultiple?.(compressedUris);
		setPlaceholders?.([]);
	};

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ['images'],
			aspect: [4, 3],
			quality: 1,
			allowsEditing: !multiple,
			selectionLimit: multiple ? remainingAllowed : 1,
			allowsMultipleSelection: multiple || false,
		});

		if (!result.canceled) {
			setIsImageCompressing(true);

			try {
				if (!multiple) {
					await handleSingleImagePick(result.assets[0].uri);
				} else {
					await handleMultipleImagePick(
						result.assets.map((asset) => asset.uri),
					);
				}
			} catch {
				Alert.alert('Error', 'Failed to process image.');
			} finally {
				setIsImageCompressing(false);
			}
		}
	};

	return {
		pickImage,
		isImageCompressing,
		setIsImageCompressing,
	};
};
