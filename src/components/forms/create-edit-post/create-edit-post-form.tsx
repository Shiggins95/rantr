import { useSupabaseMutation } from '@/src/api/hooks/common/use-supabase-mutation';
import { onPostCreateSuccess } from '@/src/api/invalidations/post-creation';
import { onPostEditSuccess } from '@/src/api/invalidations/post-update';
import { createPost } from '@/src/api/methods/posts/create-post';
import { editPost } from '@/src/api/methods/posts/edit-post';
import {
	createEditPostForm,
	CreateEditPostFormValues,
} from '@/src/components/forms/create-edit-post/create-edit-post-schema';
import { CreatingPostModal } from '@/src/components/pages/create-post/creating-post-modal';
import { useCurrentUser } from '@/src/context/auth-context';
import { PostImageDto } from '@/src/types/post-images.types';
import { PostDto } from '@/src/types/posts.types';
import { getSupabaseAuthenticatedClient } from '@/src/utils/supabase';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ui/button';
import { ImageUpload } from '@ui/image-upload';
import { ControlledInputField } from '@ui/input-field';
import { ControlledSelect } from '@ui/select';
import { decode } from 'base64-arraybuffer';
import * as FileSystem from 'expo-file-system';
import { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import uuid from 'react-native-uuid';
import { View } from 'tamagui';

type CreateEditPostFormProps = {
	onSuccess: () => void;
	onError: () => void;
	defaultPost?: PostDto;
};

export const CreateEditPostForm = ({
	onSuccess,
	onError,
	defaultPost,
}: CreateEditPostFormProps) => {
	const supabase = getSupabaseAuthenticatedClient();
	const currentUser = useCurrentUser();
	const [openDialog, setOpenDialog] = useState(false);
	const [areImagesLoading, setAreImagesLoading] = useState(false);

	const defaultValues = useMemo<CreateEditPostFormValues>(() => {
		if (!defaultPost) {
			return {
				title: '',
				content: '',
				tag: 'RANT',
				photos: [],
				disableComments: false,
			};
		}

		return {
			title: defaultPost.title,
			content: defaultPost.content,
			tag: defaultPost.type,
			photos: defaultPost.images.map((img) => img.imageUrl),
			disableComments: false,
		};
	}, [defaultPost]);

	const formMethods = useForm<CreateEditPostFormValues>({
		resolver: zodResolver(createEditPostForm),
		defaultValues,
	});

	const { isDirty, dirtyFields, isValid } = formMethods.formState;

	const { mutateAsync: createPostMutation } = useSupabaseMutation(createPost, {
		onSuccess: onPostCreateSuccess,
	});
	const { mutateAsync: editPostMutation } = useSupabaseMutation(editPost, {
		onSuccess: onPostEditSuccess,
	});

	const uploadImages = async (uris: string[], postId: string) => {
		try {
			return await Promise.all(
				uris.map(async (uri) => {
					const id = uuid.v4();
					const base64 = await FileSystem.readAsStringAsync(uri, {
						encoding: FileSystem.EncodingType.Base64,
					});
					const arrayBuffer = decode(base64);

					const { data, error } = await supabase.storage
						.from('post-photos')
						.upload(`${postId}/${id}.jpg`, arrayBuffer, {
							cacheControl: '3600',
							upsert: true,
							contentType: 'image/jpeg',
						});

					if (error) throw new Error(error.message);
					return data?.path || '';
				}),
			);
		} catch (error) {
			console.error('Image upload error', error);
			onError();
			return [];
		}
	};

	const removeImages = async (paths: string[]) => {
		try {
			await supabase.storage.from('post-photos').remove(paths);
		} catch (e) {
			console.error('Image removal error', e);
		}
		setOpenDialog(false);
	};

	const prepareImageDbEntries = (postId: string, paths: string[]) =>
		paths.map((path) => ({ image_url: path, post_id: postId }));

	const handleCreate = async (values: CreateEditPostFormValues) => {
		const postId = uuid.v4();

		const imagePaths = await uploadImages(values.photos, postId);
		if (imagePaths.length !== values.photos.length) return onError();

		try {
			await createPostMutation({
				post: {
					id: postId,
					title: values.title,
					content: values.content,
					disable_comments: values.disableComments,
					user_id: currentUser?.id as string,
					type: (values.tag || 'OTHER') as 'RANT' | 'ADVICE' | 'OTHER',
				},
				images: prepareImageDbEntries(postId, imagePaths),
			});
			onSuccess();
		} catch (e) {
			console.error('Create post error', e);
			onError();
		}
	};

	const handleEdit = async (values: CreateEditPostFormValues) => {
		if (!defaultPost || !isDirty) return setOpenDialog(false);

		const postId = defaultPost.id;
		let removed: PostImageDto[] = [];
		let newPaths: string[] = [];

		try {
			if (dirtyFields.photos) {
				removed = defaultPost.images.filter(
					(img) => !values.photos.includes(img.imageUrl),
				);
				if (removed.length) {
					await removeImages(removed.map((img) => img.storageUrl as string));
				}

				const newImages = values.photos.filter(
					(uri) => !defaultPost.images.some((img) => img.imageUrl === uri),
				);
				newPaths = await uploadImages(newImages, postId);
				if (newPaths.length !== newImages.length) return onError();
			}

			await editPostMutation({
				post: {
					id: postId,
					title: values.title,
					content: values.content,
					disable_comments: values.disableComments,
					user_id: currentUser?.id as string,
					type: (values.tag || 'OTHER') as 'RANT' | 'ADVICE' | 'OTHER',
				},
				images: prepareImageDbEntries(postId, newPaths),
				removedImages: removed,
			});

			onSuccess();
		} catch (e) {
			console.error('Edit post error', e);
			onError();
		}
	};

	const handleSubmit = async (values: CreateEditPostFormValues) => {
		setOpenDialog(true);
		if (!defaultPost) {
			await handleCreate(values);
		} else {
			await handleEdit(values);
		}
		setOpenDialog(false);
	};

	return (
		<>
			<CreatingPostModal
				open={openDialog}
				setOpen={setOpenDialog}
				isEdit={!!defaultPost}
			/>
			<FormProvider {...formMethods}>
				<View f={1} gap="$md">
					<ControlledInputField
						name="title"
						label="Title"
						placeholder="What happened?"
						maxLength={100}
					/>
					<ControlledInputField
						name="content"
						label="Content"
						placeholder="Give us the juicy deets"
						multiline
						height={250}
					/>
					<ControlledSelect
						placeholder="Tag your post"
						labelColourMap={{
							RANT: '$rantTagText',
							ADVICE: '$adviceTagText',
							OTHER: '$otherTagText',
						}}
						name="tag"
						options={[
							{ label: 'Rant', value: 'RANT' },
							{ label: 'Advice', value: 'ADVICE' },
							{ label: 'Other', value: 'OTHER' },
						]}
					/>
					<ImageUpload
						name="photos"
						multiple
						syncIsImageCompressing={setAreImagesLoading}
					/>
					<Button
						variant="primary"
						disabled={!isValid || !isDirty || areImagesLoading}
						onPress={formMethods.handleSubmit(handleSubmit)}
					>
						Submit
					</Button>
				</View>
			</FormProvider>
		</>
	);
};
