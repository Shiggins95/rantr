import { Check as CheckIcon } from '@tamagui/lucide-icons';
import { FC } from 'react';
import { Checkbox as TamaguiCheckbox, CheckboxProps, XStack } from 'tamagui';
import { Label } from '@ui/label';
import { Body, BodyType } from '@ui/body';
import { useController, UseControllerProps } from 'react-hook-form';
import { InputErrorTypes } from '@ui/input-field';

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
		console.log('openTerms');
	};

	const openPrivacyPolicy = () => {
		console.log('privacy');
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
