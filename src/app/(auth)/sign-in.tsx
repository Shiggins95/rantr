import React, { useState } from 'react';
import { supabase } from '@/src/utils/supabase';
import { Text, View } from 'tamagui';
import { Button } from '@ui/button';
import { Page } from '@/src/components/page';
import { useRouter } from 'expo-router';
import InputField from '@ui/input-field';
import { LogoSvg } from '@/src/components/svg/logo';
import { Headline, HeadlineType } from '@ui/healine';
import TrustiFiHeading from '@/src/components/trustifi-heading';
import { Body, BodyType } from '@ui/body';
import { ToastViewport, useToastController } from '@tamagui/toast';
import { FormProvider, useForm } from 'react-hook-form';

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
							<View gap="$sm" mb="$lg" alignItems="center">
								<LogoSvg width={50} height={50} />
							</View>
							<Text>
								<Headline variant={HeadlineType.h2} my="$md">
									Sign in to{' '}
								</Headline>
								<TrustiFiHeading
									type="headline"
									variant={HeadlineType.h2}
									thinVariant={HeadlineType.h2Thin}
								/>
							</Text>
							<Body variant={BodyType.normal} my="$sm">
								Enter your email address and we'll send you a verification code
								to sign in.
							</Body>
							<InputField
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
