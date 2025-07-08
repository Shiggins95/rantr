import { CreateEditPostFormValues } from '@/src/components/forms/create-edit-post/create-edit-post-schema';
import { FullScreenImageCarousel } from '@/src/components/pages/shared/full-screen-image-carousel';
import { Colours } from '@/src/constants/colours';
import { spacing } from '@/src/constants/spacing';
import { useImagePicker } from '@hooks/use-image-picker';
import { useColorScheme } from '@hooks/useColorScheme';
import { FileImage, Trash } from '@tamagui/lucide-icons';
import { Body, BodyType } from '@ui/body';
import { RantrImage } from '@ui/image';
import { InputErrorTypes } from '@ui/select';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useController, UseControllerProps, useWatch } from 'react-hook-form';
import { Dimensions, Pressable, StyleSheet } from 'react-native';
import { Spinner, View } from 'tamagui';

type ImageUploadProps = UseControllerProps &
	InputErrorTypes & {
		multiple?: boolean;
		disabled?: boolean;
		maxLength?: number;
		syncIsImageCompressing: Dispatch<SetStateAction<boolean>>;
	};

export const ImageUpload = (props: ImageUploadProps) => {
	const styles = useStyles();
	const { width: screenWidth } = Dimensions.get('window');
	const [carouselProps, setCarouselProps] = useState({
		open: false,
		startingIndex: 0,
	});
	const [placeholderImages, setPlaceholderImages] = useState<string[]>([]);

	const maxLength = props.maxLength || 10;

	const { rules, defaultValue, name } = props;
	const { field } = useController({
		name,
		rules,
		defaultValue: defaultValue || [],
	});

	const handleChange = (newImages?: string[]) => {
		if (!newImages) return;

		field.onChange([...field.value, ...newImages]);
	};

	const handleRemoveImage = (index: number) => {
		field.onChange(photos.filter((_, i) => i !== index));
	};

	const onCloseCarousel = () => {
		setCarouselProps({
			open: false,
			startingIndex: 0,
		});
	};

	const onOpenCarousel = (index: number) => {
		setCarouselProps({
			open: true,
			startingIndex: index,
		});
	};

	const photos = useWatch<CreateEditPostFormValues>({
		name: 'photos',
	}) as string[];

	const { pickImage, isImageCompressing } = useImagePicker({
		onChangeMultiple: handleChange,
		multiple: props.multiple,
		remainingAllowed: maxLength - photos.length,
		setPlaceholders: setPlaceholderImages,
	});

	const imagesAsMockPostImage = photos.map((photo, index) => {
		return {
			imageUrl: photo,
			postId: '',
			id: index.toString(),
		};
	});

	const imageWidth = (screenWidth - spacing.md * 6) / 5;

	const isDisabled =
		props.disabled || photos.length >= maxLength || isImageCompressing;

	useEffect(() => {
		props.syncIsImageCompressing(isImageCompressing);
	}, [isImageCompressing]);

	return (
		<>
			<FullScreenImageCarousel
				postId="image-upload-carousel"
				images={imagesAsMockPostImage}
				open={carouselProps.open}
				startingIndex={carouselProps.startingIndex}
				onOpenChange={onCloseCarousel}
				parallax={false}
				showRemoveButton
				onRemove={handleRemoveImage}
				resizeMode="contain"
			/>
			<View
				w="100%"
				h={200}
				opacity={isDisabled ? 0.5 : 1}
				borderColor="$borderColor"
				bw={1}
				borderRadius="$radius.l"
				bg="$background"
				alignItems="center"
				jc="center"
				gap="$md"
			>
				<Pressable
					disabled={isDisabled}
					style={styles.containerButton}
					onPress={pickImage}
				>
					<FileImage size="$size.lg" c="$color.textMuted" />
					<Body c="$textMuted" variant={BodyType.normal}>
						Upload images
					</Body>
					{maxLength && photos.length > 0 && (
						<Body variant={BodyType.extraSmall} c="$textMuted">
							Uploaded {photos.length} / {maxLength}
						</Body>
					)}
				</Pressable>
			</View>
			{photos.concat(placeholderImages).length > 0 && (
				<View w="100%" flexWrap="wrap" gap="$md" fd="row">
					{photos.concat(placeholderImages).map((photo, index) => {
						return (
							<View key={photo}>
								{(!isImageCompressing || index < photos.length) && (
									<Pressable
										style={styles.removeButton}
										onPress={() => handleRemoveImage(index)}
									>
										<Trash size="$md" c="$text" />
									</Pressable>
								)}
								<View borderRadius="$radius.l" overflow="hidden">
									{isImageCompressing && index >= photos.length && (
										<View
											w={imageWidth}
											h={imageWidth}
											bg="$background40"
											position="absolute"
											top={0}
											zIndex={10}
											left={0}
											jc="center"
											alignItems="center"
										>
											<Spinner size="small" color="$secondary" />
										</View>
									)}
									<Pressable onPress={() => onOpenCarousel(index)}>
										<RantrImage
											width={imageWidth}
											height={imageWidth}
											src={photo}
											resizeMode="cover"
										/>
									</Pressable>
								</View>
							</View>
						);
					})}
				</View>
			)}
		</>
	);
};

const useStyles = () => {
	const theme = useColorScheme() ?? 'dark';
	return StyleSheet.create({
		containerButton: {
			width: '100%',
			height: '100%',
			alignItems: 'center',
			justifyContent: 'center',
			gap: spacing.md,
		},
		removeButton: {
			position: 'absolute',
			top: -5,
			right: -5,
			zIndex: 10,
			padding: 5,
			backgroundColor: Colours[theme].danger,
			borderRadius: 100,
		},
	});
};
