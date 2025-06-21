import { Page } from '@/src/components/page';
import { Headline, HeadlineType } from '@ui/healine';
import { Card, XStack, YStack } from 'tamagui';
import TrustiFiHeading from '@/src/components/trustifi-heading';
import { Body, BodyType } from '@ui/body';
import { Pressable } from 'react-native';
import { useState } from 'react';
import { Button } from '@ui/button';
import { useUpdateUserMutation } from '@/src/api/hooks/use-update-user-mutation';
// import { UserGetDto, UserPostPutDtoJoinReasonEnum } from 'trustifi-client';
import { useAuthContext } from '@/src/context/auth-context';
import { useRouter } from 'expo-router';
import { useToastController } from '@tamagui/toast';

export default function JoinReason() {
	const [reason, setReason] = useState<number>();
	const { setUser } = useAuthContext();
	const router = useRouter();
	const toast = useToastController();

	const onSuccessfulUpdate = (data: any) => {
		setUser(data);
		router.navigate('/(app)/(tabs)/(home)');
	};

	const onErrorUpdate = () => {
		toast.show('Failed to select reason', {
			message: 'Please try again later',
			duration: 2500,
			type: 'error',
		});
	};

	const { mutate } = useUpdateUserMutation(onSuccessfulUpdate, onErrorUpdate);

	const handleSubmit = async () => {
		// let joinReason: UserPostPutDtoJoinReasonEnum | undefined;
		//
		// switch (reason) {
		// 	case 0:
		// 		joinReason = UserPostPutDtoJoinReasonEnum.GetHelp;
		// 		break;
		// 	case 1:
		// 		joinReason = UserPostPutDtoJoinReasonEnum.GiveHelp;
		// 		break;
		// 	case 2:
		// 		joinReason = UserPostPutDtoJoinReasonEnum.Both;
		// 		break;
		// }
		// mutate({
		// 	joinReason,
		// 	status: 'COMPLETE',
		// });
	};

	return (
		<Page isSafeArea>
			<YStack px="$md" f={1}>
				<YStack gap="$md" f={1}>
					<Headline variant={HeadlineType.h2} textAlign="center">
						What brings you to{' '}
						<TrustiFiHeading
							type="headline"
							variant={HeadlineType.h2}
							thinVariant={HeadlineType.h2Thin}
						/>{' '}
						?
					</Headline>

					<Pressable onPress={() => setReason(0)} disabled={reason === 0}>
						<Card
							bg="$backgroundSubtle"
							px="$md"
							py="$md"
							borderRadius="$radius.l"
							borderWidth={2}
							borderColor={reason === 0 ? '$primary' : '$backgroundSubtle'}
						>
							<XStack gap="$md" paddingRight="$md">
								<Body variant={BodyType.normal}>👋</Body>
								<YStack paddingRight="$md">
									<Body variant={BodyType.bold}>
										I'm looking for short-term help
									</Body>
									<Body variant={BodyType.small} numberOfLines={3}>
										Choose this if you're seeking assistance from the{' '}
										<TrustiFiHeading
											type="body"
											variant={BodyType.smallBold}
											thinVariant={BodyType.smallBold}
										/>{' '}
										community.
									</Body>
								</YStack>
							</XStack>
						</Card>
					</Pressable>

					<Pressable onPress={() => setReason(1)} disabled={reason === 1}>
						<Card
							bg="$backgroundSubtle"
							px="$md"
							py="$md"
							borderRadius="$radius.l"
							borderWidth={2}
							borderColor={reason === 1 ? '$primary' : '$backgroundSubtle'}
						>
							<XStack gap="$md" paddingRight="$md">
								<Body variant={BodyType.normal}>🙌</Body>
								<YStack paddingRight="$md">
									<Body variant={BodyType.bold}>
										I'd like to support others
									</Body>
									<Body variant={BodyType.small} numberOfLines={3}>
										Choose this if you're seeking to help the{' '}
										<TrustiFiHeading
											type="body"
											variant={BodyType.smallBold}
											thinVariant={BodyType.smallBold}
										/>{' '}
										community.
									</Body>
								</YStack>
							</XStack>
						</Card>
					</Pressable>

					<Pressable onPress={() => setReason(2)} disabled={reason === 2}>
						<Card
							bg="$backgroundSubtle"
							px="$md"
							py="$md"
							borderRadius="$radius.l"
							borderWidth={2}
							borderColor={reason === 2 ? '$primary' : '$backgroundSubtle'}
						>
							<XStack gap="$md" paddingRight="$md">
								<Body variant={BodyType.normal}>🔥️</Body>
								<YStack paddingRight="$md">
									<Body variant={BodyType.bold}>A mix of both</Body>
									<Body variant={BodyType.small} numberOfLines={3}>
										Choose this if you're both willing to help and ask for help
										from the{' '}
										<TrustiFiHeading
											type="body"
											variant={BodyType.smallBold}
											thinVariant={BodyType.smallBold}
										/>{' '}
										community.
									</Body>
								</YStack>
							</XStack>
						</Card>
					</Pressable>
				</YStack>
				<Button
					variant="primary"
					disabled={reason === undefined}
					onPress={handleSubmit}
				>
					Continue
				</Button>
			</YStack>
		</Page>
	);
}
