import React, { type FC } from 'react';
import { Page } from '@/src/components/page';
import { Headline, HeadlineType } from '@ui/healine';
import InputField from '@ui/input-field';
import { supabase } from '@/src/utils/supabase';
import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'tamagui';
import { Button } from '@ui/button';
import { Body, BodyType } from '@ui/body';
import { LogoSvg } from '@/src/components/svg/logo';
import TrustiFiHeading from '@/src/components/trustifi-heading';
import { Pressable } from 'react-native';
import { useToastController } from '@tamagui/toast';
import { FormProvider, useForm } from 'react-hook-form';

const VerificationCode: FC = () => {
	// region define auth
	// endregion

	// region hooks
	const { email } = useLocalSearchParams();
	const toast = useToastController();
	const formMethods = useForm({
		defaultValues: {
			email: email as string,
			verificationCode: '',
		},
	});
	// endregion

	// region state variables
	// endregion

	// region useMemos
	// endregion

	// region define apis
	// endregion

	// region methods
	const resendCode = async () => {
		const { error } = await supabase.auth.signInWithOtp({
			email: email as string,
		});

		if (error) {
			return;
		}

		toast.show('Verification code resent', {
			message: 'Check your email for the verification code.',
			duration: 2500,
		});
	};

	const verifyCode = async (data: { verificationCode: string }) => {
		// if this request succeeds, then it will trigger the onAuthStateChanged method in AuthContext
		const { error } = await supabase.auth.verifyOtp({
			email: email as string,
			token: data.verificationCode,
			type: 'email',
		});

		if (error) {
			toast.show('Invalid verification code.', {
				duration: 1500,
				type: 'error',
				message: 'Please try again',
			});
		}
	};
	// endregion

	// region useEffects
	// endregion

	return (
		<>
			<Page isSafeArea withNavigationHeader>
				<View f={1} px="$md">
					<FormProvider {...formMethods}>
						<View f={1}>
							<View gap="$sm" mb="$lg" alignItems="center">
								<LogoSvg width={50} height={50} />
							</View>
							<Text>
								<Headline variant={HeadlineType.h2} my="$md">
									Verify your{' '}
								</Headline>
								<TrustiFiHeading
									type="headline"
									variant={HeadlineType.h2}
									thinVariant={HeadlineType.h2Thin}
								/>
								<Headline variant={HeadlineType.h2} my="$md">
									{' '}
									account
								</Headline>
							</Text>
							<Body variant={BodyType.normal} my="$sm">
								Please enter the 6-digit verification code in your emails.
							</Body>
							<InputField
								name="verificationCode"
								marginVertical
								label="Verification Code"
								rules={{ required: true, validate: (s) => s.length === 6 }}
							/>
							<Pressable
								onPress={resendCode}
								style={{ width: '100%', alignItems: 'center' }}
							>
								<Body variant={BodyType.smallBold}>Didn't receive a code?</Body>
							</Pressable>
						</View>
						<Button
							variant="primary"
							onPress={formMethods.handleSubmit(verifyCode)}
							disabled={!formMethods.formState.isValid}
						>
							Verify
						</Button>
					</FormProvider>
				</View>
			</Page>
		</>
	);
};

export default VerificationCode;
