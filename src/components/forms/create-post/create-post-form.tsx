import { useSupabaseMutation } from '@/src/api/hooks/common/use-supabase-mutation';
import { onPostCreateSuccess } from '@/src/api/invalidations/post-creation';
import { createPost } from '@/src/api/methods/posts/create-post';
import {
	createPostForm,
	CreatePostFormValues,
} from '@/src/components/forms/create-post/create-post-schema';
import { CreatingPostModal } from '@/src/components/pages/create-post/creating-post-modal';
import { useCurrentUser } from '@/src/context/auth-context';
import { PostImageCreate } from '@/src/types/post-images.types';
import { supabase } from '@/src/utils/supabase';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ui/button';
import { ImageUpload } from '@ui/image-upload';
import { ControlledInputField } from '@ui/input-field';
import { ControlledSelect } from '@ui/select';
import { decode } from 'base64-arraybuffer';
import * as FileSystem from 'expo-file-system';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import uuid from 'react-native-uuid';
import { View } from 'tamagui';

type CreatePostFormProps = {
	onSuccess: () => void;
	onError: () => void;
};

export const CreatePostForm = ({ onSuccess, onError }: CreatePostFormProps) => {
	const currentUser = useCurrentUser();
	const [openDialog, setOpenDialog] = useState(false);
	const formMethods = useForm<CreatePostFormValues>({
		resolver: zodResolver(createPostForm),
		defaultValues: {
			title: '',
			content: '',
			tag: 'RANT',
			photos: [],
			disableComments: false,
		},
	});

	const { mutateAsync: createPostMutation } = useSupabaseMutation(createPost, {
		onSuccess: onPostCreateSuccess,
	});

	const uploadImagesToSupabase = async (
		imageUris: string[],
		postId: string,
	) => {
		return await Promise.all(
			imageUris.map(async (uri, index) => {
				const base64 = await FileSystem.readAsStringAsync(uri, {
					encoding: FileSystem.EncodingType.Base64,
				});

				const arrayBuffer = decode(base64);

				const { data, error } = await supabase.storage
					.from('post-photos')
					.upload(`${postId}/${index}.jpg`, arrayBuffer, {
						cacheControl: '3600',
						upsert: true,
						contentType: 'image/jpeg',
					});

				if (error) {
					return { error: true, path: '', errorMessage: error };
				}

				return { error: false, path: data?.path, errorMessage: '' };
			}),
		);
	};

	const handleSubmit = async (values: CreatePostFormValues) => {
		setOpenDialog(true);
		const postId = uuid.v4();
		let imagePaths: { error: boolean; path: string; errorMessage: unknown }[] =
			[];
		if (values.photos.length > 0) {
			imagePaths = await uploadImagesToSupabase(values.photos, postId);
		}
		const hasErrors = imagePaths.some((p) => p.error);
		if (hasErrors) {
			// TODO delete uploaded photos and throw error toast
			console.error('error', imagePaths);
			return;
		}

		const formattedPhotos: PostImageCreate[] = imagePaths.map((p) => {
			return {
				image_url: p.path,
				post_id: postId,
			};
		});

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
				images: formattedPhotos,
			});
			onSuccess();
		} catch (e) {
			console.error('error', e);
			onError();
		} finally {
			setOpenDialog(false);
		}
	};

	const isValid = formMethods.formState.isValid;

	const tag = formMethods.control._getWatch('tag');
	// const tag = watch('tag') as string;
	console.log('tag', tag);

	return (
		<>
			<CreatingPostModal open={openDialog} setOpen={setOpenDialog} />
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

					<ImageUpload name="photos" multiple />

					<Button
						variant="primary"
						disabled={!isValid}
						onPress={formMethods.handleSubmit(handleSubmit)}
					>
						Submit
					</Button>
				</View>
			</FormProvider>
		</>
	);
};
