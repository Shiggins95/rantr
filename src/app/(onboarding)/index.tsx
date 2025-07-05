import { useSupabaseMutation } from '@/src/api/hooks/common/use-supabase-mutation';
import { agreeToTerms } from '@/src/api/methods/user/agree-to-terms';
import { updateUser } from '@/src/api/methods/user/update-user';
import { Page } from '@/src/components/page';
import { TermsCheckbox } from '@/src/components/pages/onboarding/terms-checkbox';
import { useAuthContext } from '@/src/context/auth-context';
import { UserDto } from '@/src/types/user.types';
import { supabase } from '@/src/utils/supabase';
import { useToastController } from '@tamagui/toast';
import { Body, BodyType } from '@ui/body';
import { Button } from '@ui/button';
import { Headline, HeadlineType } from '@ui/healine';
import { ControlledInputField } from '@ui/input-field';
import { ProfilePhotoPicker } from '@ui/profile-photo-picker';
import { decode } from 'base64-arraybuffer';
import * as FileSystem from 'expo-file-system';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { YStack } from 'tamagui';

type PersonalDetailsForm = {
	profilePhotoUrl?: string;
	username: string;
	firstName: string;
	lastName: string;
	termsAccepted: boolean;
};

export default function PersonalDetails() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [isImageCompressing, setIsImageCompressing] = useState(false);
	const { user, setUser } = useAuthContext();
	const toast = useToastController();

	const formMethods = useForm<PersonalDetailsForm>({
		mode: 'onChange',
		reValidateMode: 'onChange',
		defaultValues: {
			username: user?.username || '',
			firstName: user?.firstName || '',
			lastName: user?.lastName || '',
		},
	});

	const onSuccessfulUpdate = (data: UserDto) => {
		setUser(data);
		router.navigate('/(app)/(tabs)/(home)');
	};

	const onErrorUpdate = () => {
		toast.show('Failed to update details', {
			message: 'Please try again later',
			duration: 2500,
			type: 'error',
		});
	};

	const { mutateAsync: updateUserMutation } = useSupabaseMutation(updateUser);
	const { mutateAsync: agreeToTermsMutation } =
		useSupabaseMutation(agreeToTerms);

	const uploadToSupabase = async (uri: string, userId: string) => {
		const base64 = await FileSystem.readAsStringAsync(uri, {
			encoding: FileSystem.EncodingType.Base64,
		});

		const arrayBuffer = decode(base64);

		const { data, error } = await supabase.storage
			.from('profile-photos')
			.upload(`${userId}/${userId}.jpg`, arrayBuffer, {
				cacheControl: '3600',
				upsert: true,
				contentType: 'image/jpeg',
			});

		if (error) {
			return '';
		}

		return data.path;
	};

	const handleSubmit = async (data: PersonalDetailsForm) => {
		setIsLoading(true);
		try {
			let profilePhotoUrl = '';
			if (data.profilePhotoUrl) {
				profilePhotoUrl = await uploadToSupabase(
					data.profilePhotoUrl as string,
					user!.id,
				);
			}

			const { username, firstName, lastName } = data;

			const termsId = await agreeToTermsMutation(user!.id);

			const userDto = await updateUserMutation({
				id: user!.id,
				data: {
					username,
					first_name: firstName,
					last_name: lastName,
					profile_photo: profilePhotoUrl,
					status: 'COMPLETE',
					terms_id: termsId,
				},
			});
			onSuccessfulUpdate(userDto);
		} catch {
			onErrorUpdate();
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Page isSafeArea>
			<YStack px="$md" f={1}>
				<Headline variant={HeadlineType.h2}>Personal Details</Headline>
				<Body variant={BodyType.normal}>
					We'll just ask you a few questions to get you started.
				</Body>
				<FormProvider {...formMethods}>
					<YStack f={1} gap="$md" my="$md">
						<YStack px="$md" alignItems="center">
							<ProfilePhotoPicker
								onChange={(value) =>
									formMethods.setValue('profilePhotoUrl', value)
								}
								setIsImageCompressing={setIsImageCompressing}
								isImageCompressing={isImageCompressing}
							/>
						</YStack>
						<ControlledInputField
							rules={{ required: true }}
							name="username"
							label="Username*"
							textContentType="username"
						/>
						<ControlledInputField
							rules={{ required: true }}
							name="firstName"
							label="First name*"
							textContentType="givenName"
						/>
						<ControlledInputField
							rules={{ required: true }}
							name="lastName"
							label="Last name*"
							textContentType="familyName"
						/>
						<TermsCheckbox
							rules={{ required: true }}
							name="termsAccepted"
							id="tscs-checkbox"
						/>
					</YStack>
				</FormProvider>
				<Button
					variant="primary"
					disabled={
						!formMethods.formState.isValid || isLoading || isImageCompressing
					}
					onPress={formMethods.handleSubmit(handleSubmit)}
				>
					Next
				</Button>
			</YStack>
		</Page>
	);
}
