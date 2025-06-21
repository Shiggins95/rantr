import { Check as CheckIcon } from '@tamagui/lucide-icons';
import { FC } from 'react';
import { CheckboxProps, Checkbox as TamaguiCheckbox, XStack } from 'tamagui';
import { Label } from '@ui/label';
import { BodyType } from '@ui/body';

type LocalCheckboxProps = CheckboxProps & {
	label: string;
};

export const Checkbox: FC<LocalCheckboxProps> = ({
	id,
	size,
	label,
	...checkboxProps
}) => {
	return (
		<XStack w={300} alignItems="center" gap="$md">
			<TamaguiCheckbox id={id} size={size} {...checkboxProps}>
				<TamaguiCheckbox.Indicator>
					<CheckIcon />
				</TamaguiCheckbox.Indicator>
			</TamaguiCheckbox>

			<Label variant={BodyType.small} size={size} htmlFor={id}>
				{label}
			</Label>
		</XStack>
	);
};
