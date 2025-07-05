import { Page } from '@/src/components/page';
import RantrHeading from '@/src/components/rantr-heading';
import { supabase } from '@/src/utils/supabase';
import { ToastViewport, useToastController } from '@tamagui/toast';
import { Body, BodyType } from '@ui/body';
import { Button } from '@ui/button';
import { Headline, HeadlineType } from '@ui/healine';
import { ControlledInputField } from '@ui/input-field';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Text, View } from 'tamagui';

export default function SignIn() {
	const [loading, setLoading] = useState(false);

	const toast = useToastController();
	const formMethods = useForm({
		defaultValues: {
			email: '',
		},
	});

	const router = useRouter();
	async function signInWithEmail({ email }: { email: string }) {
		setLoading(true);

		const { data, error } = await supabase.auth.signInWithOtp({
			email: email,
			options: {
				shouldCreateUser: true,
			},
		});

		if (error) {
			toast.show('Failed to sign in', {
				duration: 1500,
				type: 'error',
				message: 'Please try again.',
				viewportName: 'sign-in',
			});
			setLoading(false);
			return;
		}

		if (data) {
			router.navigate(`/verification-code?email=${encodeURIComponent(email)}`);
		}

		setLoading(false);
	}

	return (
		<>
			<ToastViewport
				multipleToasts
				bottom={0}
				left={0}
				right={0}
				name="sign-in"
			/>
			<Page isSafeArea withNavigationHeader>
				<View f={1} px="$md">
					<FormProvider {...formMethods}>
						<View f={1}>
							<Text>
								<Headline variant={HeadlineType.h2} my="$md">
									Sign in to{' '}
								</Headline>
								<RantrHeading
									type="headline"
									variant={HeadlineType.h2}
									thinVariant={HeadlineType.h2Thin}
								/>
							</Text>
							<Body variant={BodyType.normal} my="$sm">
								Enter your email address and we'll send you a verification code
								to sign in.
							</Body>
							<ControlledInputField
								name="email"
								marginVertical
								label="Email"
								placeholder="Enter email"
							/>
						</View>
						<Button
							variant="primary"
							disabled={!formMethods.formState.isValid || loading}
							onPress={formMethods.handleSubmit(signInWithEmail)}
						>
							Sign In
						</Button>
					</FormProvider>
				</View>
			</Page>
		</>
	);
}
