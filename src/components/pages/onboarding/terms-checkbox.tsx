import { Check as CheckIcon } from '@tamagui/lucide-icons';
import { Body, BodyType } from '@ui/body';
import { InputErrorTypes } from '@ui/input-field';
import { Label } from '@ui/label';
import { FC } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import { CheckboxProps, Checkbox as TamaguiCheckbox, XStack } from 'tamagui';

export type TermsCheckboxProps = CheckboxProps &
	UseControllerProps &
	InputErrorTypes;

export const TermsCheckbox: FC<TermsCheckboxProps> = ({
	id,
	size,
	...rest
}) => {
	const { rules, name } = rest;
	const { field } = useController({
		name,
		rules,
		defaultValue: false,
	});

	const openTerms = () => {
		console.info('openTerms');
	};

	const openPrivacyPolicy = () => {
		console.info('privacy');
	};

	return (
		<XStack alignItems="center" gap="$md">
			<TamaguiCheckbox
				id={id}
				size={size}
				{...rest}
				checked={field.value}
				value={field.value}
				onCheckedChange={(value) => {
					field.onChange(value);
				}}
			>
				<TamaguiCheckbox.Indicator>
					<CheckIcon />
				</TamaguiCheckbox.Indicator>
			</TamaguiCheckbox>

			<Label variant={BodyType.small} size={size} htmlFor={id}>
				I confirm that I am 18 years or older and agree to the{' '}
				<Body
					variant={BodyType.smallBold}
					onPress={openTerms}
					textDecorationLine="underline"
					c="$secondary"
				>
					Terms of Use
				</Body>{' '}
				and{' '}
				<Body
					variant={BodyType.smallBold}
					onPress={openPrivacyPolicy}
					textDecorationLine="underline"
					c="$secondary"
				>
					Privacy Policy
				</Body>
			</Label>
		</XStack>
	);
};
