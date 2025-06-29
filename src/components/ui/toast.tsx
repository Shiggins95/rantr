import { GetThemeValueForKey, XStack, YStack } from 'tamagui';
import { Toast, useToastController, useToastState } from '@tamagui/toast';
import { Body, BodyType } from '@ui/body';
import { spacing } from '@/src/constants/spacing';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TriangleAlert } from '@tamagui/lucide-icons';
import { useMemo } from 'react';

const CurrentToast = () => {
	const currentToast = useToastState();
	const toastController = useToastController();

	const { bottom, top } = useSafeAreaInsets();

	const hideToast = () => {
		toastController.hide();
	};

	const toastBottomOrTopProps = useMemo(() => {
		if (currentToast?.viewportName === 'top-toast') {
			return {
				top: top + spacing.md,
				fromY: -100,
			};
		}
		return {
			bottom: bottom + spacing.md,
			fromY: 100,
		};
	}, [currentToast?.viewportName]);

	if (!currentToast || currentToast.isHandledNatively) return null;

	let colour: GetThemeValueForKey<'borderBottomColor' | 'color'> = '$success';

	switch (currentToast.type) {
		case 'error':
			colour = '$danger';
			break;
		case 'success':
			colour = '$success';
			break;
		case 'warning':
			colour = '$warning';
			break;
	}

	return (
		<Toast
			key={currentToast.id}
			duration={currentToast.duration}
			enterStyle={{ opacity: 0, y: toastBottomOrTopProps.fromY }}
			exitStyle={{ opacity: 0, y: toastBottomOrTopProps.fromY }}
			opacity={1}
			bottom={toastBottomOrTopProps.bottom}
			top={toastBottomOrTopProps.top}
			animation="quick"
			viewportName={currentToast.viewportName}
			fd="row"
			px="$md"
			onPress={hideToast}
			elevation={10}
			shadowColor="$shadowColour"
			shadowOffset={{ height: -5, width: 0 }}
		>
			<XStack
				minHeight={50}
				alignItems="center"
				py="$sm"
				px="$lg"
				bg="rgba(20,20,20,0.7)"
				borderBottomWidth={3}
				w={'100%'}
				borderRadius="$l"
				borderBottomColor={colour}
				gap="$md"
			>
				<TriangleAlert size={24} c={colour} />
				<YStack f={1}>
					<Toast.Title>
						<Body variant={BodyType.bold}>{currentToast.title}</Body>
					</Toast.Title>
					{!!currentToast.message && (
						<Toast.Description>
							<Body variant={BodyType.small}>{currentToast.message}</Body>
						</Toast.Description>
					)}
				</YStack>
			</XStack>
		</Toast>
	);
};

export { CurrentToast };
